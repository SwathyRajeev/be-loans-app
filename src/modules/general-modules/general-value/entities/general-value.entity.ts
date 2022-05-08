import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity('general_value')
@Unique(['label'])
export class GeneralValue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  value: string;

  @Column({ nullable: true })
  name: string;

  @CreateDateColumn()
  @Exclude({ toPlainOnly: true })
  created_date: Date;

  @UpdateDateColumn()
  @Exclude({ toPlainOnly: true })
  updated_date: Date;

  @DeleteDateColumn({ name: 'delete_at' })
  @Exclude({ toPlainOnly: true })
  deleted_At?: Date;
}
