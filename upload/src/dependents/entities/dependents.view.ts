import { ViewEntity, Column } from 'typeorm';

@ViewEntity('VETORH.USU_VKITESC')
export class DependentsView {
  @Column()
  EMPRESA: number;

  @Column()
  NOME: string;

  @Column()
  NE: number;

  @Column()
  CPF_TIT: number;

  @Column()
  CODDEP: number;

  @Column()
  NOMEDEPENDENTE: string;

  @Column()
  DEPENDENTE: number;

  @Column()
  DTNASCDEP: Date;

  @Column()
  DTBASE: Date;
}
