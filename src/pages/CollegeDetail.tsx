import useWindowSize from '../hooks/useWindowSize';
import { Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BackArrowIcon from '../assets/images/back-arrow.svg';

import LeftTop from '../layout/CollegeDetail/LeftTop';
import LeftMid from '../layout/CollegeDetail/LeftMid';
import LeftBottom from '../layout/CollegeDetail/LeftBottom';
import Right from '../layout/CollegeDetail/Right';
import { useParams } from 'react-router-dom';

interface Props {
  allColleges: Array<string[]>;
}

const CollegeDetail = ({ allColleges }: Props) => {
  const { id } = useParams<{ id: string }>();

  const collegeData = allColleges.filter((e) => e[3] === id);
  const lastCollegeData = collegeData.slice(-1);
  const latestName = lastCollegeData.map((x) => x[4])[0];

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
    clacAvg('106', 'stu'),
  ];
  const teachersAllYearsAvg: Array<string> = [
    clacAvg('108', 'tch'),
    clacAvg('107', 'tch'),
    clacAvg('106', 'tch'),
  ];

  const size = useWindowSize();
  const bottomPartFlexDirection = (size.width as any) < 1100 ? 'column' : 'row';

  return (
    <>
      <Container
        style={{
          maxWidth: '100%',
          height: '100vh',
        }}
      >
        <Row>
          <Col
            style={{
              height: '100vh',
              padding: '0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRight: '1px solid black',
            }}
          >
            <Link to="/">
              <img
                src={BackArrowIcon}
                alt="back-icon"
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  zIndex: 2,
                }}
              />
            </Link>
            <Container
              style={{
                display: 'grid',
                flexDirection: 'column',
                gridTemplateRows: '.8fr .6fr 1fr',
                height: '100%',
              }}
            >
              <Row>
                <LeftTop />
              </Row>
              <Row
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                <LeftMid
                  lastCollegeData={lastCollegeData}
                  latestName={latestName}
                />
              </Row>
              <Row
                style={{
                  flexDirection: bottomPartFlexDirection,
                }}
              >
                <LeftBottom
                  allColleges={allColleges}
                  lastCollegeData={lastCollegeData}
                  latestName={latestName}
                  studentsLatestYearsAvg={studentsAllYearsAvg[0]}
                  teachersLatestYearsAvg={teachersAllYearsAvg[0]}
                />
              </Row>
            </Container>
          </Col>
          <Col
            style={{
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Right
              collegeData={collegeData}
              studentsAllYearsAvg={studentsAllYearsAvg}
              teachersAllYearsAvg={teachersAllYearsAvg}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CollegeDetail;
