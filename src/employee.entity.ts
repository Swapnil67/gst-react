import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Task } from './task.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Task, (task: Task) => task.employee, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  tasks: Task[]
}