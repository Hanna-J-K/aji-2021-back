import {MigrationInterface, QueryRunner} from "typeorm";

export class Categories1636910518366 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
