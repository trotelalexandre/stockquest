"use client";

import type React from "react";

import { useState, useEffect } from "react";

interface WeightSliderProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

export default function WeightSlider({
  value,
  onChange,
  max = 100,
}: WeightSliderProps) {
  const [sliderValue, setSliderValue] = useState(value);

  // Update the slider when the external value changes
  useEffect(() => {
    setSliderValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseFloat(e.target.value);
    setSliderValue(newValue);
    onChange(newValue);
  };

  // Calculate color based on value
  const getGradient = () => {
    if (value < 10) return "linear-gradient(90deg, #2196F3, #03A9F4)"; // blue for low values
    if (value < 30) return "linear-gradient(90deg, #673AB7, #9C27B0)"; // purple for medium-low values
    if (value < 60) return "linear-gradient(90deg, #FFC107, #FFEB3B)"; // yellow for medium values
    return "linear-gradient(90deg, #4CAF50, #8BC34A)"; // green for high values
  };

  return (
    <div className="flex w-full items-center gap-3">
      <input
        type="range"
        min="0"
        max={max}
        step="0.1"
        value={sliderValue}
        onChange={handleChange}
        className="h-2 flex-1 cursor-pointer appearance-none rounded-lg"
        style={{
          background: `linear-gradient(to right, ${getGradient()} 0%, ${getGradient()} ${value}%, #e5e7eb ${value}%, #e5e7eb 100%)`,
          height: "6px",
          borderRadius: "3px",
        }}
      />
      <span className="w-12 rounded-md border border-gray-200 bg-gray-100 px-2 py-1 text-right text-xs font-semibold text-gray-700">
        {sliderValue.toFixed(1)}%
      </span>
    </div>
  );
}
