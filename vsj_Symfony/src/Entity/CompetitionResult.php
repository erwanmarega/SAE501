<?php

// src/Entity/CompetitionResult.php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: "App\Repository\CompetitionResultRepository")]
#[ORM\Table(name: 'competition_result')]
class CompetitionResult
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: "AUTO")]
    #[ORM\Column(type: "integer")]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Swimmer::class, inversedBy: 'competitionResults')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Swimmer $swimmer = null;

    #[ORM\Column(type: "string", length: 255)]
    private string $competitionName;

    #[ORM\Column(type: "datetime")]
    private \DateTimeInterface $dateCompetition;

    #[ORM\Column(type: "string", length: 100)]
    private string $result;

    // Getter et Setter pour l'id
    public function getId(): ?int
    {
        return $this->id;
    }

    // Getter et Setter pour le nageur (Swimmer)
    public function getSwimmer(): ?Swimmer
    {
        return $this->swimmer;
    }

    public function setSwimmer(Swimmer $swimmer): self
    {
        $this->swimmer = $swimmer;
        return $this;
    }

    // Getter et Setter pour le nom de la compétition
    public function getCompetitionName(): string
    {
        return $this->competitionName;
    }

    public function setCompetitionName(string $competitionName): self
    {
        $this->competitionName = $competitionName;
        return $this;
    }

    // Getter et Setter pour la date de la compétition
    public function getDateCompetition(): \DateTimeInterface
    {
        return $this->dateCompetition;
    }

    public function setDateCompetition(\DateTimeInterface $dateCompetition): self
    {
        $this->dateCompetition = $dateCompetition;
        return $this;
    }

    // Getter et Setter pour le résultat
    public function getResult(): string
    {
        return $this->result;
    }

    public function setResult(string $result): self
    {
        $this->result = $result;
        return $this;
    }
}
