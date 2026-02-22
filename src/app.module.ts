import { Module } from '@nestjs/common';
import { UserModule } from './infra/http/modules/user/user.module';
import { DatabaseModule } from './infra/database/database.module';
import { PrismaService } from './infra/database/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './infra/http/modules/auth/auth.module';
@Module({
  imports: [
    AuthModule,
    UserModule, 
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
