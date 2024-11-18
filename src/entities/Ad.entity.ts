import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,ManyToOne  } from "typeorm";
import CategoryEntity from "./Category.entity";

@Entity({ name: "ads" })
export default class AdEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column({type: "float"})//ici on spécifie float parce que number de TS peut être compris comme integer par TypeORM
    picture: string;

    @Column()
    location: string;

     //relation avec Category
    @ManyToOne(() => CategoryEntity, (c) => c.ads)
    category: CategoryEntity;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}