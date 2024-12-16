<?php

namespace App\Controller;

use App\Entity\Message;
use App\Repository\MessageRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MessageController extends AbstractController
{
    // Récupérer tous les messages
    #[Route('/api/messages', name: 'get_messages', methods: ['GET'])]
    public function getMessages(MessageRepository $messageRepository): JsonResponse
    {
        // Récupérer tous les messages triés par date de création (croissant)
        $messages = $messageRepository->findBy([], ['createdAt' => 'ASC']);

        // Formater les données pour le JSON
        $formattedMessages = array_map(function (Message $message) {
            return [
                'id' => $message->getId(),
                'content' => $message->getContent(),
                'sender' => $message->getSender(),
                'createdAt' => $message->getCreatedAt()->format('Y-m-d H:i:s'),
            ];
        }, $messages);

        return $this->json($formattedMessages);
    }

    // Créer un nouveau message
    #[Route('/api/messages', name: 'create_message', methods: ['POST'])]
    public function createMessage(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Décoder le contenu JSON envoyé dans la requête
        $data = json_decode($request->getContent(), true);

        // Vérifier que les données nécessaires sont présentes
        if (!isset($data['content'], $data['sender'])) {
            return $this->json(['error' => 'Invalid data'], 400);
        }

        // Créer une nouvelle entité Message
        $message = new Message();
        $message->setContent($data['content']);
        $message->setSender($data['sender']);
        $message->setCreatedAt(new \DateTime());

        // Sauvegarder le message dans la base de données
        $entityManager->persist($message);
        $entityManager->flush();

        // Retourner le message créé au format JSON
        return $this->json([
            'id' => $message->getId(),
            'content' => $message->getContent(),
            'sender' => $message->getSender(),
            'createdAt' => $message->getCreatedAt()->format('Y-m-d H:i:s'),
        ], 201);
    }
}
