import { Controller, Get, Param, Res, HttpException, HttpStatus } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

@Controller('images')
@ApiTags('Images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService){}

    @Get()
    @ApiOperation({summary: 'Get all images'})
    getAll() {
        try {
            return this.imagesService.getAll();
        } catch (error) {
            return {
                error: true,
                message: error.message
            };
        }
    }

    @Get(':carId')
    @ApiOperation({summary: 'Get image by car ID'})
    @ApiResponse({ status: 200, description: 'Image fetched successfully.'})
    @ApiResponse({ status: 404, description: 'Image not found.'})
    async getByCarId(@Param('carId') carId: number) {
        try {
            const image = await this.imagesService.getByCarId(carId);
            if (!image) {
                throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
            }
            return image;
        } catch (error) {
            return {
                error: true,
                message: error.message
            };
        }
    }
}
