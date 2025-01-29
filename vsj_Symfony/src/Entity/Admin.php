<?php

namespace App\Entity;

use App\Repository\AdminRepository;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\Group;

#[ORM\Entity(repositoryClass: AdminRepository::class)]
#[ORM\Table(name: '`admin`')]
class Admin
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(type: 'integer')]
    private ?int $startDate = null; 

    #[ORM\Column(type: 'time')]
    private ?\DateTimeInterface $duration = null;

    #[ORM\Column(length: 255)]
    private ?string $intensity = null;

    #[ORM\Column(length: 255)]
    private ?string $category = null;

    #[ORM\Column(type: 'text')]
    private ?string $description = null;

    #[ORM\Column(type: 'boolean')]
    private ?bool $isDefined = null;

    #[ORM\ManyToOne(targetEntity: Group::class)]
#[ORM\JoinColumn(name: "groups_id", referencedColumnName: "groups_id", nullable: false)]
private ?Group $groups = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getStartDate(): ?int
    {
        return $this->startDate;
    }

    public function setStartDate(int $startDate): self
    {
        $this->startDate = $startDate;

        return $this;
    }

    public function getDuration(): ?\DateTimeInterface
    {
        return $this->duration;
    }

    public function setDuration(\DateTimeInterface $duration): self
    {
        $this->duration = $duration;

        return $this;
    }

    public function getIntensity(): ?string
    {
        return $this->intensity;
    }

    public function setIntensity(string $intensity): self
    {
        $this->intensity = $intensity;

        return $this;
    }

    public function getCategory(): ?string
    {
        return $this->category;
    }

    public function setCategory(string $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getIsDefined(): ?bool
    {
        return $this->isDefined;
    }

    public function setIsDefined(bool $isDefined): self
    {
        $this->isDefined = $isDefined;

        return $this;
    }

    public function getGroups(): ?Group
    {
        return $this->groups;
    }

    public function setGroups(Group $groups): self
    {
        $this->groups = $groups;

        return $this;
    }
}