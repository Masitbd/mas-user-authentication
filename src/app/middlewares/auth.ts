import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import { ENUM_USER_PEMISSION as ENUM_USER_PERMISSION } from '../../enums/user';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelpers';

const auth =
  (...requiredPermissions: number[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token

      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }
      // verify token
      let verifiedUser = null;

      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

      req.user = verifiedUser; // role  , userid

      if (
        verifiedUser?.permissions?.includes(ENUM_USER_PERMISSION.SUPER_ADMIN)
      ) {
        next();
        return;
      }
      if (
        requiredPermissions &&
        !verifiedUser.permissions.some((permission: number) =>
          requiredPermissions.includes(permission)
        )
      ) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
