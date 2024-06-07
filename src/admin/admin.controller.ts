import { Body, Controller, Get, Post, Put, Delete, Param, NotFoundException, BadRequestException } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAdminDto, UpdateAdminDto } from './admin.dto';

@Controller('admin')
@ApiTags('Admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Get()
    @ApiOperation({ summary: 'Get all admins' })
    async getAll() {
        try {
            return await this.adminService.findAll();
        } catch (error) {
            return {
                error: true,
                message: error.message
            }
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get admin by id' })
    async getById(@Param('id') id: number) {
        try {
            const admin = await this.adminService.findOne(id);
            if (!admin) {
                throw new NotFoundException('Admin not found');
            }
            return admin;
        } catch (error) {
            return {
                error: true,
                message: error.message
            }
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete admin' })
    async delete(@Param('id') id: number) {
        try {
            return await this.adminService.remove(id);
        } catch (error) {
            return {
                error: true,
                message: error.message
            }
        }
    }
}
