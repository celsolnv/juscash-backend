import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export enum PublicationStatus {
  NEW = "new",
  READ = "read",
  SENT_TO_LAWYER = "sent_to_lawyer",
  DONE = "done",
}

@Entity("publications")
export class Publication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: true, comment: "Número do processo" })
  case_number: string;

  @Column({ type: "varchar", nullable: true, comment: "Autor(es) do processo" })
  plaintiff: string;

  @Column({ type: "text", nullable: true, comment: "Advogado(s) do processo" })
  attorney: string;

  @Column({ type: "decimal", precision: 15, scale: 2, nullable: true, comment: "Valor principal bruto/líquido" })
  value_principal: number;

  @Column({ type: "decimal", precision: 15, scale: 2, nullable: true, comment: "Valor dos juros moratórios" })
  value_interest: number;

  @Column({ type: "decimal", precision: 15, scale: 2, nullable: true, comment: "Valor dos honorários advocatícios" })
  value_attorney: number;

  @Column({ type: "longtext", comment: "Conteúdo completo da publicação" })
  full_text: string;

  @Column({
    type: "varchar",
    default: "Instituto Nacional do Seguro Social - INSS",
    comment: "Réu (sempre INSS)",
  })
  defendant: string;

  @Column({
    type: "enum",
    enum: PublicationStatus,
    default: PublicationStatus.NEW,
    comment: "Status do card no Kanban",
  })
  status: PublicationStatus;

  @CreateDateColumn({ comment: "Data de criação" })
  created_at: Date;

  @UpdateDateColumn({ comment: "Data da última atualização" })
  updated_at: Date;
}
