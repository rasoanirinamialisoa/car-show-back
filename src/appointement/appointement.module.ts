
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointement } from './appointement.entity';
import { AppointementService } from './appointement.service';
import { AppointementController } from './appointement.controller';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointement]),
    EmailModule,
  ],
  controllers: [AppointementController],
  providers: [AppointementService],
})
export class AppointementModule {}
