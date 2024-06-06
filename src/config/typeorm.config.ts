import { postgresConfig } from './env.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConnectionConfig: TypeOrmModuleOptions = {
  ...postgresConfig,
  type: 'postgres',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  extra: {
    timezone: 'UTC',
  },
};
