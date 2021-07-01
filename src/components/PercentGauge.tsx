import React from 'react';
import ReactECharts from 'echarts-for-react';

interface Props {
  latestPercentage: string;
}

const PercentGauge = ({ latestPercentage }: Props) => {
  const option = {
    series: [
      {
        type: 'gauge',
        progress: {
          show: true,
          width: 13
        },
        itemStyle: {
          color: '#e67e22',
          // color: 'grey',
          shadowBlur: 2,
          shadowOffsetX: 1,
          shadowOffsetY: 1
        },
        axisLine: {
          lineStyle: {
            width: 2
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          length: 3,
          lineStyle: {
            width: 1,
            color: '#999'
          }
        },
        axisLabel: {
          distance: 5,
          color: '#7f8c8d',
          fontSize: 5
        },
        title: {
          show: false
        },
        detail: {
          valueAnimation: true,
          fontSize: 20,
          offsetCenter: [2, '110%'],
          formatter: function (value: number) {
            return value + '%';
          }
        },
        data: [
          {
            value: Number(latestPercentage)
          }
        ]
      }
    ]
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <ReactECharts
        option={option}
        style={{
          width: '90%',
          height: '90%',
          paddingTop: '10%'
        }}
      />
      <span style={{ marginLeft: '-2%', fontSize: '12px' }}>學生佔比</span>
    </div>
  );
};

export default PercentGauge;
