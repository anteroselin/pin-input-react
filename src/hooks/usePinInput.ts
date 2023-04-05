import { PinInputContext } from "context/PinInputProvider";
import useContextOrError from "./useContextOrError";

const usePinInput = () => {
  return useContextOrError(PinInputContext);
}

export default usePinInput;