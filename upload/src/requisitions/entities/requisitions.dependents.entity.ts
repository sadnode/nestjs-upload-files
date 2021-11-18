import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 } from 'uuid';

@Entity('VETORH.USU_TDEPKIT')
export class RequisitionsDependents {
  @PrimaryColumn()
  USU_ID: string;

  @Column()
  USU_NUMEMP: number;

  @Column()
  USU_TIPCOL: number;

  @Column()
  USU_NUMCAD: number;

  @Column()
  USU_CODDEP: number;

  @Column()
  USU_DATALT: Date;

  @Column()
  USU_CODKIT: number;

  constructor() {
    if (!this.USU_ID) {
      this.USU_ID = v4();
    }
  }
}
