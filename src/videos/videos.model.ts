import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";

@Table({ tableName: "videos" })
export class Video extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  videoId: number;

  @Column({ allowNull: false, type: DataType.STRING })
  title: string;

  @Column({ allowNull: true, type: DataType.TEXT })
  description: string;

  @Column({ allowNull: false, type: DataType.STRING })
  videoSrc: string;

  @Column({ allowNull: true, type: DataType.STRING })
  tags: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  duration: number;

  @Column({ allowNull: true, type: DataType.INTEGER, defaultValue: 0 })
  likes: number;

  @Column({ allowNull: true, type: DataType.INTEGER, defaultValue: 0 })
  dislikes: number;

  @Column({ allowNull: true, type: DataType.INTEGER, defaultValue: 0 })
  views: number;

  @Column({ allowNull: true, type: DataType.STRING })
  preview: string;
}
