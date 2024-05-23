import config from '../../../config';
import { IProfile } from '../profile/profile.interface';

export const superAdminProfile: IProfile = {
  name: 'Super Admin',
  fatherName: 'Super Admin',
  motherName: 'Super Admin',
  phone: config.superAdmin.phone || '123456789',
  email: config.superAdmin.email || 'superadmin@gmail.com',
  address: 'Super Admin',
};

export const superAdminUserConfig = {
  password: config.superAdmin.password || '123456789',
  role: 'super-admin',
};
