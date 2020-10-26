import React, { useState } from "react";
import { WelcomeMessage } from "./components/Welcome";
import { Excercise } from "./components/Excercise";

import "./App.css";

function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="App">
      {started ? (
        <WelcomeMessage onButtonClick={() => setStarted(true)} />
      ) : (
        <Excercise />
      )}
    </div>
  );
}

export default App;
