import { InjectRepository } from '@nestjs/typeorm';
import { IUserContact } from 'src/shared/domain/interfaces/user-contact.interface';
import { UserContact } from 'src/shared/domain/user-contact';
import { IUserContactRepository } from '../interfaces/contact-repository.interface';
import { UserContactEntity } from '../contact.entity';
import { Repository } from 'typeorm';

export class UserContactRepository implements IUserContactRepository {
  constructor(
    @InjectRepository(UserContactEntity)
    private readonly _userContactEntity: Repository<UserContactEntity>,
  ) {}

  public async getById(id: string): Promise<IUserContact> {
    if (!id) {
      return null;
    }

    const entity = await this._userContactEntity.findOne(id);
    return entity && UserContact.transform(entity);
  }

  public async createContact(contact: IUserContact): Promise<IUserContact> {
    if (!contact) {
      return null;
    }

    const userContactDomain = UserContact.create(contact);
    const createdEntity = this._userContactEntity.create(userContactDomain);
    await createdEntity.save();

    return userContactDomain;
  }
  public async updateContact(contact: IUserContact): Promise<IUserContact> {
    if (!contact && !contact.id) {
      return null;
    }

    const entity = await this._userContactEntity.findOne(contact.id);

    if (!entity) {
      return null;
    }

    entity.title = contact.title;
    entity.description = contact.description;
    entity.mediaType = contact.mediaType;
    entity.link = contact.link;
    entity.updatedAt = new Date();

    await entity.save();
    return UserContact.transform(entity);
  }

  public async deleteContact(contactId: string): Promise<boolean> {
    if (!contactId) {
      return false;
    }

    const deleteResult = await this._userContactEntity.delete({
      id: contactId,
    });

    return deleteResult.affected > 0;
  }
}
