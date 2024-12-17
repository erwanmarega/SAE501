<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241215152828 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE swimmer ADD nom VARCHAR(255) NOT NULL, ADD prenom VARCHAR(255) NOT NULL, ADD date_naissance DATE NOT NULL, ADD adresse VARCHAR(255) NOT NULL, ADD code_postal VARCHAR(10) NOT NULL, ADD ville VARCHAR(255) NOT NULL, ADD telephone VARCHAR(20) NOT NULL, ADD email VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE swimmer DROP nom, DROP prenom, DROP date_naissance, DROP adresse, DROP code_postal, DROP ville, DROP telephone, DROP email');
    }
}
