import axios from "axios";
import { useEffect, useState } from "react";
import "./ProblemSet.css";
import { Footer } from "./Footer.jsx";

export function ProblemSet() {
  const [problems, setProblems] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/problemset/all").then((response) => {
      setProblems(response.data);
    });
  }, []);
  return (
    <>

      <h1>Problems</h1>
      {problems.map((problem) => {
        return (
          <div key={problem.id} className="problem-row">
            <div className="problem-main-content">
              <span className="qid">{problem.qid}.</span>
              <a href={`/problems/${problem.qid}`} className="problem-title">
                {problem.title}
              </a>
            </div>
            <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>
              {problem.difficulty}
            </span>
          </div>
        );
      })}

      <Footer />
    </>
  );
}
