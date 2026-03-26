<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240528111901 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE air ADD status TINYINT(1) DEFAULT NULL');
        $this->addSql('ALTER TABLE air_sampler_settings ADD CONSTRAINT FK_EF03C2EB32C8A3DE FOREIGN KEY (organization_id) REFERENCES organization (id)');
        $this->addSql('CREATE INDEX IDX_EF03C2EB32C8A3DE ON air_sampler_settings (organization_id)');
        $this->addSql('ALTER TABLE surface ADD status TINYINT(1) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE air DROP status');
        $this->addSql('ALTER TABLE surface DROP status');
        $this->addSql('ALTER TABLE air_sampler_settings DROP FOREIGN KEY FK_EF03C2EB32C8A3DE');
        $this->addSql('DROP INDEX IDX_EF03C2EB32C8A3DE ON air_sampler_settings');
    }
}
