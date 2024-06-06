



import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, SigninUserDto, SignupUserDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) { }

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }


  async create(createUserDto: CreateUserDto): Promise<User> {
      const { Email, Password, Name } = createUserDto;
      const hashedPassword = await bcrypt.hash(Password, 10);
      const user = this.userRepository.save({ Email, Password, Name });
      return user;
  }
  async update(id: number, updateUserDto: CreateUserDto): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { Email, Password, Name } = updateUserDto;
    const hashedPassword = await bcrypt.hash(Password, 10);
    user.Email = Email;
    user.Password = hashedPassword;
    user.Name = Name;
    return this.userRepository.save(user);
  }

  async delete(id: number): Promise<{ deleted: boolean }> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
    return { deleted: true };
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { Email: email } });
  }

}
