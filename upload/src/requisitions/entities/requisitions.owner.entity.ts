import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 } from 'uuid';

@Entity('VETORH.USU_THISKIT')
export class RequisitionsOwner {
  @PrimaryColumn()
  USU_ID: string;

  @Column()
  USU_NUMEMP: number;

  @Column()
  USU_TIPCOL: number;

  @PrimaryColumn()
  USU_NUMCAD: number;

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
