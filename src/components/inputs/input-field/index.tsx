import React, { FC, ChangeEvent, useState } from 'react';
import { Input, InputField as StyledInputField } from './styled';

type InputType = 'text' | 'tel' | 'url' | 'number' | 'file' | 'email' | 'date' | 'search';
type IconPoseType = 'left' | 'right' | undefined;

interface InputFieldProps {
  ariaLabel: string;
  type?: InputType;
  placeholder?: string;
  label?: string;
  error?: boolean;
  nrOfLines?: number;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  iconPos?: IconPoseType;
  onInputSubmit?: (inputValue: string) => void | any;
}

const InputField: FC<InputFieldProps> = ({
  ariaLabel,
  startIcon,
  endIcon,
  type = 'text',
  placeholder = 'Input placeholder ...',
  error = false,
  onInputSubmit,

  /* nrOfLines = 1, for text-area */
}) => {
  const [inputValue, setInputValue] = useState('');
  const conditionalPlaceholder = error ? 'Invalid input' : placeholder;

  const onChange = (changeEvent: ChangeEvent<HTMLInputElement>) => {
    setInputValue(changeEvent.target.value);
    onInputSubmit && onInputSubmit(changeEvent.target.value);
  };

  // This part can be uncommented later to inlude more input cases which submit the input by pressing the Enter key
  // const onKeyDown = (keyboardEvent: KeyboardEvent<HTMLInputElement>) => {
  //   if (keyboardEvent.code === 'Enter') console.log('FIRE ACTION');
  // };

  return (
    <StyledInputField ariaLabel='' error={error} iconPos={startIcon ? 'left' : endIcon ? 'right' : undefined}>
      {startIcon}
      <Input
        aria-label={ariaLabel}
        placeholder={conditionalPlaceholder}
        type={type}
        value={inputValue}
        onChange={onChange}
        // onKeyDown={onChange}
        onSubmit={onChange}
      />
      {endIcon}
    </StyledInputField>
  );
};

export default InputField;
export { InputFieldProps };
