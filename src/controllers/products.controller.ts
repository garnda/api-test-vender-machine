import { NextFunction, Request, Response } from 'express';
import { CreateProductDto } from '@/dtos/products.dto';
import { Product } from '@interfaces/products.interface';
import productService from '@services/product.service';

class ProductsController {
  public productService = new productService();

  public getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllProductData: Product[] = await this.productService.findAllProduct();

      res.status(200).json({ data: findAllProductData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productData: CreateProductDto = req.body;
      const createProductData: Product = await this.productService.createProduct(productData);

      res.status(201).json({ data: createProductData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId: string = req.params.id;
      const quantity: number = req.body.quantity;
      const type: string = req.body.type;
      const updateProductData: Product = await this.productService.updateProductQuantity(productId, quantity, type);

      res.status(201).json({ data: updateProductData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductsController;
