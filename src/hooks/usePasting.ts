import { useState, useCallback, ClipboardEvent } from 'react';

const usePasting = (
  length: number,
  regex: RegExp,
  onPasteComplete: (pastedValues: string[]) => void,
) => {
  const [isPasting, setIsPasting] = useState(false);

  const handlePaste = useCallback(
    (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData('text/plain').slice(0, length);
      const pastedValues = pastedData.split('').map((char) => (regex.test(char) ? char : ''));

      if (pastedValues.length <= length) {
        setIsPasting(true);
        onPasteComplete(pastedValues);
      }
    },
    [length, regex, onPasteComplete],
  );

  return { isPasting, handlePaste };
};

export default usePasting;
