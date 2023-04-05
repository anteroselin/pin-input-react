import { Dispatch, SetStateAction } from "react";

export interface IPinInputContext {
  secretMode: boolean;
  pin: string;
  pinLength: number;
  pinCodeType: RegExp;
  setSecretMode: Dispatch<SetStateAction<boolean>>;
  setPin: Dispatch<SetStateAction<string>>;
  setPinLength: Dispatch<SetStateAction<number>>;
  setPinCodeType: Dispatch<SetStateAction<RegExp>>;
}