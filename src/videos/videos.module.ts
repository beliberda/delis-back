import { Module } from "@nestjs/common";
import { VideoService } from "./videos.service";
import { VideoController } from "./videos.controller";
import { Video } from "src/videos/videos.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { FilesModule } from "src/files/files.module";
import { User } from "src/users/users.model";

@Module({
  imports: [SequelizeModule.forFeature([Video, User]), FilesModule],
  providers: [VideoService],
  controllers: [VideoController],
})
export class VideosModule {}
