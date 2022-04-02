/*
  Warnings:

  - Made the column `content` on table `Comment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstName` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `passwordHash` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `passwordSalt` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `levelAuth` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "content" SET NOT NULL;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "subTitle" DROP NOT NULL,
ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "like" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "passwordHash" SET NOT NULL,
ALTER COLUMN "passwordSalt" SET NOT NULL,
ALTER COLUMN "levelAuth" SET NOT NULL,
ALTER COLUMN "levelAuth" SET DEFAULT E'r';
