import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router";
import './Solving.css'
export function Solving() {
    const {id} = useParams();
    console.log(id);
  const [current, setCurrent] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/api/problemset/${id}`).then((response) => {
        console.log(response.data);
      setCurrent(response.data);
    });
  }, [id]);
  

    return(
        <>
            <div className="solve-header">
                <h3>Problems</h3>
                <div className="Buttons">
                <button>Run</button>
                <button>Submit</button>
                </div>
            </div>
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
        </>
    );
}
