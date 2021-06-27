import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Container, Badge } from 'react-bootstrap';

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

  const [picture, setPicture] = useState('');
  const searchImage = async (schoolName: string) => {
    const res = await fetch(
      `${process.env.REACT_APP_GOOGLE_CUSTOMSEARCH_API_BASE}/?key=${process.env.REACT_APP_GOOGLE_API_KEY}&id=${process.env.REACT_APP_GOOGLE_CUSTOMSEARCH_ENGINE_ID}&searchType=image&q=${schoolName}`
    );
    const data = await res.json();

    const imageUrl = data.items[0].image.thumbnailLink;
    setPicture(imageUrl);
  };

  useEffect(() => {
    getAllColleges();
    // searchImage('國立交通大學');
  }, []);
  return (
    <>
      <Container fluid={true} style={{ marginTop: '20px' }}>
        <Row lg={5} md={3}>
          {allColleges.slice(1, 162).map((college, idx) => {
            return (
              <Col key={idx} style={{ margin: '15px 0' }}>
                <Card>
                  <Card.Img variant="top" src={picture} />

                  <Card.Body>
                    <Card.Title>{college[4]}</Card.Title>
                    <Card.Text>
                      {college[2] === '一般大學' ? (
                        <Badge variant="primary">一般大學</Badge>
                      ) : college[2] === '技專校院' ? (
                        <Badge variant="secondary">技專校院</Badge>
                      ) : (
                        <Badge variant="dark">宗教研修學院</Badge>
                      )}{' '}
                      {college[1] === '公立' ? (
                        <Badge variant="success">公立</Badge>
                      ) : (
                        <Badge variant="info">私立</Badge>
                      )}
                    </Card.Text>
                    <Button variant="warning">師生比</Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default AllColleges;
