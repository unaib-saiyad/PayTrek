import React, { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

function BarChart() {
  useEffect(() => {
    const root = am5.Root.new("chartdiv");

    const isDark = document.documentElement.classList.contains("dark");

    root.setThemes([am5themes_Animated.new(root)]);

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
        paddingRight: 1,
        layout: root.verticalLayout,
      })
    );

    chart.background.fill = '#000000'
    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    const xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 30,
      minorGridEnabled: true,
    });

    xRenderer.labels.template.setAll({
      rotation: -90,
      centerY: am5.p50,
      centerX: am5.p100,
      paddingRight: 15,
      fill: am5.color(isDark ? 0xffffff : 0x000000),
    });

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: "country",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, { strokeOpacity: 0.1 }),
      })
    );

    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        sequencedInterpolation: true,
        categoryXField: "country",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );

    series.columns.template.setAll({
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      strokeOpacity: 0,
      fill: am5.color(isDark ? 0x4f46e5 : 0x4ade80),
      stroke: am5.color(isDark ? 0x4f46e5 : 0x4ade80),
    });

    const data = [
      { country: "USA", value: 2025 },
      { country: "China", value: 1882 },
      { country: "Japan", value: 1809 },
      { country: "Germany", value: 1322 },
      { country: "UK", value: 1122 },
      { country: "France", value: 1114 },
      { country: "India", value: 984 },
      { country: "Spain", value: 711 },
      { country: "Netherlands", value: 665 },
      { country: "South Korea", value: 443 },
      { country: "Canada", value: 441 },
    ];

    xAxis.data.setAll(data);
    series.data.setAll(data);

    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div
      id="chartdiv"
      className="w-full h-[500px] rounded-2xl overflow-hidden shadow-md bg-white dark:bg-[#1e1e2f]"
    ></div>
  );
}

export default BarChart;
