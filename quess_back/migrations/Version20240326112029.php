<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240326112029 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE air (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, organization_id INT NOT NULL, sampling_date DATETIME NOT NULL, sampling_type VARCHAR(255) NOT NULL, agars_type VARCHAR(255) NOT NULL, supplier VARCHAR(255) NOT NULL, expiry_date DATETIME NOT NULL, laboratory VARCHAR(255) NOT NULL, details_air LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', batch VARCHAR(255) NOT NULL, med_type VARCHAR(255) NOT NULL, INDEX IDX_BC60B8FBA76ED395 (user_id), INDEX IDX_BC60B8FB32C8A3DE (organization_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE air_sampler_settings (id INT AUTO_INCREMENT NOT NULL, device_name VARCHAR(255) NOT NULL, certification_date DATETIME NOT NULL, validation_date DATETIME NOT NULL, device_type VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE air ADD CONSTRAINT FK_BC60B8FBA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE air ADD CONSTRAINT FK_BC60B8FB32C8A3DE FOREIGN KEY (organization_id) REFERENCES organization (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE air DROP FOREIGN KEY FK_BC60B8FBA76ED395');
        $this->addSql('ALTER TABLE air DROP FOREIGN KEY FK_BC60B8FB32C8A3DE');
        $this->addSql('DROP TABLE air');
        $this->addSql('DROP TABLE air_sampler_settings');
    }
}
