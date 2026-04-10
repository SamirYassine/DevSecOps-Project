<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240330132050 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        $schemaManager = $this->connection->createSchemaManager();

        if (!$schemaManager->tablesExist(['air'])) {
            return;
        }

        $columns = $schemaManager->listTableColumns('air');
        $hasAirSamplers = isset($columns['air_samplers']);
        $hasAirSamplerId = isset($columns['air_sampler_id']);

        if (!$hasAirSamplers) {
            $this->addSql("ALTER TABLE air ADD air_samplers LONGTEXT NOT NULL COMMENT '(DC2Type:array)'");
        }

        if ($hasAirSamplerId) {
            $this->addSql('ALTER TABLE air DROP air_sampler_id');
        }
    }

    
}
