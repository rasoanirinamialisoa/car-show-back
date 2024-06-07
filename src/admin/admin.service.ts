import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  findOne(id: number): Promise<Admin> {
    return this.adminRepository.findOneBy({ id });
  }

  async create(admin: Admin): Promise<Admin> {
    return this.adminRepository.save(admin);
  }

  async update(id: number, admin: Admin): Promise<void> {
    await this.adminRepository.update(id, admin);
  }

  async remove(id: number): Promise<void> {
    await this.adminRepository.delete(id);
  }
}
