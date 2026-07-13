// Almacenamiento simple en archivos JSON (suficiente para el MVP).
// Guarda conversaciones, pedidos y estado de "pausa" (cuando un humano toma el chat).
const fs = require("fs");
const path = require("path");

const DIR = path.join(__dirname, "..", "data");
const CONV_FILE = path.join(DIR, "conversations.json");
const ORDERS_FILE = path.join(DIR, "orders.json");

const MAX_MSGS = 24; // historial máximo por cliente que enviamos a la IA

function ensure() {
  if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });
  if (!fs.existsSync(CONV_FILE)) fs.writeFileSync(CONV_FILE, "{}");
  if (!fs.existsSync(ORDERS_FILE)) fs.writeFileSync(ORDERS_FILE, "[]");
}
function readJSON(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, "utf8")); } catch { return fallback; }
}
function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function getConv(phone) {
  ensure();
  const all = readJSON(CONV_FILE, {});
  return all[phone] || { messages: [], paused: false };
}
function pushMsg(phone, role, content) {
  ensure();
  const all = readJSON(CONV_FILE, {});
  const c = all[phone] || { messages: [], paused: false };
  c.messages.push({ role, content, at: Date.now() });
  if (c.messages.length > MAX_MSGS) c.messages = c.messages.slice(-MAX_MSGS);
  all[phone] = c;
  writeJSON(CONV_FILE, all);
}
function isPaused(phone) {
  return !!getConv(phone).paused;
}
function setPaused(phone, val) {
  ensure();
  const all = readJSON(CONV_FILE, {});
  const c = all[phone] || { messages: [], paused: false };
  c.paused = val;
  all[phone] = c;
  writeJSON(CONV_FILE, all);
}
function saveOrder(order) {
  ensure();
  const orders = readJSON(ORDERS_FILE, []);
  const record = { ...order, fecha: new Date().toISOString() };
  orders.push(record);
  writeJSON(ORDERS_FILE, orders);
  return record;
}

module.exports = { getConv, pushMsg, isPaused, setPaused, saveOrder };
