import { Entity, PrimaryColumn, Column } from "typeorm"

@Entity({name: 'user'})
export class UserEntity {
    @PrimaryColumn({type: 'uuid'})
    id: string

    @Column({type: 'varchar'})
    login: string

    @Column({type: 'varchar'})
    password: string

    @Column({type: 'integer'})
    version: number

    @Column({type: 'integer'})
    createdAt: number

    @Column({type: 'integer'})
    updatedAt: number  
}

