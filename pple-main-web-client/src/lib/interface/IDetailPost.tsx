export default interface IDetailPost {
  bloodProduct: string;
  content: string;
  createdAt: string;
  likes: Array<any>;
  patient: {
    bloodType: {
      abo: 'A' | 'B' | 'O' | 'AB';
      rh: 'POSITIVE' | 'NEGATIVE';
    };
    createdAt: string;
    status: string;
    uuid: string;
  };
  phoneNumber: string;
  reply: Array<IReply>;
  title: string;
  uuid: string;
  viewsCount: number;
  writer: {
    accountUuid: string;
    displayName: string;
    phoneNumber: string;
    profileImageUrl: string;
    providerType: string;
  };
  currentUserImageUrl: string;
  onSubmitComment: any;
  jwt: string;
}

interface IReply {
  content: string;
  createdAt: string;
  report: true;
  writer: {
    accountUuid: string;
    bloodType: {
      abo: 'A' | 'B' | 'O' | 'AB';
      rh: 'POSITIVE' | 'NEGATIVE';
    };
    displayName: string;
    profileImageUrl: string;
  };
}
