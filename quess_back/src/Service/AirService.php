<?php
namespace App\Service;

use App\Entity\Air;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Organization;
use Symfony\Component\HttpFoundation\JsonResponse;




class AirService{
    private $doctrine;

    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
    }
    public function getAir (int $id): Air
    {
        $air = $this->doctrine->getRepository(Air::class)->find($id);
        if (!$air) {
            throw new \Exception('Air not found');
        }
        return $air;
    }

    public function createAir(array $airData): void
    {
        $entitymanager = $this->doctrine->getManager();
        // Fetch the Organization entity using the organization_id from $airData
        $organizationId = $airData['organization_id'];
        $organization = $entitymanager->getRepository(Organization::class)->find($organizationId);


        $air = new Air();
        $air->setFormName($airData['formName']);
        $air->setAirSamplers($airData['airSamplers']);
        $air->setDetailsAir($airData['tableRows']);
        $air->setMedType($airData['medType']);
        $air->setIsTemplate(true);
        $air->setOrganization($organization);
        $entitymanager->persist($air);
        $entitymanager->flush();
    }


    public function fillAir(array $fillData , int $id): void
    {
            //dd($fillData);
        $entitymanager = $this->doctrine->getManager();

        $template = $entitymanager->getRepository(Air::class)->find($id);
        $air = clone $template;
        $air->setTemplateId($id);
        $air->setSamplingDate(new \DateTime($fillData['samplingDate']));
        $air->setSamplingType($fillData['samplingType']);
        $air->setAgarsType($fillData['agarsType']);
        $air->setSupplier($fillData['supplier']);
        $air->setExpiryDate(new \DateTime($fillData['expiryDate']));
        $air->setLaboratory($fillData['laboratory']);
        $air->setBatch($fillData['batch']);
        $air->setMedType($fillData['medType']);
        $air->setIsTemplate(false);
        $air->setAirSamplers($fillData['airSamplers']);
        $air->setDetailsAir($fillData['tableRows']);
        $entitymanager->persist($air);
        $entitymanager->flush();
    }

    //GET ALL AIRS FORMS

    public function getAllAirForms(int $id): array
    {
        $airForms = $this->doctrine->getRepository(Air::class)->findBy(['organization' => $id, 'isTemplate' => false, 'recommendations' => null, 'status' => null]);
        $data = []; 
        foreach ($airForms as $airForm) {
            $data[] = [
                'id' => $airForm->getId(),
                'formName' => $airForm->getFormName(),
            ];
        }
        return $data;
    }

    // get all air forms with recommendations
    public function getCompletedAirReports(int $id): array
{
    $airForms = $this->doctrine->getRepository(Air::class)->findBy([
        'organization' => $id,
        'isTemplate' => false,
        'status' => '1',
    ]);

    $completedAirForms = array_filter($airForms, function($airForm) {
        return $airForm->getRecommendations() !== null;
    });

    $data = [];
    foreach ($completedAirForms as $airForm) {
        $data[] = [
            'id' => $airForm->getId(),
            'formName' => $airForm->getFormName(),
        ];
    }

    return $data;
}


    // get all air forms with with status 0 
    public function getPendingAirReports(): array
    {
        $airForms = $this->doctrine->getRepository(Air::class)->findBy([
            'isTemplate' => false,
            'recommendations' => null,
            'status' => '0',
        ]);


        $data = [];
        foreach ($airForms as $airForm) {
            $data[] = [
                'Organization' => $airForm->getOrganization()->getNomOrg(), // 'Organization' => $airForm->getOrganization()->getId(),
                'id' => $airForm->getId(),
                'formName' => $airForm->getFormName(),
            ];
        }

        return $data;
    }

    //get all air forms with status 1 
    public function getValidatedAirReports(): array
    {
        $airForms = $this->doctrine->getRepository(Air::class)->findBy([
            'isTemplate' => false,
            'status' => '1',
        ]);

        $data = [];
        foreach ($airForms as $airForm) {
            $data[] = [
                'Organization' => $airForm->getOrganization()->getNomOrg(), // 'Organization' => $airForm->getOrganization()->getId(),
                'id' => $airForm->getId(),
                'formName' => $airForm->getFormName(),
            ];
        }

        return $data;
    
}
}   




