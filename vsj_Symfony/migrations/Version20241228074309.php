<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241228074309 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE competition ADD group_id INT NOT NULL, ADD title VARCHAR(255) NOT NULL, ADD day_date DATE NOT NULL, ADD hour_date TIME NOT NULL, ADD duration TIME NOT NULL, ADD address VARCHAR(255) NOT NULL, ADD category VARCHAR(255) NOT NULL, ADD description LONGTEXT NOT NULL, ADD is_defined TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE competition ADD CONSTRAINT FK_B50A2CB1FE54D947 FOREIGN KEY (group_id) REFERENCES `groups` (id)');
        $this->addSql('CREATE INDEX IDX_B50A2CB1FE54D947 ON competition (group_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE competition DROP FOREIGN KEY FK_B50A2CB1FE54D947');
        $this->addSql('DROP INDEX IDX_B50A2CB1FE54D947 ON competition');
        $this->addSql('ALTER TABLE competition DROP group_id, DROP title, DROP day_date, DROP hour_date, DROP duration, DROP address, DROP category, DROP description, DROP is_defined');
    }
}
