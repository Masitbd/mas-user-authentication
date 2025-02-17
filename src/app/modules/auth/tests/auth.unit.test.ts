// /* eslint-disable no-undef */
// import ApiError from '../../../../errors/ApiError';
// import { AuthService } from '../auth.service';

// describe('It should test if rusticating user is successful', () => {
//   it('should return bad request if no payload is provided', async () => {
//     // Arrange
//     const payload = '';

//     try {
//       // Act
//       const result = await AuthService.rusticateUser(payload);
//     } catch (error) {
//       expect(error).toBeInstanceOf(ApiError);
//     }
//   });

//   it('should return no user found if id is invalid', async () => {
//     // Arrange
//     const payload = 'invalid_id';

//     try {
//       // Act
//       const result = await AuthService.rusticateUser(payload);
//     } catch (error: any) {
//       expect(error.statusCode).toBe(404);
//       expect(error.message).toBe('User does not exist');
//     }
//   });
// });
