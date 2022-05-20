import { Router } from 'express';
import MoneysController from '@controllers/money.controller';
import { CreateMoneyDto, updateMoneyDto } from '@dtos/money.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class MoneysRoute implements Routes {
  public path = '/moneys';
  public router = Router();
  public moneyController = new MoneysController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.moneyController.getMoney);
    // this.router.post(`${this.path}`, validationMiddleware(CreateMoneyDto, 'body'), this.moneyController.createMoney);
    this.router.post(`${this.path}/update`, validationMiddleware(CreateMoneyDto, 'body'), this.moneyController.updateMoneyDetail);
  }
}

export default MoneysRoute;
