import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { FilesModule } from "src/files/files.module";
import { PostsController } from "src/posts/posts.controller";
import { Post } from "src/posts/posts.model";
import { PostsService } from "src/posts/posts.service";
import { User } from "src/users/users.model";

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [SequelizeModule.forFeature([User, Post]), FilesModule],
})
export class PostsModule {}
