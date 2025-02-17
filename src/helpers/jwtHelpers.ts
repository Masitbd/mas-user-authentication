import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string | number
): string => {
  return jwt.sign(payload, secret, {
    algorithm: 'HS256',
    allowInsecureKeySizes: true,
    expiresIn: expireTime as number,
  });
};

const createResetToken = (
  payload: any,
  secret: Secret,
  expireTime: string | number
): string => {
  return jwt.sign(payload, secret, {
    algorithm: 'HS256',
    allowInsecureKeySizes: true,
    expiresIn: expireTime as number,
  });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelpers = {
  createToken,
  verifyToken,
  createResetToken,
};
