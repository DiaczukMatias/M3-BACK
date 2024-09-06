import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { User } from "./User";

@Entity({
  name: "credentials",
})
export class Credential {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  username: string;

  @Column()
  password: string;

  @OneToOne(() => User, (user) => user.credential)
  user: User;
}
