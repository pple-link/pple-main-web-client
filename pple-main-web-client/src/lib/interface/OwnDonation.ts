export default interface OwnDonation {
  bloodProduct: string;
  content: string;
  writer: {
    bloodType: {
      abo: string;
      rh: string;
    };
    displayName: string;
    profileImageUrl: string;
    uuid: string;
  };
  createdAt: string;
  lastRenewedAt: string;
  modifiedAt: string;
  modifiedBy: number;
  patient: {
    bloodType: {
      abo: string;
      rh: string;
    };
  };
  phoneNumber: string;
  renewedCount: number;
  status: string;
  title: string;
  uuid: string;
}
