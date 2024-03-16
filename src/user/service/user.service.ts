import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { User as UserInterface } from '../interface/user.interface';
@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserInterface> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = {
        ...createUserDto,
        password: hashedPassword,
      };
      return await this.userModel.create(user);
    } catch (err) {
      throw new ConflictException(`Error creating user: ${err.message}`);
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserInterface | null> {
    try {
      const { password, ...rest } = updateUserDto;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateUserDto = { ...rest, password: hashedPassword };
      }
      const updatedUser = await this.userModel.findByIdAndUpdate(
        id,
        updateUserDto,
        { new: true },
      );

      if (!updatedUser) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return updatedUser;
    } catch (err) {
      throw new ConflictException(`Error updating user: ${err.message}`);
    }
  }

  async remove(id: string): Promise<UserInterface | null> {
    try {
      const deletedUser = await this.userModel.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
      );
      if (!deletedUser) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return deletedUser;
    } catch (err) {
      throw new ConflictException(`Error deleting user: ${err.message}`);
    }
  }

  async findOne(id: string): Promise<UserInterface | null> {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return user;
    } catch (err) {
      throw new ConflictException(`Error finding user: ${err.message}`);
    }
  }

  async findAll(): Promise<UserInterface[]> {
    try {
      return await this.userModel.find({
        isDeleted: false,
      });
    } catch (err) {
      throw new ConflictException(`Error finding users: ${err.message}`);
    }
  }
}
