import React, { useState, useEffect } from 'react';

import Header from '../layout/Header';
import AllColleges from '../components/AllColleges';
import topIcon from '../assets/images/top-arrow.svg';

interface Props {
  allColleges: Array<string[]>;
}

const Home = ({ allColleges }: Props) => {
  const [schoolYear, setSchoolYear] = useState('108');
  const [isPublic, setIsPublic] = useState('all');
  const [schoolType, setSchoolType] = useState('all');
  const [sortPercent, setSortPercent] = useState('no');
  const [onSearchFieldValue, setOnSearchFieldValue] = useState('');
  const [afterFileterLength, setAfterFileterLength] = useState(0);

  const changeSchoolYear = (x: string) => {
    setSchoolYear(x);
  };
  const changeSchoolType = (x: string) => {
    setSchoolType(x);
  };
  const changeIsPublic = (x: string) => {
    setIsPublic(x);
  };
  const changeSortPercent = (x: string) => {
    setSortPercent(x);
  };
  const changeOnSearchFieldValue = (x: string) => {
    setOnSearchFieldValue(x);
  };

  const changeAfterFileterLength = (x: Array<string[]>) => {
    setAfterFileterLength(x.length);
  };

  const cleanSelectState = () => {
    setSchoolYear('108');
    setSchoolType('all');
    setIsPublic('all');
    setOnSearchFieldValue('');
    // setSortPercent('no');
  };

  return (
    <>
      <Header
        changeSchoolYear={changeSchoolYear}
        schoolYear={schoolYear}
        changeSchoolType={changeSchoolType}
        schoolType={schoolType}
        changeIsPublic={changeIsPublic}
        isPublic={isPublic}
        changeSortPercent={changeSortPercent}
        sortPercent={sortPercent}
        changeOnSearchFieldValue={changeOnSearchFieldValue}
        afterFileterLength={afterFileterLength}
        cleanSelectState={cleanSelectState}
      />
      <main>
        <AllColleges
          allColleges={allColleges}
          schoolYear={schoolYear}
          schoolType={schoolType}
          isPublic={isPublic}
          sortPercent={sortPercent}
          onSearchFieldValue={onSearchFieldValue}
          changeAfterFileterLength={changeAfterFileterLength}
        />
      </main>
      <a href="#">
        <div className="home__backtotop">
          <img src={topIcon} alt="top-icon" className="home__backtotop-icon" />
        </div>
      </a>
    </>
  );
};

export default Home;
