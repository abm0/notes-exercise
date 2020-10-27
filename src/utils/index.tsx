const randomizeIndex = (array: string[]) =>
  Math.floor(Math.random() * array.length);

export const getRandomItemIndex = (
  array: string[],
  previousNoteIndex?: number
): number => {
  let nextNoteIndex = randomizeIndex(array);

  while (nextNoteIndex === previousNoteIndex) {
    nextNoteIndex = randomizeIndex(array);
  }

  return nextNoteIndex;
};
