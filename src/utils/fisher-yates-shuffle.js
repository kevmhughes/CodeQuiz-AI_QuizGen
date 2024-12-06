// This algorithm ensures that each permutation of the array is equally likely.
export const fisherYatesShuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
  }
  return arr; // Ensure the shuffled array is returned
};
