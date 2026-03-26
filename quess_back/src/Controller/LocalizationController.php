<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\LocalizationService;
use Symfony\Component\HttpFoundation\Request; 


#[Route('/api', name: 'api_')]
class LocalizationController extends AbstractController
{
    #[Route('/create-localization', name: 'create_localization', methods: ['POST'])]
    public function createLocalization(Request $request, LocalizationService $localizationService): Response
    {
        try {
            $localizationData = json_decode($request->getContent(), true);
            $localizationService->createLocalization($localizationData);
            return $this->json('Localization created successfully');
        } catch (\InvalidArgumentException $e) {
            return $this->json($e->getMessage(), 400);
        }
    }

    #[Route('/update-localization/{id}', name: 'update_localization', methods: ['PUT'])]
    public function updateLocalization(Request $request, LocalizationService $localizationService, string $id): Response
    {
        try {
            $localizationData = json_decode($request->getContent(), true);
            $localizationService->updateLocalization($id, $localizationData);
            return $this->json('Localization updated successfully');
        } catch (\InvalidArgumentException $e) {
            return $this->json($e->getMessage(), 400);
        }
    }

    #[Route('/delete-localization/{id}', name: 'delete_localization', methods: ['DELETE'])]
    public function deleteLocalization(LocalizationService $localizationService, string $id): Response
    {
        try {
            $localizationService->deleteLocalization($id);
            return $this->json('Localization deleted successfully');
        } catch (\InvalidArgumentException $e) {
            return $this->json($e->getMessage(), 400);
        }
    }

    #[Route('/localizations', name: 'get_all_localizations', methods: ['GET'])]
    public function getAllLocalizations(LocalizationService $localizationService): Response
    {
        $localizations = $localizationService->getAllLocalizations();
        return $this->json($localizations);
    }

    #[Route('/localizations/{id}', name: 'get_localization', methods: ['GET'])]
    public function getLocalization(LocalizationService $localizationService, string $id): Response
    {
        try {
            $localization = $localizationService->getLocalizationById($id);
            return $this->json($localization);
        } catch (\InvalidArgumentException $e) {
            return $this->json($e->getMessage(), 400);
        }
    }

    // create localisations
    #[Route('/create-localizations', name: 'create_localizations', methods: ['POST'])]
    public function createLocalizations(Request $request, LocalizationService $localizationService): Response
    {
        try {
            $localizationsData = json_decode($request->getContent(), true);
            $localizationService->createLocalizations($localizationsData);
            return $this->json('Localizations created successfully');
        } catch (\InvalidArgumentException $e) {
            return $this->json($e->getMessage(), 400);
        }
    }


    //get localizations by zone id
    #[Route('/localizations/zone/{id}', name: 'get_localizations_by_zone', methods: ['GET'])]
    public function getLocalizationsByZone(LocalizationService $localizationService, string $id): Response
    {
        try {
            $localizations = $localizationService->getLocalizationsByZone($id);
            return $this->json($localizations);
        } catch (\InvalidArgumentException $e) {
            return $this->json($e->getMessage(), 400);
        }
    }
    



    
    
}
