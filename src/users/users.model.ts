import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Post } from "src/posts/posts.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttrs {
  email: string;
  password: string;
}

// Декорируем как таблицу, указывая название
@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный идентификатор" })
  // каждому полю нужно указать конфигурацию, тип, уникальность и т.д.
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({
    example: "exsample@gmail.com",
    description: "Уникальная почта пользователя",
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @ApiProperty({ example: "jhon_doe", description: "логин пользователя" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;
  @ApiProperty({ example: "Иван", description: "Имя пользователя" })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  first_name: string;
  @ApiProperty({ example: "Иванов", description: "Фамилия пользователя" })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  last_name: string;
  @ApiProperty({ example: "1234", description: "пароль пользователя" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({
    example: "false",
    description: "Забанен или нет, по умолчанию false",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  banned: boolean;

  @ApiProperty({ example: "бан за бан", description: "Описание причины бана" })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  banReason: string;

  // Связка many-many relationship от пользователя к ролям
  @BelongsToMany(() => Role, () => UserRoles) //Указываем с чем связываем и в какую таблицу помещаем
  roles: Role[];

  // Много постов у одного пользователя
  @HasMany(() => Post)
  posts: Post[];
}
