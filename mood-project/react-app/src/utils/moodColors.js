// Moodlist colors. `value` is what the database stores; "black" has always
// rendered as amber, so it keeps that value for existing moodlists.
export const MOOD_COLORS = [
  { value: "red", label: "Coral", from: "#f96365", to: "#c2375e" },
  { value: "black", label: "Amber", from: "#f8a43a", to: "#e0582b" },
  { value: "green", label: "Green", from: "#90be6d", to: "#3f8f5f" },
  { value: "blue", label: "Ocean", from: "#3a9cc6", to: "#1d4e89" },
  { value: "purple", label: "Violet", from: "#a066d3", to: "#4b2a8a" },
  { value: "brown", label: "Earth", from: "#c08b5c", to: "#6b4a2f" },
];

export const getMoodColor = (value) =>
  MOOD_COLORS.find((color) => color.value === value) || MOOD_COLORS[0];

// CSS variables consumed by .mood-gradient and friends
export const moodStyle = (value) => {
  const { from, to } = getMoodColor(value);
  return { "--mood-from": from, "--mood-to": to };
};
