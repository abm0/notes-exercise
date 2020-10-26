import React from "react";

type Props = {
  onButtonClick: () => void;
};

export const WelcomeMessage: React.FC<Props> = ({ onButtonClick }) => {
  return (
    <div>
      <p>Добро пожаловать!</p>
      <div className="button-container">
        <button onClick={onButtonClick}>Начать</button>
      </div>
    </div>
  );
};
