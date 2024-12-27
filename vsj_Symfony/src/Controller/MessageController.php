<?php

namespace App\Controller;

use App\Entity\Messages;
use App\Entity\Swimmer;
use App\Repository\MessagesRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MessageController extends AbstractController
{
    #[Route('/api/messages', name: 'get_contacts', methods: ['GET'])]
    public function getContacts(EntityManagerInterface $entityManager): JsonResponse
    {
        $query = $entityManager->createQuery(
            'SELECT m
             FROM App\Entity\Messages m
             WHERE m.createdAt IN (
                 SELECT MAX(m2.createdAt)
                 FROM App\Entity\Messages m2
                 WHERE m2.sender = m.sender
                 GROUP BY m2.sender
             )
             ORDER BY m.createdAt DESC'
        );

        $lastMessages = $query->getResult();

        $contacts = array_map(function ($message) {
            $swimmer = $message->getSender();
            return [
                'id' => $swimmer->getId(),
                'name' => $swimmer->getPrenom() . ' ' . $swimmer->getNom(), 
                'lastMessage' => $message->getContent(),
                'date' => $message->getCreatedAt()->format(\DateTime::ISO8601), // Utilisation de ISO 8601
                'avatar' => '/assets/icons/Avatar03.png', 
            ];
        }, $lastMessages);

        return $this->json($contacts);
    }

    #[Route('/api/messages', name: 'create_message', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $swimmer = $entityManager->getRepository(Swimmer::class)->findOneBy(['email' => $data['senderEmail']]);
        if (!$swimmer) {
            return $this->json(['message' => 'Sender not found'], JsonResponse::HTTP_NOT_FOUND);
        }

        $message = new Messages();
        $message->setContent($data['content']);
        $message->setSender($swimmer);

        $entityManager->persist($message);
        $entityManager->flush();

        return $this->json([
            'message' => 'Message created successfully',
            'messageId' => $message->getId(),
            'content' => $message->getContent(),
            'sender' => $message->getSenderEmail(), 
            'createdAt' => $message->getCreatedAt()->format(\DateTime::ISO8601) // Format ISO 8601
        ], JsonResponse::HTTP_CREATED);
    }
}
