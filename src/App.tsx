import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './layout/Header';
import AllColleges from './components/AllColleges';

function App() {
  const [searchRow, setSearchRow] = useState(365);
  useEffect(() => {
    // getCollegeRow();
    requestCollegeData(searchRow);
  }, []);

  const requestCollegeData = async (row: number) => {
    const range = `A${row}:H${row}`;
    const res = await fetch(
      `${process.env.REACT_APP_GOOGLE_SHEET_API_BASE}/${process.env.REACT_APP_GOOGLE_SHEET_ID}/values/${range}?key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    );

    const { values } = await res.json();
    console.log(values);
  };

  const getCollegeRow = async () => {
    const range = `E:E`;
    const res = await fetch(
      `${process.env.REACT_APP_GOOGLE_SHEET_API_BASE}/${process.env.REACT_APP_GOOGLE_SHEET_ID}/values/${range}?key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    );

    const { values } = await res.json();
    console.log(values);
  };

  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <AllColleges />
      </main>
    </div>
  );
}

export default App;
