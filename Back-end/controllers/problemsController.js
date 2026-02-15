const pool = require("../db");

exports.getAllProblems = async (req, res) => {
  try {
    const query = `
      SELECT qid, title, difficulty, topics, explanation, sample_input, sample_output 
      FROM sts3007_t 
      ORDER BY qid ASC
    `;
    
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Database connection error" });
  }
};