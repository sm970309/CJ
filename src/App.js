// src/App.js

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import ChartComponent from "./ChartComponent";
import Support from "./Support";
import Kakao from "./Kakao";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<ChartComponent />} />
          <Route path="/support" element={<Support />} />
          <Route path="/kakao" element={<Kakao />} />
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
      <h1 className="clickable">충주 단기선교</h1>
    </header>
  );
};

export default App;
