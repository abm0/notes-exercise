import React, { useState, useEffect, useCallback } from "react";
import cn from "classnames";

export type FretboardProps = {
  activeNoteIndex: number;
  proceedToNextNote: () => void;
};

// fretboard notes by index map
// TODO: calculate
const first = [2, 3, 9, 4, 10, 5, 11, 6, 0, 7, 1, 8, 2];
const second = [6, 0, 7, 1, 8, 2, 3, 9, 4, 10, 5, 11, 6];
const third = [4, 10, 5, 11, 6, 0, 7, 1, 8, 2, 3, 9, 4];
const fourth = [1, 8, 2, 3, 9, 4, 10, 5, 11, 6, 0, 7, 1];
const fifth = [5, 11, 6, 0, 7, 1, 8, 2, 3, 9, 4, 10, 5];
const sixth = [2, 3, 9, 4, 10, 5, 11, 6, 0, 7, 1, 8, 2];

const strings = [first, second, third, fourth, fifth, sixth];

export const Fretboard: React.FC<FretboardProps> = ({
  activeNoteIndex,
  proceedToNextNote,
}) => {
  const [correctNotesIndex, setCorrectNotesIndex] = useState<number[]>([]);
  const [wrongNotesIndex, setWrongNotesIndex] = useState<number[]>([]);
  const [inputBlocked, setInputBlocked] = useState<boolean>(false);

  useEffect(() => {
    setCorrectNotesIndex([]);
    setWrongNotesIndex([]);
  }, [activeNoteIndex]);

  const handleNoteClick = useCallback(
    (index: number) => {
      if (inputBlocked) return;

      if (activeNoteIndex === index) {
        setInputBlocked(true);
        setCorrectNotesIndex([...correctNotesIndex, index]);
        setTimeout(() => {
          setInputBlocked(false);
          proceedToNextNote();
        }, 1500);
        return;
      }

      setWrongNotesIndex([...wrongNotesIndex, index]);
    },
    [
      inputBlocked,
      activeNoteIndex,
      correctNotesIndex,
      wrongNotesIndex,
      setCorrectNotesIndex,
      setWrongNotesIndex,
      proceedToNextNote,
      setInputBlocked,
    ]
  );

  return (
    <div className="fretboard__container">
      <table className="fretboard__frets-table">
        {strings.map((notes, stringIndex) => (
          <tr key={`string-${stringIndex}`}>
            {notes.map((noteIndex, fretIndex) => (
              <td
                className="fretboard__fret"
                key={`fret-${stringIndex}-${fretIndex}`}
              >
                <div
                  className={cn("fretboard__fret-button", {
                    "fret-button_correct": correctNotesIndex.includes(
                      noteIndex
                    ),
                    "fret-button_wrong": wrongNotesIndex.includes(noteIndex),
                  })}
                  onClick={() => handleNoteClick(noteIndex)}
                />
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
};
