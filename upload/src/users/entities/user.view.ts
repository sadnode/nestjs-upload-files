import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity('VETORH.USU_LOGINKITESCOLAR')
export class UserView {
  @ViewColumn({ name: 'NOMFUN' })
  nomfun: string;

  @ViewColumn({ name: 'NUMCPF' })
  numcpf: number;

  @ViewColumn({ name: 'NUMEMP' })
  numemp: number;

  @ViewColumn({ name: 'NUMCAD' })
  numcad: number;
}
