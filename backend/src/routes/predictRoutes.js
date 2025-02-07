const express = require("express");
const { PythonShell } = require("python-shell");
const router = express.Router();

router.post("/predict", async (req, res) => {
  const { quiz_scores, time_spent, reading_volume, peer_comparison, past_performance_trend } = req.body;

  let options = {
    //scriptPath: "../scripts",
    scriptPath: "../../../../predictive_model/scripts",
    args: [quiz_scores, time_spent, reading_volume, peer_comparison, past_performance_trend]
  };

  PythonShell.run("predict.py", options, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ prediction: results[0] });
  });
});

module.exports = router;
