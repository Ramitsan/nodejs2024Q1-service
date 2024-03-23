import { Entity, PrimaryColumn, Column } from "typeorm"

@Entity({name: 'album'})
export class AlbumEntity {
    @PrimaryColumn({type: 'uuid', unique: true})
    id: string

    @Column({type: 'varchar'})
    name: string

    @Column({type: 'float8'})
    year: number

    @Column({type: 'varchar', nullable: true})
    artistId: string | null
}
