import {USER_AGENT} from "./Constant";

export const createBloodTypeString = (
  abo: 'A' | 'B' | 'O' | 'AB',
  rh: 'POSITIVE' | 'NEGATIVE',
) => {
  if (rh == 'POSITIVE') {
    return `${abo}+`;
  }
  return `${abo}-`;
};

export const createBloodProductString = (bloodProduct: string) => {
  if (bloodProduct == 'WHOLE') {
    return '전혈';
  } else if (bloodProduct == 'PLATELET') {
    return '성분채혈 혈소판';
  } else if (bloodProduct == 'LEUKOCYTE') {
    return '성분채혈 백혈구';
  } else if (bloodProduct == 'PACKED_RED_BLOOD_CELL') {
    return '농축 적혈구';
  } else if (bloodProduct == 'LEUKOCYTE_REDUCED_RED_BLOOD_CELL') {
    return '백혈구여과제거적혈구';
  } else {
    return '오타있습니다';
  }
};

export const createTimeFormatForFeedHeader = (time: string) => {
  return `${time.slice(0, 4)}년 ${time.slice(5, 7)}월 ${time.slice(
    8,
    10,
  )}일 등록`;
};

export const createTimeFormatForComment = (time: string) => {
  return `${time.slice(5, 7)}월 ${time.slice(8, 10)}일`;
};

export const createTimeFormatForDetailFeedHeader = (time: string) => {
  const hour = time.slice(11, 13);
  const minute = time.slice(14, 16);
  if (parseInt(hour) <= 12) {
    return `${time.slice(0, 4)}년 ${time.slice(5, 7)}월 ${time.slice(
      8,
      10,
    )}일 오전 ${hour}:${minute}`;
  }
  const newHour = parseInt(hour) - 12;

  return `${time.slice(0, 4)}년 ${time.slice(5, 7)}월 ${time.slice(
    8,
    10,
  )}일 오후 ${newHour.toString()}:${minute}`;
};

export const copyUrl = (url: string): void=> {
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    textarea.value = url;
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0,99999);
    document.execCommand('copy');
    textarea.setSelectionRange(0,0);
    document.body.removeChild(textarea);
    alert('클립보드에 URL이 복사되었습니다. 해당 URL을 공유해주세요');
};

export const getUserAgent = (): string => {
    const userAgent = navigator.userAgent
    if (/android/i.test(userAgent)) {
        return USER_AGENT.ANDROID
    }
    else if (/iPad|iPhone|iPod/.test(userAgent)
        || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
        return USER_AGENT.IOS
    }
    return USER_AGENT.WEB
}
