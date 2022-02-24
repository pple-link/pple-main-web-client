interface SignUp {
  uuid: string;
  displayName: string;
  birthDay: string;
  gender: string;
  phoneNumber: string;
  bloodType: {
    rh: string;
    abo: string;
  };
  privacyPolicy: boolean;
  termOfService: boolean;
  marketingUserAgreement: boolean;
}

export default SignUp;
