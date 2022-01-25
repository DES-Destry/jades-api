import { InjectModel } from '@nestjs/sequelize';
import { IUserContact } from 'src/shared/domain/interfaces/user-contact.interface';
import { UserContact } from 'src/shared/domain/user-contact';
import { IUserContactRepository } from '../interfaces/user-contact-repository.interface';
import { UserContactModel } from '../user-contact.model';

export class UserContactRepository implements IUserContactRepository {
  constructor(
    @InjectModel(UserContactModel)
    private readonly _userContactModel: typeof UserContactModel,
  ) {}

  public async getById(id: string): Promise<IUserContact> {
    if (!id) {
      return null;
    }

    const model = await this._userContactModel.findByPk(id);
    return model && UserContact.transform(model);
  }

  public async createContact(contact: IUserContact): Promise<IUserContact> {
    if (!contact) {
      return null;
    }

    const userContactDomain = UserContact.create(contact);
    await this._userContactModel.create(userContactDomain);

    return userContactDomain;
  }
  public async updateContact(contact: IUserContact): Promise<IUserContact> {
    if (!contact && !contact.id) {
      return null;
    }

    const model = await this._userContactModel.findByPk(contact.id);

    if (model) {
      model.title = contact.title;
      model.description = contact.description;
      model.mediaType = contact.mediaType;
      model.link = contact.link;
      model.updatedAt = new Date();

      await model.save();
    }

    return null;
  }

  public async deleteContact(contactId: string): Promise<boolean> {
    if (!contactId) {
      return false;
    }

    const count = await this._userContactModel.destroy({
      where: { id: contactId },
    });

    return count > 0;
  }
}
