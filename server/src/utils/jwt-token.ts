import jwt from "jsonwebtoken";

type CreateJwtToken = (
  id: string,
  expiration: string
) => Promise<string | undefined>;

export const createJwtToken: CreateJwtToken = async (id, expiration) => {
  const JWT_SECRET = process.env.JWT_SECRET!;

  return new Promise((resolve, reject) => {
    jwt.sign({ id }, JWT_SECRET, { expiresIn: expiration }, (err, token) => {
      if (err) return reject(err);
      return resolve(token);
    });
  });
};
