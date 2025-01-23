import { PrismaModule } from '@modules/prisma/prisma.module';
import { ProjectModule } from '@modules/project/project.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, ProjectModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
