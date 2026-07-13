// Simulador local: prueba el agente por consola SIN WhatsApp.
// Uso: crea tu .env con GEMINI_API_KEY y corre: npm run chat
require("dotenv").config();
const readline = require("readline");
const { generateReply } = require("./agent");

const phone = "simulacion_local";
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

console.log("=== Simulador BikerPro Bot ===");
console.log("Escribe como si fueras un cliente. Ctrl+C para salir.\n");

function ask() {
  rl.question("Cliente> ", async (text) => {
    if (!text.trim()) return ask();
    try {
      const { reply, order, handoff } = await generateReply(phone, text);
      console.log(`\nBikerPro> ${reply}\n`);
      if (order) console.log(`  [PEDIDO GUARDADO] ${JSON.stringify(order)}\n`);
      if (handoff) console.log(`  [PASA A HUMANO]\n`);
    } catch (e) {
      console.error("Error:", e.message);
    }
    ask();
  });
}
ask();
