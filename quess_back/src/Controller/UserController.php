<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\User;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Service\UserService;
use App\Repository\UserOrganizationRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

#[Route('/api', name: 'api_')]
class UserController extends AbstractController
{
    //get user 
    #[Route('/get-user', name: 'get_user', methods: ['get'])]
    public function getUserr(UserService $userservice): JsonResponse 
    {
        $user = $userservice->getUser();
        return $this->json($user);
    }
    /* Get user role */
    #[Route('/get-user-role', name: 'get-user-role', methods: ['get'])]
    public function getUserRole(UserService $userservice,Request $request): JsonResponse
    {
        $orgId = $request->query->get('selectedOrgId');
        //dd($orgId);
        $role = $userservice->getUserRole($orgId);
        return $this->json($role);
    }
    
    /* Add user */
    #[Route('/add-user', name: 'add-user', methods: ['post'])]
    public function addUser(Request $request, UserService $userservice/* ,MailerService $mailer */): JsonResponse
    {
        try {
            $userData = json_decode($request->getContent(), true);
            $userservice->addUser($userData);
            return $this->json('User added successfully');
        } catch (\InvalidArgumentException $e) {
            return $this->json($e->getMessage(), 400);
        }
    }
    /* Get all users */
    #[Route('/users', name: 'get_all_user', methods: ['get'])]
    public function getAllUsers(ManagerRegistry $doctrine, Request $request): JsonResponse
    {
        
        $users = $doctrine
            ->getRepository(User::class)
            ->findAll();
        $data = [];
        foreach ($users as $users) {
            $data[] = [
                'id' => $users->getId(),
                'nom' => $users->getNom(),
                'prenom' => $users->getPrenom(),
                'email' => $users->getEmail(),
                'username' => $users->getUsername(),
            ];
        }
        return $this->json($data);
    }

    // get user by org id 
    #[Route('/users-by-org', name: 'get_users_by_org_id', methods: ['get'])]
    public function getUsersByOrgId(UserService $userservice,Request $request ): JsonResponse
    {
        $orgId = $request->query->get('selectedOrgId');
        $users = $userservice->getUsersByOrgId($orgId);

        
        return $this->json($users);
        
    }

    /* Get user by id */
    #[Route('/user/{id}', name: 'get_one_user', methods: ['get'])]
    public function getUserById(ManagerRegistry $doctrine, string $id): JsonResponse
    {
        $user = $doctrine->getRepository(User::class)->find($id);
        if (!$user) {

            return $this->json('No user found for id ' . $id, 404);
        }
        $data = [
            'id' => $user->getId(),
            'nom' => $user->getNom(),
            'prenom' => $user->getPrenom(),
            'email' => $user->getEmail(),
        ];
        return $this->json($data);
    }
    



    /* Update user */
    #[Route('/update-user/{id}', name: 'update-user', methods: ['put'])]
    public function updateUser(Request $request, UserService $userservice, int $id): JsonResponse
    {
        try {
            $userData = json_decode($request->getContent(), true);
            $userservice->updateUser($userData, $id);
            return $this->json('User updated successfully');
        } catch (\InvalidArgumentException $e) {
            return $this->json($e->getMessage(), 400);
        }
    }

    /* Delete user */
    #[Route('/delete-user/{id}', name: 'delete-user', methods: ['delete'])]
    public function deleteUser(UserService $userservice, string $id): JsonResponse
    {
        try {
            $userservice->deleteUser($id);
            return $this->json('User deleted successfully');
        } catch (\InvalidArgumentException $e) {
            return $this->json($e->getMessage(), 400);
        }
    }

    /* Delete user from org */
    #[Route('/delete-user-from-org/{userId}/{orgId}', name: 'delete-user-from-org', methods: ['delete'])]
    public function deleteUserFromOrg(UserService $userservice, string $userId,string $orgId): JsonResponse
    {
        try {
            $userservice->deleteUserFromOrg($userId,$orgId);

            return $this->json('User deleted successfully');
        } catch (\InvalidArgumentException $e) {
            return $this->json($e->getMessage(), 400);
        }

    }

    /* get organizations by user_id */
    #[Route('/get-orgs-by-user/{id}', name: 'get_organizations_by_user_id', methods: ['get'])]
    public function getOrganizationsByUserId(UserOrganizationRepository $userOrganizationRepository, string $id): JsonResponse
    {
        $userOrganizations = $userOrganizationRepository->getOrganizationsByUserId($id);
        return $this->json($userOrganizations);
    }

    /* get unassigned orgs */
    #[Route('/get-unassigned-orgs/{id}', name: 'get_unassigned_orgs', methods: ['get'])]
    public function getUnassignedOrgs(UserService $userservice, string $id): JsonResponse
    {
        $unassignedOrgs = $userservice->getUnassignedOrgs($id);
        return $this->json($unassignedOrgs);
    }

    /* get orgs by user_id */
    #[Route('/get-orgs-by-user', name: 'get_orgs_by_user_id', methods: ['get'])]
    public function getOrgsByUserId(UserService $userservice, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $userOrganizations = $userservice->getOrgByUserId();
        return $this->json($userOrganizations);
    }    
}