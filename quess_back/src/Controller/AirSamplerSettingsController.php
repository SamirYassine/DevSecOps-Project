<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Service\AirSamplerSettingsService;

#[Route('/api', name: 'app_air_sampler_settings')]
class AirSamplerSettingsController extends AbstractController
{
    
    #[Route('/air_sampler_settings/create', name: 'create', methods: ['POST'])]
    public function createSetting(Request $request, AirSamplerSettingsService $airSamplerSettingsService): JsonResponse
    {
        try {
            $settingData = json_decode($request->getContent(), true);
            //dd($settingData);
            $airSamplerSettingsService->createSetting($settingData);
            return $this->json('Setting created successfully');
            } 
        catch (\InvalidArgumentException $e) {
        return $this->json($e->getMessage(), 400);}
    }

    #[Route('/air_sampler_settings/update/{id}', name: 'update', methods: ['PUT'])]
    public function updateSetting(Request $request, AirSamplerSettingsService $airSamplerSettingsService, int $id): JsonResponse
    {
        try {
            $settingData = json_decode($request->getContent(), true);
            $airSamplerSettingsService->updateSetting($settingData, $id);
            return $this->json('Setting updated successfully');
        } catch (\InvalidArgumentException $e) {
            return $this->json($e->getMessage(), 400);
        }
    }   

    #[Route('/air_sampler_settings/delete/{id}', name: 'delete', methods: ['DELETE'])]
    public function deleteSetting(AirSamplerSettingsService $airSamplerSettingsService, int $id): JsonResponse
    {
        try {
            $airSamplerSettingsService->deleteSetting($id);
            return $this->json('Setting deleted successfully');
        } catch (\InvalidArgumentException $e) {
            return $this->json($e->getMessage(), 400);
        }
    }

    #[Route('/air_sampler_settings/{id}', name: 'get', methods: ['GET'])]
    public function getSetting(AirSamplerSettingsService $airSamplerSettingsService, int $id): JsonResponse
    {
        try {
            $setting = $airSamplerSettingsService->getSetting($id);
            return $this->json($setting);
        } catch (\InvalidArgumentException $e) {
            return $this->json($e->getMessage(), 400);
        }
    }

    #[Route('/air_sampler_settings/organization/{OrgId}', name: 'getAll', methods: ['GET'])]
    public function getAllSettings(AirSamplerSettingsService $airSamplerSettingsService,string $OrgId): JsonResponse
    {
        try {
            // dd($OrgId);
            $settings = $airSamplerSettingsService->getAllSettings($OrgId);
            return $this->json($settings);
        } catch (\InvalidArgumentException $e) {
            return $this->json($e->getMessage(), 400);
        }
    }
}