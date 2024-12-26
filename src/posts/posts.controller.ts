import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreatePostDto } from "src/posts/dto/create-post.dto";
import { PostsService } from "src/posts/posts.service";

@Controller("posts")
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post("/create")
  @UseInterceptors(FileInterceptor("image"))
  createPost(@Body() dto: CreatePostDto, @UploadedFile() image: any) {
    return this.postService.createPost(dto, image);
  }
}
