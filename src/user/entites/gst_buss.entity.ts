import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'gst_business_detail', synchronize: false })
export class Gstin_Business {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  adr: string;

  @Column()
  em: string;

  @Column()
  mb: string;

  @Column()
  addr: string;

  @Column()
  ntr: string;

  @Column()
  lastUpdatedDate: string;

  @Column()
  gstin: string;

  @Column()
  insert_time: Date;

  @Column()
  update_time: Date;
}
