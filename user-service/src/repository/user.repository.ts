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

  public async getAllUsers(): Promise<UserInstance[]> {
    return this.userModel.findAll();
  }

  public async findUserByAlias(alias: string): Promise<UserInstance | null> {
    return this.userModel.findOne({ where: { alias } });
  }

  public async findUsersByIds(ids: number[]): Promise<UserInstance[]> {
    return this.userModel.findAll({
      where: {
        id: ids,
      },
    });
  }

}
