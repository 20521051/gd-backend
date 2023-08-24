export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type JwtPayloadWithUserName = {
  id: string;
  userName: string;
};
export type JwtPayloadWithEmail = {
  id: string;
  email: string;
};
export type JwtPayloadWithPhone = {
  id: string;
  phone: string;
};

export type RefreshTokenPayloadWithUserName = JwtPayloadWithUserName & { refreshToken: string };
export type RefreshTokenPayloadWithEmail = JwtPayloadWithEmail & { refreshToken: string };
export type RefreshTokenPayloadWithPhone = JwtPayloadWithPhone & { refreshToken: string };

export type JwtPayload = JwtPayloadWithEmail | JwtPayloadWithPhone | JwtPayloadWithUserName;
export type JwtPayloadWithRefreshToken =
  | RefreshTokenPayloadWithEmail
  | RefreshTokenPayloadWithPhone
  | RefreshTokenPayloadWithUserName;
