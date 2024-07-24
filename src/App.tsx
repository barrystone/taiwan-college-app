import { useState, useEffect } from 'react';

import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
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
        <Switch>
          <Route
            exact
            path="/"
            component={(props: any) => <Home {...{ ...props, allColleges }} />}
          />
          <Route
            path="/detail/:id"
            component={(props: any) => (
              <CollegeDetail {...{ ...props, allColleges }} />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
