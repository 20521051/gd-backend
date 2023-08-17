import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { CreateUserDTO, UpdateUserDTO } from '../dto';
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
} from '../constances';
import { UpdatePasswordUserDTO } from '../dto/update-password-user.dto';
import {
  ResponseFailure,
  check_date,
  check_phone_number,
  ResponseSuccess,
  format_date,
  check_password,
  compare_password,
  hash_password,
} from '@/utils';

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
      const user = await this.prisma.user.findUnique({ where: { username: data.username } });
      if (user) {
        return ResponseFailure({
          error: ERROR_USER_ALREADY_EXIST,
          statusCode: HttpStatus.CONFLICT,
        });
      }
      if (!check_password(data.password)) {
        return ResponseFailure({
          error: ERROR_PASSWORD_USER_UNSAFE,
          statusCode: HttpStatus.CONFLICT,
        });
      }
      if (!check_date(data.birthday)) {
        return ResponseFailure({
          error: ERROR_IS_NOT_DATE_TIME,
          statusCode: HttpStatus.CONFLICT,
        });
      }
      if (!check_phone_number(data.phone)) {
        return ResponseFailure({
          error: ERROR_IS_NOT_PHONE_NUMBER,
          statusCode: HttpStatus.CONFLICT,
        });
      }
      return ResponseSuccess({
        data: await this.prisma.user.create({
          data: {
            username: data.username,
            password: hash_password(data.password),
            name: data.name,
            gender: data.gender,
            birthday: format_date(data.birthday),
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

      if (compare_password(data.password, user.password)) {
        return ResponseFailure({
          error: ERROR_PASSWORD_USER_INCORRECT,
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }

      if (!check_password(user.password)) {
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
        data: await this.prisma.user.update({ where: { id }, data: { password: hash_password(data.newPassword) } }),
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
