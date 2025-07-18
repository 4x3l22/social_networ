import { UserInstance, UserCreationAttributes } from '../models/user';
import { ModelStatic } from 'sequelize';

export class UserRepository {
  private userModel: ModelStatic<UserInstance>;

  constructor(userModel: ModelStatic<UserInstance>) {
    this.userModel = userModel;
  }

  public async createUser(userData: UserCreationAttributes): Promise<UserInstance> {
    return this.userModel.create(userData);
  }

  public async findUserByAlias(alias: string): Promise<UserInstance | null> {
    return this.userModel.findOne({ where: { alias } });
  }
}
