import { RefObject, useEffect } from "react";

const useAutofocus = (ref: RefObject<HTMLInputElement>) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref]);
}

export default useAutofocus;