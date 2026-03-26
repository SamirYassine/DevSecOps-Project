<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240327084820 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE surface (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, organization_id INT NOT NULL, sampling_date DATETIME NOT NULL, sampling_type VARCHAR(255) NOT NULL, sampling_by VARCHAR(255) NOT NULL, agars_type VARCHAR(255) NOT NULL, supplier VARCHAR(255) NOT NULL, expiry_date DATETIME NOT NULL, laboratory VARCHAR(255) NOT NULL, details LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', batch VARCHAR(255) NOT NULL, med_type VARCHAR(255) NOT NULL, is_template TINYINT(1) NOT NULL, template_id INT DEFAULT NULL, revised_by VARCHAR(255) DEFAULT NULL, revision_date DATETIME DEFAULT NULL, INDEX IDX_BC419E6EA76ED395 (user_id), INDEX IDX_BC419E6E32C8A3DE (organization_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE surface ADD CONSTRAINT FK_BC419E6EA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE surface ADD CONSTRAINT FK_BC419E6E32C8A3DE FOREIGN KEY (organization_id) REFERENCES organization (id)');
        $this->addSql('ALTER TABLE air ADD is_template TINYINT(1) NOT NULL, ADD template_id INT DEFAULT NULL, ADD revised_by VARCHAR(255) DEFAULT NULL, ADD revision_date DATETIME DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE surface DROP FOREIGN KEY FK_BC419E6EA76ED395');
        $this->addSql('ALTER TABLE surface DROP FOREIGN KEY FK_BC419E6E32C8A3DE');
        $this->addSql('DROP TABLE surface');
        $this->addSql('ALTER TABLE air DROP is_template, DROP template_id, DROP revised_by, DROP revision_date');
    }
}
