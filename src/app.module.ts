import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ProjectModule } from './modules/project/project.module';

@Module({
  imports: [PrismaModule, ProjectModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
