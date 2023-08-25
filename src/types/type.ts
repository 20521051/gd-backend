export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type JwtPayload = {
  id: string;
  userName?: string;
  email?: string;
  phone?: string;
  wallet?: string;
};

export type JwtPayloadWithRefreshToken = JwtPayload & { refreshToken: string };
