import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ name: "Due Date" })
  dueDate: Date;

  @Column()
  isComplete: boolean;
}
