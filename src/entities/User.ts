import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

export enum StatusEnum {
  active = 'active',
  inactive = 'inactive'
}


@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.active })
  status: StatusEnum;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: string;

  @Column({ name: 'reset_code', nullable: true, select: false })
  resetCode: string;

  @Column({
    name: 'reset_code_expiration',
    type: 'datetime',
    nullable: true,
    select: false
  })
  resetCodeExpiration: string;

  @Column({ name: 'reset_token', nullable: true, select: false })
  resetToken: string;

}

