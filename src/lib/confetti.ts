import confetti from "canvas-confetti";

const SCARF_COLORS = [
  "#e53935",
  "#1e88e5",
  "#fdd835",
  "#43a047",
  "#fb8c00",
  "#8e24aa",
  "#fbc02d",
];

export function burst(): void {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: SCARF_COLORS,
    disableForReducedMotion: true,
  });
}

export function shower(): void {
  confetti({
    particleCount: 140,
    spread: 120,
    startVelocity: 45,
    origin: { y: 0.5 },
    colors: SCARF_COLORS,
    disableForReducedMotion: true,
  });
  const interval = setInterval(() => {
    confetti({
      particleCount: 50,
      spread: 80,
      startVelocity: 55,
      origin: { x: Math.random(), y: Math.random() * 0.4 },
      colors: SCARF_COLORS,
      disableForReducedMotion: true,
    });
  }, 500);
  setTimeout(() => clearInterval(interval), 3000);
}
