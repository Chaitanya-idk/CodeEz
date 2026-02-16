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

  function showValue() {
    console.log(editorRef.current.getValue());
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
            <p className="userOutput"></p>
        </div>
        <div className="testCases">
            <h2>Test Cases</h2>
            

        </div>
      </div>
    </>
  );
}
