/**
 * Centralized Hardware Vibration controller mapping Mobile-first tactility.
 * Automatically fails securely across unequipped Desktop Web wrappers.
 */

export const triggerSuccess = () => {
    // Single light tactile bump tracking simple clicks
    if (navigator && navigator.vibrate) {
        navigator.vibrate(50);
    }
};

export const triggerHeavy = () => {
    // Dynamic sequential rhythm emphasizing major structural resolutions
    if (navigator && navigator.vibrate) {
        navigator.vibrate([50, 80, 50]);
    }
};

export const triggerError = () => {
    // Long harsh buzz 
    if (navigator && navigator.vibrate) {
        navigator.vibrate([150, 50, 150]);
    }
};
