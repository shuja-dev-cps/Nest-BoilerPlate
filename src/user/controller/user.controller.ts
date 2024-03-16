import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  BadRequestException
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    try {
      return this.userService.findAll();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get('/get-one/:id')
  findOne(@Param('id') id: string) {
    try {
      return this.userService.findOne(id);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post('/create-user')
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.create(createUserDto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Put('/update-user/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.userService.update(id, updateUserDto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Delete('/delete-user/:id')
  remove(@Param('id') id: string) {
    try {
      return this.userService.remove(id);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
