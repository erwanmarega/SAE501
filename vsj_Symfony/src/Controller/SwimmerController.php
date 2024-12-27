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

class SwimmerController extends AbstractController
{
    /**
     * Créer un nouveau nageur
     */
    #[Route('/swimmer', name: 'create_swimmer', methods: ['POST'])]
    public function createSwimmer(Request $request, EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher): Response
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['email'], $data['password'])) {
            return $this->json(['message' => 'Email and password are required'], Response::HTTP_BAD_REQUEST);
        }

        $existingSwimmer = $entityManager->getRepository(Swimmer::class)->findOneBy(['email' => $data['email']]);
        if ($existingSwimmer) {
            return $this->json(['message' => 'Email already in use'], Response::HTTP_CONFLICT);
        }

        $swimmer = new Swimmer();
        $swimmer->setEmail($data['email']);

        $hashedPassword = $passwordHasher->hashPassword($swimmer, $data['password']);
        $swimmer->setPassword($hashedPassword);

        $swimmer->setNom($data['nom'] ?? null);
        $swimmer->setPrenom($data['prenom'] ?? null);
        $swimmer->setDateNaissance(isset($data['dateNaissance']) ? new \DateTime($data['dateNaissance']) : null);
        $swimmer->setAdresse($data['adresse'] ?? null);
        $swimmer->setCodePostal($data['codePostal'] ?? null);
        $swimmer->setVille($data['ville'] ?? null);
        $swimmer->setTelephone($data['telephone'] ?? null);

        $entityManager->persist($swimmer);
        $entityManager->flush();

        return $this->json(['message' => 'Swimmer created successfully', 'swimmerId' => $swimmer->getId()], Response::HTTP_CREATED);
    }

    /**
     * Récupérer les informations du nageur actuellement connecté
     */
    #[Route('/swimmer', name: 'get_swimmer', methods: ['GET'])]
    public function getSwimmer(): Response
    {
        $swimmer = $this->getUser();

        if (!$swimmer instanceof Swimmer) {
            return $this->json(['message' => 'Swimmer not logged in'], Response::HTTP_UNAUTHORIZED);
        }

        return $this->json($swimmer, Response::HTTP_OK, [], ['groups' => 'swimmer:read']);
    }

    /**
     * Mettre à jour un nageur par email
     */
    #[Route('/swimmer/{email}', name: 'swimmer_update', methods: ['PUT'])]
    public function updateSwimmer(Request $request, EntityManagerInterface $entityManager, $email): Response
    {
        $swimmer = $entityManager->getRepository(Swimmer::class)->findOneBy(['email' => $email]);

        if (!$swimmer) {
            return $this->json(['message' => 'Swimmer not found'], Response::HTTP_NOT_FOUND);
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

    /**
     * Supprimer le nageur actuellement connecté
     */
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

    /**
     * Authentification du nageur
     */
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

        return $this->json(['message' => 'Inscription réussie'], Response::HTTP_OK);
    }

    /**
     * Récupérer les événements d'un groupe autour d'une date
     */
    #[Route('/swimmer/group/{groupId}/events', name: 'group_events', methods: ['GET'])]
    public function getGroupEvents(
        int $groupId,
        Request $request,
        EntityManagerInterface $entityManager
    ): Response {
        $currentDate = $request->query->get('currentDate');

        if (!$currentDate) {
            return $this->json(['message' => 'La date actuelle est incorrect '], Response::HTTP_BAD_REQUEST);
        }

        $date = new \DateTime($currentDate);
        $startDate = (clone $date)->modify('-45 days');
        $endDate = (clone $date)->modify('+45 days');

        $query = $entityManager->createQuery(
            'SELECT t 
             FROM App\Entity\Training t 
             WHERE t.group = :groupId 
             AND t.date BETWEEN :startDate AND :endDate'
        )
        ->setParameter('groupId', $groupId)
        ->setParameter('startDate', $startDate)
        ->setParameter('endDate', $endDate);

        return $this->json($query->getResult());
    }
}
