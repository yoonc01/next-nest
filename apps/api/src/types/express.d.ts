type JwtPayLoad = {
  sub: string;
  email?: string;
  name?: string;
  picture?: null;
  iat?: number;
};

declare global {
  namespace Express {
    interface User extends JwtPayLoad {} // eslint-disable-line
  }
}

export {};
