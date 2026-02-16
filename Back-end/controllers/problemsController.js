const pool = require("../db");

exports.getProblemById = async (req, res) => {
  try {
    const { id } = req.params; 
    console.log("Searching for QID:", id);

    const query = `
      SELECT qid, title, difficulty, topics, explanation, sample_input, sample_output 
      FROM sts3007_t 
      WHERE qid = $1`; 

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      console.log("No problem found in DB for ID:", id);
      return res.status(404).json({ error: "Problem not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("DATABASE ERROR:", err.message); 
    res.status(500).json({ error: err.message });
  }
};

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