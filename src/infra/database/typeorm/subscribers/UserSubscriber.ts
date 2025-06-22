import {
  BeforeInsert,
  BeforeUpdate,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent
} from 'typeorm';
import { User } from '../../../../entities/User';
import { BcryptHashProvider } from '../../../../providers/HashProvider';

@EventSubscriber()
class UserSubscriber implements EntitySubscriberInterface<User> {
  private updatePassword(entity: User) {
    const hashProvider = new BcryptHashProvider();

    if (entity.password)
      entity.password = hashProvider.generateHash(entity.password);
  }

  listenTo() {
    return User;
  }

  @BeforeInsert()
  beforeInsert(event: InsertEvent<User>) {
    this.updatePassword(event.entity);
  }

  @BeforeUpdate()
  beforeUpdate(event: UpdateEvent<User>) {
    this.updatePassword(event.entity as User);
  }
}

export { UserSubscriber };
