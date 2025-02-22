-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "publisher_logo_url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "story_id" INTEGER NOT NULL,
    "publisher_name" TEXT NOT NULL,
    "publisher_id" INTEGER NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);
