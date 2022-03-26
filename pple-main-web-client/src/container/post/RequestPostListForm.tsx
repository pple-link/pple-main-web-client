import React, { useEffect, useState } from 'react';
import { getDonationsOfActiveStatus } from '../../lib/api/donation';
import { FilterType } from '../../components/home/CardTemplate';
import FeedTemplate from '../../components/request/post/feed/FeedTemplate';
import RequestPostList from '../../components/request/post/RequestPostList';
import { customAxios } from '../../lib/customAxios';

const ShowTemplate = (content: any) => {
  return (
    <FeedTemplate
      uuid={content.uuid}
      key={content.uuid}
      title={content.title}
      content={content.content}
      sort={content.bloodProduct}
      bloodType={
        content.patient.bloodType.rh == 'POSITIVE'
          ? `${content.patient.bloodType.abo}+`
          : `${content.patient.bloodType.abo}-`
      }
      time={content.createdAt}
      phoneNumber={content.phoneNumber}
      displayName={content.writer.displayName}
      profileImageUrl={content.writer.profileImageUrl}
    />
  );
};

const RenderPost = (contentArray: any) => {
  return contentArray.map((content, idx) => ShowTemplate(content));
};

const FilterBloodType = (bloodType: string, contentArray: any) => {
  return contentArray.map((content, idx) =>
    content.patient.bloodType.abo == bloodType.replace('형', '') ? (
      ShowTemplate(content)
    ) : (
      <div key={idx}></div>
    ),
  );
};

const ChangeBloodProductValue = (bloodProduct: string) => {
  switch (bloodProduct) {
    case '전혈':
      return 'WHOLE';
    case '성분채혈 혈소판':
      return 'PLATELET';
    case '성분채혈 백혈구':
      return 'LEUKOCYTE';
    case '농축적혈구':
      return 'PACKED_RED_BLOOD_CELL';
    case '백혈구여과제거적혈구':
      return 'LEUKOCYTE_REDUCED_RED_BLOOD_CELL';
    default:
      break;
  }
};

const FilterBloodProduct = (bloodProduct: string, contentArray: any) => {
  return contentArray.map((content, idx) =>
    content.bloodProduct == ChangeBloodProductValue(bloodProduct) ? (
      ShowTemplate(content)
    ) : (
      <div key={idx}></div>
    ),
  );
};

const FilterBloodTypeAndBloodProduct = (
  bloodType: string,
  bloodProduct: string,
  contentArray,
) => {
  return contentArray.map((content, idx) =>
    content.patient.bloodType.abo == bloodType.replace('형', '') &&
    content.bloodProduct == ChangeBloodProductValue(bloodProduct) ? (
      ShowTemplate(content)
    ) : (
      <div key={idx}></div>
    ),
  );
};

const RequestPostListForm: React.FC = () => {
  const [contentArray, setContentArray] = useState([]);
  const [search, setSearch] = useState<string>(undefined);
  const [filter, setFilter] = useState<FilterType>({
    bloodType: null,
    bloodProduct: null,
  });
  const handleSearch = (e: any) => {
    const { value } = e.target;
    setSearch(value);
  };

  useEffect(() => {
    getDonationsOfActiveStatus()
      .then(res => {
        if (search != undefined) {
          const newArray = res.data.content.filter(content =>
            content.donationContent.includes(search),
          );
          setContentArray(newArray);
          return;
        }
        const newArray = res.data;
        setContentArray(newArray);
      })
      .catch(err => {
        console.log(err);
      });
  }, [search]);
  return (
    <RequestPostList filter={filter} setFilter={setFilter}>
      {filter.bloodProduct &&
      filter.bloodType &&
      filter.bloodType !== '전체보기' &&
      filter.bloodProduct !== '전체보기'
        ? FilterBloodTypeAndBloodProduct(
            filter.bloodType,
            filter.bloodProduct,
            contentArray,
          )
        : filter.bloodProduct && filter.bloodProduct !== '전체보기'
        ? FilterBloodProduct(filter.bloodProduct, contentArray)
        : filter.bloodType && filter.bloodType !== '전체보기'
        ? FilterBloodType(filter.bloodType, contentArray)
        : RenderPost(contentArray)}
    </RequestPostList>
  );
};

export default RequestPostListForm;
