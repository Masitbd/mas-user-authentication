import { User } from './user.model';

// Last user ID
export const findLastUserUUIid = async (): Promise<string | undefined> => {
  const lastUser = await User.findOne()
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastUser?.uuid ? lastUser.uuid.substring(6) : undefined;
};

export const generateUUid = async (): Promise<string> => {
  const currentId =
    (await findLastUserUUIid()) || (0).toString().padStart(5, '0'); //00000
  //increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  //20 25
  incrementedId = `${'HMS-' + 'U-'}${incrementedId}`;

  return incrementedId;
};

// // Faculty ID
// export const findLastFacultyId = async (): Promise<string | undefined> => {
//   const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
//     .sort({
//       createdAt: -1,
//     })
//     .lean();

//   return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
// };

// export const generateFacultyId = async (): Promise<string> => {
//   const currentId =
//     (await findLastFacultyId()) || (0).toString().padStart(5, '0');
//   let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
//   incrementedId = `F-${incrementedId}`;

//   return incrementedId;
// };

// // Admin ID
// export const findLastAdminId = async (): Promise<string | undefined> => {
//   const lastFaculty = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
//     .sort({
//       createdAt: -1,
//     })
//     .lean();

//   return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
// };

// export const generateAdminId = async (): Promise<string> => {
//   const currentId =
//     (await findLastAdminId()) || (0).toString().padStart(5, '0');
//   let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
//   incrementedId = `A-${incrementedId}`;

//   return incrementedId;
// };