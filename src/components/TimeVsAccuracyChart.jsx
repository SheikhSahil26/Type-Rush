// TimeVsAccuracyChart.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Example data


const TimeVsAccuracyChart = (props) => {

  console.log("type accuracy is ",props.typeAccuracyHistory)

  const timeAccuracyMap=new Map();

  
const data = props.typeAccuracyHistory.map((accuracy, index) => ({
  time: index + 1,  // Time starts from 1
  accuracy: accuracy
}));



  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            label={{ value: "Time (seconds)", position: "insideBottomRight", offset: 0 }}
          />
          <YAxis
            label={{ value: "Accuracy (%)", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="accuracy" stroke="#00b894" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeVsAccuracyChart;
