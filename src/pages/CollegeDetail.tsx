import { relative } from 'path';
import { Col, Row, Container, Badge } from 'react-bootstrap';
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
  const lastCollegeData = collegeData.slice(-1);
  const latestName = lastCollegeData.map((x) => x[4])[0];
  const latestPublicType = lastCollegeData.map((x) => x[1])[0];
  const latestSchoolType = lastCollegeData.map((x) => x[2])[0];
  const latestYear = lastCollegeData.map((x) => x[0])[0];
  const latestRatio = lastCollegeData.map((x) => x[7])[0];

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

  const studentsAllYearsAvg: Array<string> = [
    clacAvg('108', 'stu'),
    clacAvg('107', 'stu'),
    clacAvg('106', 'stu')
  ];
  const teachersAllYearsAvg: Array<string> = [
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

  const StutTch108Ratio = (
    Number(studentsAllYearsAvg[0]) / Number(teachersAllYearsAvg[0])
  ).toFixed(2);

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
            <Container
              style={{
                display: 'grid',
                flexDirection: 'column',
                gridTemplateRows: '1fr 1fr 1fr',
                height: '100%'
              }}
            >
              {/* style={{ backgroundColor: 'red' }} */}
              <Row
                style={
                  {
                    // backgroundColor: 'yellow'
                  }
                }
              ></Row>
              <Row
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative'
                  // backgroundColor: 'red',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: '25px',
                    top: '50px'
                    // height: '400px',
                    // backgroundColor: 'orange'
                  }}
                >
                  <h4>
                    {latestSchoolType === '宗教研修學院' ? (
                      <Badge variant="danger">宗教研修學院</Badge>
                    ) : latestSchoolType === '技專校院' ? (
                      <Badge variant="secondary">技專校院</Badge>
                    ) : (
                      <Badge variant="primary">一般大學</Badge>
                    )}{' '}
                  </h4>
                  <h4>
                    {latestPublicType === '私立' ? (
                      <Badge variant="info">私立</Badge>
                    ) : (
                      <Badge variant="success">公立</Badge>
                    )}
                  </h4>
                </div>
                <h1 style={{ maxWidth: '50%' }}>{latestName}</h1>
              </Row>
              <Row
                style={
                  {
                    // backgroundColor: 'green'
                  }
                }
              >
                <Col
                  style={{
                    position: 'relative'
                    // backgroundColor: 'purple'
                  }}
                >
                  <div style={{ position: 'absolute', left: '10%', top: '0%' }}>
                    <h5>
                      <Badge pill variant="danger">
                        {latestYear}
                      </Badge>{' '}
                    </h5>
                  </div>
                  <div
                    style={{ position: 'absolute', left: '15%', top: '20%' }}
                  >
                    <h2>
                      生師比 &nbsp;&nbsp;
                      <span style={{ fontSize: '40px' }}>
                        {latestRatio}
                      </span>{' '}
                      &nbsp; %
                    </h2>
                  </div>
                  <div
                    style={{ position: 'absolute', left: '20%', top: '60%' }}
                  >
                    <h6>
                      每校平均生師比 &nbsp;
                      <span style={{ fontSize: '20px' }}>
                        {StutTch108Ratio}
                      </span>
                      %&nbsp;<span style={{ fontSize: '13px' }}> (108年)</span>
                    </h6>
                  </div>
                </Col>
                <Col></Col>
              </Row>
            </Container>
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
