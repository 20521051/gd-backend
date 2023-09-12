import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma';
import { ResponseFailure, ResponseSuccess } from '@/utils';
import { CommentDTO } from '../dto';
import { UpdateCommentDTO } from '../dto/update-comment.dto';
/* 
  key futures: Comment service
  + create comment
    insert Comment on right
  + update comment
  + delete comment
  + get comment
  + get a list of comments
*/
@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CommentDTO) {
    try {
      const owner = await this.prisma.user.findUnique({
        where: {
          id: dto.owner,
        },
      });
      if (!owner) {
        return ResponseFailure({
          error: 'ERROR_OWNER_NOT_FOUND',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      if (!dto.parent) {
        return ResponseSuccess({
          data: await this.prisma.comment.create({
            data: {
              owner: dto.owner,
              content: dto.content,
              image: dto.image,
              about: dto.about,
              at: dto.at,
              parent: null,
              left: 1,
              right: 2,
            },
          }),
          message: 'CREATE_COMMENT_SUCCESS',
        });
      }
      const commentParent = await this.prisma.comment.findUnique({
        where: {
          id: dto.parent,
        },
      });
      if (!commentParent) {
        return ResponseFailure({
          error: 'ERROR_COMMENT_PARENT_NOT_FOUND',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      if (!commentParent.parent) {
        await this.prisma.comment.update({
          where: {
            id: commentParent.id,
          },
          data: {
            right: commentParent.right + 2,
          },
        });
        return ResponseSuccess({
          data: await this.prisma.comment.create({
            data: {
              owner: dto.owner,
              content: dto.content,
              image: dto.image,
              about: dto.about,
              at: dto.at,
              parent: dto.parent,
              left: commentParent.right,
              right: commentParent.right + 1,
            },
          }),
          message: 'CREATE_COMMENT_SUCCESS',
        });
      } else {
        const comments = await this.prisma.comment.findMany({
          where: {
            at: dto.at,
            right: {
              gte: commentParent.right,
            },
          },
        });
        await Promise.all(
          comments.map(async (item) => {
            if (item.left > commentParent.right) {
              await this.prisma.comment.update({
                where: {
                  id: item.id,
                },
                data: {
                  left: item.left + 2,
                  right: item.right + 2,
                },
              });
            } else {
              await this.prisma.comment.update({
                where: {
                  id: item.id,
                },
                data: {
                  right: item.right + 2,
                },
              });
            }
          }),
        );
      }

      return ResponseSuccess({
        data: await this.prisma.comment.create({
          data: {
            owner: dto.owner,
            content: dto.content,
            image: dto.image,
            about: dto.about,
            at: dto.at,
            parent: null,
            left: commentParent.right,
            right: commentParent.right + 1,
          },
        }),
        message: 'CREATE_COMMENT_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_CREATE_COMMENT',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }

  async update(id: string, dto: UpdateCommentDTO) {
    try {
      const comment = await this.prisma.comment.findUnique({
        where: {
          id: id,
        },
      });
      if (!comment) {
        return ResponseFailure({
          error: 'COMMENT_NOT_FOUND',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      return ResponseSuccess({
        data: await this.prisma.comment.update({
          where: {
            id: id,
          },
          data: {
            content: dto.content,
            image: dto.image,
          },
        }),
        message: 'UPDATE_COMMENT_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_UPDATE_COMMENT',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }

  async delete(id: string) {
    try {
      const comment = await this.prisma.comment.findUnique({
        where: {
          id: id,
        },
      });
      if (!comment) {
        return ResponseFailure({
          error: 'COMMENT_NOT_FOUND',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      if (comment.isDeleted || comment.undo > 3) {
        await this.prisma.comment.deleteMany({
          where: {
            at: comment.at,
            AND: [{ left: { gte: comment.left } }, { right: { gte: comment.right } }],
          },
        });
        const comments = await this.prisma.comment.findMany({
          where: {
            at: comment.at,
            right: {
              gte: comment.right,
            },
          },
        });
        await Promise.all(
          comments.map(async (item) => {
            if (item.left > comment.right) {
              await this.prisma.comment.update({
                where: {
                  id: item.id,
                },
                data: {
                  left: item.left - 2,
                  right: item.right - 2,
                },
              });
            } else {
              await this.prisma.comment.update({
                where: {
                  id: item.id,
                },
                data: {
                  right: item.right - 2,
                },
              });
            }
          }),
        );

        return ResponseSuccess({
          data: true,
          message: 'DELETE_COMMENT_SUCCESS',
        });
      }
      return ResponseFailure({
        error: 'ERROR_THE_ACTION_HAS_BEEN_CANCELED',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_DELETE_COMMENT',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }

  async setIsDeleted(id: string) {
    try {
      const comment = await this.prisma.comment.findUnique({
        where: {
          id: id,
        },
      });
      if (!comment) {
        return ResponseFailure({
          error: 'COMMENT_NOT_FOUND',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      if (comment.isDeleted) {
        return ResponseSuccess({
          data: await this.prisma.comment.update({
            where: {
              id: id,
            },
            data: {
              isDeleted: false,
              undo: comment.undo + 1,
            },
          }),
          message: 'SET_IS_DELETED_COMMENT_SUCCESS',
        });
      }
      return ResponseSuccess({
        data: await this.prisma.comment.update({
          where: {
            id: id,
          },
          data: {
            isDeleted: true,
          },
        }),
        message: 'SET_IS_DELETED_COMMENT_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_SET_IS_DELETED_COMMENT',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }

  async get(id: string) {
    try {
      const comment = await this.prisma.comment.findUnique({
        where: {
          id: id,
        },
      });
      if (!comment) {
        return ResponseFailure({
          error: 'COMMENT_NOT_FOUND',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }

      return ResponseSuccess({
        data: comment,
        message: 'GET_COMMENT_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_GET_COMMENT',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }

  async getList(id: string) {
    try {
      const comment = await this.prisma.comment.findUnique({
        where: {
          id: id,
        },
      });
      if (!comment) {
        return ResponseFailure({
          error: 'COMMENT_NOT_FOUND',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }

      return ResponseSuccess({
        data: comment,
        message: 'GET_COMMENT_SUCCESS',
      });
    } catch (error) {
      console.log('Error: ', error);
      return ResponseFailure({
        error: error.response?.error || 'ERROR_GET_COMMENT',
        statusCode: error.response?.statusCode || HttpStatus.BAD_REQUEST,
      });
    }
  }
}
