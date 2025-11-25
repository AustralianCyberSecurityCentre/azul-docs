/**
 * Interactive quiz element for Azul's docs.
 */

import { useState } from "react";

import Admonition from "@theme/Admonition";

import styles from "./index.module.css";
import clsx from "clsx";

interface QuizOption {
  // The question answer
  answer: string;
  // If this is correct. Optional field, defaults to false.
  correct?: boolean;
}

interface Props {
  // The question being asked of the user.
  question: string;
  // A list of two or more options being provided as possible answers.
  options: QuizOption[];
  // An optional explanation displayed after a option is picked that
  // justifies the correct answer.
  explanation?: string;
}

export default function Quiz({ question, options, explanation }: Props) {
  if (!question) {
    throw "Invalid quiz - missing question!";
  }

  if (!options || options.length < 2) {
    throw "Invalid quiz - need >=2 options.";
  }

  if (options.find((v) => v.correct === true) === undefined) {
    throw "Invalid quiz - need at least one correct answer.";
  }

  const [selected, setSelected] = useState<number | null>(null);

  const displayResults = selected !== null;

  const onOptionClick = (_e: React.MouseEvent, index: number) => {
    if (!displayResults) {
      setSelected(index);
    }
  };

  return (
    <div>
      <Admonition type="info" icon="🐕" title={question}>
        <div className={styles.quizOptions}>
          {options.map((option, i) => {
            let buttonStyle = "button--primary";

            if (displayResults) {
              if (option.correct) {
                buttonStyle = "button--success";
              } else {
                buttonStyle = "button--danger";
              }
            }

            return (
              <button
                key={i}
                className={clsx("button button--block", styles.allowWrapping, buttonStyle)}
                onClick={(e) => onOptionClick(e, i)}
                disabled={displayResults}
              >
                {option.answer}
              </button>
            );
          })}
        </div>
        {displayResults && (
          <>
            "{options[selected].answer}" is{" "}
            {options[selected].correct ? "correct" : "incorrect"}.<br />
            {explanation}
          </>
        )}
      </Admonition>
    </div>
  );
}
