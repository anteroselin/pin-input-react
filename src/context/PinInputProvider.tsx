import { createContext, PropsWithChildren, useState } from "react";
import { IPinInputContext } from "./types";
import { digitRegex } from "utils";

export const PinInputContext = createContext<IPinInputContext | null>(null);

const PinInputProvider = (props: PropsWithChildren<{}>) => {
  const [secretMode, setSecretMode] = useState(false);
  const [pin, setPin] = useState("");
  const [pinLength, setPinLength] = useState(4);
  const [pinCodeType, setPinCodeType] = useState<RegExp>(digitRegex);

  return (
    <PinInputContext.Provider
      value={{
        secretMode,
        setSecretMode,
        pin,
        setPin,
        pinLength,
        setPinLength,
        pinCodeType,
        setPinCodeType,
      }}
    >
      {props.children}
    </PinInputContext.Provider>
  );
};

export default PinInputProvider;
