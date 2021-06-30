import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

interface Props {
  formatPieChartData: Array<any[]>;
}

const PieChart = ({ formatPieChartData }: Props) => {
  console.log('pie formatPieChartData', formatPieChartData);

  const eChartsRef = React.useRef(null as any);
  const [option, setOption] = useState({});

  useEffect(() => {
    setOption(defaultOption);
  }, []);

  const latestYear = formatPieChartData.map((e) => e[0])[0];
  const defaultOption = {
    legend: {},
    tooltip: {
      trigger: 'axis'
      //   showContent: false
    },
    dataset: {
      source: [
        ['學年', ...formatPieChartData.map((e) => e[0] + ' 學年')],
        ['學生', ...formatPieChartData.map((e) => e[1])],
        ['老師', ...formatPieChartData.map((e) => e[2])]
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
      {
        name: '每校平均學生',
        type: 'line',
        data: formatPieChartData.map((e) => e[3].studentsAvg),
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        name: '每校平均老師',
        type: 'line',
        data: formatPieChartData.map((e) => e[3].teachersAvg),
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'pie',
        id: 'pie',
        radius: '35%',
        center: ['50%', '32%'],
        emphasis: { focus: 'data' },
        label: {
          formatter: `{b}: {@${latestYear + ' 學年'}} 人  ({d}%)`
        },
        encode: {
          itemName: '學年',
          value: latestYear + ' 學年',
          tooltip: latestYear + ' 學年'
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

  function onUpdateAxisPointer(event: any) {
    if (event.axesInfo[0]) {
      var dimensionValue = Number(event.axesInfo[0].value + 1);

      const option2 = {
        series: {
          id: 'pie',
          label: {
            formatter: '{b}: {@[' + dimensionValue + ']} 人 ({d}%)'
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
      ),
      {/* <div>Click Count: {count}</div> */}
    </>
  );
};

export default PieChart;
