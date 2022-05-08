import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { State } from '../../state/entities/state.entity';

@Entity('districts')
export class District {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(
    type => State,
    state => state,
    { nullable: false },
  )
  @JoinColumn({ name: 'stateId' })
  state_id: number;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @DeleteDateColumn({ name: 'delete_at' })
  deleted_At?: Date;
}
