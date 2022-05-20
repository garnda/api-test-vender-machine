import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CreateMoneyDto } from '@dtos/money.dto';
import { Money } from '@interfaces/money.interface';
import moneyModel from '@models/money.model';

class MoneyService {
  public money = moneyModel;

  public async findMoney(): Promise<Money[]> {
    const allMoney: Money[] = await this.money.find();
    return allMoney;
  }

  public async createMoney(moneyData: CreateMoneyDto): Promise<Money> {
    if (isEmpty(moneyData)) throw new HttpException(400, "You're not moneyData");

    // const findProduct: Money = await this.money.findOne({ moneyData });
    // if (findProduct) throw new HttpException(409, `You're product name ${productData.name} already exists`);

    const createmoneyDataData: Money = await this.money.create({ ...moneyData });

    return createmoneyDataData;
  }

  public async updateMoney(moneyDetail: object, moneyId: string): Promise<Money> {
    if (isEmpty(moneyDetail)) throw new HttpException(400, 'data wrong');
    const findMoney: Money = await this.money.findOne({ _id: moneyId });
    if (!findMoney) throw new HttpException(409, `You're no data exists`);

    const updateMoneytData: Money = await this.money.replaceOne({ _id: moneyId }, { money: moneyDetail }, { upsert: true });
    return updateMoneytData;
  }
}

export default MoneyService;
