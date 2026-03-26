<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Organization;
use App\Service\OrganizationService;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use App\Service\ReportService;


#[Route('/api', name: 'api_')]
class OrganizationController extends AbstractController
{
    /* Add organization */
    #[Route('/add-organization', name: 'add-organization', methods:['post'] )]
    public function addOrganization(Request $request,OrganizationService $organizationservice): JsonResponse
    {
        try{
            $organizationData = $request->request -> all();
            //dd($organizationData);
            //$organizationData = json_decode($request->getContent(), true);

            // Handle the uploaded file
        $uploadedFile = $request->files->get('logo');
        if ($uploadedFile instanceof UploadedFile) {
            // Move the uploaded file to the configured upload directory
            $uploadedFile->move(
                $this->getParameter('upload_directory'),
                $uploadedFile->getClientOriginalName()
            );

            // Add the file path to the organization data array
            $organizationData['logo'] = 'assets/logo/' . $uploadedFile->getClientOriginalName();
        }
        
            $organizationservice->addOrganization($organizationData);
            return $this->json('Organization added successfully');
        } catch(\InvalidArgumentException $e){
            return $this->json($e->getMessage(), 400);
        }       
    }

    /* Get all organizations */
    #[Route('/organizations', name: 'get_all_organization', methods:['get'])]
    public function getAllOrganizations(ManagerRegistry $doctrine, Request $request): JsonResponse
    {
        $organizations = $doctrine
            ->getRepository(Organization::class)
            ->findAll();
        $data = [];
        foreach ($organizations as $organization) {
            $data[] = [
                'id' => $organization->getId(),
                'nomOrg' => $organization->getNomOrg(),
                'adresse' => $organization->getAdresse(),
                'phone' => $organization->getPhone(),
                'email' => $organization->getEmail(),
                'logo' => $organization->getLogo()
            ];
        }
        return $this->json($data);
    }

    //update organization
    #[Route('/update-organization/{id}', name: 'update_organization', methods:['post'])]
    public function updateOrganization(Request $request,OrganizationService $organizationservice, int $id): JsonResponse
    {

        try{
            //$organizationData = $request->request -> all();
           
           $organizationData = ['nomOrg' => $request->request->get('nomOrg'),
            'adresse' => $request->request->get('adresse'),
            'phone' => $request->request->get('phone'),
            'email' => $request->request->get('email')];
           //dd($organizationData);

            $uploadedFile = $request->files->get('logo');
        if ($uploadedFile instanceof UploadedFile) {
            // Move the uploaded file to upload directory
            $uploadedFile->move(
                $this->getParameter('upload_directory'),
                $uploadedFile->getClientOriginalName()
            );
            // Add the file path to the organization data array       
            $organizationData['logo'] = 'assets/logo/' . $uploadedFile->getClientOriginalName();     
        }
            $organizationservice->updateOrganization($organizationData, $id);
            return $this->json('Organization updated successfully');
        } catch(\InvalidArgumentException $e){
            return $this->json($e->getMessage(), 400);
        }       
    }

    //delete organization
    #[Route('/delete-organization/{id}', name: 'delete_organization', methods:['delete'])]
    public function deleteOrganization(OrganizationService $organizationservice, int $id): JsonResponse
    {
        try{
            $organizationservice->deleteOrganization($id);
            return $this->json('Organization deleted successfully');
        } catch(\InvalidArgumentException $e){
            return $this->json($e->getMessage(), 400);
        }       
    }


    //get organization by id
    #[Route('/get-organization/{id}', name: 'get_organization', methods:['get'])]
    public function getOrganization(OrganizationService $organizationservice, int $id): JsonResponse
    {
        try{
            $organization = $organizationservice->getOrganizationById($id);
            return $this->json($organization);
        } catch(\InvalidArgumentException $e){
            return $this->json($e->getMessage(), 400);
        }       
    }

    
    
}