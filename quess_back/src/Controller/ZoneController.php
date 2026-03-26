<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Zone;
use App\Service\ZoneService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

#[Route('/api', name: 'api_')]
class ZoneController extends AbstractController
{

    //create zone 
    #[Route('/create-zone', name: 'create_zone', methods: ['POST'])]
    public function createZone(Request $request,ZoneService $zoneService): Response
    {
        try {
            $zoneData = json_decode($request->getContent(), true);
            $zoneService->createZone($zoneData);
            return $this->json('Zone created successfully');
        } catch (\InvalidArgumentException $e) {
            return $this->json($e->getMessage(), 400);
        }
    }

    //delete zone
    #[Route('/delete-zone/{id}', name: 'delete_zone', methods: ['DELETE'])]
    public function deleteZone(ZoneService $zoneService, string $id): Response
    {
        try {
            $zoneService->deleteZone($id);
            return $this->json('Zone deleted successfully');
        } catch (\InvalidArgumentException $e) {
            return $this->json($e->getMessage(), 400);
        }
    }

    //get all zones
    // #[Route('/zones', name: 'get_all_zones', methods: ['GET'])]
    // public function getAllZones(ZoneService $zoneService): Response
    // {
    //     $zones = $zoneService->getAllZones();
    //     return $this->json($zones);
    // }

    //update zone
    #[Route('/update-zone', name: 'update_zone', methods: ['PUT'])]
    public function updateZone(Request $request, ZoneService $zoneService): Response
    {
        try {
            $zoneData = json_decode($request->getContent(), true);
            $zoneService->updateZone($zoneData);
            return $this->json('Zone updated successfully');
        } catch (\InvalidArgumentException $e) {
            return $this->json($e->getMessage(), 400);
        }
    }

    //get Zones By Organization_id
    #[Route('/air-zones/{id}', name: 'get_air_zone_by_organization_id', methods: ['GET'])]
    public function getAirZonesByOrganizationId(ZoneService $zoneService, string $id): Response
    {
        $zones = $zoneService->getAirZonesByOrganizationId($id);
        return $this->json($zones);
    }

    #[Route('/surface-zones/{id}', name: 'get_surface_zone_by_organization_id', methods: ['GET'])]
    public function getSurfaceZonesByOrganizationId(ZoneService $zoneService, string $id): Response
    {
        $zones = $zoneService->getSurfaceZonesByOrganizationId($id);
        return $this->json($zones);
    }

    #[Route('/zones/{id}', name: 'get_zone_by_organization_id', methods: ['GET'])]
    public function getZonesByOrganizationId(ZoneService $zoneService, int $id): Response
    {
        //dd($id);
        $zones = $zoneService->getZonesByOrganizationId($id);
        return $this->json($zones);
    }

    

    //check if zone used in form
    #[Route('/check-zone/{id}', name: 'check_zone', methods: ['GET'])]
    public function checkZone(ZoneService $zoneService, string $id): Response
    {
        $isUsed = $zoneService->isZoneUsedInForm($id);

        return new JsonResponse(['isUsed' => $isUsed]);
    }

    
}
