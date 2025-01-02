import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";

import { UsersModule } from "./users/users.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { User } from "src/users/users.model";

import { RolesModule } from "./roles/roles.module";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";
import { AuthModule } from "./auth/auth.module";
import { PostsModule } from "./posts/posts.module";
import { Post } from "src/posts/posts.model";
import { FilesModule } from "./files/files.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { VideosModule } from "./videos/videos.module";
import { CommentsModule } from "./comments/comments.module";
import * as path from "path";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { LoggerMiddleware } from "src/middlewares/LoggerMiddleware";

@Module({
  controllers: [],
  providers: [],
  //   Когда хотим в один модуль импортировать другие модули (например для работы с бд sequalize)
  imports: [
    MulterModule.register({
      dest: "../uploads", // Временная папка для хранения файлов
      limits: {
        fileSize: 100 * 1024 * 1024, // Лимит размера файла 100MB
      },
    }),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, "..", "uploads"), // Указываем путь к папке uploads
      serveRoot: "/uploads", // Базовый URL для доступа к файлам
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Post],
      //   автосоздание таблиц в бд на основе данных, которые мы будем создавать
      autoLoadModels: true,
      //   synchronize: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PostsModule,
    FilesModule,
    VideosModule,
    CommentsModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: "/videos/:id", method: RequestMethod.ALL });
  }
}
