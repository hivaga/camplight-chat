import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm";

@Entity()
export class ChatMessage {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  sender: string;

  @Column()
  message: string;

  @Column()
  timestamp: Date;
}
