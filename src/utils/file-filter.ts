import { HttpException, HttpStatus } from '@nestjs/common';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/) && !file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
    return callback(new HttpException('Only image files are allowed!', HttpStatus.BAD_REQUEST), false);
  }
  callback(null, true);
};

export const audioFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(mp4|mp3|wav)$/) && !file.mimetype.match(/\/(mp4|mp3|wav)$/)) {
    return callback(new HttpException('Only audio files are allowed!', HttpStatus.BAD_REQUEST), false);
  }
  callback(null, true);
};

export const documentFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(doc|pdf|docx|txt)$/) && !file.mimetype.match(/\/(doc|pdf|docx|txt)$/)) {
    return callback(new HttpException('Only document files are allowed!', HttpStatus.BAD_REQUEST), false);
  }
  callback(null, true);
};

export const compressedFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(zip|rar|7z)$/) && !file.mimetype.match(/\/(zip|rar|7z)$/)) {
    return callback(new HttpException('Only document files are allowed!', HttpStatus.BAD_REQUEST), false);
  }
  callback(null, true);
};

export const fileFilter = (req, file, callback) => {
  if (
    !file.originalname.match(/\.(zip|rar|7z|doc|pdf|docx|txt|mp4|mp3|wav|}jpg|jpeg|png)$/) &&
    !file.mimetype.match(/\/(zip|rar|7z|doc|pdf|docx|txt|mp4|mp3|wav|jpg|jpeg|png)$/)
  ) {
    return callback(new HttpException('Only document files are allowed!', HttpStatus.BAD_REQUEST), false);
  }
  callback(null, true);
};

