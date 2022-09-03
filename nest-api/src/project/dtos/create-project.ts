import {
  IsNumber,
  IsString,
  IsOptional,
  Max,
  Min,
  IsEnum,
} from 'class-validator';
import { Framework } from '../../core/enums/framework.enum';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  org: string;

  @IsEnum(Framework)
  framework: string;
}
