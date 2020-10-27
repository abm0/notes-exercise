import React, { useState, useEffect, useCallback, useMemo } from "react";

import { getRandomItemIndex } from "../utils";

import { NotesList } from "./NotesList";
import { Keyboard } from "./Keyboard";
import { Fretboard } from "./Fretboard";

const notesRus = ["До", "Ре", "Ми", "Фа", "Соль", "Ля", "Си"];
const notesEng = ["C", "D", "E", "F", "G", "A", "B"];

const bothNotes = notesRus.map((note, index) => `${notesEng[index]} (${note})`);

enum Modes {
  RUS_TO_ENG,
  ENG_TO_RUS,
  KEYBOARD,
  FRETBOARD,
}

const questionNotesSetMap = {
  [Modes.RUS_TO_ENG]: notesRus,
  [Modes.ENG_TO_RUS]: notesEng,
  [Modes.KEYBOARD]: bothNotes,
  [Modes.FRETBOARD]: bothNotes,
};

const answerNotesSetMap = {
  [Modes.RUS_TO_ENG]: notesEng,
  [Modes.ENG_TO_RUS]: notesRus,
};

export const Exercise = React.memo(() => {
  const { RUS_TO_ENG, ENG_TO_RUS, KEYBOARD, FRETBOARD } = Modes;

  const [mode, setMode] = useState(RUS_TO_ENG);
  const [questionNotes, setQuestionNotes] = useState<string[]>(notesRus);
  const [answerNotes, setAnswerNotes] = useState<string[]>(notesEng);
  const [activeNoteIndex, setActiveNoteIndex] = useState<number>(0);
  const [previousNoteIndex, setPreviousNoteIndex] = useState<number>();

  // console.table({ previousNoteIndex, activeNoteIndex });
  console.log("Exercise render");

  useEffect(() => {
    switch (mode) {
      case RUS_TO_ENG:
        setQuestionNotes(questionNotesSetMap[RUS_TO_ENG]);
        setAnswerNotes(answerNotesSetMap[RUS_TO_ENG]);

        break;

      case ENG_TO_RUS:
        setQuestionNotes(questionNotesSetMap[ENG_TO_RUS]);
        setAnswerNotes(answerNotesSetMap[ENG_TO_RUS]);

        break;
    }
  }, [mode, RUS_TO_ENG, ENG_TO_RUS]);

  useEffect(() => {
    setActiveNoteIndex(getRandomItemIndex(questionNotes));
  }, []);

  const proceedToNextNote = useCallback(() => {
    setPreviousNoteIndex(activeNoteIndex);
    setActiveNoteIndex(getRandomItemIndex(questionNotes, previousNoteIndex));
  }, [questionNotes, activeNoteIndex, previousNoteIndex]);

  const answerComponent = useMemo(() => {
    switch (mode) {
      case RUS_TO_ENG:
      case ENG_TO_RUS:
        return (
          <NotesList
            activeNoteIndex={activeNoteIndex}
            answerNotes={answerNotes}
            proceedToNextNote={proceedToNextNote}
          />
        );

      case KEYBOARD:
        return <Keyboard />;

      case FRETBOARD:
        return <Fretboard />;
    }
  }, [
    mode,
    activeNoteIndex,
    answerNotes,
    ENG_TO_RUS,
    RUS_TO_ENG,
    KEYBOARD,
    FRETBOARD,
    proceedToNextNote,
  ]);

  return (
    <>
      <header className="exercise__header">
        Тип тренировки:{" "}
        <button onClick={() => setMode(RUS_TO_ENG)}>Рус-англ</button>{" "}
        <button onClick={() => setMode(ENG_TO_RUS)}>Англ-рус</button>{" "}
        <button onClick={() => setMode(KEYBOARD)}>Ноты на клавиатуре</button>{" "}
        <button onClick={() => setMode(FRETBOARD)}>Ноты на грифе</button>{" "}
      </header>
      <div className="exercise__container">
        <div className="exercise__question-block">
          Текущая нота:{" "}
          <span className="exercise__active-note">
            {questionNotes[activeNoteIndex]}
          </span>
        </div>
        {answerComponent}
      </div>
    </>
  );
});
