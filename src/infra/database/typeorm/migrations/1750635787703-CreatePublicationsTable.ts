import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePublicationsTable1750635787703 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "publications",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
            comment: "Primary key"
          },
          {
            name: "case_number",
            type: "varchar",
            isNullable: true,
            comment: "Número do processo"
          },
          {
            name: "plaintiff",
            type: "varchar",
            isNullable: true,
            comment: "Autor(es) do processo"
          },
          {
            name: "attorney",
            type: "text",
            isNullable: true,
            comment: "Advogado(s) do processo"
          },
          {
            name: "value_principal",
            type: "decimal(15,2)",
            isNullable: true,
            comment: "Valor principal bruto/líquido"
          },
          {
            name: "value_interest",
            type: "decimal(15,2)",
            isNullable: true,
            comment: "Valor dos juros moratórios"
          },
          {
            name: "value_attorney",
            type: "decimal(15,2)",
            isNullable: true,
            comment: "Valor dos honorários advocatícios"
          },
          {
            name: "full_text",
            type: "longtext",
            comment: "Conteúdo completo da publicação"
          },
          {
            name: "defendant",
            type: "varchar",
            default: "'Instituto Nacional do Seguro Social - INSS'",
            comment: "Réu (sempre INSS)"
          },
          {
            name: "status",
            type: "enum",
            enum: ["new", "read", "sent_to_lawyer", "done"],
            default: "'new'",
            comment: "Status do card no Kanban"
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            comment: "Data de criação"
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
            comment: "Data da última atualização"
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("publications");
  }

}
