import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAppVersionDto {
  @IsNotEmpty()
  @IsString()
  label: string;


}
