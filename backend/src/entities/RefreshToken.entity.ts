import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";
import UserEntity from "./User.entity";

@Entity({ name: "refreshtokens" })
export default class RefreshTokenEntity {


  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "token_hash", type: "varchar", nullable: false })
  @Index() // Pour optimiser les recherches par token
  tokenHash: string;

  @ManyToOne(() => UserEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @Column({ name: "is_revoked", type: "boolean", default: false })
  isRevoked: boolean;

  @Column({ name: "user_agent", type: "varchar", nullable: true })
  userAgent: string;

  @Column({ name: "ip_address", type: "varchar", nullable: true })
  ipAddress: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ name: "expires_at", type: "timestamp" })
  expiresAt: Date;

  @Column({ name: "last_used_at", type: "timestamp", nullable: true })
  lastUsedAt: Date;
}
