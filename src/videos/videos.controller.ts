// video.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Req,
  UploadedFiles,
} from "@nestjs/common";
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from "@nestjs/platform-express";

import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateVideoDto } from "src/videos/dto/create-video.dto";
import { VideoService } from "src/videos/videos.service";

@Controller("videos")
export class VideoController {
  constructor(private readonly videoService: VideoService) {}
  @UseInterceptors(
    FileInterceptor("preview")
    // FileFieldsInterceptor([
    //   { name: "preview", maxCount: 1 },
    //   { name: "videoSrc", maxCount: 1 },
    // ])
  )
  @Post("/create")
  create(
    @Body() dto: CreateVideoDto,
    @UploadedFile() // files: { preview?: Express.Multer.File[]; videoSrc?: Express.Multer.File[] }
    file: Express.Multer.File
  ) {
    // console.log("Body:", dto);
    // console.log("Files object:", files);
    console.log("DTO:", dto);
    if (!file) {
      throw new Error("Files not received.");
    }
    // if (!files || !files.preview?.[0] || !files.videoSrc?.[0]) {
    //   throw new Error("Both preview and video files must be provided.");
    // }

    const preview = file;
    // const videoSrc = files.videoSrc[0];

    return this.videoService.createVideo(dto, preview);
  }
  @UseInterceptors(FileInterceptor("videoSrc"))
  @Post("/upload")
  upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error("File not received.");
    }

    return this.videoService.uploadVideo(file);
  }
  @Put(":videoId")
  update(@Param("videoId") videoId: number, @Body() videoData: CreateVideoDto) {
    return this.videoService.updateVideo(videoId, videoData);
  }

  @Delete(":videoId")
  delete(@Param("videoId") videoId: number) {
    return this.videoService.deleteVideo(videoId);
  }
  @Get(":videoId")
  findOne(@Param("videoId") videoId: number) {
    console.log("VideoID", videoId);
    return this.videoService.getVideoById(videoId);
  }
  @Get()
  findAll() {
    console.log("GEt all");

    return this.videoService.getAllVideo();
  }
}
