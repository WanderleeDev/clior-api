import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1760850077031 implements MigrationInterface {
  name = 'InitialMigration1760850077031';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "username" character varying(30) NOT NULL, "hashedPassword" character varying(60) NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(500), "price" numeric(10,2) NOT NULL, "currency" "public"."products_currency_enum" NOT NULL DEFAULT 'USD', "stock" integer NOT NULL DEFAULT '0', "thumbnail" character varying, "status" "public"."products_status_enum" NOT NULL DEFAULT 'available', "deletedAt" TIMESTAMP, CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c377644d5dc3d0f696a39c3aa5" ON "products" ("name", "description") `,
    );
    await queryRunner.query(
      `CREATE TABLE "refresh_tokens" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "userId" uuid NOT NULL, "hashedToken" character varying(255) NOT NULL, "ip" character varying(255) NOT NULL, "userAgent" character varying(255) NOT NULL, "expiresAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "refresh_tokens"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c377644d5dc3d0f696a39c3aa5"`,
    );
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
