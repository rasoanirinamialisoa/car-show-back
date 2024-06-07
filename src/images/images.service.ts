import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Images } from './images.entity';
import { Repository } from 'typeorm';
import { CreateImagesDto } from './images.dto';
import {  UpdateImagesDto } from './images.dto';

@Injectable()
export class ImagesService {
    constructor(@InjectRepository(Images) private imagesRepository: Repository<Images>){}

    async getAll(): Promise<Images[]> {
        try {
            return await this.imagesRepository.find();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getByCarId(carId: string): Promise<Images> {
        try {
            const parsedCarId = parseInt(carId); // Convertir la chaîne en nombre
            if (isNaN(parsedCarId)) {
                throw new HttpException('Invalid car ID', HttpStatus.BAD_REQUEST);
            }
            const image = await this.imagesRepository.findOne({ where: { carId: parsedCarId } });
            if (!image) {
                throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
            }
            return image;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    

    async create(createImageDto: CreateImagesDto): Promise<Images> {
        try {
            const newImage = this.imagesRepository.create(createImageDto);
            return await this.imagesRepository.save(newImage);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

 
    
    
}
