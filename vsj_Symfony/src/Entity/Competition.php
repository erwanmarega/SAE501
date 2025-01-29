<?php

namespace App\Entity;

use App\Repository\CompetitionRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CompetitionRepository::class)]
class Competition
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(type: 'date')]
    private ?\DateTimeInterface $dayDate = null;

    #[ORM\Column(type: 'time')]
    private ?\DateTimeInterface $hourDate = null;

    #[ORM\Column(type: 'time')]
    private ?\DateTimeInterface $duration = null;

    #[ORM\Column(length: 255)]
    private ?string $address = null;

    #[ORM\Column(length: 255)]
    private ?string $category = null;

    #[ORM\Column(type: 'text')]
    private ?string $description = null;

    #[ORM\Column(type: 'boolean')]
    private ?bool $isDefined = null;

    #[ORM\ManyToOne(targetEntity: Group::class)]
    #[ORM\JoinColumn(name: "groups_id", referencedColumnName: "groups_id", nullable: false)]
    private ?Group $group = null;

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

    public function getDayDate(): ?\DateTimeInterface
    {
        return $this->dayDate;
    }

    public function setDayDate(\DateTimeInterface $dayDate): self
    {
        $this->dayDate = $dayDate;

        return $this;
    }

    public function getHourDate(): ?\DateTimeInterface
    {
        return $this->hourDate;
    }

    public function setHourDate(\DateTimeInterface $hourDate): self
    {
        $this->hourDate = $hourDate;

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

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

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

    public function getGroup(): ?Group
    {
        return $this->group;
    }

    public function setGroup(Group $group): self
    {
        $this->group = $group;

        return $this;
    }

}