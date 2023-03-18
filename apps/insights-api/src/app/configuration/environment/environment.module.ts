import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { environmentVariablesValidationSchema } from './environment-validation-schema';
import { EnvironmentService } from './environment.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: environmentVariablesValidationSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),
    EnvironmentModule,
  ],
  providers: [ConfigService, EnvironmentService],
  exports: [ConfigService, EnvironmentService],
})
export class EnvironmentModule {}
