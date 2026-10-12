const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.get("/health", (_req, res) => res.json({ ok: true, app: "NexusCraft Shoop" }));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`NexusCraft Shoop interface running on port ${PORT}`);
});
