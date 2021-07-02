import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Badge, ProgressBar } from 'react-bootstrap';

import collegeType1Image from '../assets/images/collegeType-1.svg';
import collegeType2Image from '../assets/images/collegeType-2.svg';
import collegeType3Image from '../assets/images/collegeType-3.svg';
import medal1 from '../assets/images/medal-1.svg';
import medal2 from '../assets/images/medal-2.svg';
import medal3 from '../assets/images/medal-3.svg';

interface Props {
  data: Array<string>;
  rank: number;
}

const College = ({ data, rank }: Props) => {
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
          <div>
            {rank ? (
              rank <= 3 ? (
                <img
                  src={rank === 1 ? medal1 : rank === 2 ? medal2 : medal3}
                  alt={rank === 1 ? 'first' : rank === 2 ? 'second' : 'third'}
                  style={{
                    position: 'absolute',
                    height: '60px',
                    left: '5px',
                    top: '8px'
                  }}
                />
              ) : (
                <span
                  style={{
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '40px',
                    width: '40px',
                    left: '10px',
                    top: '10px',
                    fontSize: '18px',
                    border: '1px black solid',
                    borderRadius: '50%'
                  }}
                >
                  {rank}
                </span>
              )
            ) : (
              ''
            )}
          </div>
          <Card.Img
            variant="top"
            src={
              data[2] === '一般大學'
                ? collegeType1Image
                : data[2] === '技專校院'
                ? collegeType2Image
                : collegeType3Image
            }
            style={{ maxHeight: '100px', width: 'auto' }}
          ></Card.Img>
        </div>
        <Card.Body>
          <Card.Title>{data[4]}</Card.Title>
          <Card.Text>
            <Badge pill variant="danger">
              {data[0]}
            </Badge>{' '}
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
            <ProgressBar
              style={{
                marginTop: '12px',
                marginBottom: '10px',
                height: '12px'
              }}
            >
              <ProgressBar
                now={Number(data[8])}
                key={1}
                style={{
                  backgroundColor: '#e67e22',
                  fontSize: '10px'
                }}
                label={'學生'}
              />
              <ProgressBar
                now={100 - Number(data[8])}
                key={2}
                style={{ backgroundColor: '#bdc3c7' }}
              />
            </ProgressBar>
            <p style={{ fontSize: '20px' }}>
              {Number(data[8])} <span style={{ fontSize: '12px' }}> %</span>
            </p>
          </Card.Text>
          <Link to={`detail/${data[3]}`}>
            <Button
              variant="warning"
              style={{
                backgroundColor: '#f7b731',
                border: '1px solid grey'
              }}
            >
              生師比
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default College;
