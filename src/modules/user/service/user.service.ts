import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '~/prisma';
import { CreateUserDTO, UpdateUserDTO, UpdatePasswordUserDTO } from '~/user/dto';
import { DATE_TIME, PHONE, ResponseFailure, ResponseSuccess, BCRYPT } from '@/utils';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async get(id: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id: id } });
      if (!user) {
        return ResponseFailure({
          error: 'ERROR_USER_NOT_FOUND',
          statusCode: HttpStatus.CONFLICT,
        });
      }
      return user;
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_USER_NOT_FOUND',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }
  async getAll() {
    try {
      const user = await this.prisma.user.findMany();
      if (!user) {
        return ResponseFailure({
          error: 'ERROR_USER_EMPTY',
          statusCode: HttpStatus.CONFLICT,
        });
      }
      return user;
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_USER_EMPTY',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }
  async create(data: CreateUserDTO) {
    try {
      const user = await this.prisma.user.findUnique({ where: { userName: data.userName } });
      if (user) {
        return ResponseFailure({
          error: 'ERROR_USER_ALREADY_EXIST',
          statusCode: HttpStatus.CONFLICT,
        });
      }

      if (!DATE_TIME.check(data.birthday)) {
        return ResponseFailure({
          error: 'ERROR_IS_NOT_DATE_TIME',
          statusCode: HttpStatus.CONFLICT,
        });
      }

      if (!PHONE.check(data.phone)) {
        return ResponseFailure({
          error: 'ERROR_IS_NOT_PHONE_NUMBER',
          statusCode: HttpStatus.CONFLICT,
        });
      }

      return await this.prisma.user.create({
        data: {
          userName: data.userName,
          password: BCRYPT.hash(data.password),
          name: data.name,
          gender: data.gender,
          birthday: DATE_TIME.format(data.birthday),
          job: data.job,
          phone: data.phone,
        },
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_CREATE_USER',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }

  async update(data: UpdateUserDTO, id: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        return ResponseFailure({
          error: 'ERROR_USER_NOT_FOUND',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }

      return ResponseSuccess({
        data: await this.prisma.user.update({ where: { id }, data: data }),
        message: 'UPDATE_USER_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: 'ERROR_UPDATE_USER',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }
  }

  async changePass(data: UpdatePasswordUserDTO, id: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });

      if (!user) {
        return ResponseFailure({
          error: 'ERROR_USER_NOT_FOUND',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }

      if (BCRYPT.verify({ input: data.password, hash: user.password })) {
        return ResponseFailure({
          error: 'ERROR_PASSWORD_USER_INCORRECT',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }

      if (data.conformNewPassword !== data.password) {
        return ResponseFailure({
          error: 'ERROR_PASSWORD_USER_NOT_MATCH',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }

      return ResponseSuccess({
        data: await this.prisma.user.update({ where: { id }, data: { password: BCRYPT.hash(data.newPassword) } }),
        message: 'CHANGE_PASSWORD_USER_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_CHANGE_PASSWORD_USER',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }
}
