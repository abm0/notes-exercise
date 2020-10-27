import React, { useState, useCallback, useEffect } from "react";
import cn from "classnames";

export type KeyboardProps = {
  activeNoteIndex: number;
  proceedToNextNote: () => void;
};

const keys = [
  {
    type: "white",
    noteIndex: 0,
  },
  {
    type: "black",
    noteIndex: 0,
  },
  {
    type: "white",
    noteIndex: 1,
  },
  {
    type: "black",
    noteIndex: 0,
  },
  {
    type: "white",
    noteIndex: 2,
  },
  {
    type: "white",
    noteIndex: 3,
  },
  {
    type: "black",
    noteIndex: 0,
  },
  {
    type: "white",
    noteIndex: 4,
  },
  {
    type: "black",
    noteIndex: 0,
  },
  {
    type: "white",
    noteIndex: 5,
  },
  {
    type: "black",
    noteIndex: 0,
  },
  {
    type: "white",
    noteIndex: 6,
  },
];

export const Keyboard: React.FC<KeyboardProps> = ({
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
    <div className="keyboard__container">
      <ul className="keys-list">
        {keys.map((key, arrIndex) => (
          <li
            key={`key-${arrIndex}`}
            className={cn(`keys-list__key_${key.type}`, {
              key_correct: correctNotesIndex.includes(key.noteIndex),
              key_wrong: wrongNotesIndex.includes(key.noteIndex),
            })}
            onClick={() => handleNoteClick(key.noteIndex)}
          />
        ))}
      </ul>
    </div>
  );
};
