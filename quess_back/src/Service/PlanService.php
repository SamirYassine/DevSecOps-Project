<?php

namespace App\Service;

use App\Entity\Plan;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Organization;



class PlanService
{
    private $doctrine;

    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
    }

    //create plan

    public function createPlan(array $planData): void
    {
        $entityManager = $this->doctrine->getManager();

        $organizationId = $planData['organization_id'];
    $organization = $entityManager->getRepository(Organization::class)->find($organizationId);

        if (!$organization) {
        throw new \Exception('Organization not found.');
    }

    $plan = new Plan();
    $plan->setName($planData['name']);
    $plan->setOrganization($organization);
    $plan->setImage($planData['image']);
    $plan->setImageSize($planData['image_size']);
    $plan->setMarkers($planData['markers']);

    $entityManager->persist($plan);
    $entityManager->flush();
    }

    //get plan by id
    public function getPlanByOrgId(int $id): array
    {
        $plan = $this->doctrine
            ->getRepository(Plan::class)
            ->findBy(['organization' => $id]);
        $data = [];
        foreach ($plan as $pl) {
            $data[] = [
                'id' => $pl->getId(),
                'name' => $pl->getName(),
                'image' => $pl->getImage(),
                'image_size' => $pl->getImageSize(),
                'markers' => $pl->getMarkers()
            ];
        }
        
        if (!$plan) {
            throw new \Exception('Plan not found.');
        }

        return $data;
    }

}