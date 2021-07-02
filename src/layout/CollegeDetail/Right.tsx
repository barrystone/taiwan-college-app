import React from 'react';
import PieChart from '../../components/PieChart';

interface Props {
  collegeData: Array<string[]>;
  studentsAllYearsAvg: Array<string>;
  teachersAllYearsAvg: Array<string>;
}

const Right = ({
  collegeData,
  studentsAllYearsAvg,
  teachersAllYearsAvg
}: Props) => {
  const formatPieChartData = collegeData.map((yearCollegeData) => {
    const index: number =
      yearCollegeData[0] === '108'
        ? 0
        : yearCollegeData[0] === '107'
        ? 1
        : yearCollegeData[0] === '106'
        ? 2
        : -1;
    return [
      yearCollegeData[0],
      Number(yearCollegeData[5].replace(',', '')),
      Number(yearCollegeData[6]),
      {
        studentsAvg: Number(studentsAllYearsAvg[index]),
        teachersAvg: Number(teachersAllYearsAvg[index])
      }
    ];
  }) as any;

  return (
    <>
      <PieChart formatPieChartData={formatPieChartData} />
    </>
  );
};

export default Right;
