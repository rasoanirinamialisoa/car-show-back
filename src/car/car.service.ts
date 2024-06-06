import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './car.entity';
import { CreateCarDto, UpdateCarDto } from './car.dto';

@Injectable()
export class CarService {
    constructor(@InjectRepository(Car) private carRepository: Repository<Car>) {}

    async getAll(): Promise<Car[]> {
        try {
            return await this.carRepository.find();
        } catch (error) {
            throw new Error("Failed to get all cars");
        }
    }
    
    async createCar(car: CreateCarDto): Promise<Car> {
        try {
            return await this.carRepository.save(car);
        } catch (error) {
            throw new Error("Failed to create car");
        }
    }

    async updateCar(carDto: UpdateCarDto, id: number): Promise<Car> {
        try {
            const carToUpdate = await this.carRepository.findOne({where : { id }});
            if (!carToUpdate) {
                throw new Error("Car not found");
            }
            const updatedCar = this.carRepository.merge(carToUpdate, carDto);
            return await this.carRepository.save(updatedCar);
        } catch (error) {
            throw new Error("Failed to update car");
        }
    }

    async deleteCar(id: number): Promise<void> {
        try {
            const result = await this.carRepository.delete(id);
            if (result.affected === 0) {
                throw new Error("Car not found");
            }
        } catch (error) {
            throw new Error("Failed to delete car");
        }
    }

    async searchByModel(model: string): Promise<Car[]> {
        try {
            return await this.carRepository.find({ where: { model } });
        } catch (error) {
            throw new Error("Failed to search cars by model");
        }
    }

    async searchByMotorType(motorType: string): Promise<Car[]> {
        try {
            return await this.carRepository.find({ where: { motorType } });
        } catch (error) {
            throw new Error("Failed to search cars by motorType");
        }
    }

    async searchByBrand(brand: string): Promise<Car[]> {
        try {
            return await this.carRepository.find({ where: { brand } });
        } catch (error) {
            throw new Error("Failed to search cars by brand");
        }
    }

    async searchByPrice(price: number): Promise<Car[]> {
        try {
            return await this.carRepository.find({ where: { price } });
        } catch (error) {
            throw new Error("Failed to search cars by price");
        }
    }
}
