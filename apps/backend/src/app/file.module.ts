import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './file.entity';
import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
