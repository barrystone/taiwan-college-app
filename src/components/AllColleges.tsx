import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import College from './College';

interface Props {
  allColleges: Array<string[]>;
  schoolYear: string;
  schoolType: string;
  isPublic: string;
  sortPercent: string;
  onSearchFieldValue: string;
}

const AllColleges = ({
  allColleges,
  schoolYear,
  schoolType,
  isPublic,
  sortPercent,
  onSearchFieldValue
}: Props) => {
  const [displayColleges, setDisplayColleges] = useState(allColleges);

  const filterAllColleges = () => {
    if (isPublic === 'all' && schoolType === 'all') {
      setDisplayColleges(
        sortAllColleges(
          allColleges
            .filter((e) => e[0] === schoolYear)
            .filter((e) => e[4].includes(onSearchFieldValue))
        )
      );
    } else if (isPublic === 'all' && schoolType !== 'all') {
      setDisplayColleges(
        sortAllColleges(
          allColleges
            .filter((e) => e[0] === schoolYear)
            .filter((e) => e[2] === schoolType)
            .filter((e) => e[4].includes(onSearchFieldValue))
        )
      );
    } else if (isPublic !== 'all' && schoolType === 'all') {
      setDisplayColleges(
        sortAllColleges(
          allColleges
            .filter((e) => e[0] === schoolYear)
            .filter((e) => e[1] === isPublic)
            .filter((e) => e[4].includes(onSearchFieldValue))
        )
      );
    } else {
      setDisplayColleges(
        sortAllColleges(
          allColleges
            .filter((e) => e[0] === schoolYear)
            .filter((e) => e[2] === schoolType)
            .filter((e) => e[1] === isPublic)
            .filter((e) => e[4].includes(onSearchFieldValue))
        )
      );
    }
  };

  const sortAllColleges = (array: Array<string[]>) => {
    let sortedArray: Array<string[]> = [...array];
    if (sortPercent === 'inc') {
      sortedArray.map((e) => e.unshift(e[8]));
      sortedArray.sort();
      sortedArray.map((e) => e.shift());

      return sortedArray;
    } else if (sortPercent === 'dec') {
      sortedArray.map((e) => e.unshift(e[8]));
      sortedArray.sort().reverse();
      sortedArray.map((e) => e.shift());

      return sortedArray;
    } else {
      return sortedArray.sort();
    }
  };

  useEffect(() => {
    filterAllColleges();
  }, [
    allColleges,
    schoolYear,
    isPublic,
    schoolType,
    sortPercent,
    onSearchFieldValue
  ]);

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
