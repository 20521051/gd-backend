export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type JwtPayload = {
  id: string;
  userName: string;
};

export type JwtPayloadWithRefreshToken = JwtPayload & { refreshToken: string };
