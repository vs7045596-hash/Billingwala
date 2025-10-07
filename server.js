const express = require("express");
const bodyParser = require("body-parser");
const Database = require("@replit/database");
const db = new Database();
const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

// Get all invoices
app.get("/invoices", async (req, res) => {
  let invoices = await db.get("invoices");
  if (!invoices) invoices = [];
  res.json(invoices);
});

// Add new invoice
app.post("/invoice", async (req, res) => {
  let { customer, amount, date } = req.body;
  let invoices = await db.get("invoices") || [];
  invoices.push({ customer, amount, date });
  await db.set("invoices", invoices);
  res.json({ success: true, message: "Invoice added", invoices });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
