-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateTable
CREATE TABLE "article_category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "article_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article_comment" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "text" TEXT NOT NULL,
    "pinned" BOOLEAN NOT NULL,
    "deactivated" BOOLEAN NOT NULL,
    "article_id" INTEGER NOT NULL,

    CONSTRAINT "article_comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "deactivated" BOOLEAN NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "noticeboard_article" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "tree_id" INTEGER NOT NULL,
    "article_category_id" INTEGER NOT NULL,
    "plot_id" INTEGER NOT NULL,
    "heading" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "deactivated" BOOLEAN NOT NULL,
    "pinned" BOOLEAN NOT NULL,

    CONSTRAINT "noticeboard_article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plot" (
    "id" SERIAL NOT NULL,
    "polygon" geometry(polygon, 4326) NOT NULL,
    "name" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "care_state" TEXT NOT NULL,
    "care" BOOLEAN NOT NULL,
    "cost_cut_sqm" DOUBLE PRECISION NOT NULL,
    "cost_mulch_sqm" DOUBLE PRECISION NOT NULL,
    "selected_mulchen" INTEGER NOT NULL,
    "selected_maehen" INTEGER NOT NULL,
    "description_plot" TEXT NOT NULL,
    "deactivated" BOOLEAN NOT NULL,

    CONSTRAINT "plot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "species" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "treeType_id" INTEGER NOT NULL,

    CONSTRAINT "species_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sponsorship" (
    "id" SERIAL NOT NULL,
    "date_from" TIMESTAMP(3) NOT NULL,
    "date_to" TIMESTAMP(3) NOT NULL,
    "activity" TEXT NOT NULL,
    "application" BOOLEAN NOT NULL,
    "deactivated" BOOLEAN NOT NULL,

    CONSTRAINT "sponsorship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaticText" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "StaticText_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "treeAuditlog" (
    "id" SERIAL NOT NULL,
    "tree_id" INTEGER NOT NULL,
    "dml_type" TEXT NOT NULL,
    "dml_timestap" TIMESTAMP(3) NOT NULL,
    "dml_user" TEXT NOT NULL,
    "old_row_data" JSONB NOT NULL,
    "new_row_data" JSONB NOT NULL,

    CONSTRAINT "treeAuditlog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tree_image" (
    "id" SERIAL NOT NULL,
    "deactivated" BOOLEAN NOT NULL,
    "tree_id" INTEGER NOT NULL,
    "image_id" INTEGER NOT NULL,

    CONSTRAINT "tree_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tree" (
    "id" SERIAL NOT NULL,
    "point" geometry(Point, 4326),
    "height" DOUBLE PRECISION NOT NULL,
    "trunkCircumference" DOUBLE PRECISION NOT NULL,
    "careState" TEXT NOT NULL,
    "strikingForLandscape" BOOLEAN NOT NULL,
    "yearOfPlanting" TIMESTAMP(3),
    "cropSize" DOUBLE PRECISION NOT NULL,
    "juiceAmount" DOUBLE PRECISION NOT NULL,
    "sponsorSearched" BOOLEAN NOT NULL,
    "deactivated" BOOLEAN NOT NULL,
    "plot_id" INTEGER NOT NULL,
    "species_id" INTEGER NOT NULL,
    "vitality_id" INTEGER NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "sposorship_search_noticeboard_article_id" INTEGER NOT NULL,
    "external_id" INTEGER NOT NULL,

    CONSTRAINT "tree_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "treeType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "treeType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_activation" (
    "id" SERIAL NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "user_activation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userAuditlog" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "dml_type" TEXT NOT NULL,
    "dml_timestamp" TIMESTAMP(3) NOT NULL,
    "old_row_data" JSONB NOT NULL,
    "new_row_data" JSONB NOT NULL,

    CONSTRAINT "userAuditlog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "status" TEXT,
    "admin" BOOLEAN NOT NULL,
    "email_notify_on_change" BOOLEAN,
    "email_notify_on_favorite_change" BOOLEAN,
    "deactivated" BOOLEAN NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_password_reset" (
    "id" SERIAL NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "user_password_reset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vitality" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "vitality_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "image_user_id_key" ON "image"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "species_treeType_id_key" ON "species"("treeType_id");

-- CreateIndex
CREATE UNIQUE INDEX "treeAuditlog_tree_id_key" ON "treeAuditlog"("tree_id");

-- CreateIndex
CREATE UNIQUE INDEX "tree_image_tree_id_key" ON "tree_image"("tree_id");

-- CreateIndex
CREATE UNIQUE INDEX "tree_image_image_id_key" ON "tree_image"("image_id");

-- CreateIndex
CREATE UNIQUE INDEX "tree_species_id_key" ON "tree"("species_id");

-- CreateIndex
CREATE UNIQUE INDEX "tree_vitality_id_key" ON "tree"("vitality_id");

-- CreateIndex
CREATE UNIQUE INDEX "tree_owner_id_key" ON "tree"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_activation_user_id_key" ON "user_activation"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "userAuditlog_user_id_key" ON "userAuditlog"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_password_reset_user_id_key" ON "user_password_reset"("user_id");

-- AddForeignKey
ALTER TABLE "article_comment" ADD CONSTRAINT "article_comment_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "noticeboard_article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "species" ADD CONSTRAINT "species_treeType_id_fkey" FOREIGN KEY ("treeType_id") REFERENCES "treeType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treeAuditlog" ADD CONSTRAINT "treeAuditlog_tree_id_fkey" FOREIGN KEY ("tree_id") REFERENCES "tree"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tree_image" ADD CONSTRAINT "tree_image_tree_id_fkey" FOREIGN KEY ("tree_id") REFERENCES "tree"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tree_image" ADD CONSTRAINT "tree_image_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tree" ADD CONSTRAINT "tree_plot_id_fkey" FOREIGN KEY ("plot_id") REFERENCES "plot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tree" ADD CONSTRAINT "tree_species_id_fkey" FOREIGN KEY ("species_id") REFERENCES "species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tree" ADD CONSTRAINT "tree_vitality_id_fkey" FOREIGN KEY ("vitality_id") REFERENCES "vitality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tree" ADD CONSTRAINT "tree_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tree" ADD CONSTRAINT "tree_sposorship_search_noticeboard_article_id_fkey" FOREIGN KEY ("sposorship_search_noticeboard_article_id") REFERENCES "noticeboard_article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_activation" ADD CONSTRAINT "user_activation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userAuditlog" ADD CONSTRAINT "userAuditlog_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_password_reset" ADD CONSTRAINT "user_password_reset_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
