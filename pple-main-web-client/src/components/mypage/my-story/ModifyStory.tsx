import React, { useEffect, useState } from 'react';
import { ButtonBase, styled, TextField } from '@mui/material';
import MyPageElementHeader from '../MyPageElementHeader';
import BloodDonationType from '../../common/input/BloodDonationType';
import BloodTypeGroup from '../../common/input/BloodTypeGroup';
import PhoneInput from '../../common/input/PhoneInput';
import OwnDonation from '../../../lib/interface/OwnDonation';
import { isMobile } from 'react-device-detect';
import DeleteModal from '../../common/modal/DeleteModal';
import { getCookie } from '../../../lib/hooks/CookieUtil';

const Block = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  paddingBottom: '40px',
  position: 'relative',
  boxSizing: 'border-box',
  width: 'inherit',
  height: '100vh',
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
  width: isMobile ? '100%' : '27rem',
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
  phone: any;
}

const ModifyStory: React.FC<Props> = ({
  ownDonation,
  handleText,
  handleBloodType,
  handleRh,
  handlePhoneNumber,
  handleBloodProduction,
  phone,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { title, content, patient, phoneNumber, bloodProduct } = ownDonation;
  const { first, second, third } = phone;
  const [delayed, setDelayed] = useState<boolean>(false);
  const jwt = getCookie();
  useEffect(() => {
    setTimeout(() => {
      setDelayed(true);
    }, 500);
  }, []);
  return delayed ? (
    <Block>
      <DeleteModal
        open={open}
        setOpen={setOpen}
        donationUuid={ownDonation.uuid}
        jwt={jwt}
      />
      <div>
        <MyPageElementHeader
          title="사연수정"
          isModify={true}
          setOpen={setOpen}
          open={open}
        />
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
            first={first}
            second={second}
            third={third}
            handlePhoneNumber={handlePhoneNumber}
          />
        </InputBlock>
      </div>
      <ModifyButton isMobile={isMobile} type="submit">
        수정 완료
      </ModifyButton>
    </Block>
  ) : (
    <></>
  );
};

export default ModifyStory;
