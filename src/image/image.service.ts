import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Buffer } from 'buffer';
interface ImageData {
  base64: string;
}
@Injectable()
export class ImageService {
  constructor(private prisma: PrismaService) {}


  create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }


  async uploadImage(name: string, fileBuffer: Buffer) {
    const base64Image = fileBuffer.toString('base64'); // Конвертируем Buffer в Base64

    return this.prisma.image.create({
      data: {
        name,
        data: { base64: base64Image },
      },
    });
  }


  async getImage(id: number) {
    const image = await this.prisma.image.findUnique({ where: { id } });

    if (!image) throw new Error('Image not found');

    const imageData = image.data as unknown as ImageData; // Приведение типа

    return {
      id: image.id,
      name: image.name,
      data: Buffer.from(imageData.base64, 'base64'), // Декодируем обратно в Buffer
    };
  }

  
  findAll() {
    return `This action returns all image`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
