import React, { useState, useEffect } from 'react';

interface Props {
  allColleges: Array<string[]>;
  match: {
    params: {
      id: string;
    };
  };
}

const CollegeDetail = ({ match: { params }, allColleges }: Props) => {
  const { id } = params;
  const [collegeData, setCollegeData] = useState([]);
  const [latestCollegeData, setLatestCollegeData] = useState([]);
  const [latestName, setLatestName] = useState('');

  const getCollegeData = () => {
    const data: Array<string[]> = allColleges.filter((e) => e[3] === id);
    const name: string[] = data.slice(1).map((x) => x[4]);

    setLatestName(name as any);
    setCollegeData(data.reverse() as any);
    setLatestCollegeData(data.slice(-1)[0] as any);
  };

  useEffect(() => {
    getCollegeData();
  }, [allColleges, params]);

  return (
    <div>
      <h1>{latestName}</h1>

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
