import React, { useEffect, useState } from 'react';
import { ButtonBase, styled, TextField } from '@mui/material';
import MyPageElementHeader from '../MyPageElementHeader';
import BloodDonationType from '../../common/input/BloodDonationType';
import BloodTypeGroup from '../../common/input/BloodTypeGroup';
import PhoneInput from '../../common/input/PhoneInput';
import { useNavigate } from 'react-router-dom';
import OwnDonation from '../../../lib/interface/OwnDonation';
import { isMobile } from 'react-device-detect';

const Block = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  paddingBottom: '40px',
  position: 'relative',
  boxSizing: 'border-box',
  width: 'inherit',
});

const Divider = styled('div')({
  width: '100%',
  height: '9px',
  backgroundColor: '#F4F4F4',
});

const InputBlock = styled('div')({
  padding: '17px',
  display: 'flex',
  flexDirection: 'column',
  '& #title': {
    fontSize: 'large',
    color: '#222222',
    fontWeight: 'bold',
  },
});

type Detect = {
  isMobile: boolean;
};

const ModifyButton = styled(ButtonBase)<Detect>(({ isMobile }) => ({
  width: isMobile ? '100%' : '32rem',
  // maxWidth: '32rem',
  background: '#FF6969',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '18px',
  padding: '20px 0px',
  position: 'fixed',
  bottom: 0,
}));

interface Props {
  ownDonation: OwnDonation;
  handleText: any;
  handleBloodType: any;
  handleRh: any;
  handlePhoneNumber: any;
  handleBloodProduction: any;
}

const ModifyStory: React.FC<Props> = ({
  ownDonation,
  handleText,
  handleBloodType,
  handleRh,
  handlePhoneNumber,
  handleBloodProduction,
}) => {
  const { title, content, patient, phoneNumber, bloodProduct } = ownDonation;
  return (
    <Block>
      <div>
        <MyPageElementHeader title="정보수정" />
        <Divider />
        <InputBlock>
          <TextField
            id="title"
            variant="standard"
            name="title"
            placeholder="제목"
            value={title}
            onChange={handleText}
          />

          <TextField
            multiline
            rows={6}
            placeholder="내용"
            variant="standard"
            name="content"
            value={content}
            onChange={handleText}
          />
          <BloodTypeGroup
            onChange={handleBloodType}
            abo={patient.bloodType.abo}
            rh={patient.bloodType.rh}
            handleRh={handleRh}
          />
          <BloodDonationType
            currentBloodProduct={bloodProduct}
            handleBloodProduction={handleBloodProduction}
          />
          <PhoneInput
            first={phoneNumber.slice(0, 3)}
            second={phoneNumber.slice(3, 7)}
            third={phoneNumber.slice(7, 11)}
            handlePhoneNumber={handlePhoneNumber}
          />
        </InputBlock>
      </div>
      <ModifyButton isMobile={isMobile} type="submit">
        수정 완료
      </ModifyButton>
    </Block>
  );
};

export default ModifyStory;
