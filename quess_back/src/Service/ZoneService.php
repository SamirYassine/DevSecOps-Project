<?php

namespace App\Service;

use App\Entity\Zone;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Organization;
use App\Entity\Air;
use App\Entity\Surface;

class ZoneService
{
    private $doctrine;

    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
    }

    //create zone

    public function createZone(array $zoneData): void
    {
        $entityManager = $this->doctrine->getManager();

        $organizationId = $zoneData['organization_id'];
    $organization = $entityManager->getRepository(Organization::class)->find($organizationId);

        if (!$organization) {
        throw new \Exception('Organization not found.');
    }

    $zone = new Zone();
    $zone->setName($zoneData['name']);
    $zone->setOrganization($organization);

    $entityManager->persist($zone);
    $entityManager->flush();
    }

    //get zone by id
    public function getZoneById(string $id): Zone
    {
        $zone = $this->doctrine->getRepository(Zone::class)->find($id);
        if (!$zone) {
            throw new \InvalidArgumentException('Zone not found');
        }
        return $zone;
    }

    //delete zone
    public function deleteZone(string $id): void
    {
        $entityManager = $this->doctrine->getManager();
        $zone = $this->getZoneById($id);
        $entityManager->remove($zone);
        $entityManager->flush();
    }

    //get all zones
    public function getAllZones(): array
    {
        $zones = $this->doctrine->getRepository(Zone::class)->findAll();
        $data = [];
        foreach ($zones as $zone) {
            $data[] = [
                'id' => $zone->getId(),
                'name' => $zone->getName(),
                
            ];
        }
        return $data;

    }

    //update zone
    public function updateZone(array $zoneData): void
{
    $entityManager = $this->doctrine->getManager();
    $zone = $this->getZoneById($zoneData['id']);

    if (!$zone) {
        throw new \InvalidArgumentException('Zone not found');
    }

    $zone->setName($zoneData['name']);
    $organization = $entityManager->getRepository(Organization::class)->find($zoneData['organization_id']);
    
    if (!$organization) {
        throw new \InvalidArgumentException('Organization not found');
    }
    $zone->setOrganization($organization);
    $entityManager->flush();
}

    //get AIR Zones By Organization_id
    public function getAirZonesByOrganizationId(string $id): array
    {
        $zones = $this->doctrine->getRepository(Zone::class)->findBy(['organization' => $id,'type'=>'A']);
        $data = [];

        foreach ($zones as $zone) {
            $data[] = [
                'id' => $zone->getId(),
                'name' => $zone->getName(),
                'organization_id' => $zone->getOrganization()->getId()
            ];
        }

        return $data;
    }

    //get surface Zones By Organization_id
    public function getSurfaceZonesByOrganizationId(string $id): array
    {
        $zones = $this->doctrine->getRepository(Zone::class)->findBy(['organization' => $id,'type'=>'S']);
        $data = [];

        foreach ($zones as $zone) {
            $data[] = [
                'id' => $zone->getId(),
                'name' => $zone->getName(),
                'organization_id' => $zone->getOrganization()->getId()
            ];
        }

        return $data;
    }

    //get Zones By Organization_id
    public function getZonesByOrganizationId(int $id): array
    {
        $zones = $this->doctrine->getRepository(Zone::class)->findBy(['organization' => $id]);
        //dd($zones);
        $data = [];

        foreach ($zones as $zone) {
            $data[] = [
                'id' => $zone->getId(),
                'name' => $zone->getName(),
                'organization_id' => $zone->getOrganization()->getId(),
                'type' => $zone->getType()
            ];
        }

        return $data;
    }

    // check if zone used in form
   public function isZoneUsedInForm(int $zoneId): bool
    {

        $entityManager = $this->doctrine->getManager();
        // Check if the zone ID is used in Air forms
        $airForms = $entityManager->createQueryBuilder()
                ->select('a')
                ->from('App\Entity\Air', 'a')
                ->join('a.detailsAir', 'da')
                ->where('da.zone = :zoneId')
                ->setParameter('zoneId', $zoneId)
                ->getQuery()
                ->getResult();

        ;
        if (!empty($airForms)) {
            return true;
        }

        // Check if the zone ID is used in Surface forms
        // $surfaceForms = $entityManager->getRepository(Surface::class)->findBy(['details.zone' => $zoneId]);
        // if (!empty($surfaceForms)) {
        //     return true;
        // }

        return false;
    }
}