<?php

namespace App\Entity;

use App\Repository\LoginHistoryRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: LoginHistoryRepository::class)]
class LoginHistory
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'datetime')]
    private \DateTimeInterface $dateTime;

    #[ORM\Column(length: 255)]
    private string $action; // "login" ou "logout"

    #[ORM\ManyToOne(targetEntity: Swimmer::class)]
    #[ORM\JoinColumn(nullable: false)]
    private ?Swimmer $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateTime(): \DateTimeInterface
    {
        return $this->dateTime;
    }

    public function setDateTime(\DateTimeInterface $dateTime): self
    {
        $this->dateTime = $dateTime;
        return $this;
    }

    public function getAction(): string
    {
        return $this->action;
    }

    public function setAction(string $action): self
    {
        $this->action = $action;
        return $this;
    }

    public function getUser(): ?Swimmer
    {
        return $this->user;
    }

    public function setUser(?Swimmer $user): self
    {
        $this->user = $user;
        return $this;
    }
}
