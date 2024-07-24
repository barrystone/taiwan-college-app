import { useState, useEffect } from 'react';

import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './pages/Home';
import CollegeDetail from './pages/CollegeDetail';

function App() {
  const [allColleges, setAllColeges] = useState([]);

  useEffect(() => {
    const getAllColleges = async () => {
      const range = `A:I`;
      const res = await fetch(
        `${process.env.REACT_APP_GOOGLE_SHEET_API_BASE}/${process.env.REACT_APP_GOOGLE_SHEET_ID}/values/${range}?key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      );
      const { values } = await res.json();
      setAllColeges(values);
    };

    getAllColleges();
  }, [setAllColeges]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home allColleges={allColleges} />} />
          <Route
            path="/detail/:id"
            element={<CollegeDetail allColleges={allColleges} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
