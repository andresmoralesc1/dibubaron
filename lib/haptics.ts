// Haptic feedback utilities for mobile devices

export const vibrate = (pattern: number | number[]) => {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};

export const lightVibration = () => {
  vibrate(10);
};

export const mediumVibration = () => {
  vibrate(20);
};

export const heavyVibration = () => {
  vibrate(30);
};

export const successVibration = () => {
  vibrate([10, 50, 10]);
};

export const errorVibration = () => {
  vibrate([20, 100, 20]);
};
