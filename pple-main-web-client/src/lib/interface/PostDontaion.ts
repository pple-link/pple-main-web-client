export default interface PostDonation {
  bloodProduct: string;
  content: string;
  patient: {
    bloodType: {
      abo: string;
      rh: string;
    };
  };
  phoneNumber: string;
  title: string;
}
