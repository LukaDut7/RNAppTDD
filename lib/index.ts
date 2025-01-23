/*
return a random color in hex format
*/
export const generateRandomColor = () => {
  return `#${generateRandomHexString()}${generateRandomHexString()}${generateRandomHexString()}`;
}

/*
return a random hex number between 0 to 255 as string format 00 to FF
*/
const generateRandomHexString = () => {
  const value = Math.floor(Math.random() * 256).toString(16).toUpperCase();
  return value.length === 1 ? `0${value}` : value;
}

/**
 * Checks if the given value is a valid hex color
 */
export const isHexColor = (value: string) => {
  return /^#[A-Fa-f0-9]{6}$/.test(value);
}