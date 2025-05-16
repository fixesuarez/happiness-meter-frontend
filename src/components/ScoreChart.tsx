import { DatasetInput } from "@/models/chart";
import { Chart } from "primereact/chart";

interface ChartProps {
  labels?: string[];
  datasets?: DatasetInput[];
}

export default function ScoreChart({ labels, datasets }: ChartProps) {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--text-color-secondary",
  );
  const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
  const data = {
    labels,
    datasets: datasets?.map((datasetInput) => ({
      ...datasetInput,
      fill: false,
    })),
  };
  const options = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    interactions: {
      mode: "x",
    },
    plugins: {
      tooltip: {
        mode: "x",
        intersect: false,
      },
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        min: 0,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
  return (
    <>
      <Chart type="line" data={data} options={options} />
    </>
  );
}
