import { ObjectId } from "mongodb";
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";
 
@Entity()
export class Video{
  @ObjectIdColumn()
  id: ObjectId

  @Column()
  title: string
  @Column()
  image: string
  @Column()
  description: string
  @Column()
  link: string
  @CreateDateColumn()
  create_at: Date
  
  @Column()
  userId: ObjectId
  
  @Column()
  categoryId: string
   
}