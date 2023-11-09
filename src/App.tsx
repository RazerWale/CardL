import { useState } from "react";
import "./App.css";
import { Card } from "./components/Card.js";
import { CSSTransition } from "react-transition-group";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Card />
    </div>
  );
}

export default App;
