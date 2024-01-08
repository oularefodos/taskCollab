-- CreateTable
CREATE TABLE "PasswordToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PasswordToken_identifier_key" ON "PasswordToken"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordToken_token_key" ON "PasswordToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordToken_identifier_token_key" ON "PasswordToken"("identifier", "token");
