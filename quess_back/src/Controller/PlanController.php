<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Plan;
use Symfony\Component\HttpFoundation\Request;
use App\Service\PlanService;
use Symfony\Component\HttpFoundation\File\UploadedFile; 

#[Route('/api', name: 'app_plan')]
class PlanController extends AbstractController
{
    #[Route('/create-plan', name: 'create-plan', methods:['post'] )]
    public function createPlan(Request $request , PlanService $planservice ): JsonResponse
    {
        //$data = json_decode($request->getContent(), true);
        $data = $request->request->all();
        
        //dd($data);
        
        $uploadedFile = $request->files->get('image');
        //dd($uploadedFile);
        

        if ($uploadedFile instanceof UploadedFile) {
            // Move the uploaded file to upload directory
            $uploadedFile->move(
                $this->getParameter('plan_directory'),
                $uploadedFile->getClientOriginalName()
            );
            // Add the file path to the organization data array       
            $data['image'] = 'assets/plan/' . $uploadedFile->getClientOriginalName();     
        }
        //dd($data);
        $planservice->createPlan($data);
        return $this->json('Plan created successfully');
        
    }

    #[Route('/get-plan/{id}', name: 'get-plan', methods:['GET'])]
    public function getPlanByOrgId(int $id, PlanService $planservice): JsonResponse
    {
        $plan = $planservice->getPlanByOrgId($id);
        return $this->json($plan);
    }

    
}
