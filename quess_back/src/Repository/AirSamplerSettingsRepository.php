<?php

namespace App\Repository;

use App\Entity\AirSamplerSettings;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<AirSamplerSettings>
 *
 * @method AirSamplerSettings|null find($id, $lockMode = null, $lockVersion = null)
 * @method AirSamplerSettings|null findOneBy(array $criteria, array $orderBy = null)
 * @method AirSamplerSettings[]    findAll()
 * @method AirSamplerSettings[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AirSamplerSettingsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AirSamplerSettings::class);
    }

//    /**
//     * @return AirSamplerSettings[] Returns an array of AirSamplerSettings objects
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

//    public function findOneBySomeField($value): ?AirSamplerSettings
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
