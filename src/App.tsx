import React, { useState } from "react";
import { WelcomeMessage } from "./components/Welcome";
import { Exercise } from "./components/Exercise";

import "./App.css";

function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="App">
      {started ? (
        <WelcomeMessage onButtonClick={() => setStarted(true)} />
      ) : (
        <Exercise />
      )}
    </div>
  );
}

export default App;
