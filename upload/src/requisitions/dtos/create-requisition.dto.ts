import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RequisitionsDependents } from '../entities/requisitions.dependents.entity';
import { RequisitionsOwner } from '../entities/requisitions.owner.entity';

export class CreateRequisitonDto {
  @IsOptional()
  @IsString()
  email: string;

  @IsNotEmpty()
  owner: RequisitionsOwner;

  @IsOptional()
  dependents: RequisitionsDependents[];
}
