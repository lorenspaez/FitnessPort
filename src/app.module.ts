import { Module } from '@nestjs/common';
import { ConfigModule} from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { IngresoModule } from './ingreso/ingreso.module';
import { CustomerModule } from './customer/customer.module';
import { SheetModule } from './sheet/sheet.module'
import { PagoModule } from './pago/pago.module';

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
    SheetModule,
    PagoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
