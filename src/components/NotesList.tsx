import React, { useState, useCallback, useEffect } from "react";
import cn from "classnames";
import shuffle from "lodash/shuffle";

export type AnswerListProps = {
  answerNotes: string[];
  activeNoteIndex: number;
  proceedToNextNote: () => void;
};

export type AnswerItem = {
  name: string;
  index: number;
};

const getAnswerItemsArr = (notes: string[]): AnswerItem[] => {
  return notes.map((item, index) => ({ name: item, index }));
};

export const NotesList: React.FC<AnswerListProps> = ({
  answerNotes,
  activeNoteIndex,
  proceedToNextNote,
}) => {
  const [shuffledAnswerNotes, setShuffledAnswerNotes] = useState<AnswerItem[]>(
    []
  );
  const [correctNotesIndex, setCorrectNotesIndex] = useState<number[]>([]);
  const [wrongNotesIndex, setWrongNotesIndex] = useState<number[]>([]);
  const [
    correctAnswerAnimationActive,
    setCorrectAnswerAnimationActive,
  ] = useState<boolean>(false);

  useEffect(() => {
    // TODO: добавить композицию
    setShuffledAnswerNotes(shuffle(getAnswerItemsArr(answerNotes)));
    setCorrectNotesIndex([]);
    setWrongNotesIndex([]);
  }, [activeNoteIndex, answerNotes]);

  const handleNoteClick = useCallback(
    (index: number) => {
      if (correctAnswerAnimationActive) return;

      if (activeNoteIndex === index) {
        setCorrectAnswerAnimationActive(true);
        setCorrectNotesIndex([...correctNotesIndex, index]);
        setTimeout(() => {
          setCorrectAnswerAnimationActive(false);
          proceedToNextNote();
        }, 1500);
        return;
      }

      setWrongNotesIndex([...wrongNotesIndex, index]);
    },
    [
      correctAnswerAnimationActive,
      activeNoteIndex,
      correctNotesIndex,
      wrongNotesIndex,
      setCorrectNotesIndex,
      setWrongNotesIndex,
      proceedToNextNote,
      setCorrectAnswerAnimationActive,
    ]
  );

  const checkIfCorrect = useCallback(
    (index: number) => correctNotesIndex.includes(index),
    [correctNotesIndex]
  );

  const checkIfWrong = useCallback(
    (index: number) => wrongNotesIndex.includes(index),
    [wrongNotesIndex]
  );

  return (
    <>
      <p className="exercise__answer-text">Выберите ответ:</p>
      <ul className="exercise__answers-list">
        {shuffledAnswerNotes.map(({ name, index }) => (
          <li
            key={`answerItem_${index}`}
            className={cn("exercise__answers-list-item", {
              "list-item_wrong": checkIfWrong(index),
              "list-item_correct": checkIfCorrect(index),
            })}
          >
            <button onClick={() => handleNoteClick(index)}>{name}</button>
          </li>
        ))}
      </ul>
    </>
  );
};
