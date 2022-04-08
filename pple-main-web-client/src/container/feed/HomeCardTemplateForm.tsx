import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginRequestModal from '../../components/common/modal/LoginRequestModal';
import CardTemplate from '../../components/home/CardTemplate';
import { clickShowAll } from '../../lib/ampli';
import { getCookie } from '../../lib/hooks/CookieUtil';

interface ContentArray {
  contentArray: any;
}

const HomeCardTemplateForm: React.FC<ContentArray> = ({ contentArray }) => {
  const jwt = getCookie();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const onClick = () => {
    setOpen(!open);
  };

  const handleAuth = () => {
    // clickShowAll();
    if (jwt == undefined) {
      setOpen(!open);
      return;
    }
    navigate('/post');
  };

  return (
    <div>
      <LoginRequestModal open={open} onClick={onClick} />
      <CardTemplate handleAuth={handleAuth} contentArray={contentArray} />
    </div>
  );
};

export default HomeCardTemplateForm;
