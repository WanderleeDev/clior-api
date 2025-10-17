export type JwtPayload = {
  sub: string;
  username: string;
  type: 'access' | 'refresh';
  iat: number;
  exp: number;
};
