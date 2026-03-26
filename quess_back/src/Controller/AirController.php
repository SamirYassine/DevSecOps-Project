<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Service\AirService;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Air;
use App\Entity\AirSamplerSettings;
use App\Entity\Zone;
use App\Entity\Localization;


#[Route('/api', name: 'app_air')]
class AirController extends AbstractController
{

    // create air

    #[Route('/air/create', name: 'create', methods: ['POST'])]
    public function createAir(Request $request , AirService $airService ): JsonResponse
    {
        try {
            $airData = json_decode($request->getContent(), true);
            if (!isset($airData['tableRows']) || !is_array($airData['tableRows'])) {
                throw new \InvalidArgumentException('Invalid or missing detailsAir data.');
            }

            
            foreach ($airData['tableRows'] as $detail) {
                $detail += ['ufcnumber' => null, 'comments' => null];
            }
            $airService->createAir($airData);
            return $this->json('Air created successfully');
        } catch (\InvalidArgumentException $e) {
            return $this->json($e->getMessage(), 400);
        }
        
    }

    // fill air

    #[Route('/air/fill/{id}', name: 'fill_air', methods: ['POST'])]
    public function fillAir(Request $request, AirService $airService, int $id): JsonResponse
    {
        try {
            $fillData = json_decode($request->getContent(), true);
            //dd($fillData);
            $airService->fillAir( $fillData,$id);
            return $this->json('Air filled successfully');
        } catch (\InvalidArgumentException $e) {
            return $this->json($e->getMessage(), 400);
        }
    }
    // get air 

    #[Route('/air/{id}', name: 'get', methods: ['GET'])]
    public function getAir(AirService $airService, int $id): JsonResponse
    {
        try {
            $air = $airService->getAir($id);
            
            return $this->json($air);
        } catch (\InvalidArgumentException $e) {
            return $this->json($e->getMessage(), 400);
        }
    }
    
    //get all air templates of an organization

    #[Route('/airs/{orgid}', name: 'get_all', methods: ['GET'])]
public function getAirTemplates(ManagerRegistry $entityManager, int $orgid): JsonResponse
{
    $airs = $entityManager->getRepository(Air::class)->findBy(['organization' => $orgid]);
    $data = [];
    foreach ($airs as $air) {
        if ($air->getIsTemplate()) { // Check if isTemplate is true
            $airsamplersData = [];
            if ($air->getAirSamplers()) {
                foreach ($air->getAirSamplers() as $airSampler) {
                    $airsamplerInfo = $entityManager->getRepository(AirSamplerSettings::class)->findOneBy(['id' => $airSampler['id']]);
                    $airsamplersData[] = [
                        'id' => $airsamplerInfo->getId(),
                        'deviceName' => $airsamplerInfo->getDeviceName(),
                        'validationDate' => substr($airsamplerInfo->getValidationDate()->format('Y-m-d'), 0, 10),
                        'deviceType' => $airsamplerInfo->getDeviceType(),
                    ];
                }
            }
            $airDetails = [];
            if ($air->getDetailsAir()) {
                foreach ($air->getDetailsAir() as $airDetail) {
                    $zone = $entityManager->getRepository(Zone::class)->findOneBy(['id' => $airDetail['zone']]);
                    $localization = $entityManager->getRepository(Localization::class)->findOneBy(['id' => $airDetail['localization']]);

                    $airDetails[] = [
                        'zone' => $zone->getName(),
                        'localization' => $localization->getName(),
                        'iso' => $localization->getIso(),
                        'threshold' => $localization->getThreshold(),
                    ];
                }
            }
            $data[] = [
                'id' => $air->getId(),
                'airSamplers' => $airsamplersData,
                'detailsAir' => $airDetails,
                'medType' => $air->getMedType(),
                'isTemplate' => $air->getIsTemplate(),
                'organization' => $air->getOrganization()->getId(),
                'samplingDate' => $air->getSamplingDate(),
                'samplingType' => $air->getSamplingType(),
                'agarsType' => $air->getAgarsType(),
                'supplier' => $air->getSupplier(),
                'expiryDate' => $air->getExpiryDate(),
                'laboratory' => $air->getLaboratory(),
                'batch' => $air->getBatch(),
                'revisionDate' => $air->getRevisionDate(),
                'formName' => $air->getFormName(),
            ];
        }
    }

    return $this->json($data);
}

        //GET ALL AIRS FORMS
    #[Route('/airforms/{id}', name: 'get_all_air_forms', methods: ['GET'])]
    public function getAllAirForms(int $id, AirService $airService): JsonResponse
    {
        try {
            $airForms = $airService->getAllAirForms($id);
            return $this->json($airForms);
        } catch (\InvalidArgumentException $e) {
            return $this->json($e->getMessage(), 400);
        }
       
    }


    // get all air forms with recommendations
    #[Route('/completedAirReports/{id}', name: 'get_all_air_forms_with_recommendations', methods: ['GET'])]
    public function getCompletedAirReports(int $id, AirService $airService): JsonResponse
    {
        try {
            $airForms = $airService->getCompletedAirReports($id);
            return $this->json($airForms);
        } catch (\InvalidArgumentException $e) {
            return $this->json($e->getMessage(), 400);
        }
    }

    // get all air forms with with status 0 
    #[Route('/pendingAirReports', name: 'get_all_air_forms_with_status_0', methods: ['GET'])]
    public function getPendingAirReports( AirService $airService): JsonResponse
    {
        try {
            $airForms = $airService->getPendingAirReports();
            return $this->json($airForms);
        } catch (\InvalidArgumentException $e) {
            return $this->json($e->getMessage(), 400);
        }
    }
     
    // get all air forms with status 1
    #[Route('/validatedAirReports', name: 'get_all_air_forms_with_status_1', methods: ['GET'])]
    public function getValidatedAirReports( AirService $airService): JsonResponse
    {
        try {
            $airForms = $airService->getValidatedAirReports();
            return $this->json($airForms);
        } catch (\InvalidArgumentException $e) {
            return $this->json($e->getMessage(), 400);
        }
    }

}
