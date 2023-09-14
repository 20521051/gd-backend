# syntax=docker/dockerfile:1

# Sử dụng image node làm base image
FROM node:18-alpine

# Thiết lập thư mục làm việc cho ứng dụng
WORKDIR /app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package.json yarn.lock ./

# Cài đặt các phụ thuộc
RUN yarn install --production

# Sao chép mã nguồn ứng dụng vào thư mục làm việc
COPY . .

# Build project
RUN yarn build

# Mở cổng 5000 cho ứng dụng NestJS
EXPOSE 5000

# Khởi chạy ứng dụng NestJS
CMD ["yarn", "dist/main.js"]