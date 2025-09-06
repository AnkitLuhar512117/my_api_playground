// src/components/Avatar.jsx
export default function Avatar({ name = "?", size = 40 }) {
  const initials = (name || "?")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");

  const dim = typeof size === "number" ? `${size}px` : size;

  return (
    <div
      style={{ width: dim, height: dim }}
      className="flex items-center justify-center rounded-full bg-indigo-600 text-white font-semibold shadow"
    >
      {initials || "?"}
    </div>
  );
}
