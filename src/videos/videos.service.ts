import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Comment } from "src/comments/comments.model";
import { FilesService } from "src/files/files.service";
import { CreateVideoDto } from "src/videos/dto/create-video.dto";
import { Video } from "src/videos/videos.model";

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video) private videoRepository: typeof Video,
    private fileService: FilesService
  ) {}

  async createVideo(
    dto: CreateVideoDto,
    preview: Express.Multer.File
  ): Promise<Video> {
    const previewName = await this.fileService.createFile(preview);

    const video = await this.videoRepository.create({
      ...dto,

      preview: previewName,
    });

    return video;
  }
  async uploadVideo(video: Express.Multer.File) {
    const videoName = await this.fileService.createFile(video);
    return videoName;
  }
  async getVideoById(videoId: number): Promise<Video | null> {
    const video = await this.videoRepository.findOne({
      where: { videoId: videoId },
    });
    if (video) {
      return video;
    }
    return null;
  }

  async updateVideo(
    videoId: number,
    updateData: any
  ): Promise<[number, Video[]]> {
    return this.videoRepository.update(updateData, {
      where: { videoId },
      returning: true,
    });
  }

  async getAllVideo() {
    const videos = await this.videoRepository.findAll({
      include: { all: true },
    });
    return videos;
  }

  async deleteVideo(videoId: number): Promise<number> {
    return this.videoRepository.destroy({ where: { videoId } });
  }
}
