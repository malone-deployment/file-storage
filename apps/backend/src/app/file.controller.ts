import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import 'multer';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller()
export class FileController {
  constructor(private readonly appService: FileService) {}

  @Get('image/:id')
  async getImage(@Param('id') id: string, @Res() res: Response) {
    const fileEntity = await this.appService.getFileById(id);

    if (!fileEntity || !fileEntity.image) {
      return res.status(404).send('Image not found');
    }

    res.set('Content-Type', 'image/jpeg');
    return res.send(fileEntity.image);
  }

  @Post('uploadFile')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any
  ) {
    const fileEntity = await this.appService.saveFile(file.buffer, body.date);
    return { message: 'File uploaded successfully', id: fileEntity.id };
  }

  @Get('images')
  async getAllImages(@Res() res: Response) {
    const files = await this.appService.getAllFiles();
    if (!files || files.length === 0) {
      return res.status(404).send('No images found');
    }

    const imageUrls = files.map((file) => ({
      id: file.id,
      url: `http://localhost:3000/image/${file.id}`,
    }));

    return res.json(imageUrls);
  }

  @Delete('deleteAllImages')
  async deleteAllImages(@Res() res: Response) {
    const deletedFiles = await this.appService.deleteAllFiles();

    if (deletedFiles.affected === 0) {
      return res.status(404).send('No images found to delete');
    }

    return res.json({ message: 'All images deleted successfully' });
  }
}
