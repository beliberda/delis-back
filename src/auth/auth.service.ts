import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcryptjs";
import { User } from "src/users/users.model";
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}
  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    const candidate_username = await this.userService.getUserByUsername(
      userDto.username
    );
    if (candidate || candidate_username) {
      throw new HttpException(
        "Такой пользователь уже существует",
        HttpStatus.BAD_REQUEST
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }
  private async generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  // Валидация пользователя
  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByUsername(userDto.username);
    // если пользователя нет, то отправляем, что такого нет
    if (!user)
      throw new HttpException(
        { message: "User not found" },
        HttpStatus.BAD_REQUEST
      );
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: "Некорректное имя пользователя или пароль",
    });
  }
}
