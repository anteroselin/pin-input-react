import { FC, useState, useCallback } from "react";
import { PinInput, SettingModal } from "./components";

import styles from "./App.module.scss";
import { usePinInput } from "hooks";

const App: FC = () => {
  const { secretMode, pin, setPin, pinLength, pinCodeType } = usePinInput();

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const handlePinComplete = useCallback(
    (pin: string) => {
      setPin(pin);
      console.log("PIN:", pin);
    },
    [setPin]
  );

  const handleOpenSettingsModal = useCallback(() => {
    setIsSettingsModalOpen(true);
  }, []);

  const handleCloseSettingsModal = useCallback(() => {
    setIsSettingsModalOpen(false);
  }, []);

  return (
    <div className={styles.container}>
      <h1>Input PIN Number</h1>
      <PinInput
        length={pinLength}
        regex={pinCodeType}
        secretMode={secretMode}
        onPinComplete={handlePinComplete}
      />
      <button
        className={styles.settingsButton}
        onClick={handleOpenSettingsModal}
      ></button>
      <p>Entered PIN: {secretMode ? "****" : pin}</p>
      {isSettingsModalOpen && (
        <SettingModal
          visible={isSettingsModalOpen}
          onClose={handleCloseSettingsModal}
        />
      )}
    </div>
  );
};

export default App;
