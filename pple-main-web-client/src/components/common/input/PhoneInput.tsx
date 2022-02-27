import React, { useState } from 'react';
import { styled, Grid, FormControl, Input } from '@mui/material';
import palette from '../../../lib/styles/palette';
import Label from '../Label';
import StyleInput from './StyleInput';
const PhoneInputBlock = styled('div')({
  marginTop: '25px',
  display: 'flex',
  alignItems: 'center',
  '& .title': {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 'smaller',
    minWidth: '50px',
    display: 'flex',
    marginRight: '10px',
  },
});
const InputBlock = styled('div')({
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'space-between',
  '& .divider': {
    width: '30px',
  },
  '& .input-form': {
    marginTop: '16px',
  },
});
const HelpText = styled('div')({
  marginBottom: '30px',
  color: 'gray',
  fontSize: 'small',
  lineHeight: '15px',
});

// modify story 시 ? 삭제
interface IPhone {
  first?: string;
  second?: string;
  third?: string;
  handlePhoneNumber?: any;
}

const PhoneInput: React.FC<IPhone> = ({
  first,
  second,
  third,
  handlePhoneNumber,
}) => {
  return (
    <>
      <PhoneInputBlock>
        <div className="title">연락처 *</div>
        <InputBlock>
          <FormControl
            sx={{ width: '100%' }}
            variant="standard"
            className="input-form"
          >
            <StyleInput
              name="first"
              id="first"
              value={first}
              onChange={handlePhoneNumber}
            ></StyleInput>
          </FormControl>
          <div className="divider"></div>
          <FormControl
            sx={{ width: '100%' }}
            variant="standard"
            className="input-form"
          >
            <StyleInput
              name="second"
              id="second"
              value={second}
              onChange={handlePhoneNumber}
            ></StyleInput>
          </FormControl>
          <div className="divider"></div>
          <FormControl
            sx={{ width: '100%' }}
            variant="standard"
            className="input-form"
          >
            <StyleInput
              name="third"
              id="third"
              value={third}
              onChange={handlePhoneNumber}
            ></StyleInput>
          </FormControl>
        </InputBlock>
      </PhoneInputBlock>
      <HelpText>
        연락처는 수정 불가합니다. 수정이 필요하시다면 <br />
        contact.pple2022@gmail.com 로 연락바랍니다
      </HelpText>
    </>
  );
};

export default PhoneInput;
