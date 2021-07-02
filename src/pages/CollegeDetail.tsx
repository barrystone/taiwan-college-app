import { Col, Row, Container, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import BackArrowIcon from '../assets/images/back-arrow.svg';

import PieChart from '../components/PieChart';
import PercentGauge from '../components/PercentGauge';
import RatioScatter from '../components/RatioScatter';

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
  const latestPercentage = lastCollegeData.map((x) => x[8])[0];
  const latestStuCount = lastCollegeData.map((x) => x[5])[0];

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

  // Return quota or rank of student-teacher ratio based on request.
  const stuTchLatestRatio = (req: string) => {
    let sortedArray: Array<string[]> = [
      ...allColleges.filter((e) => e[0] === latestYear)
    ];
    sortedArray.map((e) => e.unshift(e[8]));
    sortedArray.sort().reverse();
    sortedArray.map((e) => e.shift());
    if (req === 'quota') {
      return sortedArray.length;
    } else if (req === 'rank') {
      return sortedArray.indexOf(lastCollegeData[0]) + 1;
    }
  };

  const stuTch108RatioAvg = (
    Number(studentsAllYearsAvg[0]) / Number(teachersAllYearsAvg[0])
  ).toFixed(2);

  const formatRatioScatterData = {
    avg: [stuTch108RatioAvg, studentsAllYearsAvg[0]],
    me: [latestName, latestRatio, latestStuCount],
    others: allColleges
      .filter((e) => e[0] === '108')
      .filter((i) => i[4] !== latestName)
      .map((x) => [x[4], x[7], x[5]])
  };

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
                gridTemplateRows: '1fr .6fr 1fr',
                height: '100%'
              }}
            >
              {/* style={{ backgroundColor: 'red' }} */}
              <Row
                style={
                  {
                    // position: 'relative'
                    // backgroundColor: 'yellow'
                  }
                }
              ></Row>
              <Row
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative'
                  // backgroundColor: 'red'
                }}
              >
                <Col lg={3}>
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
                </Col>
                <Col lg={6}>
                  <h1>{latestName}</h1>
                </Col>
                <Col
                  lg={3}
                  style={{
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <PercentGauge latestPercentage={latestPercentage} />
                </Col>
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
                  <div
                    style={{ position: 'absolute', right: '10%', top: '10%' }}
                  >
                    <h5>
                      <Badge pill variant="danger">
                        {latestYear}年
                      </Badge>{' '}
                    </h5>
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      left: '15%',
                      top: '0%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <div
                      style={{
                        border: '1px solid grey',
                        padding: '1px',
                        borderRadius: '50%'
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '55px',
                          width: '55px',
                          border: '1px solid black',
                          borderRadius: '50%',
                          fontSize: '20px'
                        }}
                      >
                        {stuTchLatestRatio('rank')}{' '}
                        <span style={{ fontSize: '13px' }}>名</span>
                      </div>
                    </div>
                    <div style={{ marginTop: '-3px' }}>
                      <span style={{ fontSize: '10px' }}>
                        共{stuTchLatestRatio('quota')}所學校
                      </span>
                    </div>
                  </div>
                  <div
                    style={{ position: 'absolute', left: '22%', top: '38%' }}
                  >
                    <h3>
                      生師比 &nbsp;&nbsp;
                      <span style={{ fontSize: '40px' }}>
                        {latestRatio}
                      </span>{' '}
                      &nbsp; %
                    </h3>
                  </div>

                  <div
                    style={{ position: 'absolute', left: '20%', top: '70%' }}
                  >
                    <h6>
                      每校平均生師比 &nbsp;
                      <span style={{ fontSize: '20px' }}>
                        {stuTch108RatioAvg}
                      </span>
                      %&nbsp;<span style={{ fontSize: '13px' }}> (108年)</span>
                    </h6>
                  </div>
                </Col>
                <Col>
                  <RatioScatter
                    formatRatioScatterData={formatRatioScatterData}
                  />
                </Col>
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
