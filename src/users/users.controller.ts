import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { AddRoleDto } from "src/users/dto/add-role.dto";
import { BanUserDto } from "src/users/dto/ban-user.dto";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { User } from "src/users/users.model";
import { UsersService } from "src/users/users.service";

// В контроллере мы лишь прописываем пути запросов к api и методы, которые берут логику из нужных классов
@ApiTags("Пользователи") //заголовок блока контроллера
@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  //   post запрос на создание пользователя, внутрь передаем данные пользователя по схеме userDto
  @ApiOperation({ summary: "Создание пользователя" }) //Документирование для swagger
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe) //pipe для проверки через ValidationPipe
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: "Получение всех пользователей" })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard) //проверка на авторизацию
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }
  @ApiOperation({ summary: "Выдача ролей" })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard) //проверка на авторизацию
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post("/role")
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }
  @ApiOperation({ summary: "Бан пользователя" })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard) //проверка на авторизацию
  @Roles("ADMIN") //роль тех, кто может банить
  @UseGuards(RolesGuard)
  @Post("/ban")
  banUser(@Body() dto: BanUserDto) {
    return this.userService.banUser(dto);
  }
}
