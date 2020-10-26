import React, { useState, useEffect, useCallback, useMemo } from "react";

import { getRandomItemIndex } from "../utils";

const notesRus = ["До", "Ре", "Ми", "Фа", "Соль", "Ля", "Си"];
const notesEng = ["C", "D", "E", "F", "G", "A", "B"];

const bothNotes = notesRus.map((note, index) => `${notesEng[index]} (${note})`);

enum Modes {
  RUS_TO_ENG,
  ENG_TO_RUS,
}

const notesSetMap = {
  [Modes.RUS_TO_ENG]: notesRus,
  [Modes.ENG_TO_RUS]: notesEng,
};

export const Excercise = () => {
  const { RUS_TO_ENG, ENG_TO_RUS } = Modes;

  const [mode, setMode] = useState(RUS_TO_ENG);
  const [questionNotes, setQuestionNotes] = useState<string[]>(notesRus);
  const [answerNotes, setAnswerNotes] = useState<string[]>(notesEng);
  const [activeNoteIndex, setActiveNoteIndex] = useState<number>(0);

  useEffect(() => {
    switch (mode) {
      case RUS_TO_ENG:
        setQuestionNotes(notesRus);
        setAnswerNotes(notesEng);

        break;

      case ENG_TO_RUS:
        setQuestionNotes(notesEng);
        setAnswerNotes(notesRus);

        break;
    }
  }, [mode, RUS_TO_ENG, ENG_TO_RUS]);

  const getNextActiveNoteIndex = useCallback(
    () => getRandomItemIndex(questionNotes),
    [questionNotes]
  );

  useEffect(() => {
    setActiveNoteIndex(getNextActiveNoteIndex());
  }, [getNextActiveNoteIndex]);

  const handleAnswerClick = useCallback(
    (answerIndex) => {
      if (activeNoteIndex === answerIndex) {
        setActiveNoteIndex(getNextActiveNoteIndex());
      }
    },
    [activeNoteIndex, getNextActiveNoteIndex]
  );

  return (
    <>
      <header className="excercise__header">
        Тип тренировки:{" "}
        <button onClick={() => setMode(RUS_TO_ENG)}>Рус-англ</button>{" "}
        <button onClick={() => setMode(ENG_TO_RUS)}>Англ-рус</button>{" "}
      </header>
      <div className="excercise__container">
        Текущая нота: <span>{questionNotes[activeNoteIndex]}</span>
        <p className="excercise__answer-text">Выберите ответ:</p>
        <ul className="excercise__answers-list">
          {answerNotes.map((item, index) => (
            <li className="excercise__answers-list-item">
              <button onClick={() => handleAnswerClick(index)}>{item}</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
