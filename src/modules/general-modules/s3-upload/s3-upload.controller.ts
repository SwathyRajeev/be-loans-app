import {
  Body,
  Controller, Delete, Param, Post, UploadedFile, UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ImageUploadDto } from './dto/image-upload.dto';
import { S3UploadService } from './s3-upload.service';

@ApiTags('Admin Panel')
@Controller('s3-upload')
export class S3UploadController {
  constructor(private readonly s3UploadService: S3UploadService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File) {
    return this.s3UploadService.create(
      file.buffer,
      file.originalname,
      '/new/demo',
    );
  }

  @ApiConsumes('multipart/form-data')
  @Post('uploadImage')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@Body() { path }: ImageUploadDto, @UploadedFile() image: Express.Multer.File) {
    let { key } = await this.s3UploadService.createGeneral(image.buffer, image.originalname, path);
    return key;
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.s3UploadService.delete(id);
  }
}
