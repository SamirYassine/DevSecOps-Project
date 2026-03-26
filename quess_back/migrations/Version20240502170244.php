<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240502170244 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE localization (id INT AUTO_INCREMENT NOT NULL, zone_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, iso INT NOT NULL, threshold INT NOT NULL, INDEX IDX_98DC9F479F2C3FAB (zone_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE localization ADD CONSTRAINT FK_98DC9F479F2C3FAB FOREIGN KEY (zone_id) REFERENCES zone (id)');
        $this->addSql('ALTER TABLE zone ADD organization_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE zone ADD CONSTRAINT FK_A0EBC00732C8A3DE FOREIGN KEY (organization_id) REFERENCES organization (id)');
        $this->addSql('CREATE INDEX IDX_A0EBC00732C8A3DE ON zone (organization_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE localization DROP FOREIGN KEY FK_98DC9F479F2C3FAB');
        $this->addSql('DROP TABLE localization');
        $this->addSql('ALTER TABLE zone DROP FOREIGN KEY FK_A0EBC00732C8A3DE');
        $this->addSql('DROP INDEX IDX_A0EBC00732C8A3DE ON zone');
        $this->addSql('ALTER TABLE zone DROP organization_id');
    }
}
