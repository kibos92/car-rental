export default interface IUserData {
  _id?: any | null;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  contactDetails: string;
  isAdmin: boolean;
}