"use client";

import { usePortfolio } from "@/providers/portfolio-provider";
import { useEffect, useRef } from "react";

// Generate a color palette for the pie chart
const COLORS = [
  "#2E7D32", // green
  "#F9A825", // gold
  "#D32F2F", // red
  "#1976D2", // blue
  "#5E35B1", // purple
  "#FF9800", // orange
  "#00ACC1", // teal
  "#E91E63", // pink
  "#8D6E63", // brown
  "#546E7A", // blue-gray
];

export default function PortfolioChart() {
  const { portfolio } = usePortfolio();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // filter out stocks with zero weight
  const filteredPortfolio = portfolio?.filter((stock) => stock.weight > 0);

  useEffect(() => {
    if (
      !canvasRef.current ||
      !containerRef.current ||
      filteredPortfolio?.length === 0
    )
      return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // set canvas size to match container with proper pixel ratio
    const rect = container.getBoundingClientRect();
    const size = Math.min(rect.width, rect.height);
    const dpr = window.devicePixelRatio || 1;

    // set display size (css pixels)
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    // set actual size in memory (scaled for retina)
    canvas.width = size * dpr;
    canvas.height = size * dpr;

    // scale all drawing operations by the dpr
    ctx.scale(dpr, dpr);

    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // set up the pie chart
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = Math.min(centerX, centerY) * 0.8;

    // draw the pie chart
    let startAngle = 0;
    filteredPortfolio?.forEach((stock, index) => {
      const sliceAngle = (stock.weight / 100) * 2 * Math.PI;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();

      ctx.fillStyle = COLORS[index % COLORS.length];
      ctx.fill();

      // add a white border between slices
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#FFFFFF";
      ctx.stroke();

      // draw label if slice is big enough
      if (stock.weight > 8) {
        // increased threshold for smaller chart
        const labelAngle = startAngle + sliceAngle / 2;
        const labelRadius = radius * 0.7;
        const labelX = centerX + Math.cos(labelAngle) * labelRadius;
        const labelY = centerY + Math.sin(labelAngle) * labelRadius;

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 11px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(stock.ticker, labelX, labelY);
      }

      startAngle += sliceAngle;
    });

    // draw center circle (optional - for donut chart effect)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.4, 0, 2 * Math.PI);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#F5F5F5";
    ctx.stroke();

    // draw total in center
    ctx.fillStyle = "#333333";
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Portfolio", centerX, centerY - 8);
    ctx.font = "12px sans-serif";
    ctx.fillText("Allocation", centerX, centerY + 8);

    // draw legend
    const legendX = 10;
    let legendY = size - (filteredPortfolio?.length ?? 0) * 18 - 10;

    ctx.font = "10px sans-serif";
    filteredPortfolio?.forEach((stock, index) => {
      const color = COLORS[index % COLORS.length];

      // draw color box
      ctx.fillStyle = color;
      ctx.fillRect(legendX, legendY - 7, 10, 10);

      // add border
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "#FFFFFF";
      ctx.strokeRect(legendX, legendY - 7, 10, 10);

      // draw label
      ctx.fillStyle = "#333333";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(
        `${stock.ticker} (${stock.weight.toFixed(1)}%)`,
        legendX + 16,
        legendY,
      );

      legendY += 18;
    });
  }, [filteredPortfolio]);

  return (
    <div
      ref={containerRef}
      className="flex h-full w-full items-center justify-center"
    >
      <canvas ref={canvasRef} className="max-h-full max-w-full" />
    </div>
  );
}
