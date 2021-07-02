import React from 'react';
import useWindowSize from '../../hooks/useWindowSize';
import { Col, Badge } from 'react-bootstrap';

import RatioScatter from '../RatioScatter';

interface Props {
  allColleges: Array<string[]>;
  lastCollegeData: Array<string[]>;
  latestName: string;
  studentsLatestYearsAvg: string;
  teachersLatestYearsAvg: string;
}

const LeftBottom = ({
  allColleges,
  lastCollegeData,
  latestName,
  studentsLatestYearsAvg,
  teachersLatestYearsAvg
}: Props) => {
  const latestYear = lastCollegeData.map((x) => x[0])[0];
  const latestRatio = lastCollegeData.map((x) => x[7])[0];
  const latestStuCount = lastCollegeData.map((x) => x[5])[0];

  // Return quota or rank of student-teacher ratio based on request.
  const stuTchLatestRatio = (req: string) => {
    let sortedArray: Array<string[]> = [
      ...allColleges.filter((e) => e[0] === latestYear)
    ];
    sortedArray.map((e) => e.unshift(e[8]));
    sortedArray.sort().reverse();
    sortedArray.map((e) => e.shift());
    if (req === 'quota') {
      return sortedArray.length;
    } else if (req === 'rank') {
      return sortedArray.indexOf(lastCollegeData[0]) + 1;
    }
  };

  const stuTch108RatioAvg = (
    Number(studentsLatestYearsAvg) / Number(teachersLatestYearsAvg)
  ).toFixed(2);

  const formatRatioScatterData = {
    avg: [stuTch108RatioAvg, studentsLatestYearsAvg],
    me: [latestName, latestRatio, latestStuCount],
    others: allColleges
      .filter((e) => e[0] === '108')
      .filter((i) => i[4] !== latestName)
      .map((x) => [x[4], x[7], x[5]])
  };

  const size = useWindowSize();

  const buttomPartRatioScatterColLg = (size.width as any) < 1100 ? 12 : 6;

  return (
    <>
      <Col
        style={{
          position: 'relative'
        }}
      >
        <div style={{ position: 'absolute', right: '10%', top: '10%' }}>
          <h5>
            <Badge pill variant="danger">
              {latestYear}年
            </Badge>{' '}
          </h5>
        </div>
        <div
          style={{
            position: 'absolute',
            left: '15%',
            top: '0%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div
            style={{
              border: '1px solid grey',
              padding: '1px',
              borderRadius: '50%'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '55px',
                width: '55px',
                border: '1px solid black',
                borderRadius: '50%',
                fontSize: '20px'
              }}
            >
              {stuTchLatestRatio('rank')}{' '}
              <span style={{ fontSize: '13px' }}>名</span>
            </div>
          </div>
          <div style={{ marginTop: '-3px' }}>
            <span style={{ fontSize: '10px' }}>
              共{stuTchLatestRatio('quota')}所學校
            </span>
          </div>
        </div>
        <div style={{ position: 'absolute', left: '22%', top: '38%' }}>
          <h3>
            生師比 &nbsp;&nbsp;
            <span style={{ fontSize: '40px' }}>{latestRatio}</span> &nbsp; %
          </h3>
        </div>

        <div style={{ position: 'absolute', left: '20%', top: '70%' }}>
          <h6>
            每校平均生師比 &nbsp;
            <span style={{ fontSize: '20px' }}>{stuTch108RatioAvg}</span>
            %&nbsp;<span style={{ fontSize: '13px' }}> (108年)</span>
          </h6>
        </div>
      </Col>
      <Col lg={buttomPartRatioScatterColLg}>
        <RatioScatter formatRatioScatterData={formatRatioScatterData} />
      </Col>
    </>
  );
};

export default LeftBottom;
