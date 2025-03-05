const express = require("express");
const { PythonShell } = require("python-shell");
const path = require("path");
const router = express.Router();

router.post("/predict", async (req, res) => {
  const { quiz_scores, time_spent, reading_volume, peer_comparison, past_performance_trend } = req.body;

  console.log("Received prediction request:", req.body);

  // Get absolute path to predict.py
  const scriptPath = path.resolve(__dirname, "../../../predictive_model/scripts");

  let options = {
    pythonPath: "python",
    scriptPath: scriptPath,
    args: [quiz_scores, time_spent, reading_volume, peer_comparison, past_performance_trend]
  };

  console.log("Executing Python script...");

  PythonShell.run("predict.py", options)
    .then(results => {
      console.log("Python script executed. Result:", results);
      if (!results || results.length === 0) {
        return res.status(500).json({ error: "No output from Python script" });
      }
      res.json({ prediction: results[0].trim() });
    })
    .catch(err => {
      console.error("Python Script Error:", err);
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
