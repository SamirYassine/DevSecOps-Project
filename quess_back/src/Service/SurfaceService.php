<?php
namespace App\Service;

use App\Entity\Surface;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Organization;
use Symfony\Component\HttpFoundation\JsonResponse;





class SurfaceService{
    private $doctrine;

    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
    }
    public function getSurface (int $id): Surface
    {
        $surface = $this->doctrine->getRepository(Surface::class)->find($id);
        if (!$surface) {
            throw new \Exception('Surface not found');
        }
        return $surface;
    }

    public function createSurface(array $surfaceData): void
    {
        $entitymanager = $this->doctrine->getManager();
        // Fetch the Organization entity using the organization_id from $surfaceData
        $organizationId = $surfaceData['organization_id'];
        $organization = $entitymanager->getRepository(Organization::class)->find($organizationId);


        $surface = new Surface();
        $surface->setFormName($surfaceData['formName']);
        $surface->setDetails($surfaceData['tableRows']);
        $surface->setMedType($surfaceData['medType']);
        $surface->setIsTemplate(true);
        $surface->setOrganization($organization);
        $entitymanager->persist($surface);
        $entitymanager->flush();
    }


    public function fillSurface(array $fillData , int $id): void
    {
            //dd($fillData);
        $entitymanager = $this->doctrine->getManager();

        $template = $entitymanager->getRepository(Surface::class)->find($id);
        $surface = clone $template;
        $surface->setTemplateId($id);
        $surface->setSamplingDate(new \DateTime($fillData['samplingDate']));
        $surface->setSamplingType($fillData['samplingType']);
        $surface->setAgarsType($fillData['agarsType']);
        $surface->setSupplier($fillData['supplier']);
        $surface->setExpiryDate(new \DateTime($fillData['expiryDate']));
        $surface->setLaboratory($fillData['laboratory']);
        $surface->setBatch($fillData['batch']);
        $surface->setMedType($fillData['medType']);
        $surface->setIsTemplate(false);
        $surface->setDetails($fillData['tableRows']);
        $entitymanager->persist($surface);
        $entitymanager->flush();
    }
    
        //GET ALL AIRS FORMS

    public function getAllSurfaceForms(int $id): array
    {
        $surfaceForms = $this->doctrine->getRepository(Surface::class)->findBy(['organization' => $id, 'isTemplate' => false, 'recommendations' => null, 'status' => null]);
        $data = [];
        foreach ($surfaceForms as $surfaceForm) {
            $data[] = [
                'id' => $surfaceForm->getId(),
                'formName' => $surfaceForm->getFormName(),
            ];
        }
        return $data;
    }

    // get completed surface reports
    public function getCompletedSurfaceReports(int $id): array
{
    $surfaceForms = $this->doctrine->getRepository(Surface::class)->findBy([
        'organization' => $id,
        'isTemplate' => false,
        'status' => '1',
    ]);

    $completedSurfaceForms = array_filter($surfaceForms, function($surfaceForm) {
        return $surfaceForm->getRecommendations() !== null;
    });

    $data = [];
    foreach ($completedSurfaceForms as $surfaceForm) {
        $data[] = [
            'id' => $surfaceForm->getId(),
            'formName' => $surfaceForm->getFormName(),
        ];
    }

    return $data;
}

// get all surface forms with status 0
public function getPendingSurfaceReports(): array
{
    $surfaceForms = $this->doctrine->getRepository(Surface::class)->findBy([
        'isTemplate' => false,
        'status' => '0',
    ]);

    

    $data = [];
    foreach ($surfaceForms as $surfaceForm) {
        $data[] = [
            'Organization' => $surfaceForm->getOrganization()->getNomOrg(),
            'id' => $surfaceForm->getId(),
            'formName' => $surfaceForm->getFormName(),
        ];
    }

    return $data;

}
//get all surface forms with status 1

public function getValidatedSurfaceReports(): array
{
    $surfaceForms = $this->doctrine->getRepository(Surface::class)->findBy([
        'isTemplate' => false,
        'status' => '1',
    ]);

    $data = [];
    foreach ($surfaceForms as $surfaceForm) {
        $data[] = [
            'Organization' => $surfaceForm->getOrganization()->getNomOrg(),
            'id' => $surfaceForm->getId(),
            'formName' => $surfaceForm->getFormName(),
        ];
    }

    return $data;
}
}
