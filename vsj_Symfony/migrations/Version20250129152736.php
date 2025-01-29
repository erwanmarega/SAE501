<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20250129152736 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // Ajout de la colonne `groups_id` en tant que nullable
        $this->addSql('ALTER TABLE swimmer ADD groups_id INT DEFAULT NULL');
        
        // Ajout de l'index
        $this->addSql('CREATE INDEX IDX_ED2BC5D2F373DCF ON swimmer (groups_id)');
        
        // Ajout de la contrainte de clé étrangère
        $this->addSql('ALTER TABLE swimmer ADD CONSTRAINT FK_ED2BC5D2F373DCF FOREIGN KEY (groups_id) REFERENCES `groups` (groups_id)');
    }

    public function down(Schema $schema): void
    {
        // Suppression de la contrainte de clé étrangère
        $this->addSql('ALTER TABLE swimmer DROP FOREIGN KEY FK_ED2BC5D2F373DCF');
        
        // Suppression de l'index
        $this->addSql('DROP INDEX IDX_ED2BC5D2F373DCF ON swimmer');
        
        // Suppression de la colonne `groups_id`
        $this->addSql('ALTER TABLE swimmer DROP groups_id');
    }
}
