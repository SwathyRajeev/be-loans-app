import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('AppVersion')
export class AppVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column({ default: true })
  status: boolean;

}
