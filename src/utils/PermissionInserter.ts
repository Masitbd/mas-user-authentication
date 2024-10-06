import { Permission } from '../app/modules/permission/permission.model';
import { permissionData } from '../constants/PermisssionObject';
import { startSpinner } from './LoadingAnimation';

export const permissionInserter = async () => {
  const PermissionSpinner = startSpinner(
    'Checking for permission and inserting the permissions'
  );
  const permissions = permissionData;
  if (!permissions) return;

  const permissionPromises = permissions.map(async p => {
    const doesExists = await Permission.exists({ code: p.code });
    if (!doesExists) {
      await Permission.create(p);
    }
  });

  await Promise.all(permissionPromises);

  PermissionSpinner();
  console.log('\u{2705} Permission inserted successfully');
};
