import { Body, Controller, Get, Post, Put, Delete, Param, NotFoundException, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, SigninUserDto, SignupUserDto } from './user.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    async getAll() {
        try {
            return await this.userService.getAll();
        } catch (error) {
            return {
                error: true,
                message: error.message
            }
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get user by id' })
    async getById(@Param('id') id: number) {
        try {
            const user = await this.userService.getById(id);
            if (!user) {
                throw new NotFoundException('User not found');
            }
            return user;
        } catch (error) {
            return {
                error: true,
                message: error.message
            }
        }
    }

    @Post()
    @ApiOperation({ summary: 'Create user' })
    async create(@Body() createUserDto: CreateUserDto) {
        try {
            return await this.userService.create(createUserDto);
        } catch (error) {
            return {
                error: true,
                message: error.message
            }
        }
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update user' })
    async update(@Param('id') id: number, @Body() updateUserDto: CreateUserDto) {
        try {
            return await this.userService.update(id, updateUserDto);
        } catch (error) {
            return {
                error: true,
                message: error.message
            }
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete user' })
    async delete(@Param('id') id: number) {
        try {
            return await this.userService.delete(id);
        } catch (error) {
            return {
                error: true,
                message: error.message
            }
        }
    }
}
