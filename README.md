# Stay in touch

- Author - Hoàng An
- Facebook - [Nguyễn Hoàng An](https://www.facebook.com/profile.php?id=100026299908997)

## Installation

```bash
$ yarn
```

## Prisma

Written our schema

```bash
$ npx prisma db push
```

View collection

```bash
$ npx prisma studio
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

# Database

## Diagram service - controller

```mermaid
flowchart  TD
    MongoDB --> Prisma
    Prisma --> UserService --> GlobalState --> UserController
    Prisma --> CourseService --> GlobalState --> CourseController
    Prisma --> VideoService --> GlobalState --> VideoController
    Prisma --> BlogService --> GlobalState --> BlogController
    Prisma --> CategoryService --> GlobalState --> CategoryController
    Prisma --> CommentService --> GlobalState --> CommentController
    Prisma --> ContentService --> GlobalState --> ContentController
    Prisma --> ExerciseService --> GlobalState --> ExerciseController
    Prisma --> NotificationService --> GlobalState --> NotificationController

```

## Diagram relationship

```mermaid
flowchart  TD
    User
    Category
    Course
    Comment
    Index
    Video
    Blog
    Exercise
    Notification

    Course --> Category
    Comment --> User
    Course --> Index
    Index --> Video
    Blog --> User
    Blog --> Category
    Index --> Exercise
    Course --> Exercise
    Exercise --> User
    Notification --> User
    Video --> Comment
    User --> Course
    User --> Blog

```
