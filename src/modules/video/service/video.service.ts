import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma';
import { UpdateVideoDTO, VideoDTO } from '../dto';
import { ResponseFailure, ResponseSuccess, BCRYPT } from '@/utils';

@Injectable()
export class VideoService {
  constructor(private prisma: PrismaService) {}

  async create(dto: VideoDTO) {
    try {
      const video = await this.prisma.video.findMany({
        where: {
          title: dto.title,
        },
      });
      video.forEach((element) => {
        if (BCRYPT.verify({ input: dto.link, hash: element.link })) {
          return ResponseFailure({
            error: 'VIDEO_ALREADY_EXISTS',
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }
      });

      return ResponseSuccess({
        data: await this.prisma.video.create({
          data: dto,
        }),
        message: 'CREATE_VIDEO_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_CREATE_VIDEO',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }
  async update(id: string, dto: UpdateVideoDTO) {
    try {
      const video = await this.prisma.video.findUnique({
        where: {
          id: id,
        },
      });
      if (!video) {
        return ResponseFailure({
          error: 'VIDEO_NOT_FOUND',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      return ResponseSuccess({
        data: await this.prisma.video.update({
          where: {
            id: id,
          },
          data: dto,
        }),
        message: 'UPDATE_VIDEO_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_UPDATE_VIDEO',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }
  async delete(id: string) {
    try {
      const video = await this.prisma.video.findUnique({
        where: {
          id: id,
        },
      });
      if (!video) {
        return ResponseFailure({
          error: 'VIDEO_NOT_FOUND',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      return ResponseSuccess({
        data: await this.prisma.video.delete({
          where: {
            id: id,
          },
        }),
        message: 'DELETE_VIDEO_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_DELETE_VIDEO',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }
}
