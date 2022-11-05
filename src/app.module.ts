import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService} from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { IngresoModule } from './ingreso/ingreso.module';
import { CustomerModule } from './customer/customer.module';
import { SheetModule } from './sheet/sheet.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UserModule,
    AuthModule,
    PrismaModule,
    IngresoModule,
    CustomerModule,
    SheetModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
