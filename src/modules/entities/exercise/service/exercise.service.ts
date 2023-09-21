import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma';
import { UpdateExerciseDTO, ExerciseDTO } from '../dto';
import { ResponseFailure, ResponseSuccess } from '@/utils';

@Injectable()
export class ExerciseService {
  constructor(private prisma: PrismaService) {}

  async create(dto: ExerciseDTO) {
    try {
      return ResponseSuccess({
        data: await this.prisma.exercise.create({
          data: dto,
        }),
        message: 'CREATE_EXERCISE_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_CREATE_EXERCISE',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }
  async update(id: string, dto: UpdateExerciseDTO) {
    try {
      const exercise = await this.prisma.exercise.findUnique({
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
        data: await this.prisma.exercise.update({
          where: {
            id: id,
          },
          data: dto,
        }),
        message: 'UPDATE_EXERCISE_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_UPDATE_EXERCISE',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }
  async delete(id: string) {
    try {
      const exercise = await this.prisma.exercise.findUnique({
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
        data: await this.prisma.exercise.delete({
          where: {
            id: id,
          },
        }),
        message: 'DELETE_EXERCISE_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_DELETE_EXERCISE',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }
}
