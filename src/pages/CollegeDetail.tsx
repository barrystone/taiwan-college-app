import React, { useState, useEffect } from 'react';

interface Props {
  match: {
    params: {
      id: string;
    };
  };
}

const CollegeDetail = ({ match: { params } }: Props) => {
  const { id } = params;
  const [collegeData, setCollegeData] = useState([]);
  const [collegeName, setCollegeName] = useState('');

  const getCollegeData = async () => {
    const range = `A:I`;
    const res = await fetch(
      `${process.env.REACT_APP_GOOGLE_SHEET_API_BASE}/${process.env.REACT_APP_GOOGLE_SHEET_ID}/values/${range}?key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    );
    const { values } = await res.json();
    const data = values.filter((e: any) => e[3] === id);

    setCollegeName(data.slice(-1)[0][4]);
    setCollegeData(data.reverse());
  };

  useEffect(() => {
    getCollegeData();
  }, []);

  return (
    <div>
      <h1>{collegeName}</h1>
      {collegeData.map((year) => (
        <div>
          學年：{year[0]} &nbsp;&nbsp; 日間學制學生數: {year[5]} &nbsp;&nbsp;
          日間專任教師(含助教): {year[6]} &nbsp;&nbsp; 生師比： {year[7]}{' '}
          &nbsp;&nbsp; 學生佔比 {year[8]}
        </div>
      ))}
    </div>
  );
};

export default CollegeDetail;
