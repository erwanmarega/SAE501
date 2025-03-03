<?php

namespace App\Repository;

use App\Entity\Competition;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Competition>
 */
class CompetitionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Competition::class);
    }
    public function findNextCompetition($groupId, $date)
    {
        return $this->createQueryBuilder('c')
            ->where('c.group = :groupId')
            ->andWhere('c.dayDate > :date')
            ->setParameter('groupId', $groupId)
            ->setParameter('date', new \DateTime($date))
            ->orderBy('c.dayDate', 'ASC')
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }
    public function findLastThreeResultsBySwimmer($swimmerId)
    {
        return $this->createQueryBuilder('c')
            ->join('c.results', 'r')
            ->where('r.swimmer = :swimmerId')
            ->setParameter('swimmerId', $swimmerId)
            ->orderBy('c.day_competition', 'DESC')
            ->setMaxResults(3)
            ->getQuery()
            ->getResult();
    }



    //    /**
    //     * @return Competition[] Returns an array of Competition objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('c')
    //            ->andWhere('c.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('c.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Competition
    //    {
    //        return $this->createQueryBuilder('c')
    //            ->andWhere('c.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }


}
