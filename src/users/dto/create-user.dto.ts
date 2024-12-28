import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  // Документация для swagger
  @ApiProperty({
    example: "exsample@gmail.com",
    description: "Уникальный email",
  })
  @IsString({ message: "Должно быть строкой" })
  readonly username: string;

  @IsString({ message: "Должно быть строкой" })
  @IsEmail({}, { message: "Введите email" })
  readonly email: string;

  @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
  @IsString({ message: "Должно быть строкой" })
  @Length(4, 16, { message: "Не меньше 4 и не больше 16 символов" })
  readonly password: string;
}
