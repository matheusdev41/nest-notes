import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LocalStrategy } from 'src/modules/auth/strategies/local.strategy';
import { UserModule } from '../user/user.module';
import { DatabaseModule } from 'src/infra/database/database.module';
import { SignDTOValidateMiddleware } from './middleware/signInDTOValidate.middleware';
import { SignInUseCase } from 'src/modules/auth/useCases/signInUseCase/signInUseCase';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '30d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [LocalStrategy, JwtStrategy, SignInUseCase],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SignDTOValidateMiddleware).forRoutes('/signIn');
  }
}
