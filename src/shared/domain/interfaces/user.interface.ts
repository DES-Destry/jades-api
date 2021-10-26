export interface IUser {
  id?: string;
  username: string;
  alias?: string;
  urlAlias?: string;
  description?: string;
  // emails: IUserEmail[],
  password: string;
  karma: number;
  location?: string;
  // contacts: IUserContact[],
  // userIdenteties: IUserIdenteties[],
  isVerified: boolean;
  lastPasswordChanged: Date;
  createdAt: Date;
  updatedAt: Date;
}
