import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { UserRoles } from "src/roles/user-roles.model";
import { User } from "src/users/users.model";

interface RoleCreationAttrs {
  value: string;
  description: string;
}

// Декорируем как таблицу, указывая название
@Table({ tableName: "roles" })
export class Role extends Model<Role, RoleCreationAttrs> {
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
    example: "ADMIN",
    description: "Значение роли пользователя",
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  value: string;

  @ApiProperty({
    example: "Ответственный за весь сайт",
    description: "Описание роли пользователя",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  // реализация связи many-many для того, чтобы у одного пользователя было много ролей и у ролей много пользователей
  @BelongsToMany(() => User, () => UserRoles) //Указываем с чем связываем и в какую таблицу помещаем
  users: User[];
}
