import jwt from "jsonwebtoken";

type CreateJwtToken = (
  id: string,
  expiration: string
) => Promise<string | undefined>;

const JWT_SECRET = process.env.JWT_SECRET!;

type JwtPayload =
  | {
      id: string;
    }
  | jwt.JwtPayload;

type VerifyJwtToken = (token: string) => Promise<JwtPayload>;

export const createJwtToken: CreateJwtToken = async (id, expiration) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ id }, JWT_SECRET, { expiresIn: expiration }, (err, token) => {
      if (err) return reject(err);
      return resolve(token);
    });
  });
};

export const verifyJwtToken: VerifyJwtToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(decoded as JwtPayload);
    });
  });
};
