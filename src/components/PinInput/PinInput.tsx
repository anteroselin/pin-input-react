import {
  FC,
  useEffect,
  useState,
  ChangeEvent,
  createRef,
  KeyboardEvent,
} from "react";

import { digitRegex } from "utils";
import { useAutofocus, usePasting } from "hooks";

import styles from "./PinInput.module.scss";

interface PinInputProps {
  length: number;
  secretMode?: boolean;
  regex?: RegExp;
  defaultValue?: string;
  onPinComplete: (value: string) => void;
}

const PinInput: FC<PinInputProps> = ({
  length,
  secretMode = false,
  regex = digitRegex,
  defaultValue = "",
  onPinComplete,
}) => {
  const [pinValues, setPinValues] = useState<string[]>(
    new Array(length).fill("")
  );

  const inputRefs = Array.from({ length }).map(() =>
    createRef<HTMLInputElement>()
  );

  useEffect(() => {
    if (length) {
      setPinValues(Array(length).fill(""));
    }

    if (defaultValue.length === length) {
      setPinValues(defaultValue.split(""));
    }
  }, [defaultValue, length]);

  const firstEmptyIndex = pinValues.findIndex((v) => !v);
  const firstEmptyRef =
    firstEmptyIndex !== -1
      ? inputRefs[firstEmptyIndex]
      : inputRefs[inputRefs.length - 1];

  useAutofocus(firstEmptyRef);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if (!regex.test(value)) {
      e.target.value = pinValues[index];
      return;
    }

    const newPinValues = [...pinValues];
    newPinValues[index] = value;
    setPinValues(newPinValues);

    if (newPinValues.every((v) => v.length === 1)) {
      onPinComplete(newPinValues.join(""));
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (["Backspace", "Delete"].includes(e.key)) {
      if (!pinValues[index] && index > 0) {
        const newPinValues = [...pinValues];
        newPinValues[index - 1] = "";
        setPinValues(newPinValues);
        inputRefs[index - 1].current?.focus();
      } else {
        const newPinValues = [...pinValues];
        newPinValues[index] = "";
        setPinValues(newPinValues);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const { handlePaste } = usePasting(length, regex, (pastedValues) => {
    setPinValues([
      ...pastedValues,
      ...Array(length - pastedValues.length).fill(""),
    ]);

    if (pastedValues.every((v) => v.length === 1)) {
      onPinComplete(pastedValues.join(""));
    }
  });

  console.log(pinValues);

  return (
    <div className={styles.pinInputContainer}>
      {[...pinValues].map((value, index) => (
        <input
          key={index}
          ref={inputRefs[index]}
          className={styles.pinInputBox}
          type={secretMode ? "password" : "text"}
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          autoComplete="off"
        />
      ))}
    </div>
  );
};

export default PinInput;
