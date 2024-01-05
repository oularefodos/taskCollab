/*
  Warnings:

  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL,
    "password" TEXT,
    "role" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" DATETIME
);
INSERT INTO "new_User" ("email", "emailVerified", "id", "password", "role") SELECT "email", "emailVerified", "id", "password", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
