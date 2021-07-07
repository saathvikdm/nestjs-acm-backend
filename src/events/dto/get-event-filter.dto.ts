import { EventStatus } from '../event-status.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class GetEventFiltersDto {
  @IsOptional()
  @IsEnum(EventStatus)
  status?: EventStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
