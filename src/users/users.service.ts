import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RolesService } from "src/roles/roles.service";
import { AddRoleDto } from "src/users/dto/add-role.dto";
import { BanUserDto } from "src/users/dto/ban-user.dto";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { User } from "src/users/users.model";
// сервис можно внедрять в контроллер

// В сервисах должна быть логика по работе с данными, фильтрация, поиск и т.д. ОНА ОТДЕЛЕНА ОТ ОСТАЛЬНОГО
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService
  ) {}
  async createUser(dto: CreateUserDto) {
    // обращение к бд - асинхронная функция, обращаемся к репозиторию и вызываем функию создания, внутрь передаем dto юзера
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue("USER"); //роль по умолчанию
    if (role) {
      await user.$set("roles", [role.id]);
      user.roles = [role];
    }

    return user;
  }
  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }
  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true }, //чтобы подтягивались все поля, включая роли
    });
    return user;
  }

  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      include: { all: true }, //чтобы подтягивались все поля, включая роли
    });
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (user && role) {
      await user.$add("role", role.id);
      return dto;
    }
    throw new HttpException(
      "Пользователь или роль не найдены",
      HttpStatus.NOT_FOUND
    );
  }
  async banUser(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (user) {
      user.banned = true;
      user.banReason = dto.reason;
      await user.save(); //обновление ползователя в базе
      return user;
    }
    throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);
  }
}
