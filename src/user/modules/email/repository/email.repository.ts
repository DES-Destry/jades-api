import { IUserEmail } from 'src/shared/domain/interfaces/user-email.interface';
import { UserEmail } from 'src/shared/domain/user-email';
import { IUserEmailRepository } from '../interfaces/email-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEmailEntity } from '../email.entity';
import { Repository } from 'typeorm';

export class UserEmailRepository implements IUserEmailRepository {
  constructor(
    @InjectRepository(UserEmailEntity)
    private readonly _userEmailEntity: Repository<UserEmailEntity>,
  ) {}

  public async getById(id: string): Promise<IUserEmail> {
    if (!id) {
      return null;
    }

    const entity = await this._userEmailEntity.findOne(id);
    return entity && UserEmail.transform(entity);
  }

  public async create(props: IUserEmail): Promise<IUserEmail> {
    if (!props) {
      return null;
    }

    const userEmailDomain = UserEmail.create(props);
    const createdEntity = this._userEmailEntity.create(userEmailDomain);
    await createdEntity.save();
    return userEmailDomain;
  }

  public async toggleMain(emailId: string): Promise<void> {
    if (!emailId) {
      return;
    }

    const entity = await this._userEmailEntity.findOne(emailId);

    if (!entity) {
      return;
    }

    entity.isMain = true;

    const userEmails = await this._userEmailEntity.find({
      where: { userId: entity.userId },
    });

    for await (const userEmail of userEmails) {
      if (userEmail.id !== entity.id) {
        userEmail.isMain = false;
        await userEmail.save();
      }
    }

    await entity.save();
  }
  public async toggleVisible(emailId: string): Promise<void> {
    if (!emailId) {
      return;
    }

    const entity = await this._userEmailEntity.findOne(emailId);

    if (!entity) {
      return;
    }

    entity.isVisible = !entity.isVisible;
    await entity.save();
  }

  public async deleteEmail(emailId: string): Promise<boolean> {
    if (!emailId) {
      return false;
    }

    const entity = await this._userEmailEntity.findOne(emailId);

    if (entity.isMain) {
      return false;
    }

    await this._userEmailEntity.delete(entity);
    return true;
  }
}
