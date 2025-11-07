/**
 * Sistema de sonidos para interacciones kid-friendly
 * Usa Web Audio API para generar sonidos sintéticos divertidos
 */

// Crear contexto de audio
let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
}

/**
 * Reproduce un sonido de "click" divertido
 */
export function playClickSound() {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Sonido tipo "pop" corto y agudo
    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  } catch (error) {
    // Silenciar errores de audio
    console.log('Audio not available');
  }
}

/**
 * Reproduce un sonido de "éxito" celebratorio
 */
export function playSuccessSound() {
  try {
    const ctx = getAudioContext();

    // Crear tres notas ascendentes para efecto "ta-da!"
    [0, 0.1, 0.2].forEach((delay, index) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
      oscillator.frequency.setValueAtTime(frequencies[index], ctx.currentTime + delay);

      gainNode.gain.setValueAtTime(0.2, ctx.currentTime + delay);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + 0.3);

      oscillator.start(ctx.currentTime + delay);
      oscillator.stop(ctx.currentTime + delay + 0.3);
    });
  } catch (error) {
    console.log('Audio not available');
  }
}

/**
 * Reproduce un sonido de "hover" sutil
 */
export function playHoverSound() {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(600, ctx.currentTime);

    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.05);
  } catch (error) {
    console.log('Audio not available');
  }
}

/**
 * Reproduce un sonido de "whoosh" para transiciones
 */
export function playWhooshSound() {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Sonido descendente rápido
    oscillator.frequency.setValueAtTime(1200, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.2);

    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.2);
  } catch (error) {
    console.log('Audio not available');
  }
}

/**
 * Hook para usar sonidos en componentes React
 */
export function useSounds() {
  return {
    playClick: playClickSound,
    playSuccess: playSuccessSound,
    playHover: playHoverSound,
    playWhoosh: playWhooshSound,
  };
}
