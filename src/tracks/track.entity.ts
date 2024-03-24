import { Entity, PrimaryColumn, Column } from "typeorm"

@Entity({ name: 'track' })
export class TrackEntity {
  @PrimaryColumn({ type: 'uuid', unique: true })
  id: string

  @Column({ type: 'varchar' })
  name: string

  @Column({ type: 'varchar', nullable: true })
  artistId: string | null

  @Column({ type: 'varchar', nullable: true })
  albumId: string | null

  @Column({ type: 'float8' })
  duration: number
}

