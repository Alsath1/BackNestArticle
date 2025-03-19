import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ImageService } from './image.service';
// import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  // @Post()
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadImage(@UploadedFile() file: Multer.File) {
  //   return this.imageService.uploadImage(file.originalname, file.buffer);
  // }
  @Post()
  @UseInterceptors(FileInterceptor('file')) // Multer для обработки файлов
  async uploadImage(@UploadedFile() file: Multer.File) {
    if (!file) {
      throw new Error('Файл не загружен');
    }
    return this.imageService.uploadImage(file.originalname, file.buffer);
  }

  @Get(':id')
  async getImage(@Param('id') id: string) {
    const image = await this.imageService.getImage(Number(id));

    return {
      id: image.id,
      name: image.name,
      data: image.data.toString('base64'), // Отправляем как base64
    };
  }

  @Get()
  findAll() {
    return this.imageService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imageService.update(+id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageService.remove(+id);
  }
}
