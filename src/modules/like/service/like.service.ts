import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma';
import { LikeDTO } from '../dto';
import { ResponseFailure, ResponseSuccess } from '@/utils';

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}

  async get(id: string) {
    try {
      const like = await this.prisma.like.findUnique({
        where: {
          id: id,
        },
      });
      if (!like) {
        return ResponseFailure({
          error: 'LIKE_NOT_FOUND',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      return ResponseSuccess({
        data: like,
        message: 'GET_LIKE_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_GET_LIKE',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }

  async create(dto: LikeDTO) {
    try {
      return ResponseSuccess({
        data: await this.prisma.like.create({
          data: dto,
        }),
        message: 'CREATE_LIKE_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_CREATE_LIKE',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }
  async update(id: string, isLike: boolean) {
    try {
      const like = await this.prisma.like.findUnique({
        where: {
          id: id,
        },
      });
      if (!like) {
        return ResponseFailure({
          error: 'LIKE_NOT_FOUND',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      if (isLike) {
        return ResponseSuccess({
          data: await this.prisma.like.update({
            where: {
              id: id,
            },
            data: {
              isLike: true,
            },
          }),
          message: 'UPDATE_LIKE_SUCCESS',
        });
      }
      return ResponseSuccess({
        data: await this.prisma.like.update({
          where: {
            id: id,
          },
          data: {
            isLike: false,
          },
        }),
        message: 'UPDATE_UN_LIKE_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_UPDATE_LIKE',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }
  async delete(id: string) {
    try {
      const like = await this.prisma.like.findUnique({
        where: {
          id: id,
        },
      });
      if (!like) {
        return ResponseFailure({
          error: 'LIKE_NOT_FOUND',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      return ResponseSuccess({
        data: await this.prisma.like.delete({
          where: {
            id: id,
          },
        }),
        message: 'DELETE_LIKE_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_DELETE_LIKE',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }
}
