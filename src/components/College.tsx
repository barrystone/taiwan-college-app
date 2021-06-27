import React, { useEffect, useState } from 'react';
import { Card, Button, Badge, ProgressBar } from 'react-bootstrap';

import collegeType1Image from '../assets/images/collegeType-2.svg';
import collegeType2Image from '../assets/images/collegeType-1.svg';

interface Props {
  data: Array<string>;
}

const College = ({ data }: Props) => {
  const [schoolImage, setSchoolImage] = useState('');

  const searchImage = async (schoolName: string) => {
    const res = await fetch(
      `${process.env.REACT_APP_GOOGLE_CUSTOMSEARCH_API_BASE}/?key=${process.env.REACT_APP_GOOGLE_API_KEY}&id=${process.env.REACT_APP_GOOGLE_CUSTOMSEARCH_ENGINE_ID}&searchType=image&q=${schoolName}`
    );

    const data = await res.json();

    if (data.items == null) {
      return;
    }
    const imageUrl = data.items[0].image.thumbnailLink;
    setSchoolImage(imageUrl);
  };
  useEffect(() => {
    // searchImage(data[4]);
    console.log((Number(data[7]) / (Number(data[7]) + 1)) * 100);
  }, []);

  return (
    <>
      <Card style={{ borderColor: 'black' }}>
        <div
          style={{
            height: '150px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {schoolImage ? (
            <Card.Img
              variant="top"
              src={schoolImage}
              style={{ maxHeight: '300px', width: 'auto' }}
            ></Card.Img>
          ) : (
            <Card.Img
              variant="top"
              src={
                data[2] === '一般大學' ? collegeType1Image : collegeType2Image
              }
              style={{ maxHeight: '100px', width: 'auto' }}
            ></Card.Img>
          )}
        </div>
        <Card.Body>
          <Card.Title>{data[4]}</Card.Title>
          <Card.Text>
            {data[2] === '一般大學' ? (
              <Badge variant="primary">一般大學</Badge>
            ) : data[2] === '技專校院' ? (
              <Badge variant="secondary">技專校院</Badge>
            ) : (
              <Badge variant="danger">宗教研修學院</Badge>
            )}{' '}
            {data[1] === '公立' ? (
              <Badge variant="success">公立</Badge>
            ) : (
              <Badge variant="info">私立</Badge>
            )}
            <br />
            <ProgressBar style={{ marginTop: '10px', marginBottom: '2px' }}>
              <ProgressBar
                // variant="dark"
                now={(Number(data[7]) / (Number(data[7]) + 1)) * 100}
                key={1}
                style={{ backgroundColor: '#b2bec3' }}
              />
              <ProgressBar
                // variant="warning"
                now={100 - (Number(data[7]) / (Number(data[7]) + 1)) * 100}
                key={2}
                style={{ backgroundColor: '#ff9ff3' }}
              />
            </ProgressBar>
            <p style={{ fontSize: '17px' }}>
              {((Number(data[7]) / (Number(data[7]) + 1)) * 100).toFixed(2)}{' '}
              <span style={{ fontSize: '12px' }}> %</span>
            </p>
          </Card.Text>
          <Button variant="warning">師生比</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default College;
