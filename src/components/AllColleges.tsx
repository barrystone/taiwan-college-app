import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import College from './College';

interface Props {
  allColleges: Array<string[]>;
  schoolYear: string;
  schoolType: string;
  isPublic: string;
  onSearchFieldValue: string;
}

const AllColleges = ({
  allColleges,
  schoolYear,
  schoolType,
  isPublic,
  onSearchFieldValue
}: Props) => {
  const [displayColleges, setDisplayColleges] = useState(allColleges);

  const filterAllColleges = () => {
    if (isPublic === 'all' && schoolType === 'all') {
      setDisplayColleges(
        allColleges
          .filter((e) => e[0] === schoolYear)
          .filter((e) => e[4].includes(onSearchFieldValue))
      );
    } else if (isPublic === 'all' && schoolType !== 'all') {
      setDisplayColleges(
        allColleges
          .filter((e) => e[0] === schoolYear)
          .filter((e) => e[2] === schoolType)
          .filter((e) => e[4].includes(onSearchFieldValue))
      );
    } else if (isPublic !== 'all' && schoolType === 'all') {
      setDisplayColleges(
        allColleges
          .filter((e) => e[0] === schoolYear)
          .filter((e) => e[1] === isPublic)
          .filter((e) => e[4].includes(onSearchFieldValue))
      );
    } else {
      setDisplayColleges(
        allColleges
          .filter((e) => e[0] === schoolYear)
          .filter((e) => e[2] === schoolType)
          .filter((e) => e[1] === isPublic)
          .filter((e) => e[4].includes(onSearchFieldValue))
      );
    }
  };

  useEffect(() => {
    filterAllColleges();
  }, [allColleges, schoolYear, isPublic, schoolType, onSearchFieldValue]);

  return (
    <>
      <Container fluid={true} style={{ marginTop: '20px' }}>
        <Row lg={5} md={3} sm={2} xs={1}>
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
