import React from 'react';
import ReactECharts from 'echarts-for-react';

interface Props {
  formatRatioScatterData: {
    avg: Array<string>;
    me: Array<string>;
    others: Array<string[]>;
  };
}

const RatioScatter = ({ formatRatioScatterData }: Props) => {
  const avgData = [
    Number(formatRatioScatterData.avg[0]),
    Number(formatRatioScatterData.avg[1])
  ];
  const cutComma = (x: string) => {
    return (x + '').replace(',', '');
  };

  const OthersData = formatRatioScatterData.others.map((x) => [
    Number(x[1]),
    Number(cutComma(x[2]))
  ]);

  const meData = [
    Number(formatRatioScatterData.me[1]),
    Number(cutComma(formatRatioScatterData.me[2]))
  ];

  console.log('avgData', avgData);
  console.log('meData', meData[1]);

  //   var CLUSTER_COUNT = 6;
  //   var DIENSIION_CLUSTER_INDEX = 2;
  //   var COLOR_ALL = [
  //     '#37A2DA',
  //     '#e06343',
  //     '#37a354',
  //     '#b55dba',
  //     '#b5bd48',
  //     '#8378EA',
  //     '#96BFFF'
  //   ];
  //   var pieces = [];
  //   for (var i = 0; i < CLUSTER_COUNT; i++) {
  //     pieces.push({
  //       value: i,
  //       label: 'cluster ' + i,
  //       color: COLOR_ALL[i]
  //     });
  //   }

  const option = {
    grid: {
      left: '0%',
      right: '5%',
      bottom: '18%',
      containLabel: true
    },
    xAxis: {
      //   scale: true
    },
    yAxis: {
      //   scale: true
    },
    tooltip: {
      position: 'top',
      formatter: function (params: any) {
        if (params.value.length > 1) {
          return (
            // params.value[0] +
            ' :<br/>' + params.value[0] + 'cm ' + params.value[1] + 'kg '
          );
        } else {
          return (
            params.seriesName +
            ' :<br/>' +
            params.name +
            ' : ' +
            params.value +
            'kg '
          );
        }
      }
    },
    series: [
      {
        name: 'others',
        symbolSize: 5,
        data: OthersData,
        type: 'scatter',

        itemStyle: {
          color: '#e67e22'
        }
      },
      {
        name: 'me',
        symbolSize: 5,
        data: [meData],
        type: 'scatter',
        itemStyle: {
          color: 'black'
        }
      },
      {
        name: 'avg',
        symbolSize: 5,
        data: [avgData],
        type: 'scatter',
        itemStyle: {
          //   color: 'red'
        }
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
          width: '100%',
          height: '100%',
          paddingTop: '10%'
        }}
      />
    </div>
  );
};

export default RatioScatter;
