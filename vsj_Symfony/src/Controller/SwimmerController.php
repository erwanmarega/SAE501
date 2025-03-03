<?php

namespace App\Controller;
use App\Repository\CompetitionRepository;

use App\Entity\Swimmer;
use App\Entity\CompetitionResult;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;

class SwimmerController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private UserPasswordHasherInterface $passwordHasher;
    private JWTTokenManagerInterface $jwtManager;

    public function __construct(
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher,
        JWTTokenManagerInterface $jwtManager
    ) {
        $this->entityManager = $entityManager;
        $this->passwordHasher = $passwordHasher;
        $this->jwtManager = $jwtManager;
    }

    #[Route('/register', name: 'register_swimmer', methods: ['POST'])]
    public function register(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['email']) || empty($data['password'])) {
            return $this->json(['message' => 'L\'email et le mot de passe sont requis'], Response::HTTP_BAD_REQUEST);
        }

        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            return $this->json(['message' => 'Format d\'email invalide'], Response::HTTP_BAD_REQUEST);
        }

        $existingSwimmer = $this->entityManager->getRepository(Swimmer::class)->findOneBy(['email' => $data['email']]);
        if ($existingSwimmer) {
            return $this->json(['message' => 'Cet email est déjà utilisé'], Response::HTTP_CONFLICT);
        }

        $swimmer = new Swimmer();
        $swimmer->setEmail($data['email']);

        $hashedPassword = $this->passwordHasher->hashPassword($swimmer, $data['password']);
        $swimmer->setPassword($hashedPassword);

        $swimmer->setRoles(['ROLE_USER']);

        $this->entityManager->persist($swimmer);
        $this->entityManager->flush();

        $token = $this->jwtManager->create($swimmer);

        return $this->json([
            'message' => 'Utilisateur enregistré avec succès',
            'token' => $token,
        ], Response::HTTP_CREATED);
    }

    #[Route('/api/complete-registration', name: 'complete_registration', methods: ['POST'])]
    public function completeRegistration(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['nom']) || empty($data['prenom'])) {
            return $this->json(['message' => 'Le nom et le prénom sont requis'], Response::HTTP_BAD_REQUEST);
        }

        $user = $this->getUser();

        if (!$user instanceof Swimmer) {
            return $this->json(['message' => 'Utilisateur non authentifié'], Response::HTTP_UNAUTHORIZED);
        }

        $user->setNom($data['nom']);
        $user->setPrenom($data['prenom']);
        $user->setDateNaissance(new \DateTime($data['dateNaissance'] ?? 'now'));
        $user->setAdresse($data['adresse'] ?? null);
        $user->setCodePostal($data['codePostal'] ?? null);
        $user->setVille($data['ville'] ?? null);
        $user->setTelephone($data['telephone'] ?? null);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $this->json([
            'message' => 'Inscription finalisée',
        ], Response::HTTP_OK);
    }

    #[Route('/api/user-profile', name: 'user_profile', methods: ['GET'])]
    public function getUserProfile(): Response
    {
        $user = $this->getUser();

        if (!$user) {
            return $this->json(['message' => 'Utilisateur non authentifié'], Response::HTTP_UNAUTHORIZED);
        }

        if (!$user instanceof Swimmer) {
            return $this->json(['message' => 'Aucun compte avec ces informations'], Response::HTTP_UNAUTHORIZED);
        }

        return $this->json([
            'prenom' => $user->getPrenom(),
            'nom' => $user->getNom(),
            'dateNaissance' => $user->getDateNaissance() ? $user->getDateNaissance()->format('Y-m-d') : null,
            'adresse' => $user->getAdresse(),
            'codePostal' => $user->getCodePostal(),
            'ville' => $user->getVille(),
            'telephone' => $user->getTelephone(),
        ]);
    }

    #[Route('/swimmer/login', name: 'login_swimmer', methods: ['POST'])]
    public function login(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['email']) || empty($data['password'])) {
            return $this->json(['message' => 'L\'email et le mot de passe sont requis'], Response::HTTP_BAD_REQUEST);
        }

        $swimmer = $this->entityManager->getRepository(Swimmer::class)->findOneBy(['email' => $data['email']]);

        if (!$swimmer) {
            return $this->json(['message' => 'Email ou mot de passe invalide'], Response::HTTP_UNAUTHORIZED);
        }

        if (!$this->passwordHasher->isPasswordValid($swimmer, $data['password'])) {
            return $this->json(['message' => 'Email ou mot de passe invalide'], Response::HTTP_UNAUTHORIZED);
        }

        $token = $this->jwtManager->create($swimmer);

        return $this->json([
            'message' => 'Connexion réussie',
            'token' => $token,
        ]);
    }

    #[Route('/api/user-profile', name: 'update_user_profile', methods: ['PUT'])]
    public function updateUserProfile(Request $request): Response
    {
        $user = $this->getUser();

        if (!$user) {
            return $this->json(['message' => 'Utilisateur non authentifié'], Response::HTTP_UNAUTHORIZED);
        }

        if (!$user instanceof Swimmer) {
            return $this->json(['message' => 'Aucun compte avec ces informations'], Response::HTTP_UNAUTHORIZED);
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['nom'])) {
            $user->setNom($data['nom']);
        }
        if (isset($data['prenom'])) {
            $user->setPrenom($data['prenom']);
        }
        if (isset($data['dateNaissance'])) {
            try {
                $user->setDateNaissance(new \DateTime($data['dateNaissance']));
            } catch (\Exception $e) {
                return $this->json(['message' => 'Format de date invalide'], Response::HTTP_BAD_REQUEST);
            }
        }
        if (isset($data['adresse'])) {
            $user->setAdresse($data['adresse']);
        }
        if (isset($data['codePostal'])) {
            $user->setCodePostal($data['codePostal']);
        }
        if (isset($data['ville'])) {
            $user->setVille($data['ville']);
        }
        if (isset($data['telephone'])) {
            $user->setTelephone($data['telephone']);
        }

        $this->entityManager->flush();

        return $this->json(['message' => 'Profil mis à jour avec succès']);
    }

    #[Route('/api/swimmer/{id}/last-competitions', name: 'swimmer_last_competitions', methods: ['GET'])]
    public function getLastCompetitions(int $id, CompetitionRepository $competitionRepository): JsonResponse
    {
        $competitions = $competitionRepository->findLastThreeResultsBySwimmer($id);

        return $this->json($competitions);
    }




}
