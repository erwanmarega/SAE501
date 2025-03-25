<?php

namespace App\Controller;

use App\Repository\CompetitionRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class CompetitionController extends AbstractController
{
    #[Route('/competition/prochaine', name: 'next_competition', methods: ['POST'])]
    public function getNextCompetition(Request $request, CompetitionRepository $competitionRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $groupId = $data['groups_id'] ?? null;
        $date = $data['date'] ?? null;

        if (!$groupId) {
            return new JsonResponse(['error' => 'Missing group ID'], 400);
        }

        if (!$date) {
            return new JsonResponse(['error' => 'Missing date'], 400);
        }

        $dateObject = \DateTime::createFromFormat('Y-m-d', $date);
        if (!$dateObject || $dateObject->format('Y-m-d') !== $date) {
            return new JsonResponse(['error' => 'Invalid date format. Use YYYY-MM-DD'], 400);
        }

        try {
            $competition = $competitionRepository->findNextCompetition($groupId, $date);

            if (!$competition) {
                return new JsonResponse(['message' => 'No upcoming competition found'], 404);
            }

            return new JsonResponse([
                'id' => $competition->getId(),
                'title' => $competition->getTitle(),
                'date' => $competition->getDayDate()->format('Y-m-d'),
                'time' => $competition->getHourDate()->format('H:i:s'),
                'duration' => $competition->getDuration()->format('H:i:s'),
                'address' => $competition->getAddress(),
                'category' => $competition->getCategory(),
                'description' => $competition->getDescription(),
            ]);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }
}

