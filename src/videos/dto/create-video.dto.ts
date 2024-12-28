import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateVideoDto {
  @ApiProperty({ example: "Новое название видео" })
  @IsString({ message: "Должно быть строкой" })
  readonly title: string;

  @ApiProperty({ example: "Длинное описание видеоролика" })
  @IsString({ message: "Должно быть строкой" })
  readonly description: string;
  @ApiProperty({ example: "название файла видеоролика" })
  @IsString({ message: "Должно быть строкой" })
  readonly videoSrc: string;

  @IsNumber()
  readonly userId: number;

  @IsOptional()
  readonly tags?: string;
}
