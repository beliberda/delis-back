import { Module } from "@nestjs/common";
import { RolesController } from "./roles.controller";
import { RolesService } from "src/roles/roles.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Role } from "src/roles/roles.model";
import { User } from "src/users/users.model";
import { UserRoles } from "src/roles/user-roles.model";

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [SequelizeModule.forFeature([Role, User, UserRoles]), RolesModule],
  exports: [RolesService],
})
export class RolesModule {}
