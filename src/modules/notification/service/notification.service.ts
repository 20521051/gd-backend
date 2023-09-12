import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma';
import { UpdateNotificationDTO, NotificationDTO } from '../dto';
import { ResponseFailure, ResponseSuccess } from '@/utils';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async create(dto: NotificationDTO) {
    try {
      return ResponseSuccess({
        data: await this.prisma.notification.create({
          data: dto,
        }),
        message: 'CREATE_NOTIFICATION_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_CREATE_NOTIFICATION',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }
  async update(id: string, dto: UpdateNotificationDTO) {
    try {
      const exercise = await this.prisma.notification.findUnique({
        where: {
          id: id,
        },
      });
      if (!exercise) {
        return ResponseFailure({
          error: 'EXERCISE_NOT_FOUND',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      return ResponseSuccess({
        data: await this.prisma.notification.update({
          where: {
            id: id,
          },
          data: dto,
        }),
        message: 'UPDATE_NOTIFICATION_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_UPDATE_NOTIFICATION',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }
  async delete(id: string) {
    try {
      const exercise = await this.prisma.notification.findUnique({
        where: {
          id: id,
        },
      });
      if (!exercise) {
        return ResponseFailure({
          error: 'EXERCISE_NOT_FOUND',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      return ResponseSuccess({
        data: await this.prisma.notification.delete({
          where: {
            id: id,
          },
        }),
        message: 'DELETE_NOTIFICATION_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_DELETE_NOTIFICATION',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }
}
