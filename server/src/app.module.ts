import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PubSubModule } from './pub-sub/pub-sub.module';

@Module({
  imports: [PrismaModule, PubSubModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
