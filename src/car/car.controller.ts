import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CarService } from './car.service';
import { CreateCarDto, UpdateCarDto } from './car.dto';

@Controller('car')
@ApiTags('Cars API')
export class CarController {
    constructor(private readonly carService: CarService){}
    @Get()
    @ApiOperation({ summary: 'Get all cars' })
    async GetAllCars() {
        try {
            return await this.carService.getAll();         
        } catch (error) {
            return {
                error:true,
                message:error.message
            }
        }
    }
    @Post('new')
    @ApiOperation({ summary: 'Create new car' })
    async CreateCar(@Body() CreateCarDto: CreateCarDto) {
        try {
            return await this.carService.createCar(CreateCarDto);
        } catch (error) {
            return {
                error:true,
                message:error.message
            }
        }
    }

    @Put("update/:id")
    @ApiOperation({ summary: 'Update car' })
    async UpdateCar(@Param('id') id: number, @Body() CarDto: UpdateCarDto) {
        try {
            return await this.carService.updateCar(CarDto, id);
        } catch (error) {
            return {
                error:true,
                message:error.message
            }
        }
    }
    
    @Delete('delete/:id')
    @ApiOperation({ summary: 'Delete car' })
    async DeleteCar(@Param('id') id: number) {
        try {
            return await this.carService.deleteCar(id);
        } catch (error) {
            return {
                error:true,
                message:error.message
            }
        }
    }


    @Get('search/:model')
    @ApiOperation({ summary: 'Search cars by model' })
    async searchByModel(@Param('model') model: string) {
        try {
            return await this.carService.searchByModel(model);
        } catch (error) {
            return {
                error: true,
                message: error.message
            };
        }
    }

    @Get('search/:motorType')
    @ApiOperation({ summary: 'Search cars by motorType' })
    async searchByMotorType(@Param('motorType') motorType: string) {
        try {
            return await this.carService.searchByMotorType(motorType);
        } catch (error) {
            return {
                error: true,
                message: error.message
            };
        }
    }

    @Get('search/:brand')
    @ApiOperation({ summary: 'Search cars by brand' })
    async searchByBrand(@Param('brand') brand: string) {
        try {
            return await this.carService.searchByBrand(brand);
        } catch (error) {
            return {
                error: true,
                message: error.message
            };
        }
    }

    @Get('search/:price')
    @ApiOperation({ summary: 'Search cars by price' })
    async searchByPrice(@Param('price') price: number) {
        try {
            return await this.carService.searchByPrice(price);
        } catch (error) {
            return {
                error: true,
                message: error.message
            };
        }
    }
}
