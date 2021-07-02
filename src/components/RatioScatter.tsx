import React from 'react';
import ReactECharts from 'echarts-for-react';

// Display icon of This college on scatter (I am using logo url).
const meSymbolUrl = `${window.location.origin}/static/media/logo.bca62d69.svg`;

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

  const othersData = formatRatioScatterData.others.map((x) => [
    Number(x[1]),
    Number(cutComma(x[2]))
  ]);

  const meData = [
    Number(formatRatioScatterData.me[1]),
    Number(cutComma(formatRatioScatterData.me[2]))
  ];

  const option = {
    title: {
      text: '學生數與師生比分佈圖(108年)',
      textStyle: {
        fontSize: 16,
        lineHeight: 35,
        fontFamily: 'monospace'
      },
      subtext: '資料來源: 政府資料開放平臺',
      subtextStyle: {
        width: '100px',
        align: 'center',
        fontSize: 5,
        lineHeight: 27
      },
      sublink: 'https://data.gov.tw/dataset/26219',
      subtarget: 'blank'
    },
    grid: {
      left: '0%',
      right: '5%',
      bottom: '18%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        scale: true,
        axisLabel: {
          formatter: '{value}%'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        scale: true,
        axisLabel: {
          formatter: '{value} 人'
        }
      }
    ],
    tooltip: {
      position: 'top',
      formatter: function (params: any) {
        console.log('params', params);
        const { value, seriesName, dataIndex } = params;
        const { me, others } = formatRatioScatterData;
        const name =
          seriesName === '平均值'
            ? '<span>台灣大專學院 平均值</span>'
            : seriesName === '我'
            ? me[0]
            : others[dataIndex][0];
        return (
          "<div style='display:flex; flex-direction:column; justify-content:center; align-items:center;'>" +
          "<div style='text-align:center; margin-bottom:10px;word-break:break-word;'><b>" +
          name +
          "</b></div><div style='text-align:left;'>" +
          '師生比： <b>' +
          value[0] +
          '</b> %' +
          '<br/>' +
          '學生數： <b>' +
          value[1] +
          '</b>人' +
          '</div></div>'
        );
      }
    },
    legend: {
      data: [
        '我',
        {
          name: '平均值',
          icon: 'circle'
        },
        '其他大學'
      ],
      right: 0,
      top: 35,
      textStyle: {
        fontSize: 10
      }
    },
    series: [
      {
        name: '其他大學',
        z: 1,
        symbolSize: 5,
        data: othersData,
        type: 'scatter',
        itemStyle: {
          color: '#bdc3c7'
        }
      },
      {
        name: '平均值',
        z: 2,
        symbol: 'pin',
        symbolSize: 17,
        data: [avgData],
        type: 'scatter',
        itemStyle: {
          color: '#7158e2'
        }
      },
      {
        name: '我',
        z: 3,
        symbolSize: 25,
        symbol: `image://${meSymbolUrl}`,
        data: [meData],
        type: 'scatter',
        itemStyle: {
          color: '#e67e22'
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
          paddingTop: '5%'
        }}
      />
    </div>
  );
};

export default RatioScatter;
