import { Schema, model } from 'mongoose';
import { IUserPermission } from './userPermission.interface';

const userPermissionSchema = new Schema<IUserPermission>({
  uuid: {
    type: String,
    required: true,
  },
  permissions: [Number],
});

export const UserPermission = model('UserPermission', userPermissionSchema);
