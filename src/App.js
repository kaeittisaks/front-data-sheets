import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';

// components
import ReadDocx from './components/ReadDocx';
import SaveToSheets from './components/SaveToSheets';

function App() {
  return (
    <div>
  <HelmetProvider>
  <Routes>
    <Route path="/" element={<ReadDocx/>}></Route>
    <Route path="/SaveToSheets" element={<SaveToSheets/>}></Route>
  </Routes>
  </HelmetProvider>
    </div>
  );
}

export default App;
