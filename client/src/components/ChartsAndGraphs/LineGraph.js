// LineChart.js
import React, { useEffect, useRef } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

function LineChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Check if dark mode is active
    const isDark = document.documentElement.classList.contains("dark");

    const root = am5.Root.new(chartRef.current);

    root.setThemes([am5themes_Animated.new(root)]);

    // Set background color manually
    root.container.set("background", am5.Rectangle.new(root, {
      fill: am5.color(isDark ? 0x1e1e2f : 0xffffff),
      fillOpacity: 1,
      cornerRadiusTL: 20,
      cornerRadiusTR: 20,
      cornerRadiusBL: 20,
      cornerRadiusBR: 20,
    }));

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0,
      })
    );

    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, { behavior: "none" }));
    cursor.lineY.set("visible", false);

    // Generate random data
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    let value = 100;

    function generateData() {
      value = Math.round((Math.random() * 10 - 5) + value);
      am5.time.add(date, "day", 1);
      return { date: date.getTime(), value };
    }

    function generateDatas(count) {
      const data = [];
      for (let i = 0; i < count; ++i) {
        data.push(generateData());
      }
      return data;
    }

    // Create axes
    const xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      maxDeviation: 0.2,
      baseInterval: {
        timeUnit: "day",
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, { minorGridEnabled: true }),
      tooltip: am5.Tooltip.new(root, {})
    }));

    const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, { pan: "zoom" })
    }));

    // Add series
    const series = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Series",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, { labelText: "{valueY}" })
    }));

    // Add scrollbar
    chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal" }));

    // Set data
    const data = generateDatas(1200);
    series.data.setAll(data);

    // Make stuff animate on load
    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div 
      ref={chartRef}
      className="w-full h-[500px] rounded-2xl overflow-hidden shadow-md bg-white dark:bg-[#1e1e2f]"
    />
  );
}

export default LineChart;
