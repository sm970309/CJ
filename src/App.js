// src/App.js

import React from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import ChartComponent from "./component/ChartComponent";
import Main from "./component/Main";
import Support from "./component/Support";
import Check from "./component/Check";
import Detail from "./component/Detail";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/ChartComponent" element={<ChartComponent />} />
          <Route path="/support" element={<Support />} />
          <Route path="/check" element={<Check />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>
      </div>
    </Router>
  );
}

const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <header className="App-header" onClick={handleClick}>
      <img
        src={`${process.env.PUBLIC_URL}/TEST.png`}
        alt="Example"
        style={{
          width: "330px",
        }}
      />
    </header>
  );
};

export default App;
