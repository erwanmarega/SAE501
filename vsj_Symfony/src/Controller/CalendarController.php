<?php

namespace App\Controller;

use App\Entity\CalendarEvent;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

#[Route('/api/calendar')]
class CalendarController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/events', methods: ['GET'])]
    public function getEvents(): JsonResponse
    {
        $events = $this->entityManager->getRepository(CalendarEvent::class)->findAll();
        return $this->json($events);
    }

    #[Route('/event', methods: ['POST'])]
    public function addEvent(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $event = new CalendarEvent();
        $event->setDate($data['date']);
        $event->setStatus($data['status']);
        $event->setTitle($data['title'] ?? null);
        $event->setDetails($data['details'] ?? null);

        $this->entityManager->persist($event);
        $this->entityManager->flush();

        return $this->json(['status' => 'Event added'], 201);
    }
}
