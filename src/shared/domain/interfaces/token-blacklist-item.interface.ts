export interface ITokenBlacklistItem {
  id?: string;
  accessToken: string;
  refreshToken: string;
  createdAt?: Date;
}
