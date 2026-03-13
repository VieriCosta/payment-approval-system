-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `login` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('REGISTRO', 'AUTORIZACAO', 'ADMIN') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_login_key`(`login`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cnpj` VARCHAR(191) NOT NULL,
    `razaoSocial` VARCHAR(191) NOT NULL,
    `valor` DOUBLE NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `dataRegistro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` ENUM('PENDENTE', 'AUTORIZADO', 'REJEITADO') NOT NULL DEFAULT 'PENDENTE',
    `solicitanteId` INTEGER NOT NULL,
    `autorizadorId` INTEGER NULL,
    `dataAutorizacao` DATETIME(3) NULL,
    `motivoRejeicao` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_solicitanteId_fkey` FOREIGN KEY (`solicitanteId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_autorizadorId_fkey` FOREIGN KEY (`autorizadorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
