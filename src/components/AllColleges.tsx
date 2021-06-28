import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import College from './College';

interface Props {
  allColleges: Array<string[]>;
  schoolYear: string;
  schoolType: string;
  isPublic: string;
}

const AllColleges = ({
  allColleges,
  schoolYear,
  schoolType,
  isPublic
}: Props) => {
  const [displayColleges, setDisplayColleges] = useState(allColleges);

  useEffect(() => {
    if (isPublic === 'all' && schoolType === 'all') {
      setDisplayColleges(allColleges.filter((e) => e[0] === schoolYear));
    } else if (isPublic === 'all' && schoolType !== 'all') {
      setDisplayColleges(
        allColleges
          .filter((e) => e[0] === schoolYear)
          .filter((e) => e[2] === schoolType)
      );
    } else if (isPublic !== 'all' && schoolType === 'all') {
      setDisplayColleges(
        allColleges
          .filter((e) => e[0] === schoolYear)
          .filter((e) => e[1] === isPublic)
      );
    } else {
      setDisplayColleges(
        allColleges
          .filter((e) => e[0] === schoolYear)
          .filter((e) => e[2] === schoolType)
          .filter((e) => e[1] === isPublic)
      );
    }
  }, [allColleges, schoolYear, isPublic, schoolType]);

  return (
    <>
      <Container fluid={true} style={{ marginTop: '20px' }}>
        <Row lg={5} md={3}>
          {displayColleges.map((college, idx) => (
            <Col key={idx} style={{ margin: '15px 0' }}>
              <College data={college} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default AllColleges;
