import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import College from './College';

const AllColleges = () => {
  const [allColleges, setAllColeges] = useState([]);

  const getAllColleges = async () => {
    const range = `A:H`;
    const res = await fetch(
      `${process.env.REACT_APP_GOOGLE_SHEET_API_BASE}/${process.env.REACT_APP_GOOGLE_SHEET_ID}/values/${range}?key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    );

    const { values } = await res.json();
    setAllColeges(values);
    console.log(values);
  };

  useEffect(() => {
    getAllColleges();
  }, []);
  return (
    <>
      <Container fluid={true} style={{ marginTop: '20px' }}>
        <Row lg={5} md={3}>
          {allColleges.slice(1, 162).map((college, idx) => (
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
