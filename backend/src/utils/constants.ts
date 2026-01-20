// Character sets for different conversion types
export const CHARACTER_SETS = {
  ascii: {
    basic: '@%#*+=-:. ',
    special: '@%#*+=-:;^~`\'",.<>?/\\|!()[]{}$&',
    extended: '@%#*+=-:;^~`\'",.<>?/\\|!()[]{}$&@#$%^&*()_+-=[]{}|;:,.<>?'
  },
  alphanumeric: {
    basic: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
    special: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,.<>?',
    extended: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,.<>?/\\~`\'"'
  },
  binary: {
    basic: '01 ',
    special: '01 ',
    extended: '01 '
  }
};

export interface ConversionOptions {
  type: 'ascii' | 'alphanumeric' | 'binary';
  width: number;
  includeSpecial: boolean;
  includeExtended: boolean;
  contrast: number;
}

// Get pixel brightness using luminosity method
export function getPixelBrightness(r: number, g: number, b: number): number {
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

// Get character based on brightness value
export function getCharsetForBrightness(brightness: number, charset: string): string {
  const index = Math.round(brightness * (charset.length - 1));
  return charset[Math.max(0, Math.min(index, charset.length - 1))];
}

// Get appropriate character set based on options
export function getCharset(type: string, includeSpecial: boolean, includeExtended: boolean): string {
  const sets = CHARACTER_SETS as any;
  
  if (!sets[type]) {
    type = 'ascii';
  }

  if (includeExtended) {
    return sets[type].extended;
  } else if (includeSpecial) {
    return sets[type].special;
  } else {
    return sets[type].basic;
  }
}
