import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Video } from "src/videos/videos.model";

@Table({ tableName: "comments" })
export class Comment extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  commentId: number;

  @ForeignKey(() => User)
  @Column({ allowNull: false, type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => Video)
  @Column({ allowNull: false, type: DataType.INTEGER })
  videoId: number;

  @Column({ allowNull: false, type: DataType.TEXT })
  content: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Video)
  video: Video;
}
