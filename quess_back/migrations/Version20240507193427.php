<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240507193427 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE surface CHANGE sampling_by sampling_by VARCHAR(255) DEFAULT NULL, CHANGE agars_type agars_type VARCHAR(255) DEFAULT NULL, CHANGE supplier supplier VARCHAR(255) DEFAULT NULL, CHANGE expiry_date expiry_date DATETIME DEFAULT NULL, CHANGE batch batch VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE surface CHANGE sampling_by sampling_by VARCHAR(255) NOT NULL, CHANGE agars_type agars_type VARCHAR(255) NOT NULL, CHANGE supplier supplier VARCHAR(255) NOT NULL, CHANGE expiry_date expiry_date DATETIME NOT NULL, CHANGE batch batch VARCHAR(255) NOT NULL');
    }
}
