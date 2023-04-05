import { FC, useState } from "react";
import {
  alphanumericRegex,
  digitRegex,
  lowercaseLetterRegex,
  uppercaseLetterRegex,
} from "utils";

import styles from "./Setting.module.scss";
import { SecretModeToggle } from "components";
import { usePinInput } from "hooks";

type Props = {
  visible: boolean;
  onClose: () => void;
};

const SettingsModal: FC<Props> = ({ visible, onClose }) => {
  const { pinLength, setPinLength, pinCodeType, setPinCodeType } =
    usePinInput();

  const [pinCodeSelect, setPinCodeSelect] = useState(
    pinCodeType === alphanumericRegex
      ? "alphanumeric"
      : pinCodeType === lowercaseLetterRegex
      ? "lowercase"
      : pinCodeType === uppercaseLetterRegex
      ? "uppercase"
      : "numeric"
  );

  const handlePinLengthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const length = parseInt(event.target.value);
    if (!isNaN(length)) {
      setPinLength(length);
    }
  };

  const handlePinCodeTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const type = event.target.value;
    switch (type) {
      case "numeric":
        setPinCodeSelect("numeric");
        setPinCodeType(digitRegex);
        break;
      case "uppercase":
        setPinCodeSelect("uppercase");
        setPinCodeType(uppercaseLetterRegex);
        break;
      case "lowercase":
        setPinCodeSelect("lowercase");
        setPinCodeType(lowercaseLetterRegex);
        break;
      case "alphanumeric":
        setPinCodeSelect("alphanumeric");
        setPinCodeType(alphanumericRegex);
        break;
      default:
        break;
    }
  };

  return (
    <div className={`${styles.modal} ${visible ? styles.visible : ""}`}>
      <div className={styles.content}>
        <h2>Settings</h2>
        <div className={styles.form}>
          <SecretModeToggle />
          <div className={styles.inputGroup}>
            <label htmlFor="pin-length-input" className={styles.inputLabel}>
              PIN Length
            </label>
            <input
              id="pin-length-input"
              type="number"
              min="1"
              max="10"
              value={pinLength}
              onChange={handlePinLengthChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="pin-type-select" className={styles.inputLabel}>
              PIN Type
            </label>
            <select
              id="pin-type-select"
              value={pinCodeSelect}
              onChange={handlePinCodeTypeChange}
            >
              <option value="numeric">Numeric</option>
              <option value="uppercase">Uppercase</option>
              <option value="lowercase">Lowercase</option>
              <option value="alphanumeric">Alphanumeric</option>
            </select>
          </div>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
