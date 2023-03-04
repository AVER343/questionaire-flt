-- CreateEnum
CREATE TYPE "QUEUES" AS ENUM ('SEND_EMAIL');

-- CreateTable
CREATE TABLE "Status" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(64) NOT NULL,
    "password" TEXT NOT NULL,
    "created_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserEmail" (
    "user_id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "created_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL DEFAULT 1,
    "modified_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "UserPhone" (
    "user_id" INTEGER NOT NULL,
    "phone_number" INTEGER NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "created_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ApiNames" (
    "id" SERIAL NOT NULL,
    "api_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "ApiNames_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobStatusTable" (
    "id" BIGSERIAL NOT NULL,
    "queue_type" VARCHAR(50) NOT NULL,
    "data" JSONB DEFAULT E'{}',
    "user_id" BIGINT,
    "created_time" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "modified_time" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "completed" BOOLEAN DEFAULT false,
    "completed_on" TIMESTAMP(6),

    CONSTRAINT "JobStatusTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QueueActive" (
    "id" SERIAL NOT NULL,
    "queue_type" "QUEUES" NOT NULL,
    "data" JSONB DEFAULT E'{}',
    "user_id" INTEGER,

    CONSTRAINT "QueueActive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QueueTypes" (
    "id" SERIAL NOT NULL,
    "queue_type" VARCHAR(50) NOT NULL,
    "priority" SMALLINT DEFAULT 3,

    CONSTRAINT "QueueTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserOtp" (
    "id" SERIAL NOT NULL,
    "otp" VARCHAR(6),
    "email" VARCHAR(128) NOT NULL,
    "generated_on" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "otp_tried_for" SMALLINT DEFAULT 0,
    "otp_active" BOOLEAN DEFAULT true,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "UserOtp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRoleType" (
    "id" SMALLSERIAL NOT NULL,
    "user_role" VARCHAR(64),

    CONSTRAINT "UserRoleType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" SERIAL NOT NULL,
    "user_role" SMALLINT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserStatelessAuthentication" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "data" JSONB NOT NULL DEFAULT E'{}',
    "created_time" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "tries" SMALLINT DEFAULT 0,
    "sent_to" VARCHAR(128) NOT NULL,
    "isActive" BOOLEAN DEFAULT true,
    "auth_type" SMALLINT,

    CONSTRAINT "UserStatelessAuthentication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatelessAuthenicatonTypes" (
    "id" SMALLINT NOT NULL,
    "StatelessAuthenicatonType" VARCHAR(64) NOT NULL,
    "description" JSONB,

    CONSTRAINT "StatelessAuthenicatonTypes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Status_status_key" ON "Status"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UserEmail_user_id_key" ON "UserEmail"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserEmail_email_key" ON "UserEmail"("email");

-- CreateIndex
CREATE INDEX "UserEmail_user_id_idx" ON "UserEmail"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserPhone_user_id_key" ON "UserPhone"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserPhone_phone_number_key" ON "UserPhone"("phone_number");

-- CreateIndex
CREATE INDEX "UserPhone_user_id_idx" ON "UserPhone"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "ApiNames_api_name_key" ON "ApiNames"("api_name");

-- CreateIndex
CREATE UNIQUE INDEX "QueueTypes_queue_type_key" ON "QueueTypes"("queue_type");

-- CreateIndex
CREATE UNIQUE INDEX "UserRoleType_user_role_key" ON "UserRoleType"("user_role");

-- CreateIndex
CREATE INDEX "UserRole.user_id_index" ON "UserRole"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_user_role_user_id_key" ON "UserRole"("user_role", "user_id");

-- AddForeignKey
ALTER TABLE "UserEmail" ADD CONSTRAINT "UserEmail_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPhone" ADD CONSTRAINT "UserPhone_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOtp" ADD CONSTRAINT "UserOtp_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_user_role_fkey" FOREIGN KEY ("user_role") REFERENCES "UserRoleType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStatelessAuthentication" ADD CONSTRAINT "UserStatelessAuthentication_auth_type_fkey" FOREIGN KEY ("auth_type") REFERENCES "StatelessAuthenicatonTypes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
