import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Editor from "@monaco-editor/react";
import "./Solving.css";
export function Solving() {
  const { id } = useParams();
  console.log(id);
  
  const [current, setCurrent] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/api/problemset/${id}`).then((response) => {
      console.log(response.data);
      setCurrent(response.data);
    });
  }, [id]);

  const editorRef = useRef(null);

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }

const [output, setOutput] = useState("");
const [isRunning, setIsRunning] = useState(false);
const[d,setD] = useState("");
console.log(isRunning);
async function showValue() {
  if (!editorRef.current) return;
  
  const userCode = editorRef.current.getValue();
  setIsRunning(true);
  setOutput("Compiling and running...");

  try {
    const normalizeInput = (raw) => {
      if (raw == null) return "";
      let s = typeof raw === "string" ? raw : String(raw);
      s = s.replace(/[;,]/g, " ").replace(/\s+/g, " ").trim();
      return s;
    };

    const inputForRun = normalizeInput(current && current.sample_input);

    const response = await axios.post("http://localhost:5000/api/problemset/run", {
      code: userCode,
      input: inputForRun
    });
    setD(response.data);
    const result = response.data;
    const expected = current && current.sample_output != null ? String(current.sample_output).replace(/\r\n/g, "\n").trim() : "";
    const actualRaw = result && result.stdout != null ? String(result.stdout) : "";
    const actual = actualRaw.replace(/\r\n/g, "\n").trim();
    if (result && result.stderr) {
      setOutput(`Runtime Error:\n${result.stderr}`);
    } else if (expected === "" && actual === "") {
      setOutput("Execution successful (no output).");
    } else if (actual === expected) {
      setOutput(`Passed sample test\n\nOutput:\n${actual}`);
    } else {
      setOutput(` Failed sample test\n\nExpected:\n${expected}\n\nGot:\n${actual}`);
    }
  } catch (error) {
    console.error("Run Error:", error);
    setOutput("Error: Could not connect to the execution server.");
  } finally {
    setIsRunning(false);
  }
}

  return (
    <>
      <div className="solve-header">
        <h3>Problems</h3>
        <div className="Buttons">
          <button onClick={showValue}>Run</button>
          <button>Submit</button>
        </div>
      </div>
      <div className="master-container">
        <div className="problemInfo">
          <div className="top">
            <h3>{current.qid}</h3>
            <h3>{current.title}</h3>
            <h3>{current.difficulty}</h3>
          </div>
          <div className="Middle">
            <h3>{current.explanation}</h3>
            <h4>Topics : {current.topics}</h4>
          </div>
          <div className="bottom">
            <h4>Sample Input : {current.sample_input}</h4>
            <h4>Sample Output : {current.sample_output}</h4>
          </div>
        </div>
        <div className="codeEditor">
          <Editor
            theme="vs-dark"
            className="textEditor"
            defaultLanguage="java"
            defaultValue="// Write your code in Java"
            onMount={handleEditorDidMount}
          />
        </div>
        <div className="codeOutput">
            <h2>Output</h2>
            <hr></hr>
            <p className="userOutput">{d}</p>
        </div>
        <div className="testCases">
            <h2>Test Cases</h2>
            <hr></hr>
            <p className="validation">{output}</p>
        </div>
      </div>
    </>
  );
}
