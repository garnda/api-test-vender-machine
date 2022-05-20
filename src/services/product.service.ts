import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CreateProductDto } from '@/dtos/products.dto';
import { Product } from '@interfaces/products.interface';
import productModel from '@models/product.model';

class ProductService {
  public product = productModel;

  public async findAllProduct(): Promise<Product[]> {
    const product: Product[] = await this.product.find();
    return product;
  }

  public async createProduct(productData: CreateProductDto): Promise<Product> {
    if (isEmpty(productData)) throw new HttpException(400, "You're not productData");

    const findProduct: Product = await this.product.findOne({ name: productData.name });
    if (findProduct) throw new HttpException(409, `You're product name ${productData.name} already exists`);

    const createProductData: Product = await this.product.create({ ...productData });

    return createProductData;
  }

  public async updateProductQuantity(productId: string, quantity: number, type: string): Promise<Product> {
    if (isEmpty(productId) || isEmpty(quantity) || isEmpty(type)) throw new HttpException(400, 'data wrong');

    if (productId) {
      let totalProduct = 0;
      const findProduct: Product = await this.product.findOne({ _id: productId });
      if (!findProduct) throw new HttpException(409, `You're ${productId} no data exists`);
      if (type === 'refill') {
        totalProduct = findProduct.quantity + quantity;
      } else if (type === 'deduct') {
        totalProduct = findProduct.quantity - quantity;
      }
      const updateProduct: Product = await this.product.findOneAndUpdate({ _id: productId }, { quantity: totalProduct }, { new: true });
      return updateProduct;
    }
  }
}

export default ProductService;
