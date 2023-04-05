import { FC } from "react";

import styles from "./SecretModeToggle.module.scss";
import { usePinInput } from "hooks";

const SecretModeToggle: FC = () => {
  const { secretMode, setSecretMode } = usePinInput();

  const handleToggle = () => {
    setSecretMode(!secretMode);
  };

  return (
    <div className={styles.secretModeToggleContainer}>
      <label
        htmlFor="secret-mode-toggle"
        className={styles.secretModeToggleLabel}
      >
        Secret Mode
      </label>
      <input
        type="checkbox"
        id="secret-mode-toggle"
        className={styles.secretModeToggle}
        checked={secretMode}
        onChange={handleToggle}
      />
    </div>
  );
};

export default SecretModeToggle;
