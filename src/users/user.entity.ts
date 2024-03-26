import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryColumn({ type: 'uuid', unique: true })
  id: string;

  @Column({ type: 'varchar' })
  login: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'float8' })
  version: number;

  @Column({ type: 'float8' })
  createdAt: number;

  @Column({ type: 'float8' })
  updatedAt: number;
}
