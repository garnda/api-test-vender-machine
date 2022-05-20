import { NextFunction, Request, Response } from 'express';
import { CreateMoneyDto } from '@/dtos/money.dto';
import { Money } from '@interfaces/money.interface';
import moneyService from '@services/money.service';

class MoneyController {
  public moneyService = new moneyService();

  public getMoney = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllProductData: Money[] = await this.moneyService.findMoney();

      res.status(200).json({ data: findAllProductData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createMoney = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const moneyData: CreateMoneyDto = req.body;
      const createProductData: Money = await this.moneyService.createMoney(moneyData);

      res.status(201).json({ data: createProductData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateMoneyDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const moneyId = '6287656d0b6aa238f6e891fb';
      const moneyDetail: object = req.body.money;
      const updateMoneytData: Money = await this.moneyService.updateMoney(moneyDetail, moneyId);

      res.status(201).json({ data: updateMoneytData, message: 'update' });
    } catch (error) {
      next(error);
    }
  };
}

export default MoneyController;
