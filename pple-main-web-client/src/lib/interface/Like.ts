export interface Like {
  donationUuid: string;
  likes: Array<Likes>;
  jwt: string;
}

export interface Likes {
  likeAccountUuid: string;
}
