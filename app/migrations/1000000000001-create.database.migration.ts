import {MigrationInterface, QueryRunner} from "typeorm";

console.log(Date.now());

export class CreateDatabase1000001 implements MigrationInterface {

    async down(queryRunner: QueryRunner): Promise<any> {
        console.log("RUNNING DOWN");
        await queryRunner.dropDatabase("proto-service");
    }

    async up(queryRunner: QueryRunner): Promise<any> {
        console.log("RUNNING UP");
        await queryRunner.createDatabase("proto-service");
    }

}