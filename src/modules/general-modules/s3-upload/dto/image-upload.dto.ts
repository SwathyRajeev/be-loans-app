import { IsNotEmpty, IsString } from 'class-validator';
export class ImageUploadDto {
  @IsNotEmpty()
  @IsString()
  path: string; 
}
