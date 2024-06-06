import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports:[TypeOrmModule.forFeature([User]),JwtModule],
    
    exports:[UserService]
})
export class UserModule {}
