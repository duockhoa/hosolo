import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import { Users } from './users.entity'

@Entity('user_info')
export class User_Info {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    phone: string

    @Column()
    email: string

    @OneToOne(() => Users, (user) => user.id)
    @JoinColumn()

    user: Users

}
