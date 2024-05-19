import { Schema, model } from 'mongoose';
import { IPermission } from './permisson.interface';

const permissionSchema = new Schema<IPermission>({
  label: { type: String, required: true },
  code: { type: Number, unique: true, required: true },
});

export const Permission = model('Permisson', permissionSchema);
