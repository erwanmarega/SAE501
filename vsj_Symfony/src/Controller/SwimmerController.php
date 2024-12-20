<?php

namespace App\Controller;

use App\Entity\Swimmer;
use App\Repository\SwimmerRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Serializer\SerializerInterface; // Ajoutez cette ligne pour l'import

class SwimmerController extends AbstractController
{
    // Route pour la connexion d'un nageur
    #[Route('/login', name: 'app_swimmer_login', methods: ['POST'])]
    public function login(
        Request $request,
        SwimmerRepository $swimmerRepository,
        UserPasswordHasherInterface $passwordHasher,
        SessionInterface $session // Injection de la session ici
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        // Vérifier si les champs nécessaires sont présents
        if (empty($data['email']) || empty($data['password'])) {
            return new JsonResponse(['message' => 'Email et mot de passe requis.'], 400);
        }

        // Trouver l'utilisateur dans la base de données par email
        $swimmer = $swimmerRepository->findOneBy(['email' => $data['email']]);
        if (!$swimmer || !$passwordHasher->isPasswordValid($swimmer, $data['password'])) {
            return new JsonResponse(['message' => 'Email ou mot de passe incorrect.'], 401);
        }

        // Authentifier l'utilisateur en stockant son ID et son email dans la session
        $session->set('swimmer_id', $swimmer->getId());
        $session->set('swimmer_email', $swimmer->getEmail());

        return new JsonResponse(['message' => 'Connexion réussie.'], 200);
    }

    // Route pour la déconnexion d'un nageur
    #[Route('/logout', name: 'app_swimmer_logout', methods: ['POST'])]
    public function logout(SessionInterface $session): JsonResponse
    {
        $session->clear(); // Effacer la session lors de la déconnexion
        return new JsonResponse(['message' => 'Déconnexion réussie.'], 200);
    }

    // Route pour lister tous les nageurs (uniquement accessible si l'utilisateur est connecté)
    #[Route('/swimmer', name: 'app_swimmer_index', methods: ['GET'])]
    public function index(SwimmerRepository $swimmerRepository, SerializerInterface $serializer, SessionInterface $session): JsonResponse
    {
        // Vérifier si l'utilisateur est connecté
        if (!$session->has('swimmer_id')) {
            return new JsonResponse(['message' => 'Vous devez être connecté pour accéder à cette ressource.'], 401);
        }

        $swimmers = $swimmerRepository->findAll();
        $json = $serializer->serialize($swimmers, 'json', ['groups' => 'swimmer:read']);
        return new JsonResponse($json, 200, [], true);
    }

    // Route pour afficher un nageur en particulier
    #[Route('/swimmer/{id}', name: 'app_swimmer_show', methods: ['GET'])]
    public function show(Swimmer $swimmer, SerializerInterface $serializer, SessionInterface $session): JsonResponse
    {
        // Vérifier si l'utilisateur est connecté
        if (!$session->has('swimmer_id')) {
            return new JsonResponse(['message' => 'Vous devez être connecté pour accéder à cette ressource.'], 401);
        }

        $json = $serializer->serialize($swimmer, 'json', ['groups' => 'swimmer:read']);
        return new JsonResponse($json, 200, [], true);
    }

    // Route pour créer un nouveau nageur
    #[Route('/swimmer', name: 'app_swimmer_create', methods: ['POST'])]
    public function create(
        Request $request, 
        EntityManagerInterface $entityManager, 
        SwimmerRepository $swimmerRepository, 
        SerializerInterface $serializer, 
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        // Vérification des champs obligatoires
        if (empty($data['email']) || empty($data['password'])) {
            return new JsonResponse(['message' => 'Email et mot de passe sont obligatoires.'], 400);
        }

        // Vérification si l'email existe déjà
        $existingSwimmer = $swimmerRepository->findOneBy(['email' => $data['email']]);
        if ($existingSwimmer) {
            return new JsonResponse(['message' => 'Il y a déjà un compte avec cette adresse mail.'], 400);
        }

        $swimmer = new Swimmer();

        // Champs optionnels
        if (!empty($data['nom'])) {
            $swimmer->setNom($data['nom']);
        }
        if (!empty($data['prenom'])) {
            $swimmer->setPrenom($data['prenom']);
        }
        if (!empty($data['dateNaissance'])) {
            try {
                $swimmer->setDateNaissance(new \DateTime($data['dateNaissance']));
            } catch (\Exception $e) {
                return new JsonResponse(['message' => 'La date de naissance n\'est pas valide.'], 400);
            }
        }
        if (!empty($data['adresse'])) {
            $swimmer->setAdresse($data['adresse']);
        }
        if (!empty($data['codePostal'])) {
            $swimmer->setCodePostal($data['codePostal']);
        }
        if (!empty($data['ville'])) {
            $swimmer->setVille($data['ville']);
        }
        if (!empty($data['telephone'])) {
            $swimmer->setTelephone($data['telephone']);
        }

        // Champs obligatoires
        $swimmer->setEmail($data['email']);
        $hashedPassword = $passwordHasher->hashPassword($swimmer, $data['password']);
        $swimmer->setPassword($hashedPassword);

        // Sauvegarde dans la base de données
        $entityManager->persist($swimmer);
        $entityManager->flush();

        $json = $serializer->serialize($swimmer, 'json', ['groups' => 'swimmer:read']);
        return new JsonResponse($json, 201, [], true);
    }

    // Route pour mettre à jour un nageur existant
    #[Route('/swimmer/{id}', name: 'app_swimmer_update', methods: ['PUT'])]
    public function update(Request $request, Swimmer $swimmer, EntityManagerInterface $entityManager, SerializerInterface $serializer, UserPasswordHasherInterface $passwordHasher, SessionInterface $session): JsonResponse
    {
        // Vérifier si l'utilisateur est connecté
        if (!$session->has('swimmer_id')) {
            return new JsonResponse(['message' => 'Vous devez être connecté pour accéder à cette ressource.'], 401);
        }

        $data = json_decode($request->getContent(), true);

        $swimmer->setNom($data['nom']);
        $swimmer->setPrenom($data['prenom']);
        $swimmer->setDateNaissance(new \DateTime($data['dateNaissance']));
        $swimmer->setAdresse($data['adresse']);
        $swimmer->setCodePostal($data['codePostal']);
        $swimmer->setVille($data['ville']);
        $swimmer->setTelephone($data['telephone']);
        $swimmer->setEmail($data['email']);

        if (isset($data['password'])) {
            // Hash le mot de passe avant de le mettre à jour
            $hashedPassword = $passwordHasher->hashPassword($swimmer, $data['password']);
            $swimmer->setPassword($hashedPassword);
        }

        $entityManager->flush();

        $json = $serializer->serialize($swimmer, 'json', ['groups' => 'swimmer:read']);
        return new JsonResponse($json, 200, [], true);
    }
}
