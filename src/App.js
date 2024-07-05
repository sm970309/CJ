// src/App.js

import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from './component/Layout';
import { Flowing } from './component/Flowing';
import Main from './component/Main';
import Support from './component/Support';
import Check from './component/Check';
import Detail from './component/Detail';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/flowing" element={<Flowing />} />
          <Route path="/support" element={<Support />} />
          <Route path="/check" element={<Check />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
