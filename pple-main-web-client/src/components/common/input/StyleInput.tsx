import React from 'react';
import { styled, TextField } from '@mui/material';
import { width } from '@mui/system';

interface StyleInputProps {
  text: string;
}

const StyledInput = styled(TextField)<StyleInputProps>(({ text }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#F9F9F9',
    borderRadius: '10px',
    '& fieldset': {
      borderColor: text ? '#767676' : '#EDEDED',
      color: 'black',
    },
    '&:hover fieldset': {
      borderColor: '#767676',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#767676',
    },
  },
  marginBottom: '25px',
}));

type InputProps = {
  name?: string;
  id: string;
  placeholder?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  inputProps?: any;
  widthValue?: string;
};

const StyleInput: React.FC<InputProps> = ({
  id,
  placeholder,
  value,
  onChange,
  inputProps,
  name,
  widthValue,
}) => {
  return (
    <>
      <StyledInput
        required
        name={name}
        text={value}
        value={value}
        fullWidth
        id={id}
        variant="outlined"
        placeholder={placeholder}
        onChange={onChange}
        inputProps={inputProps}
        sx={{
          width: widthValue,
        }}
      />
    </>
  );
};

export default StyleInput;
