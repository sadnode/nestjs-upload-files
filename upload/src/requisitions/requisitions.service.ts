import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { CreateRequisitonDto } from './dtos/create-requisition.dto';
import { RequisitionsDependents } from './entities/requisitions.dependents.entity';
import { RequisitionsOwner } from './entities/requisitions.owner.entity';

@Injectable()
export class RequisitionsService {
  logger = new Logger(RequisitionsService.name);

  constructor(
    private readonly mailService: MailService,
    @InjectRepository(RequisitionsOwner)
    private readonly requisitonsOwner: Repository<RequisitionsOwner>,
    @InjectRepository(RequisitionsDependents)
    private readonly requisitionsDependents: Repository<RequisitionsDependents>,
  ) {}

  async findByCpf(ne: number) {
    const owner = await this.requisitonsOwner.find({ USU_NUMCAD: ne });
    const dependents = await this.requisitionsDependents.find({
      USU_NUMCAD: ne,
    });

    return { owner, dependents };
  }

  async create(createRequisitionDto: CreateRequisitonDto, user: any) {
    const requisitionOwner = this.requisitonsOwner.create(
      createRequisitionDto.owner,
    );
    await this.requisitonsOwner.save(requisitionOwner);

    const requisitionDependent = this.requisitionsDependents.create(
      createRequisitionDto.dependents,
    );
    await this.requisitionsDependents.save(requisitionDependent);

    if (createRequisitionDto.email) {
      await this.mailService.sendEmail(createRequisitionDto.email, user.name);
    }

    return {
      requisitionOwner,
      requisitionDependent,
    };
  }
}
