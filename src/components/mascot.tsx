interface MascotProps {
  emotion?: "happy" | "thinking" | "excited" | "sad";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Mascot({
  emotion = "happy",
  size = "md",
  className = "",
}: MascotProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
  };

  const emotionColors = {
    happy: "bg-game-primary",
    thinking: "bg-game-blue",
    excited: "bg-game-secondary",
    sad: "bg-game-accent",
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <div
        className={`absolute inset-0 rounded-full ${emotionColors[emotion]} flex items-center justify-center font-bold text-white`}
      >
        {emotion === "happy" && "😊"}
        {emotion === "thinking" && "🤔"}
        {emotion === "excited" && "🎉"}
        {emotion === "sad" && "😢"}
      </div>
    </div>
  );
}
