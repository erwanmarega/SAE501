<?php

namespace App\Controller;

use App\Entity\Swimmer;
use App\Repository\SwimmerRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class SwimmerController extends AbstractController
{
    #[Route('/swimmers', name: 'app_swimmer_index', methods: ['GET'])]
    public function index(SwimmerRepository $swimmerRepository, SerializerInterface $serializer): JsonResponse
    {
        $swimmers = $swimmerRepository->findAll();
        $json = $serializer->serialize($swimmers, 'json', ['groups' => 'swimmer:read']);
        return new JsonResponse($json, 200, [], true);
    }

    #[Route('/swimmer/{id}', name: 'app_swimmer_show', methods: ['GET'])]
    public function show(Swimmer $swimmer, SerializerInterface $serializer): JsonResponse
    {
        $json = $serializer->serialize($swimmer, 'json', ['groups' => 'swimmer:read']);
        return new JsonResponse($json, 200, [], true);
    }

    #[Route('/swimmer', name: 'app_swimmer_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $swimmer = new Swimmer();
        $swimmer->setNom($data['nom']);
        $swimmer->setPrenom($data['prenom']);
        $swimmer->setDateNaissance(new \DateTime($data['dateNaissance']));
        $swimmer->setAdresse($data['adresse']);
        $swimmer->setCodePostal($data['codePostal']);
        $swimmer->setVille($data['ville']);
        $swimmer->setTelephone($data['telephone']);
        $swimmer->setEmail($data['email']);

        // Hash the password before setting it
        $hashedPassword = $passwordHasher->hashPassword($swimmer, $data['password']);
        $swimmer->setPassword($hashedPassword);

        $entityManager->persist($swimmer);
        $entityManager->flush();

        $json = $serializer->serialize($swimmer, 'json', ['groups' => 'swimmer:read']);
        return new JsonResponse($json, 201, [], true);
    }

    #[Route('/swimmer/{id}', name: 'app_swimmer_update', methods: ['PUT'])]
    public function update(Request $request, Swimmer $swimmer, EntityManagerInterface $entityManager, SerializerInterface $serializer, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
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
            // Hash the password before setting it
            $hashedPassword = $passwordHasher->hashPassword($swimmer, $data['password']);
            $swimmer->setPassword($hashedPassword);
        }

        $entityManager->flush();

        $json = $serializer->serialize($swimmer, 'json', ['groups' => 'swimmer:read']);
        return new JsonResponse($json, 200, [], true);
    }
}