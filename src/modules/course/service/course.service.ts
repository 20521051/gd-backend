import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma';
import { ResponseFailure, ResponseSuccess, BCRYPT } from '@/utils';
import { CourseDTO } from '../dto';
import { UpdateCourseDTO } from '../dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CourseDTO) {
    try {
      const course = await this.prisma.course.findMany({
        where: {
          name: dto.name,
          owner: dto.owner,
        },
      });
      if (course) {
        return ResponseFailure({
          error: 'COURSE_ALREADY_EXISTS',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }

      return ResponseSuccess({
        data: await this.prisma.course.create({
          data: dto,
        }),
        message: 'CREATE_COURSE_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_CREATE_COURSE',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }
  async update(id: string, dto: UpdateCourseDTO) {
    try {
      const course = await this.prisma.course.findUnique({
        where: {
          id: id,
        },
      });
      if (!course) {
        return ResponseFailure({
          error: 'COURSE_NOT_FOUND',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      return ResponseSuccess({
        data: await this.prisma.course.update({
          where: {
            id: id,
          },
          data: dto,
        }),
        message: 'UPDATE_COURSE_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_UPDATE_COURSE',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }
  async delete(id: string) {
    try {
      const course = await this.prisma.course.findUnique({
        where: {
          id: id,
        },
      });
      if (!course) {
        return ResponseFailure({
          error: 'COURSE_NOT_FOUND',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      return ResponseSuccess({
        data: await this.prisma.course.delete({
          where: {
            id: id,
          },
        }),
        message: 'DELETE_COURSE_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_DELETE_COURSE',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }
}
