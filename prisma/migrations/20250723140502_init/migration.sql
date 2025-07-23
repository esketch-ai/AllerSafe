-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "relation" TEXT,
    "species" TEXT,
    "allergies" TEXT NOT NULL,
    "dietaryRestrictions" TEXT NOT NULL,
    "religiousRestrictions" TEXT NOT NULL,
    "personalDislikes" TEXT NOT NULL
);
