import { MigrationInterface, QueryRunner } from 'typeorm'

export class Orders1636919365010 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        `)
   }

   public async down(queryRunner: QueryRunner): Promise<void> {}
}
