import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'artist' })
export class ArtistEntity {
  @PrimaryColumn({ type: 'uuid', unique: true })
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'bool' })
  grammy: boolean;
}
