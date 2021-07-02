import React from 'react';
import { Col, Badge } from 'react-bootstrap';

import PercentGauge from '../../components/PercentGauge';

interface Props {
  lastCollegeData: Array<string[]>;
  latestName: string;
}

const LeftMid = ({ lastCollegeData, latestName }: Props) => {
  const latestPublicType = lastCollegeData.map((x) => x[1])[0];
  const latestSchoolType = lastCollegeData.map((x) => x[2])[0];
  const latestPercentage = lastCollegeData.map((x) => x[8])[0];

  return (
    <>
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
    </>
  );
};

export default LeftMid;
