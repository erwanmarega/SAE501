<?php

namespace App\Controller;

use App\Entity\Swimmer;
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

    /**
     * @Route("/register", name="register_swimmer", methods={"POST"})
     */
    public function register(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['email']) || empty($data['password'])) {
            return $this->json(['message' => 'Email and password are required'], Response::HTTP_BAD_REQUEST);
        }

        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            return $this->json(['message' => 'Invalid email format'], Response::HTTP_BAD_REQUEST);
        }

        $existingSwimmer = $this->entityManager->getRepository(Swimmer::class)->findOneBy(['email' => $data['email']]);
        if ($existingSwimmer) {
            return $this->json(['message' => 'Email already in use'], Response::HTTP_CONFLICT);
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
            'message' => 'User registered successfully',
            'token' => $token,
        ], Response::HTTP_CREATED);
    }

    /**
     * @Route("/api/complete-registration", name="complete_registration", methods={"POST"})
     */
    public function completeRegistration(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['nom']) || empty($data['prenom'])) {
            return $this->json(['message' => 'Name and first name are required'], Response::HTTP_BAD_REQUEST);
        }

        $user = $this->getUser(); 

        if (!$user instanceof Swimmer) {
            return $this->json(['message' => 'User not authenticated'], Response::HTTP_UNAUTHORIZED);
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
            'message' => 'User registration completed successfully',
        ], Response::HTTP_OK);
    }

    /**
     * @Route("/api/user-profile", name="user_profile", methods={"GET"})
     */
    public function getUserProfile(): Response
    {
        $user = $this->getUser(); 

        if (!$user) {
            return $this->json(['message' => 'User not authenticated'], Response::HTTP_UNAUTHORIZED);
        }

        if (!$user instanceof Swimmer) {
            return $this->json(['message' => 'User is not a swimmer'], Response::HTTP_UNAUTHORIZED);
        }

        return $this->json([
            'prenom' => $user->getPrenom(),  
            'nom' => $user->getNom(),
        ]);
    }

    /**
 * @Route("/swimmer/login", name="login_swimmer", methods={"POST"})
 */
public function login(Request $request): Response
{
    $data = json_decode($request->getContent(), true);

    if (empty($data['email']) || empty($data['password'])) {
        return $this->json(['message' => 'Email and password are required'], Response::HTTP_BAD_REQUEST);
    }

    // Vérifier si l'utilisateur existe avec cet email
    $swimmer = $this->entityManager->getRepository(Swimmer::class)->findOneBy(['email' => $data['email']]);

    if (!$swimmer) {
        return $this->json(['message' => 'Invalid email or password'], Response::HTTP_UNAUTHORIZED);
    }

    // Vérifier le mot de passe
    if (!$this->passwordHasher->isPasswordValid($swimmer, $data['password'])) {
        return $this->json(['message' => 'Invalid email or password'], Response::HTTP_UNAUTHORIZED);
    }

    // Générer le token JWT
    $token = $this->jwtManager->create($swimmer);

    return $this->json([
        'message' => 'Login successful',
        'token' => $token,
    ]);
}
}
