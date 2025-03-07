interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Avatar({
  name,
  size = "md",
  className = "",
}: AvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  // generate initials from the name
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  // generate a color based on the name
  const colors = [
    "bg-game-primary text-white",
    "bg-game-secondary text-game-dark",
    "bg-game-blue text-white",
    "bg-game-purple text-white",
  ];

  const colorIndex =
    name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    colors.length;
  const colorClass = colors[colorIndex];

  return (
    <div
      className={`${sizeClasses[size]} ${colorClass} ${className} flex items-center justify-center rounded-full font-semibold`}
    >
      {initials}
    </div>
  );
}
