import { HttpException } from '@nestjs/common';

export function ResponseSuccess<T>({ data, message }: { data: T; message: string }) {
  return {
    data,
    message,
  };
}

export function ResponseFailure({ error, statusCode }: { error: string; statusCode: number }) {
  throw new HttpException({ error, statusCode }, statusCode);
}
