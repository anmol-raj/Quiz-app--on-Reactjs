import ReactDOM from "react-dom";
import React from "react";
import Quiz from "./Quiz";

function App() {
  return (
    <div>
      <Quiz></Quiz>
      <p style={{ fontSize: 15 }}>Develop by Anmol Raj</p>
    </div>
  );
}

export default App;

const rootElement = document.getElementById("root");
ReactDOM.render(<App></App>, rootElement);
