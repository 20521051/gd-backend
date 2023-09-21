import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../dto';
import { ResponseFailure, ResponseSuccess } from '@/utils';
import { CloudinaryService } from '@/modules/uploader';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService, private readonly cloudinary: CloudinaryService) {}

  async create(dto: CreateCategoryDTO) {
    try {
      const category = await this.prisma.category.findUnique({
        where: {
          name: dto.name,
        },
      });
      if (category) {
        return ResponseFailure({
          error: 'CATEGORY_ALREADY_EXISTS',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      return ResponseSuccess({
        data: await this.prisma.category.create({
          data: {
            name: dto.name,
            thumbnail: (await this.cloudinary.upload(dto.thumbnail, 'category')).public_id,
          },
        }),
        message: 'CREATE_CATEGORY_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_CREATE_CATEGORY',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }

  async update(dto: UpdateCategoryDTO) {
    try {
      const category = await this.prisma.category.findUnique({
        where: {
          name: dto.name,
        },
      });
      if (!category) {
        return ResponseFailure({
          error: 'CATEGORY_NOT_FOUND',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }

      return ResponseSuccess({
        data: await this.prisma.category.update({
          where: {
            name: dto.name,
          },
          data: {
            name: dto.newName || category.name,
            thumbnail:
              (await this.cloudinary.upload(dto.thumbnail, 'category', category.thumbnail)).public_id ||
              category.thumbnail,
          },
        }),
        message: 'UPDATE_CATEGORY_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_UPDATE_CATEGORY',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }

  async delete(name: string) {
    try {
      const category = await this.prisma.category.findUnique({
        where: {
          name: name,
        },
      });
      if (!category) {
        return ResponseFailure({
          error: 'CATEGORY_NOT_FOUND',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      return ResponseSuccess({
        data: await this.prisma.category.delete({
          where: {
            name: name,
          },
        }),
        message: 'DELETE_CATEGORY_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_DELETE_CATEGORY',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }
}
