import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { differenceInYears } from 'date-fns';
import { Repository } from 'typeorm';
import { DependentsView } from './entities/dependents.view';

@Injectable()
export class DependentsViewService {
  constructor(
    @InjectRepository(DependentsView)
    private readonly dependentsViewRepository: Repository<DependentsView>,
  ) {}

  async findDependents(numcpf: number) {
    const dependents = await this.dependentsViewRepository.find({
      CPF_TIT: numcpf,
    });

    const serializedDependents = dependents.map((dependent) => {
      return {
        ...dependent,
        YEAR: differenceInYears(new Date('2022, 3, 28'), dependent.DTNASCDEP),
      };
    });

    const dependentsOverFourYearsOld = serializedDependents.filter(
      (dependent) => dependent.YEAR >= 4,
    );

    const dependentsWithKitCode = dependentsOverFourYearsOld.map(
      (dependent) => {
        return {
          ...dependent,
          KIT_CODE: this.setKitCode(dependent.YEAR),
          KIT_DESC: this.setKitDescription(dependent.YEAR),
        };
      },
    );

    return dependentsWithKitCode;
  }

  private setKitCode(year: number) {
    if (year >= 4 && year <= 5) {
      return 1;
    }
    if (year >= 6 && year <= 10) {
      return 2;
    }
    if (year >= 11 && year <= 14) {
      return 3;
    }
    if (year >= 15 && year <= 17) {
      return 4;
    }
    return 5;
  }

  private setKitDescription(year: number) {
    if (year >= 4 && year <= 5) {
      return 'KIT 1 - Infantil';
    }
    if (year >= 6 && year <= 10) {
      return 'KIT 2 - Ensino Fundamental 1';
    }
    if (year >= 11 && year <= 14) {
      return 'KIT 3 - Ensino Fundamental 2';
    }
    if (year >= 15 && year <= 17) {
      return 'KIT 4 - Ensino médio';
    }
    return 'KIT 5 - Superior e Técnico';
  }
}
