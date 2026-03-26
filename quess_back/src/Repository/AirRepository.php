<?php

namespace App\Repository;

use App\Entity\Air;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Air>
 *
 * @method Air|null find($id, $lockMode = null, $lockVersion = null)
 * @method Air|null findOneBy(array $criteria, array $orderBy = null)
 * @method Air[]    findAll()
 * @method Air[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AirRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Air::class);
    }

//    /**
//     * @return Air[] Returns an array of Air objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('a.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Air
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
