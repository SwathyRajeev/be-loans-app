import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGeneralValueDto {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  value: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
