import { hash } from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
const request = require('request');
const lineNotifyUrl = 'https://notify-api.line.me/api/notify';
const token = 'Is6zOrchVpFyXK257JlmOrtXO4MrRZW7y4FanIFRakG';
class UserService {
  public users = userModel;

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find();
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: User = await this.users.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    const user: User = new userModel(userData);
    const duplicate: User[] = await this.users.find({
      $or: [{ email: userData.email }, { username: userData.username }, { phoneNumber: userData.phoneNumber }],
    });

    let duplicateKey = '';
    duplicate.forEach((v: User) => {
      if (userData.username === v.username) duplicateKey += 'username-';
      if (userData.phoneNumber === v.phoneNumber) duplicateKey += 'displayName-';
      if (userData.email === v.email) duplicateKey += 'email-';
    });

    if (duplicateKey) throw new HttpException(409, `You're ${duplicateKey} already exists`);
    else {
      const hashedPassword = await hash(userData.password, 10);
      const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });
      return createUserData;
      request(
        {
          method: 'POST',
          uri: lineNotifyUrl,
          header: {
            'Content-Type': 'multipart/form-data',
          },
          auth: {
            bearer: token,
          },
          form: {
            message: `🚨🚨🚨‼️\n👤 ${userData.firstName} ${userData.lastName}\n🪧 \n👤 ${userData.email} ${userData.username}\n🪧`,
          },
        },
        (err, httpResponse, body) => {
          if (err) {
            console.log(err);
          } else {
            console.log(body);
          }
        },
      );
    }
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    if (userData.email) {
      const findUser: User = await this.users.findOne({ email: userData.email });
      if (findUser && findUser._id != userId) throw new HttpException(409, `You're email ${userData.email} already exists`);
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    const updateUserById: User = await this.users.findByIdAndUpdate(userId, { userData });
    if (!updateUserById) throw new HttpException(409, "You're not user");

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "You're not user");

    return deleteUserById;
  }
}

export default UserService;
