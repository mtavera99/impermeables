const assert = require("assert");
const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "data-prueba-capi");
fs.rmSync(DATA_DIR, { recursive: true, force: true });
process.env.DATA_DIR = DATA_DIR;

const store = require("./src/store");
const metaCapi = require("./src/meta-capi");

async function run() {
  // 1. Sin variables no está activo
  delete process.env.META_CAPI_DATASET_ID;
  delete process.env.META_CAPI_ACCESS_TOKEN;
  delete process.env.META_CAPI_TEST_EVENT_CODE;
  assert.strictEqual(metaCapi.estaActivo(), false);

  // 2. Con variables sí está activo y construye payload válido
  process.env.META_CAPI_DATASET_ID = "123456789012345";
  process.env.META_CAPI_ACCESS_TOKEN = "token_de_prueba";
  process.env.META_CAPI_TEST_EVENT_CODE = "TEST999";
  assert.strictEqual(metaCapi.estaActivo(), true);

  store.guardarAtribucion("573127398835", {
    source_id: "120249499375070390",
    source_url: "https://fb.me/test",
    source_type: "ad",
    ctwa_clid: "AR_ctwa_clid_abc123",
  });

  const saved = store.saveOrder({
    nombre: "Cristian Camayo",
    celular: "3127398835",
    ciudad: "Totoró, Cauca",
    producto: "V10 2X x 2",
    total: 125000,
    telefono_chat: "573127398835",
    guia: "240066869058",
  });
  assert.strictEqual(saved.ctwa_clid, "AR_ctwa_clid_abc123");

  const payload = metaCapi.construirPayloadPurchase(saved, saved.ctwa_clid);
  assert.ok(payload);
  assert.strictEqual(payload.test_event_code, "TEST999");
  assert.strictEqual(payload.data[0].event_name, "Purchase");
  assert.strictEqual(payload.data[0].event_id, saved.id);
  assert.strictEqual(payload.data[0].action_source, "business_messaging");
  assert.strictEqual(payload.data[0].messaging_channel, "whatsapp");
  assert.strictEqual(payload.data[0].user_data.ctwa_clid, "AR_ctwa_clid_abc123");
  assert.strictEqual(payload.data[0].user_data.ph[0], metaCapi.hashSha256("573127398835"));
  assert.strictEqual(payload.data[0].custom_data.currency, "COP");
  assert.strictEqual(payload.data[0].custom_data.value, 125000);
  assert.strictEqual(payload.data[0].custom_data.order_id, "240066869058");

  // Anulados o sin ctwa_clid no generan payload
  assert.strictEqual(metaCapi.construirPayloadPurchase({ ...saved, anulado: true }, saved.ctwa_clid), null);
  assert.strictEqual(metaCapi.construirPayloadPurchase({ ...saved, ctwa_clid: null }, null), null);

  // 3. Envío exitoso con mock fetch y persistencia en store
  let calledUrl = "";
  const resOk = await metaCapi.enviarPurchase(saved, {
    ctwaClid: saved.ctwa_clid,
    fetchFn: async (url, opts) => {
      calledUrl = url;
      assert.strictEqual(opts.method, "POST");
      return { ok: true, status: 200, json: async () => ({ events_received: 1 }) };
    },
    onResult: (r) => store.marcarCapiEnviado(saved.id, r),
  });
  assert.strictEqual(resOk.ok, true);
  assert.ok(calledUrl.includes("/123456789012345/events?access_token=token_de_prueba"));

  const updated = store.todosLosPedidos().find((p) => p.id === saved.id);
  assert.strictEqual(updated.capiEnviado, true);
  assert.strictEqual(updated.capiEventId, saved.id);

  // 4. No vuelve a enviar si ya fue marcado
  const resDup = await metaCapi.enviarPurchase(updated, {
    ctwaClid: updated.ctwa_clid,
    fetchFn: async () => { throw new Error("No debía llamarse"); },
  });
  assert.strictEqual(resDup.skipped, true);
  assert.strictEqual(resDup.reason, "ya_enviado");

  // 5. Error de red no revienta
  const resErr = await metaCapi.enviarPurchase(
    { ...saved, capiEnviado: false },
    {
      ctwaClid: saved.ctwa_clid,
      fetchFn: async () => { throw new Error("timeout simulado"); },
    }
  );
  assert.strictEqual(resErr.ok, false);

  fs.rmSync(DATA_DIR, { recursive: true, force: true });
  console.log("🟢 test-meta-capi.js: todas las pruebas pasaron.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
