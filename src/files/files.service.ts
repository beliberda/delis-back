import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";

@Injectable()
export class FilesService {
  async createFile(file: Express.Multer.File): Promise<string> {
    try {
      // Генерация уникального имени файла
      const fileName = uuid.v4() + path.extname(file.originalname);
      const filePath = path.resolve(__dirname, "../../", "uploads");

      // Проверяем наличие папки, если её нет — создаем
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      // Путь к файлу
      const fullPath = path.join(filePath, fileName);
      console.log("Saving file to:", fullPath);
      console.log("File buffer:", file.buffer);
      // Сохраняем файл на диск
      fs.writeFileSync(fullPath, file.buffer);

      return "http://localhost:" + process.env.PORT + "/uploads/" + fileName; // Возвращаем имя файла
    } catch (error) {
      throw new HttpException(
        "Ошибка при записи файла",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
