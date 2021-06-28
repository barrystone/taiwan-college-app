import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './layout/Header';
import AllColleges from './components/AllColleges';

function App() {
  const [allColleges, setAllColeges] = useState([]);
  const [schoolYear, setSchoolYear] = useState('108');
  const [isPublic, setIsPublic] = useState('all');
  const [schoolType, setSchoolType] = useState('all');
  const [searchFieldValue, setSearchFieldValue] = useState('');

  const getAllColleges = async () => {
    const range = `A:H`;
    const res = await fetch(
      `${process.env.REACT_APP_GOOGLE_SHEET_API_BASE}/${process.env.REACT_APP_GOOGLE_SHEET_ID}/values/${range}?key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    );
    const { values } = await res.json();
    setAllColeges(values);
  };

  const changeSchoolYear = (x: string) => {
    setSchoolYear(x);
  };
  const changeSchoolType = (x: string) => {
    setSchoolType(x);
  };
  const changeIsPublic = (x: string) => {
    setIsPublic(x);
  };
  const changeSearchFieldValue = (x: string) => {
    setSearchFieldValue(x);
  };

  useEffect(() => {
    getAllColleges();
  }, []);

  // const [searchRow, setSearchRow] = useState(365);
  // useEffect(() => {
  //   // getCollegeRow();
  //   // requestCollegeData(searchRow);
  // }, []);

  // const requestCollegeData = async (row: number) => {
  //   const range = `A${row}:H${row}`;
  //   const res = await fetch(
  //     `${process.env.REACT_APP_GOOGLE_SHEET_API_BASE}/${process.env.REACT_APP_GOOGLE_SHEET_ID}/values/${range}?key=${process.env.REACT_APP_GOOGLE_API_KEY}`
  //   );

  //   const { values } = await res.json();
  //   // console.log(values);
  // };

  // const getCollegeRow = async () => {
  //   const range = `E:E`;
  //   const res = await fetch(
  //     `${process.env.REACT_APP_GOOGLE_SHEET_API_BASE}/${process.env.REACT_APP_GOOGLE_SHEET_ID}/values/${range}?key=${process.env.REACT_APP_GOOGLE_API_KEY}`
  //   );

  //   const { values } = await res.json();
  //   console.log(values);
  // };

  return (
    <div className="App">
      <header>
        <Header
          changeSchoolYear={changeSchoolYear}
          schoolYear={schoolYear}
          changeSchoolType={changeSchoolType}
          schoolType={schoolType}
          changeIsPublic={changeIsPublic}
          isPublic={isPublic}
          changeSearchFieldValue={changeSearchFieldValue}
          searchFieldValue={searchFieldValue}
        />
      </header>
      <main>
        <AllColleges
          allColleges={allColleges}
          schoolYear={schoolYear}
          schoolType={schoolType}
          isPublic={isPublic}
        />
      </main>
    </div>
  );
}

export default App;
