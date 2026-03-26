<?php

namespace App\Repository;

use App\Entity\UserOrganization;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Organization;

/**
 * @extends ServiceEntityRepository<UserOrganization>
 *
 * @method UserOrganization|null find($id, $lockMode = null, $lockVersion = null)
 * @method UserOrganization|null findOneBy(array $criteria, array $orderBy = null)
 * @method UserOrganization[]    findAll()
 * @method UserOrganization[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserOrganizationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserOrganization::class);
        
    }

    public function getOrganizationsByUserId(int $userId): array
    {
        $qb = $this->createQueryBuilder('uo')
            ->select('IDENTITY(uo.organization) AS organization_id', 'o.nomOrg AS nomOrg', 'uo.role')
            ->leftJoin('uo.organization', 'o')
            ->andWhere('uo.User = :userId')
            ->setParameter('userId', $userId);

        $query = $qb->getQuery();
        $results = $query->getResult();

        return $results;
    }
    
    



}
