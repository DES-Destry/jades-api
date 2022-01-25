import { IUserContact } from 'src/shared/domain/interfaces/user-contact.interface';

export interface IUserContactRepository {
  getById(id: string): Promise<IUserContact>;

  createContact(contact: IUserContact): Promise<IUserContact>;
  updateContact(contact: IUserContact): Promise<IUserContact>;

  deleteContact(contactId: string): Promise<boolean>;
}
