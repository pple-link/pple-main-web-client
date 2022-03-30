import React, { useRef } from 'react';
import MyPageElementHeader from './MyPageElementHeader';
import Camera from '../../static/images/Camera.svg';
import {
  Avatar,
  Badge,
  Button,
  CircularProgress,
  styled,
  TextField,
} from '@mui/material';
import palette from '../../lib/styles/palette';
import Compressor from 'compressorjs';
import fs from 'fs';

type ModifyProfileType = {
  displayName: string;
  onChange: any;
  profileImageUrl: string;
  setNewProfileImage: any;
  setProfileImageUrl: any;
};

const ModifyProfile: React.FC<ModifyProfileType> = ({
  displayName,
  onChange,
  profileImageUrl,
  setNewProfileImage,
  setProfileImageUrl,
}) => {
  const hiddenFileInput = useRef(null);
  const handleClickBadge = () => {
    hiddenFileInput.current.click();
  };
  const handleFileInputChange = event => {
    setNewProfileImage(event.target.files[0]);
    setProfileImageUrl(changeFileObjectToURL(event.target.files[0]));
  };

  const changeFileObjectToURL = (file: File) => {
    // if (file.size >= 1000000) {
    //   const modifiedTime = new Date().getTime();
    //   pngToJpeg({ quality: 90 }).then(output =>
    //     fs.writeFileSync(`pk_${modifiedTime}`, output),
    //   );
    //   new Compressor(file, {
    //     quality: 0,
    //     success(result) {
    //       const compressFile = new File([result], `pk_${modifiedTime}`);
    //       console.log(file.size + '/' + compressFile.size);
    //       URL.createObjectURL(compressFile);
    //     },
    //   });
    // }
    return URL.createObjectURL(file);
  };

  return (
    <ModifyProfileBlock>
      {displayName !== undefined ? (
        <>
          <MyPageElementHeader title="프로필 수정" />
          <div className="avatar">
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <SmallAvatar
                  alt="프로필 이미지 수정"
                  src={Camera}
                  style={{ cursor: 'pointer' }}
                  onClick={handleClickBadge}
                ></SmallAvatar>
              }
            >
              <Avatar
                src={profileImageUrl}
                sx={{ width: 118, height: 118 }}
                alt="프로필 이미지"
              />
            </Badge>
            <input
              ref={hiddenFileInput}
              type="file"
              name="profile_image"
              id="profile_image"
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
            />
          </div>
          <StyledInput
            defaultValue={displayName}
            fullWidth
            inputProps={{ style: { textAlign: 'center' } }}
            name="displayName"
            onChange={onChange}
          />
          <div className="help-text">프로필 사진과 닉네임을 입력해주세요</div>
          <StyledButton type="submit">완료</StyledButton>
        </>
      ) : (
        <ProgressBlock>
          <CircularProgress />
        </ProgressBlock>
      )}
    </ModifyProfileBlock>
  );
};

const ModifyProfileBlock = styled('div')({
  position: 'relative',
  height: '100vh',
  '& .avatar': {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '32px',
  },
  '& .help-text': {
    width: '100%',
    textAlign: 'center',
    color: '#B7B7B7',
  },
});
const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
  border: `1px solid #C4C4C4`,
  background: '#D8D8D8',
  padding: '5px',
  boxSizing: 'border-box',
}));

const StyledInput = styled(TextField)({
  width: '100%',
  marginTop: '25px',
  padding: '20px',
  boxSizing: 'border-box',
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#FFFFFF',
    borderRadius: '10px',
    border: '1px solid #B7B7B7',
    fontWeight: 'bold',
    fontSize: 'larger',
    '& fieldset': {
      color: 'black',
    },
    '&:hover fieldset': {
      borderColor: '#FFFFFF',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FFFFFF',
    },
  },
});

const StyledButton = styled(Button)({
  width: '100%',
  boxSizing: 'border-box',
  position: 'absolute',
  bottom: 0,
  left: 0,
  background: `${palette.red[1]}`,
  color: 'white',
  padding: '20px 0px',
  fontWeight: 'bold',
  fontSize: '18px',
  '&:hover': {
    background: `${palette.red[1]}`,
  },
});

const ProgressBlock = styled('div')({
  width: '100%',
  height: '100vh',
  '& .MuiCircularProgress-root': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transForm: 'translate(-50%,-50%)',
  },
});

export default ModifyProfile;
