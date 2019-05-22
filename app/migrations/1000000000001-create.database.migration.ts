import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDatabase1000000000001 implements MigrationInterface {

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropDatabase("proto-service");
    }

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createDatabase("proto-service");
    }

}