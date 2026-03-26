<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\SurfaceService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Surface;
use App\Entity\Zone;
use App\Entity\Localization;




#[Route('/api', name: 'app_surface')]
class SurfaceController extends AbstractController
{
    #[Route('/surface/create', name: 'create', methods: ['POST'])]
    public function createSurface(Request $request , SurfaceService $surfaceService ): JsonResponse
    {
        try {
            $surfaceData = json_decode($request->getContent(), true);
            if (!isset($surfaceData['tableRows']) || !is_array($surfaceData['tableRows'])) {
                throw new \InvalidArgumentException('Invalid or missing detailsSurface data.');
            }

            
            foreach ($surfaceData['tableRows'] as $detail) {
                $detail += ['ufcnumber' => null, 'comments' => null];
            }
            $surfaceService->createSurface($surfaceData);
            return $this->json('Surface created successfully');
        } catch (\InvalidArgumentException $e) {
            return $this->json($e->getMessage(), 400);
        }
        
    }


    #[Route('/surface/fill/{id}', name: 'fill_surface', methods: ['POST'])]
    public function fillSurface(Request $request, SurfaceService $surfaceService, int $id): JsonResponse
    {
        try {
            $fillData = json_decode($request->getContent(), true);
            //dd($fillData);
            $surfaceService->fillSurface( $fillData,$id);
            return $this->json('Surface filled successfully');
        } catch (\InvalidArgumentException $e) {
            return $this->json($e->getMessage(), 400);
        }
    }

    // get surface 
    #[Route('/surface/{id}', name: 'get', methods: ['GET'])]
    public function getSurface(SurfaceService $surfaceService, int $id): JsonResponse
    {
        try {
            $surface = $surfaceService->getSurface($id);
            return $this->json($surface);
        } catch (\InvalidArgumentException $e) {
            return $this->json($e->getMessage(), 400);
        }
    }

    //get all surface of an organization
    #[Route('/surfaces/{orgid}', name: 'get_all', methods: ['GET'])]
public function getSurfaceForms(ManagerRegistry $entityManager, int $orgid): JsonResponse
{
    $surfaces = $entityManager->getRepository(Surface::class)->findBy(['organization' => $orgid]);
    $data = [];
    foreach ($surfaces as $surface) {
        if ($surface->getIsTemplate()) { // Check if isTemplate is true
            $surfaceDetails = [];
            if ($surface->getDetails()) {
                foreach ($surface->getDetails() as $surfaceDetail) {
                    $zone = $entityManager->getRepository(Zone::class)->findOneBy(['id' => $surfaceDetail['zone']]);
                    $localization = $entityManager->getRepository(Localization::class)->findOneBy(['id' => $surfaceDetail['localization']]);

                    $surfaceDetails[] = [
                        'zone' => $zone->getName(),
                        'localization' => $localization->getName(),
                        'iso' => $localization->getIso(),
                        'threshold' => $localization->getThreshold(),
                    ];
                }
            }
            $data[] = [
                'id' => $surface->getId(),
                'details' => $surfaceDetails,
                'medType' => $surface->getMedType(),
                'isTemplate' => $surface->getIsTemplate(),
                'organization' => $surface->getOrganization()->getId(),
                'samplingDate' => $surface->getSamplingDate(),
                'samplingType' => $surface->getSamplingType(),
                'agarsType' => $surface->getAgarsType(),
                'supplier' => $surface->getSupplier(),
                'expiryDate' => $surface->getExpiryDate(),
                'laboratory' => $surface->getLaboratory(),
                'batch' => $surface->getBatch(),
                'revisionDate' => $surface->getRevisionDate(),
                'formName' => $surface->getFormName(),
            ];
        }
    }
    return $this->json($data);
}

//get all surface forms
#[Route('/surfaceforms/{id}', name: 'get_all_surface_forms', methods: ['GET'])]
    public function getAllSurfaceForms(int $id, SurfaceService $surfaceService): JsonResponse
    {
        try {
            $surfaceForms = $surfaceService->getAllSurfaceForms($id);
            return $this->json($surfaceForms);
        } catch (\InvalidArgumentException $e) {
            return $this->json($e->getMessage(), 400);
        }
       
    }

    // get completed surface reports
    #[Route('/completedSurfaceReports/{id}', name: 'get_all_surface_forms_with_recommendations', methods: ['GET'])]
    public function getCompletedSurfaceReports(int $id, SurfaceService $surfaceService): JsonResponse
    {
        try {
            $surfaceForms = $surfaceService->getCompletedSurfaceReports($id);
            return $this->json($surfaceForms);
        } catch (\InvalidArgumentException $e) {
            return $this->json($e->getMessage(), 400);
        }
    }

    // get pending surface reports
    #[Route('/pendingSurfaceReports', name: 'get_all_surface_forms_with_status_0', methods: ['GET'])]
    public function getPendingSurfaceReports( SurfaceService $surfaceService): JsonResponse
    {
        try {
            $surfaceForms = $surfaceService->getPendingSurfaceReports();
            return $this->json($surfaceForms);
        } catch (\InvalidArgumentException $e) {
            return $this->json($e->getMessage(), 400);
        }
    }

    // get validated surface reports
    #[Route('/validatedSurfaceReports', name: 'get_all_surface_forms_with_status_2', methods: ['GET'])]
    public function getValidatedSurfaceReports( SurfaceService $surfaceService): JsonResponse
    {
        try {
            $surfaceForms = $surfaceService->getValidatedSurfaceReports();
            return $this->json($surfaceForms);
        } catch (\InvalidArgumentException $e) {
            return $this->json($e->getMessage(), 400);
        }
    }
}
