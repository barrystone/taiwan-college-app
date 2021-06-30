import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';

interface Props {
  formatPieChartData: Array<string[]>;
}

const PieChart = ({ formatPieChartData }: Props) => {
  console.log('pie formatPieChartData', formatPieChartData);
  const latestYear = formatPieChartData.map((e) => e[0])[0];
  const option = {
    legend: {},
    tooltip: {
      trigger: 'axis',
      showContent: false
    },
    dataset: {
      source: [
        ['學年', ...formatPieChartData.map((e) => e[0])],
        ['學生數', ...formatPieChartData.map((e) => e[1])],
        ['老師數', ...formatPieChartData.map((e) => e[2])]
      ]
    },
    xAxis: { type: 'category' },
    yAxis: { gridIndex: 0 },
    grid: { top: '60%' },
    series: [
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      //   {
      //     type: 'line',
      //     smooth: true,
      //     seriesLayoutBy: 'row',
      //     emphasis: { focus: 'series' }
      //   },
      //   {
      //     type: 'line',
      //     smooth: true,
      //     seriesLayoutBy: 'row',
      //     emphasis: { focus: 'series' }
      //   },
      {
        type: 'pie',
        id: 'pie',
        radius: '35%',
        center: ['50%', '32%'],
        emphasis: { focus: 'data' },
        label: {
          formatter: `{b}: {@${latestYear}} ({d}%)`
        },
        encode: {
          itemName: '學年',
          value: latestYear,
          tooltip: latestYear
        }
      }
    ]
  };

  //   const [count, setCount] = useState(0);
  function onChartReady(echarts: any) {
    console.log('echarts is ready', echarts);
  }
  //   function onChartClick(param: any, echarts: any) {
  //     console.log(param, echarts);
  //     setCount(count + 1);
  //   }
  function onChartLegendselectchanged(param: any, echarts: any) {
    console.log(param, echarts);
  }
  const eChartsRef = React.useRef(null as any);

  function onUpdateAxisPointer(event: any) {
    if (event.axesInfo[0]) {
      var dimensionValue = Number(event.axesInfo[0].value + 1);

      const option2 = {
        series: {
          id: 'pie',
          label: {
            formatter: '{b}: {@[' + dimensionValue + ']} ({d}%)'
          },
          encode: {
            value: dimensionValue,
            tooltip: dimensionValue
          }
        }
      };

      if (eChartsRef && eChartsRef.current) {
        eChartsRef.current?.getEchartsInstance().setOption(option2);
      }
    }
  }

  return (
    <>
      <ReactECharts
        ref={eChartsRef}
        option={option}
        style={{ width: '80%', height: '90%', paddingTop: '5%' }}
        onChartReady={onChartReady}
        onEvents={{
          //   click: onChartClick,
          legendselectchanged: onChartLegendselectchanged,
          updateAxisPointer: onUpdateAxisPointer
        }}
      />
      {/* <div>Click Count: {count}</div> */}
    </>
  );
};

export default PieChart;
