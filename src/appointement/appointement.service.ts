// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Appointement } from './appointement.entity';

// @Injectable()
// export class AppointementService {
//   constructor(
//     @InjectRepository(Appointement)
//     private appointementRepository: Repository<Appointement>,
//   ) {}

//   async getAll(): Promise<Appointement[]> {
//     return await this.appointementRepository.find();
//   }

//   async create(appointement: Appointement): Promise<Appointement> {
//     appointement.AppointementDate = new Date(); // Assurez-vous que AppointementDate est défini avant l'insertion
//     return await this.appointementRepository.save(appointement);
//   }

//   async update(id: number, appointement: Appointement): Promise<Appointement> {
//     await this.appointementRepository.update(id, appointement);
//     const updatedAppointement = await this.appointementRepository.findOne({ where: { id } });

//     // Envoyer un email de mise à jour du statut
//     if (updatedAppointement) {
//       await this.emailService.sendStatusUpdateEmail(updatedAppointement.Email, updatedAppointement.Status);
//     }


//   async delete(id: number): Promise<void> {
//     await this.appointementRepository.delete(id);
//   }
// }


import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointement } from './appointement.entity';
import { EmailService } from '../email/email.service';

@Injectable()
export class AppointementService {
  constructor(
    @InjectRepository(Appointement)
    private appointementRepository: Repository<Appointement>,
    private emailService: EmailService,
  ) {}

  async getAll(): Promise<Appointement[]> {
    return await this.appointementRepository.find();
  }

  async create(appointement: Appointement): Promise<Appointement> {
    appointement.AppointementDate = new Date(); // Assurez-vous que AppointementDate est défini avant l'insertion
    return await this.appointementRepository.save(appointement);
  }

  async update(id: number, appointement: Appointement): Promise<Appointement> {
    await this.appointementRepository.update(id, appointement);
    const updatedAppointement = await this.appointementRepository.findOne({ where: { id } });

    // Envoyer un email de mise à jour du statut
    if (updatedAppointement) {
      await this.emailService.sendStatusUpdateEmail(updatedAppointement.Email, updatedAppointement.Status);
    }

    return updatedAppointement;
  }

  async delete(id: number): Promise<void> {
    await this.appointementRepository.delete(id);
  }
}
