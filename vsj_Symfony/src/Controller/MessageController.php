<?php

namespace App\Controller;

use App\Entity\Messages;
use App\Entity\Swimmer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class MessageController extends AbstractController
{
    
    #[Route('/api/messages/contacts', name: 'get_contacts', methods: ['GET'])]
    public function getContacts(EntityManagerInterface $entityManager): JsonResponse
    {
        $user = $this->getUser();

        if (!$user instanceof Swimmer) {
            return $this->json(['message' => 'Utilisateur non authentifié'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $query = $entityManager->createQuery(
            'SELECT m
             FROM App\Entity\Messages m
             WHERE (m.sender = :user OR m.receiver = :user)
             AND m.createdAt IN (
                 SELECT MAX(m2.createdAt)
                 FROM App\Entity\Messages m2
                 WHERE (m2.sender = m.sender AND m2.receiver = m.receiver)
                    OR (m2.sender = m.receiver AND m2.receiver = m.sender)
                 GROUP BY m2.sender, m2.receiver
             )
             ORDER BY m.createdAt DESC'
        )->setParameter('user', $user);

        $lastMessages = $query->getResult();

        $contacts = array_map(function (Messages $message) use ($user) {
            $contact = $message->getSender() === $user ? $message->getReceiver() : $message->getSender();
            return [
                'id' => $contact->getId(),
                'name' => $contact->getPrenom() . ' ' . $contact->getNom(),
                'lastMessage' => $message->getContent(),
                'date' => $message->getCreatedAt()->format(\DateTime::ATOM),
                'avatar' => '/assets/icons/Avatar03.png',
            ];
        }, $lastMessages);

        return $this->json($contacts);
    }

    #[Route('/api/messages/send', name:'create_message', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
    
        $sender = $this->getUser();
        if (!$sender instanceof Swimmer) {
            return $this->json(['message' => 'Utilisateur non authentifié'], JsonResponse::HTTP_UNAUTHORIZED);
        }
    
        $receiver = $entityManager->getRepository(Swimmer::class)->find($data['receiverId']);
        if (!$receiver) {
            return $this->json(['message' => 'Destinataire introuvable'], JsonResponse::HTTP_NOT_FOUND);
        }
    
        if ($sender->getId() === $receiver->getId()) {
            return $this->json(['message' => 'Vous ne pouvez pas vous envoyer un message à vous-même'], JsonResponse::HTTP_BAD_REQUEST);
        }
    
        $message = new Messages();
        $message->setContent($data['content']);
        $message->setSender($sender);
        $message->setReceiver($receiver);
    
        $entityManager->persist($message);
        $entityManager->flush();
    
        return $this->json([
            'message' => 'Message envoyé avec succès',
            'messageId' => $message->getId(),
            'content' => $message->getContent(),
            'sender' => $message->getSender()->getEmail(),
            'receiver' => $message->getReceiver()->getEmail(),
            'createdAt' => $message->getCreatedAt()->format(\DateTime::ATOM),
        ], JsonResponse::HTTP_CREATED);
    }

    
     #[Route('/api/messages/conversation/{receiverId}', name:'get_conversation', methods:["GET"])]
     
    public function getConversation(int $receiverId, EntityManagerInterface $entityManager): JsonResponse
    {
        $user = $this->getUser();

        if (!$user instanceof Swimmer) {
            return $this->json(['message' => 'Utilisateur non authentifié'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $receiver = $entityManager->getRepository(Swimmer::class)->find($receiverId);
        if (!$receiver) {
            return $this->json(['message' => 'Destinataire introuvable'], JsonResponse::HTTP_NOT_FOUND);
        }

        $messages = $entityManager->getRepository(Messages::class)->createQueryBuilder('m')
            ->where('(m.sender = :user AND m.receiver = :receiver) OR (m.sender = :receiver AND m.receiver = :user)')
            ->setParameter('user', $user)
            ->setParameter('receiver', $receiver)
            ->orderBy('m.createdAt', 'ASC')
            ->getQuery()
            ->getResult();

        $conversation = array_map(function (Messages $message) use ($user, $receiver) {
            return [
                'id' => $message->getId(),
                'content' => $message->getContent(),
                'sender' => $message->getSender()->getId(),
                'receiver' => $message->getReceiver()->getId(),
                'isSentByUser' => $message->getSender() === $user,
                'createdAt' => $message->getCreatedAt()->format(\DateTime::ATOM),
                'senderPrenom' => $message->getSender()->getPrenom(),
                'senderNom' => $message->getSender()->getNom(),
                'receiverPrenom' => $message->getReceiver()->getPrenom(),
                'receiverNom' => $message->getReceiver()->getNom(),
            ];
        }, $messages);

        return $this->json($conversation);
    }

 
    #[Route('/api/messages/add-contact', name: 'add_contact', methods: ['POST'])]
    public function addContact(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $user = $this->getUser();
    
        if (!$user instanceof Swimmer) {
            return $this->json(['message' => 'Utilisateur non authentifié'], JsonResponse::HTTP_UNAUTHORIZED);
        }
    
        $data = json_decode($request->getContent(), true);
    
        if (empty($data['prenom']) || empty($data['nom'])) {
            return $this->json(['message' => 'Prénom et nom requis'], JsonResponse::HTTP_BAD_REQUEST);
        }
    
        $contact = $entityManager->getRepository(Swimmer::class)->createQueryBuilder('s')
            ->where('LOWER(s.prenom) = :prenom AND LOWER(s.nom) = :nom')
            ->setParameter('prenom', strtolower(trim($data['prenom'])))
            ->setParameter('nom', strtolower(trim($data['nom'])))
            ->getQuery()
            ->getOneOrNullResult();
    
        if (!$contact) {
            return $this->json(['message' => 'Contact introuvable'], JsonResponse::HTTP_NOT_FOUND);
        }
    
        if ($user->getId() === $contact->getId()) {
            return $this->json(['message' => 'Vous ne pouvez pas vous ajouter vous-même en contact'], JsonResponse::HTTP_BAD_REQUEST);
        }
    
        $existingMessage = $entityManager->getRepository(Messages::class)->createQueryBuilder('m')
            ->where('(m.sender = :user AND m.receiver = :contact) OR (m.sender = :contact AND m.receiver = :user)')
            ->setParameter('user', $user)
            ->setParameter('contact', $contact)
            ->getQuery()
            ->getOneOrNullResult();
    
        if ($existingMessage) {
            return $this->json(['message' => 'Ce contact est déjà dans votre liste'], JsonResponse::HTTP_CONFLICT);
        }
    
        $message = new Messages();
        $message->setContent(''); 
        $message->setSender($user);
        $message->setReceiver($contact);
    
        $entityManager->persist($message);
        $entityManager->flush();
    
        return $this->json([
            'message' => 'Contact ajouté avec succès',
            'contactId' => $contact->getId(),
            'name' => $contact->getPrenom() . ' ' . $contact->getNom(),
        ], JsonResponse::HTTP_CREATED);
    }


    #[Route('/api/messages/search-contact', name:'search_contact', methods:['GET'])]
    public function searchContact(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $user = $this->getUser();
    
        if (!$user instanceof Swimmer) {
            return $this->json(['message' => 'Utilisateur non authentifié'], JsonResponse::HTTP_UNAUTHORIZED);
        }
    
        $query = $request->query->get('query');
        if (!$query) {
            return $this->json(['message' => 'Aucun terme de recherche fourni'], JsonResponse::HTTP_BAD_REQUEST);
        }
    
        $contacts = $entityManager->getRepository(Swimmer::class)->createQueryBuilder('s')
            ->where('s.prenom LIKE :query OR s.nom LIKE :query')
            ->setParameter('query', '%' . $query . '%')
            ->getQuery()
            ->getResult();
    
        if (empty($contacts)) {
            return $this->json(['message' => 'Aucun contact trouvé'], JsonResponse::HTTP_NOT_FOUND);
        }
    
        $results = [];
        foreach ($contacts as $contact) {
            $results[] = [
                'id' => $contact->getId(),
                'name' => $contact->getPrenom() . ' ' . $contact->getNom(),
            ];
        }
    
        return $this->json($results, JsonResponse::HTTP_OK);
    }
    
   
}
