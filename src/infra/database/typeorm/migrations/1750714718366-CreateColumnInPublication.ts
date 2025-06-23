import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class CreateColumnInPublication1750714718366 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('publications', new TableColumn({
      name: 'published_at',
      type: 'date',
      isNullable: true,
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('publications', 'published_at');
  }

}
