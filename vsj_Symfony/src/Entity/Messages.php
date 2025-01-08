<?php

namespace App\Entity;

use App\Repository\MessagesRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: MessagesRepository::class)]
class Messages
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['message:read'])]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['message:read'])]
    private ?string $content = null;

    #[ORM\ManyToOne(targetEntity: Swimmer::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['message:read'])]
    private ?Swimmer $sender = null;

    #[ORM\ManyToOne(targetEntity: Swimmer::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['message:read'])]
    private ?Swimmer $receiver = null;

    #[ORM\Column(type: 'datetime')]
    #[Groups(['message:read'])]
    private ?\DateTimeInterface $createdAt = null;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getSender(): ?Swimmer
    {
        return $this->sender;
    }

    public function setSender(?Swimmer $sender): self
    {
        $this->sender = $sender;

        return $this;
    }

    public function getSenderEmail(): ?string
    {
        return $this->sender ? $this->sender->getEmail() : null;
    }

    public function getReceiver(): ?Swimmer
    {
        return $this->receiver;
    }

    public function setReceiver(?Swimmer $receiver): self
    {
        $this->receiver = $receiver;

        return $this;
    }

    public function getReceiverEmail(): ?string
    {
        return $this->receiver ? $this->receiver->getEmail() : null;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}
