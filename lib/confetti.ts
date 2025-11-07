/**
 * Utilidades para efectos de confetti
 * Usa canvas-confetti para celebraciones visuales
 */

import confetti from 'canvas-confetti';

/**
 * Confetti básico desde el centro
 */
export function fireConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#FFD93D', '#FF9F1C', '#FF006E', '#C77DFF', '#06FFA5', '#4CC9F0'],
  });
}

/**
 * Confetti explosión grande para celebraciones importantes
 */
export function fireBigConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#FFD93D', '#FF9F1C', '#FF006E', '#C77DFF', '#06FFA5', '#4CC9F0'],
  };

  function fire(particleRatio: number, opts: any) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

/**
 * Confetti desde las esquinas (tipo fiesta)
 */
export function fireCornerConfetti() {
  const end = Date.now() + 1 * 1000; // 1 segundo
  const colors = ['#FFD93D', '#FF9F1C', '#FF006E', '#C77DFF', '#06FFA5', '#4CC9F0'];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });

    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

/**
 * Confetti al hacer click en un punto específico
 */
export function fireConfettiAt(x: number, y: number) {
  confetti({
    particleCount: 50,
    spread: 60,
    origin: {
      x: x / window.innerWidth,
      y: y / window.innerHeight,
    },
    colors: ['#FFD93D', '#FF9F1C', '#FF006E', '#C77DFF', '#06FFA5', '#4CC9F0'],
  });
}

/**
 * Estrellas flotantes (más suave para niños pequeños)
 */
export function fireStars() {
  const defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ['star'],
    colors: ['#FFD93D', '#FF9F1C', '#FF006E', '#C77DFF'],
  };

  confetti({
    ...defaults,
    particleCount: 40,
    scalar: 1.2,
  });

  confetti({
    ...defaults,
    particleCount: 20,
    scalar: 0.75,
  });
}

/**
 * Lluvia de emojis/símbolos
 */
export function fireEmojiRain(emoji: string = '🎨') {
  const scalar = 2;
  const shapes = confetti.shapeFromText({ text: emoji, scalar });

  confetti({
    shapes: shapes,
    particleCount: 30,
    spread: 100,
    origin: { y: 0.3 },
    scalar,
  });
}
