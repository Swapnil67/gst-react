import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'gst_detail', synchronize: false })
export class Gstin_Detail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nba: string;

  @Column()
  mandatedeInvoice: string;

  @Column()
  aggreTurnOverFY: string;

  @Column()
  lgnm: string;

  @Column()
  dty: string;

  @Column()
  aggreTurnOver: string;

  @Column()
  cxdt: string;

  @Column()
  gstin: string;

  @Column()
  gtiFy: string;

  @Column()
  cmpRt: string;

  @Column()
  rgdt: string;

  @Column()
  ctb: string;

  @Column()
  sts: string;

  @Column()
  tradeNam: string;

  @Column()
  isFieldVisitConducted: string;

  @Column()
  ctj: string;

  @Column()
  percentTaxInCashFY: string;

  @Column()
  percentTaxInCash: string;

  @Column()
  compDetl: string;

  @Column()
  gti: string;

  @Column()
  adhrVFlag: string;

  @Column()
  ekycVFlag: string;

  @Column()
  stj: string;

  @Column()
  mbr: string;

  @Column()
  insert_time: Date;

  @Column()
  update_time: Date;
}
