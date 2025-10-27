import express from "express";
import cors from "cors";
import si from "systeminformation";

const app = express();
app.use(cors());

app.get("/stats", async (req, res) => {
  try {
    const [cpu, memory, disk, network] = await Promise.all([
      si.currentLoad(),
      si.mem(),
      si.fsSize(),
      si.networkStats(),
    ]);

    res.json({
      cpuUsage: cpu.currentLoad.toFixed(2),
      ramUsage: ((memory.active / memory.total) * 100).toFixed(2),
      diskUsage: disk[0] ? disk[0].use.toFixed(2) : 0,
      networkSpeed: {
        rx: (network[0]?.rx_bytes / 1024 / 1024).toFixed(2), // MB received
        tx: (network[0]?.tx_bytes / 1024 / 1024).toFixed(2), // MB sent
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get stats" });
  }
});

app.listen(3001, () => console.log("✅ Server running on http://localhost:3001"));
