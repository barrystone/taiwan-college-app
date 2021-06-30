import { Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import BackArrowIcon from '../assets/images/back-arrow.svg';

import PieChart from '../components/PieChart';

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

  const collegeData = allColleges.filter((e) => e[3] === id);
  const latestName = collegeData.slice(-1).map((x) => x[4]);

  // Calculate average all of students or teacher (country) base on year.
  const clacAvg = (year: string, stuOrTch: string) => {
    let indexOfData: number;
    if (stuOrTch === 'stu') {
      indexOfData = 5;
    } else if (stuOrTch === 'tch') {
      indexOfData = 6;
    }
    const whichYearData = allColleges.filter((e) => e[0] === year);
    const CountArray = whichYearData.map((x) =>
      Number(x[indexOfData].replace(',', ''))
    );
    const Avg = (
      [0, ...CountArray].reduce((acc, cur) => acc + cur) / whichYearData.length
    ).toFixed(1);

    return Avg;
  };

  const studentsAllYearsAvg = [
    clacAvg('108', 'stu'),
    clacAvg('107', 'stu'),
    clacAvg('106', 'stu')
  ];
  const teachersAllYearsAvg = [
    clacAvg('108', 'tch'),
    clacAvg('107', 'tch'),
    clacAvg('106', 'tch')
  ];

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
      <Container
        style={{
          maxWidth: '100%',
          height: '100vh'
        }}
      >
        <Row>
          <Col
            style={{
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRight: '1px solid black'
            }}
          >
            <Link to="/">
              <img
                src={BackArrowIcon}
                alt="back-icon"
                style={{ position: 'absolute', top: '20px', left: '20px' }}
              />
            </Link>

            <div style={{}}>
              <h1>{latestName}</h1>
            </div>
          </Col>
          <Col
            style={{
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <PieChart formatPieChartData={formatPieChartData} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CollegeDetail;
