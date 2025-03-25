<?php

namespace App\Entity;

use App\Repository\CompetitionRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity(repositoryClass: CompetitionRepository::class)]
class Competition
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(name: 'title_competition', length: 255)]
    private ?string $title = null;

    #[ORM\Column(name: 'day_competition', type: 'date')]
    private ?\DateTimeInterface $dayDate = null;

    #[ORM\Column(name: 'hour_competition', type: 'time')]
    private ?\DateTimeInterface $hourDate = null;

    #[ORM\Column(name: 'duration_competition', type: 'time')]
    private ?\DateTimeInterface $duration = null;

    #[ORM\Column(name: 'address_competition', length: 255)]
    private ?string $address = null;

    #[ORM\Column(name: 'category_competition', length: 255)]
    private ?string $category = null;

    #[ORM\Column(name: 'description_competition', type: 'text')]
    private ?string $description = null;

    #[ORM\Column(name: 'is_defined_competition', type: 'boolean')]
    private ?bool $isDefined = null;

    #[ORM\ManyToOne(targetEntity: Group::class)]
    #[ORM\JoinColumn(name: 'groups_id', referencedColumnName: 'id', nullable: false)]
    private ?Group $group = null;

    #[ORM\OneToMany(mappedBy: 'competition', targetEntity: CompetitionResult::class)]
    private Collection $results;

    public function __construct()
    {
        $this->results = new ArrayCollection();
    }

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

    public function getResults(): Collection
    {
        return $this->results;
    }

    public function addResult(CompetitionResult $result): self
    {
        if (!$this->results->contains($result)) {
            $this->results[] = $result;
            $result->setCompetition($this);
        }

        return $this;
    }

    public function removeResult(CompetitionResult $result): self
    {
        if ($this->results->removeElement($result)) {
            if ($result->getCompetition() === $this) {
                $result->setCompetition(null);
            }
        }

        return $this;
    }
}
