import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '~/prisma';
import { CreateUserDTO, UpdateUserDTO, UpdatePasswordUserDTO } from '~/user/dto';
import {
  ERROR_CREATE_USER,
  ERROR_USER_ALREADY_EXIST,
  CREATE_USER_SUCCESS,
  ERROR_UPDATE_USER,
  UPDATE_USER_SUCCESS,
  CHANGE_PASSWORD_USER_SUCCESS,
  ERROR_CHANGE_PASSWORD_USER,
  ERROR_USER_NOT_FOUND,
  ERROR_PASSWORD_USER_INCORRECT,
  ERROR_PASSWORD_USER_NOT_MATCH,
  ERROR_PASSWORD_USER_UNSAFE,
  ERROR_IS_NOT_DATE_TIME,
  ERROR_IS_NOT_PHONE_NUMBER,
} from '~/user/constances';
import { DATE_TIME, PASSWORD, PHONE, ResponseFailure, ResponseSuccess, SHA256 } from '@/utils';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async get(id: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id: id } });
      if (user) {
        return ResponseFailure({
          error: ERROR_USER_NOT_FOUND,
          statusCode: HttpStatus.CONFLICT,
        });
      }
      return user;
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || ERROR_USER_NOT_FOUND,
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }
  async create(data: CreateUserDTO) {
    try {
      const user = await this.prisma.user.findUnique({ where: { userName: data.userName } });
      if (user) {
        return ResponseFailure({
          error: ERROR_USER_ALREADY_EXIST,
          statusCode: HttpStatus.CONFLICT,
        });
      }
      if (!PASSWORD.check(data.password)) {
        return ResponseFailure({
          error: ERROR_PASSWORD_USER_UNSAFE,
          statusCode: HttpStatus.CONFLICT,
        });
      }
      if (!DATE_TIME.check(data.birthday)) {
        return ResponseFailure({
          error: ERROR_IS_NOT_DATE_TIME,
          statusCode: HttpStatus.CONFLICT,
        });
      }
      if (!PHONE.check(data.phone)) {
        return ResponseFailure({
          error: ERROR_IS_NOT_PHONE_NUMBER,
          statusCode: HttpStatus.CONFLICT,
        });
      }
      return ResponseSuccess({
        data: await this.prisma.user.create({
          data: {
            userName: data.userName,
            password: SHA256.hash(data.password),
            name: data.name,
            gender: data.gender,
            birthday: DATE_TIME.format(data.birthday),
            job: data.job,
            phone: data.phone,
          },
        }),
        message: CREATE_USER_SUCCESS,
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || ERROR_CREATE_USER,
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }

  async update(data: UpdateUserDTO, id: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        return ResponseFailure({
          error: ERROR_USER_NOT_FOUND,
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }

      return ResponseSuccess({
        data: await this.prisma.user.update({ where: { id }, data: data }),
        message: UPDATE_USER_SUCCESS,
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: ERROR_UPDATE_USER,
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }
  }

  async changePass(data: UpdatePasswordUserDTO, id: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });

      if (!user) {
        return ResponseFailure({
          error: ERROR_USER_NOT_FOUND,
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }

      if (SHA256.verify(data.password, user.password)) {
        return ResponseFailure({
          error: ERROR_PASSWORD_USER_INCORRECT,
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }

      if (!PASSWORD.check(user.password)) {
        return ResponseFailure({
          error: ERROR_PASSWORD_USER_UNSAFE,
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }

      if (data.conformNewPassword !== data.password) {
        return ResponseFailure({
          error: ERROR_PASSWORD_USER_NOT_MATCH,
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }

      return ResponseSuccess({
        data: await this.prisma.user.update({ where: { id }, data: { password: SHA256.hash(data.newPassword) } }),
        message: CHANGE_PASSWORD_USER_SUCCESS,
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || ERROR_CHANGE_PASSWORD_USER,
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }
}