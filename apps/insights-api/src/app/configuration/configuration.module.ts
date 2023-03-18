import { Module } from '@nestjs/common';
import { EnvironmentService } from './environment.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validationSchema } from './environment-validation-schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),
  ],
  providers: [ConfigService, EnvironmentService],
  exports: [ConfigService, EnvironmentService],
})
export class ConfigurationModule {}
