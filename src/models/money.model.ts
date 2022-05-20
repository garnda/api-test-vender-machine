import { model, Schema, Document } from 'mongoose';
import { Money } from '@interfaces/money.interface';

const moneySchema: Schema = new Schema({
  money: {
    one: { type: Number, required: true, default: 0 },
    five: { type: Number, required: true, default: 0 },
    ten: { type: Number, required: true, default: 0 },
    twenty: { type: Number, required: true, default: 0 },
    fifty: { type: Number, required: true, default: 0 },
    hundred: { type: Number, required: true, default: 0 },
    thousand: { type: Number, required: true, default: 0 },
  },
});

const moneyModel = model<Money & Document>('Money', moneySchema);

export default moneyModel;
