export {};

type SessUser = {
  email?: string;
  fullName?: string;
  avatar?: string | null;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  password?: string | undefined | null;
  provider?: any;
  resetToken?: any;
};

declare global {
  namespace Express {
    interface User extends SessUser {}
  }
}
// declare module "express" {
//   interface User extends SessUser {}
// }
