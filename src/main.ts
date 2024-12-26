import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "src/app.module";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  // настройка swaggera

  const config = new DocumentBuilder()
    .setTitle("Продвинутый Backend")
    .setDescription("Документация REST API")
    .setVersion("1.0.0")
    .addTag("auth")
    .build();

  // подключаем swagger к приложению и указываем путь к документации
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);

  await app.listen(PORT, () => console.log(`Server started on ${PORT}`));
}
start();
