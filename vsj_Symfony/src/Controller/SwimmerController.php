<?php

namespace App\Controller;

use App\Entity\Swimmer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

class SwimmerController extends AbstractController
{
    #[Route('/swimmer', name: 'create_swimmer', methods: ['POST'])]
    public function createSwimmer(Request $request, EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher, JWTTokenManagerInterface $JWTManager): Response
    {
        $data = json_decode($request->getContent(), true);

        // ✅ Vérification des champs requis
        $requiredFields = ['email', 'password', 'nom', 'prenom', 'dateNaissance', 'adresse', 'codePostal', 'ville', 'telephone'];
        foreach ($requiredFields as $field) {
            if (!isset($data[$field])) {
                return $this->json(['message' => "The field '$field' is required"], Response::HTTP_BAD_REQUEST);
            }
        }

        // ✅ Validation de l'email
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            return $this->json(['message' => 'Invalid email format'], Response::HTTP_BAD_REQUEST);
        }

        // ✅ Vérification de l'unicité de l'email
        $existingSwimmer = $entityManager->getRepository(Swimmer::class)->findOneBy(['email' => $data['email']]);
        if ($existingSwimmer) {
            return $this->json(['message' => 'Email already in use'], Response::HTTP_CONFLICT);
        }

        // ✅ Création et configuration de l'entité Swimmer
        $swimmer = new Swimmer();
        $swimmer->setEmail($data['email']);
        $hashedPassword = $passwordHasher->hashPassword($swimmer, $data['password']);
        $swimmer->setPassword($hashedPassword);
        $swimmer->setNom($data['nom']);
        $swimmer->setPrenom($data['prenom']);
        try {
            $swimmer->setDateNaissance(new \DateTime($data['dateNaissance']));
        } catch (\Exception $e) {
            return $this->json(['message' => 'Invalid date format for dateNaissance'], Response::HTTP_BAD_REQUEST);
        }
        $swimmer->setAdresse($data['adresse']);
        $swimmer->setCodePostal($data['codePostal']);
        $swimmer->setVille($data['ville']);
        $swimmer->setTelephone($data['telephone']);

        // ✅ Sauvegarde dans la base de données
        $entityManager->persist($swimmer);
        $entityManager->flush();

        // ✅ Génération du token JWT
        $token = $JWTManager->create($swimmer);

        return $this->json([
            'message' => 'Swimmer created successfully',
            'token' => $token
        ], Response::HTTP_CREATED);
    }

    #[Route('/swimmer', name: 'get_swimmer', methods: ['GET'])]
    public function getSwimmer(): Response
    {
        $swimmer = $this->getUser();

        if (!$swimmer instanceof Swimmer) {
            return $this->json(['message' => 'Swimmer not logged in'], Response::HTTP_UNAUTHORIZED);
        }

        return $this->json($swimmer, Response::HTTP_OK, [], ['groups' => 'swimmer:read']);
    }

    #[Route('/swimmer/update', name: 'update_swimmer', methods: ['PUT'])]
    public function updateSwimmer(Request $request, EntityManagerInterface $entityManager): Response
    {
        $swimmer = $this->getUser();

        if (!$swimmer instanceof Swimmer) {
            return $this->json(['message' => 'Swimmer not logged in'], Response::HTTP_UNAUTHORIZED);
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['nom'])) {
            $swimmer->setNom($data['nom']);
        }
        if (isset($data['prenom'])) {
            $swimmer->setPrenom($data['prenom']);
        }
        if (isset($data['dateNaissance'])) {
            try {
                $swimmer->setDateNaissance(new \DateTime($data['dateNaissance']));
            } catch (\Exception $e) {
                return $this->json(['message' => 'Invalid date format'], Response::HTTP_BAD_REQUEST);
            }
        }
        if (isset($data['adresse'])) {
            $swimmer->setAdresse($data['adresse']);
        }
        if (isset($data['codePostal'])) {
            $swimmer->setCodePostal($data['codePostal']);
        }
        if (isset($data['ville'])) {
            $swimmer->setVille($data['ville']);
        }
        if (isset($data['telephone'])) {
            $swimmer->setTelephone($data['telephone']);
        }

        $entityManager->persist($swimmer);
        $entityManager->flush();

        return $this->json(['message' => 'Swimmer updated successfully'], Response::HTTP_OK);
    }

    #[Route('/swimmer', name: 'delete_swimmer', methods: ['DELETE'])]
    public function deleteSwimmer(EntityManagerInterface $entityManager): Response
    {
        $swimmer = $this->getUser();

        if (!$swimmer instanceof Swimmer) {
            return $this->json(['message' => 'Swimmer not logged in'], Response::HTTP_UNAUTHORIZED);
        }

        $entityManager->remove($swimmer);
        $entityManager->flush();

        return $this->json(['message' => 'Swimmer deleted successfully'], Response::HTTP_OK);
    }

    #[Route('/swimmer/login', name: 'login', methods: ['POST'])]
    public function login(Request $request, UserPasswordHasherInterface $passwordHasher, SessionInterface $session, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);

        $swimmer = $entityManager->getRepository(Swimmer::class)->findOneBy(['email' => $data['email']]);

        if (!$swimmer || !$passwordHasher->isPasswordValid($swimmer, $data['password'])) {
            return $this->json(['message' => 'Invalid credentials'], Response::HTTP_UNAUTHORIZED);
        }

        $session->set('user_id', $swimmer->getId());
        $session->set('user_email', $swimmer->getEmail());

        return $this->json(['message' => 'Login successful'], Response::HTTP_OK);
    }
}
    