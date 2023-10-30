/*
  Warnings:

  - You are about to drop the column `contents` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `titles` on the `questions` table. All the data in the column will be lost.
  - Added the required column `content` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "questions" DROP COLUMN "contents",
DROP COLUMN "titles",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
