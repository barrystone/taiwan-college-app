import { Col, Row, Container } from 'react-bootstrap';

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

  const collegeData = allColleges.filter((e) => e[3] === id).reverse();
  const latestName = collegeData.slice(0, 1).map((x) => x[4]);
  const formatPieChartData = collegeData.map((e) => [
    e[0],
    Number(e[5].replace(',', '')),
    Number(e[6])
  ]) as any;

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
