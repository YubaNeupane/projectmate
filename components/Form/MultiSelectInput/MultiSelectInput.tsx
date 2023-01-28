import { useRef, useState } from 'react';
import { KeyboardEventHandler } from 'react';
import { messageType, toastMessage } from 'shared';
import toast from 'react-hot-toast';

interface MultiSelectInputProps {
  suggestions: string[];
  onEnterClick: (value: string) => void;
  inputClassName?: string;
  errorMessage?: string;
}

const MultiSelectInput = ({
  suggestions,
  onEnterClick,
  inputClassName,
  errorMessage,
}: MultiSelectInputProps) => {
  const [isError, setIsError] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const _onEnterClick: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key !== 'Enter') return;

    const selectedTag = inputRef.current?.value;
    if (selectedTag && suggestions.includes(selectedTag)) {
      onEnterClick(selectedTag);
      inputRef.current.value = '';
      setIsError(false);
      if (errorMessage) {
        toast.dismiss();
      }
      return;
    }

    setIsError(true);
    if (errorMessage) {
      toastMessage(errorMessage, messageType.error);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        list="tags"
        className={
          inputClassName +
          ` ${
            isError
              ? '!focus:border-red-500 !focus:ring-red-500 !border-red-500'
              : ''
          }`
        }
        onKeyDown={_onEnterClick}
      />
      <datalist id="tags">
        {suggestions.map((suggestion) => (
          <option key={suggestion} value={suggestion} />
        ))}
      </datalist>
    </>
  );
};

export default MultiSelectInput;