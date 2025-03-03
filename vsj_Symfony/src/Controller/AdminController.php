<?php

namespace App\Controller;

use App\Entity\Role;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class AdminController extends AbstractController
{
    #[Route('/admin', name: 'app_admin', methods: ['GET'])]
    public function index(): JsonResponse
    {
        return $this->json([
            'message' => 'Bienvenue sur le controller tout fonctionne parfaitement!',
            'path' => 'src/Controller/AdminController.php',
        ]);
    }

    #[Route('/admin/role', name: 'create_role', methods: ['POST'])]
    public function createRole(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return $this->json(['message' => 'Données invalides'], JsonResponse::HTTP_BAD_REQUEST);
        }

        try {
            $role = new Role();
            $role->setName($data['name']);

            $entityManager->persist($role);
            $entityManager->flush();

            return $this->json([
                'message' => 'Rôle créé avec succès',
                'roleId' => $role->getId(),
            ], JsonResponse::HTTP_CREATED);
        } catch (\Exception $e) {
            return $this->json([
                'message' => 'Erreur lors de la création du rôle',
                'error' => $e->getMessage()
            ], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/admin/role/{id}', name: 'update_role', methods: ['PUT'])]
    public function updateRole(int $id, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $role = $entityManager->getRepository(Role::class)->find($id);
        if (!$role) {
            return $this->json(['message' => 'Rôle non trouvé'], JsonResponse::HTTP_NOT_FOUND);
        }

        try {
            $role->setName($data['name'] ?? $role->getName());

            $entityManager->flush();

            return $this->json([
                'message' => 'Rôle mis à jour avec succès',
                'roleId' => $role->getId(),
            ], JsonResponse::HTTP_OK);
        } catch (\Exception $e) {
            return $this->json([
                'message' => 'Erreur lors de la mise à jour du rôle',
                'error' => $e->getMessage()
            ], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/admin/roles/{id}', name: 'delete_role', methods: ['DELETE'])]
    public function deleteRole(int $id, EntityManagerInterface $entityManager): JsonResponse
    {
        $role = $entityManager->getRepository(Role::class)->find($id);
        if (!$role) {
            return $this->json(['message' => 'Rôle non trouvé'], JsonResponse::HTTP_NOT_FOUND);
        }

        try {
            $entityManager->remove($role);
            $entityManager->flush();

            return $this->json(['message' => 'Rôle supprimé avec succès'], JsonResponse::HTTP_OK);
        } catch (\Exception $e) {
            return $this->json([
                'message' => 'Erreur lors de la suppression du rôle',
                'error' => $e->getMessage()
            ], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    #[Route('/admin/training', name: 'create_training', methods: ['POST'])]
    public function createTraining(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return $this->json(['message' => 'Données invalides'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $group = $entityManager->getRepository(Group::class)->find($data['groupId'] ?? null);
        if (!$group) {
            return $this->json(['message' => 'Groupe non trouvé'], JsonResponse::HTTP_NOT_FOUND);
        }

        try {
            $training = (new Training())
                ->setTitle($data['title'] ?? 'Entrainement sans titre')
                ->setStartDate(new \DateTime($data['startDate'] ?? 'now'))
                ->setDuration(new \DateTime($data['duration'] ?? '00:00:00'))
                ->setIntensity($data['intensity'] ?? 'medium')
                ->setCategory($data['category'] ?? 'general')
                ->setDescription($data['description'] ?? '')
                ->setIsDefined($data['isDefined'] ?? false)
                ->setGroup($group);

            $entityManager->persist($training);
            $entityManager->flush();

            return $this->json([
                'message' => 'Entrainement créé avec succès',
                'trainingId' => $training->getId(),
            ], JsonResponse::HTTP_CREATED);
        } catch (\Exception $e) {
            return $this->json([
                'message' => 'Erreur lors de la création de l\'entrainement',
                'error' => $e->getMessage()
            ], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/admin/training/{id}', name: 'update_training', methods: ['PUT'])]
    public function updateTraining(int $id, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $training = $entityManager->getRepository(Training::class)->find($id);
        if (!$training) {
            return $this->json(['message' => 'Entrainement non trouvé'], JsonResponse::HTTP_NOT_FOUND);
        }

        try {
            $training->setTitle($data['title'] ?? $training->getTitle());

            if (isset($data['startDate'])) {
                $training->setStartDate(new \DateTime($data['startDate']));
            }

            if (isset($data['duration'])) {
                $training->setDuration(new \DateTime($data['duration']));
            }

            $training->setIntensity($data['intensity'] ?? $training->getIntensity());
            $training->setCategory($data['category'] ?? $training->getCategory());
            $training->setDescription($data['description'] ?? $training->getDescription());
            $training->setIsDefined($data['isDefined'] ?? $training->getIsDefined());

            if (isset($data['groupId'])) {
                $group = $entityManager->getRepository(Group::class)->find($data['groupId']);
                if (!$group) {
                    return $this->json(['message' => 'Groupe non trouvé'], JsonResponse::HTTP_NOT_FOUND);
                }
                $training->setGroup($group);
            }

            $entityManager->flush();

            return $this->json([
                'message' => 'Entrainement mis à jour avec succès',
                'trainingId' => $training->getId(),
            ], JsonResponse::HTTP_OK);
        } catch (\Exception $e) {
            return $this->json([
                'message' => 'Erreur lors de la mise à jour de l\'entrainement',
                'error' => $e->getMessage()
            ], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/admin/training/{id}', name: 'delete_training', methods: ['DELETE'])]
    public function deleteTraining(int $id, EntityManagerInterface $entityManager): JsonResponse
    {
        $training = $entityManager->getRepository(Training::class)->find($id);
        if (!$training) {
            return $this->json(['message' => 'Aucun entrainement trouvé'], JsonResponse::HTTP_NOT_FOUND);
        }

        try {
            $entityManager->remove($training);
            $entityManager->flush();

            return $this->json(['message' => 'Entrainement supprimé avec succès'], JsonResponse::HTTP_OK);
        } catch (\Exception $e) {
            return $this->json([
                'message' => 'Erreur lors de la suppression de l\'entrainement',
                'error' => $e->getMessage()
            ], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/admin/group/{groupId}/trainings', name: 'get_group_trainings_by_date', methods: ['GET'])]
    public function getTrainingsByDate(int $groupId, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $currentDate = $request->query->get('currentDate', (new \DateTime())->format('Y-m-d'));
        $currentDateObj = new \DateTime($currentDate);

        $startDate = (clone $currentDateObj)->modify('-45 days');
        $endDate = (clone $currentDateObj)->modify('+45 days');

        $query = $entityManager->createQuery(
            'SELECT t 
             FROM App\Entity\Training t 
             JOIN t.group g 
             WHERE g.id = :groupId 
             AND t.startDate BETWEEN :startDate AND :endDate'
        )
            ->setParameter('groupId', $groupId)
            ->setParameter('startDate', $startDate->format('Y-m-d'))
            ->setParameter('endDate', $endDate->format('Y-m-d'));

        $trainings = $query->getResult();

        return $this->json([
            'message' => 'Entraînements et compétitions trouvés',
            'interval' => [
                'startDate' => $startDate->format('Y-m-d'),
                'endDate' => $endDate->format('Y-m-d')
            ],
            'trainings' => $trainings,
        ]);
    }


    #[Route('/admin/competition', name: 'create_competition', methods: ['POST'])]
    public function createCompetition(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $group = $entityManager->getRepository(Group::class)->find($data['groupId']);
        if (!$group) {
            return $this->json(['message' => 'Groupe non trouvé'], JsonResponse::HTTP_NOT_FOUND);
        }

        $competition = new Competition();
        $competition->setTitle($data['title']);
        $competition->setDayDate(new \DateTime($data['dayDate']));
        $competition->setHourDate(new \DateTime($data['hourDate']));
        $competition->setDuration(new \DateTime($data['duration']));
        $competition->setAddress($data['address']);
        $competition->setCategory($data['category']);
        $competition->setDescription($data['description']);
        $competition->setIsDefined($data['isDefined']);
        $competition->setGroup($group);

        $entityManager->persist($competition);
        $entityManager->flush();

        return $this->json([
            'message' => 'Compétition a été créée',
            'competitionId' => $competition->getId(),
        ], JsonResponse::HTTP_CREATED);
    }

    #[Route('/admin/competition/{id}', name: 'delete_competition', methods: ['DELETE'])]
    public function deleteCompetition(int $id, EntityManagerInterface $entityManager): JsonResponse
    {
        $competition = $entityManager->getRepository(Competition::class)->find($id);
        if (!$competition) {
            return $this->json(['message' => 'Aucune compétition a été trouvée'], JsonResponse::HTTP_NOT_FOUND);
        }

        $entityManager->remove($competition);
        $entityManager->flush();

        return $this->json(['message' => 'Compétition supprimée'], JsonResponse::HTTP_OK);
    }
}
