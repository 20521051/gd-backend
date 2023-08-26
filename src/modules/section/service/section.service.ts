import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma';
import { UpdateSectionDTO, SectionDTO, UpdateVideoSectionDTO } from '../dto';
import { BCRYPT, ResponseFailure, ResponseSuccess } from '@/utils';

@Injectable()
export class SectionService {
  constructor(private prisma: PrismaService) {}

  async create(dto: SectionDTO) {
    try {
      const index = await this.prisma.section.findMany({
        where: {
          title: dto.title,
        },
      });
      index.forEach((element) => {
        if (dto.title === element.title) {
          return ResponseFailure({
            error: 'ERROR_INDEX_ALREADY_EXISTS',
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }
      });

      return ResponseSuccess({
        data: await this.prisma.section.create({
          data: dto,
        }),
        message: 'CREATE_INDEX_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_CREATE_INDEX',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }

  async update(id: string, dto: UpdateSectionDTO) {
    try {
      const index = await this.prisma.section.findUnique({
        where: {
          id: id,
        },
      });
      if (!index) {
        return ResponseFailure({
          error: 'ERROR_INDEX_NOT_FOUND',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      return ResponseSuccess({
        data: await this.prisma.section.update({
          where: {
            id: id,
          },
          data: dto,
        }),
        message: 'UPDATE_INDEX_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_UPDATE_INDEX',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }

  async insertVideo(id: string, dto: UpdateVideoSectionDTO) {
    try {
      const index = await this.prisma.section.findUnique({
        where: {
          id: id,
        },
      });
      if (!index) {
        return ResponseFailure({
          error: 'ERROR_INDEX_NOT_FOUND',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      if (dto.index > index.video.length) {
        return ResponseFailure({
          error: 'ERROR_INDEX_OF_VIDEO_INVALID',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }

      const result = index.video;
      dto.index >= 0 ? result.splice(dto.index, 0, BCRYPT.hash(dto.video)) : result.push(BCRYPT.hash(dto.video));
      return ResponseSuccess({
        data: await this.prisma.section.update({
          where: {
            id: id,
          },
          data: {
            video: result,
          },
        }),
        message: 'INSERT_VIDEO_INDEX_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_INSERT_VIDEO_INDEX',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }

  async removeVideo(id: string, dto: UpdateVideoSectionDTO) {
    try {
      const index = await this.prisma.section.findUnique({
        where: {
          id: id,
        },
      });
      if (!index) {
        return ResponseFailure({
          error: 'ERROR_INDEX_NOT_FOUND',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      if (dto.index < index.video.length && dto.index >= 0) {
        return ResponseFailure({
          error: 'ERROR_INDEX_OF_VIDEO_INVALID',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      const result = index.video;
      result.splice(dto.index, 1);
      return ResponseSuccess({
        data: await this.prisma.section.update({
          where: {
            id: id,
          },
          data: {
            video: result,
          },
        }),
        message: 'REMOVE_VIDEO_INDEX_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_REMOVE_VIDEO_INDEX',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }

  async delete(id: string) {
    try {
      const index = await this.prisma.section.findUnique({
        where: {
          id: id,
        },
      });
      if (!index) {
        return ResponseFailure({
          error: 'INDEX_NOT_FOUND',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      return ResponseSuccess({
        data: await this.prisma.section.delete({
          where: {
            id: id,
          },
        }),
        message: 'DELETE_INDEX_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_DELETE_INDEX',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }
}
