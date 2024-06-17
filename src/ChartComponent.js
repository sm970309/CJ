// src/ChartComponent.js

import React, { useEffect, useState, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";

// Chart.js 구성 요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = () => {
  const [data, setData] = useState({});
  const [labels, setLabels] = useState([]);
  const navigate = useNavigate();
  const targetAmount = 50000; // 목표 금액
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectRef = doc(db, "projects", "projectData");
        const docSnap = await getDoc(projectRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const sortedLabels = Object.keys(data).sort(); // 컬럼 이름 정렬
          setData(data);
          setLabels(sortedLabels);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const colors = [
    "rgba(75, 192, 192, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 206, 86, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 159, 64, 0.6)",
  ];
  const borderColors = [
    "rgba(75, 192, 192, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
  ];

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "플로잉 현황",
        data: labels.map((label) => data[label]),
        backgroundColor: labels.map(
          (_, index) => colors[index % colors.length]
        ),
        borderColor: labels.map(
          (_, index) => borderColors[index % borderColors.length]
        ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: targetAmount, // 최대값 설정
        ticks: {
          callback: function (value) {
            return value.toLocaleString(); // 값 형식 설정
          },
        },
        title: {
          display: true,
        },
      },
      x: {
        ticks: {
          font: {
            size: 16, // x축 글자 크기 설정
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const amount = data[labels[context.dataIndex]];
            return ` ${amount.toLocaleString()} / ${targetAmount.toLocaleString()}`;
          },
        },
      },
    },
  };

  const handleSupportClick = (project) => {
    const currentAmount = data[project];
    navigate(`/support?project=${project}&amount=${currentAmount}`);
  };

  return (
    <div style={{ width: "70%", height: "400px", margin: "0 auto" }}>
      <h2>플로잉 현황</h2>
      <Bar ref={chartRef} data={chartData} options={options} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        {labels.map((project) => (
          <button
            key={project}
            onClick={() => handleSupportClick(project)}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              margin: "10px",
            }}
          >
            {project} 플로잉
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChartComponent;
