import { IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  public name: string;

  @IsString()
  public description: string;

  @IsString()
  public image: string;

  @IsNumber()
  public price: number;

  @IsNumber()
  public quantity: number;
}

export class updateProductDto {
  @IsNumber()
  public quantity: number;

  @IsString()
  public type: string;
}
