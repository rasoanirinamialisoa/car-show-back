import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AppointementService } from './appointement.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Appointement } from './appointement.entity';

@Controller('appointement')
@ApiTags('Appointement')
export class AppointementController {
  constructor(private readonly appointementService: AppointementService) {}

  @Get()
  @ApiOperation({ summary: 'Get all appointements' })
  async getAppointementList(): Promise<Appointement[]> {
    return await this.appointementService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new appointement' })
  async createAppointement(@Body() appointement: Appointement): Promise<Appointement> {
    return await this.appointementService.create(appointement);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an appointement' })
  async updateAppointement(@Param('id') id: number, @Body() appointement: Appointement): Promise<Appointement> {
    return await this.appointementService.update(id, appointement);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an appointement' })
  async deleteAppointement(@Param('id') id: number): Promise<void> {
    return await this.appointementService.delete(id);
  }
}
