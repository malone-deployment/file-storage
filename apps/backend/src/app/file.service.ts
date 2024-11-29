import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>
  ) {}

  async saveFile(fileBuffer: Buffer, date: string): Promise<FileEntity> {
    const fileEntity = new FileEntity();
    fileEntity.date = date;
    fileEntity.image = fileBuffer;

    return await this.fileRepository.save(fileEntity);
  }

  async getFileById(id: string): Promise<FileEntity | undefined> {
    return await this.fileRepository.findOne({
      where: { id },
    });
  }

  async getAllFiles(): Promise<FileEntity[]> {
    return this.fileRepository.find();
  }

  async deleteAllFiles(): Promise<any> {
    return this.fileRepository.delete({});
  }
}
