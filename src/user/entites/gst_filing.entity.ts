import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'gstin_filing_detail', synchronize: false })
export class Gstin_filing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fy: string;

  @Column()
  taxp: string;

  @Column()
  mof: string;

  @Column()
  dof: string;

  @Column()
  rtntype: string;

  @Column()
  arn: string;

  @Column()
  status: string;

  @Column()
  gstin: string;

  @Column()
  insert_time: Date;

  @Column()
  update_time: Date;
}
