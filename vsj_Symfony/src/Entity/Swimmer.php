<?php

namespace App\Entity;

use App\Repository\SwimmerRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: SwimmerRepository::class)]
class Swimmer implements PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['swimmer:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)] 
    #[Groups(['swimmer:read', 'swimmer:write'])]
    private ?string $nom = null;

    #[ORM\Column(length: 255, nullable: true)] 
    #[Groups(['swimmer:read', 'swimmer:write'])]
    private ?string $prenom = null;

    #[ORM\Column(type: 'date', nullable: true)] 
    #[Groups(['swimmer:read', 'swimmer:write'])]
    private ?\DateTimeInterface $dateNaissance = null;

    #[ORM\Column(length: 255, nullable: true)] 
    #[Groups(['swimmer:read', 'swimmer:write'])]
    private ?string $adresse = null;

    #[ORM\Column(length: 10, nullable: true)] 
    #[Groups(['swimmer:read', 'swimmer:write'])]
    private ?string $codePostal = null;

    #[ORM\Column(length: 255, nullable: true)] 
    #[Groups(['swimmer:read', 'swimmer:write'])]
    private ?string $ville = null;

    #[ORM\Column(length: 20, nullable: true)] 
    #[Groups(['swimmer:read', 'swimmer:write'])]
    private ?string $telephone = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Assert\NotBlank(message: "L'email est obligatoire.")]
    #[Assert\Email(message: "L'email doit être valide.")]
    #[Groups(['swimmer:read', 'swimmer:write'])]
    private ?string $email = null;
    

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: "Le mot de passe est obligatoire.")]
    #[Assert\Length(min: 8, minMessage: "Le mot de passe doit contenir au moins 8 caractères.")]
    #[Groups(['swimmer:read', 'swimmer:write'])]
    private ?string $password = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(?string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(?string $prenom): self
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getDateNaissance(): ?\DateTimeInterface
    {
        return $this->dateNaissance;
    }

    public function setDateNaissance(?\DateTimeInterface $dateNaissance): self
    {
        $this->dateNaissance = $dateNaissance;

        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(?string $adresse): self
    {
        $this->adresse = $adresse;

        return $this;
    }

    public function getCodePostal(): ?string
    {
        return $this->codePostal;
    }

    public function setCodePostal(?string $codePostal): self
    {
        $this->codePostal = $codePostal;

        return $this;
    }

    public function getVille(): ?string
    {
        return $this->ville;
    }

    public function setVille(?string $ville): self
    {
        $this->ville = $ville;

        return $this;
    }

    public function getTelephone(): ?string
    {
        return $this->telephone;
    }

    public function setTelephone(?string $telephone): self
    {
        $this->telephone = $telephone;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }
}
