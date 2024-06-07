import { Controller, Get, Param, Res, Post, Body, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateImagesDto } from './images.dto';
import { UpdateImagesDto } from './images.dto';

@Controller('images')
@ApiTags('Images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) { }

    @Get()
    @ApiOperation({ summary: 'Get all images' })
    async getAll() {
        try {
            return await this.imagesService.getAll();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Get(':carId')
    @ApiOperation({ summary: 'Get image by car ID' })
    @ApiResponse({ status: 200, description: 'Image fetched successfully' })
    @ApiResponse({ status: 404, description: 'Image not found' })
    async getByCarId(@Param('carId') carId: string) {
        try {
            return await this.imagesService.getByCarId(carId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Post('new')
    @ApiOperation({ summary: 'Create a new image' })
    @ApiResponse({ status: 201, description: 'Image created successfully' })
    async create(@Body() createImageDto: CreateImagesDto) {
        try {
            return await this.imagesService.create(createImageDto);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
