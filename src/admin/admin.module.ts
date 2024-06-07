



import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
    controllers: [AdminController],
    providers: [AdminService],
    imports:[TypeOrmModule.forFeature([Admin]),JwtModule],
    
    exports:[AdminService]
})
export class AdminModule {}