import { IsString, IsObject } from 'class-validator';

export class CreateMoneyDto {
  @IsObject()
  public money: object;
}
export class updateMoneyDto {
  @IsObject()
  public money: object;

  @IsString()
  public id: string;
}
