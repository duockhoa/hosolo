import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("tokens")
export class Tokens {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    user_id: number

    @Column({ nullable: false })
    token: string

    @Column({ nullable: false })
    expires_at: Date

    @Column({ nullable: false })
    created_at: Date

    @Column({ nullable: false })
    updated_at: Date

    @Column({ nullable: true })
    deleted_at: Date
    
}