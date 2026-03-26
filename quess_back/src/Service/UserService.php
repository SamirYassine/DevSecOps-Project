<?php   

namespace App\Service;

use App\Entity\User;
use App\Entity\UserOrganization;
use App\Entity\Organization;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Security;

class UserService {
    private $doctrine;
    private $passwordencoder;
    private $mailer;
    private $security;

    public function __construct(ManagerRegistry $doctrine, UserPasswordEncoderInterface $passwordencoder, MailerService $mailer, Security $security)
    {
        $this->doctrine = $doctrine;
        $this->passwordencoder = $passwordencoder;
        $this->mailer = $mailer;
        $this->security = $security;
        
    }
    //get role 
    public function getUserRole(int $orgId): string
    {
        $user = $this->security->getUser();
        $id = $user->getId();
        //dd( $id);
        $userOrganizations = $this->doctrine->getRepository(UserOrganization::class)->findBy(["User"=>$id,"organization"=>$orgId]);
        //dd($userOrganizations);
        if(!$userOrganizations){
            return $role ="";
        }
        $role = $userOrganizations[0]->getRole();
        
        //dd($role);
        return $role;
    }
    //get User
    public function getUser(): array
    {
        $user = $this->security->getUser();
        $userArray = [
            'id' => $user->getId(),
            'nom' => $user->getNom(),
            'prenom' => $user->getPrenom(),
            'email' => $user->getEmail(),
            'username' => $user->getUsername(),
        ];
        return $userArray;
    }
    //get users by org id
    public function getUsersByOrgId(int $orgId): array
    {
        $users = $this->doctrine->getRepository(UserOrganization::class)->findBy(["organization"=>$orgId]);
        //dd($users);
        $usersArray=[];
        foreach($users as $user){
            $usersArray[] = [
                'id' => $user->getUser()->getId(),
                'nom' => $user->getUser()->getNom(),
                'prenom' => $user->getUser()->getPrenom(),
                'email' => $user->getUser()->getEmail(),
                'username' => $user->getUser()->getUsername(),
                
            ];
        }
        return $usersArray;
        
    } 
    // Add user
    public function addUser(array $userData): void
    {
        $entitymanager = $this->doctrine->getManager();
        $user = new User();
        $user->setNom($userData['nom']);
        $user->setPrenom($userData['prenom']);
        $user->setEmail($userData['email']);
        $user->setUsername($userData['username']);
        $orgs = $userData['orgs'];
        // Hashing the password
        $hashedPassword = $this->passwordencoder->encodePassword($user,$userData['password']);
        $user->setPassword($hashedPassword);
        $entitymanager->persist($user);  
        
        //send password to user
        //$this->mailer->sendEmail($userData['email'], 'Your New Password', 'Your new password: ' . $userData['password']);


        
      
       foreach($orgs as $org){
        $organization=$this->doctrine->getRepository(Organization::class)->findOneBy(["id"=>$org["id"]]);
        $userOrganization = new UserOrganization();
        $userOrganization->setUser($user);
        $userOrganization->setOrganization($organization);
        $userOrganization->setRole($org['role']);
        $entitymanager->persist($userOrganization);
       }
               $entitymanager->flush();

       
    }

    // Update user
    public function updateUser(array $userData,int $id): void
{
    $entitymanager = $this->doctrine->getManager();
    $user = $this->doctrine->getRepository(User::class)->findOneBy(["id"=>$id]);
    
    if(isset($userData['nom'])) {
        $user->setNom($userData['nom']);
    }
    if(isset($userData['prenom'])) {
        $user->setPrenom($userData['prenom']);
    }
    if(isset($userData['email'])) {
        $user->setEmail($userData['email']);
    }
    if(isset($userData['username'])) {
        $user->setUsername($userData['username']);
    }
    
    if(isset($userData['userOrgs'])) {
    $orgs = $userData['userOrgs'];
    $entityManager = $this->doctrine->getManager();

    foreach($orgs as $org){
        $organization=$this->doctrine->getRepository(Organization::class)->findOneBy(["id"=>$org["organization_id"]]);
        
        $existingUserOrganization = $this->doctrine->getRepository(UserOrganization::class)->findOneBy(["User"=>$user,"organization"=>$organization]);
            if ($existingUserOrganization) {
                $userOrganization = $existingUserOrganization;
             
            }
            else {
                $userOrganization= new UserOrganization();
                $userOrganization->setUser($user);
                $userOrganization->setOrganization($organization);
            }
               $userOrganization->setRole($org['role']);
            $entityManager->persist($userOrganization);
            
         
        
    }
    $entityManager->flush();
}

    
    $entitymanager->flush();
}
    // Delete user
    public function deleteUser(int $id): void
    {
        $entitymanager = $this->doctrine->getManager();
        $user = $this->doctrine->getRepository(User::class)->findOneBy(["id"=>$id]);
        $userOrganizations = $this->doctrine->getRepository(UserOrganization::class)->findBy(["User"=>$user]);
        foreach($userOrganizations as $userOrganization){
            $entitymanager->remove($userOrganization);
        }
        $entitymanager->remove($user);
        $entitymanager->flush();
    }

    //delete user from org
    public function deleteUserFromOrg(int $userId, int $orgId): void
    {
        $entitymanager = $this->doctrine->getManager();
        $user = $this->doctrine->getRepository(User::class)->findOneBy(["id"=>$userId]);
        $organization = $this->doctrine->getRepository(Organization::class)->findOneBy(["id"=>$orgId]);
        $userOrganization = $this->doctrine->getRepository(UserOrganization::class)->findOneBy(["User"=>$user,"organization"=>$organization]);
        $entitymanager->remove($userOrganization);
        $entitymanager->flush();
    }
    
    //get unassigned orgs

    public function getUnassignedOrgs(int $id): array
    {
        $user = $this->doctrine->getRepository(User::class)->findOneBy(["id"=>$id]);
        $userOrganizations = $this->doctrine->getRepository(UserOrganization::class)->findBy(["User"=>$user]);
        $orgs = $this->doctrine->getRepository(Organization::class)->findAll();
        foreach($userOrganizations as $userOrganization){
            $key = array_search($userOrganization->getOrganization(), $orgs);
            if($key !== false){
                unset($orgs[$key]);
            }
        }
        foreach($orgs as $org){
            $orgsArray[] = [
                'id' => $org->getId(),
                'nomOrg' => $org->getNomOrg(),
            ];
        }
        return $orgsArray;
    }
//get organization by userid

public function getOrgByUserId() :Array {

    
    $user =$this->security->getUser();
    $user_id = $user->getId();

    
    $userOrgs= $this->doctrine->getRepository(UserOrganization::class)->findBy(["User"=>$user_id]);
    if ($userOrgs) {
        foreach($userOrgs as $userOrg){
            $orgs[] = [
                'id' => $userOrg->getOrganization()->getId(),
                'nomOrg' => $userOrg->getOrganization()->getNomOrg(),
               
            ];
        }
      return $orgs;
    }
    else {
        return [];
    }
}




    //get organizations
    public function getOrganizations(): array
    {
        $organizations = $this->doctrine->getRepository(Organization::class)->findAll();
        $organizationsArray = [];
        foreach($organizations as $organization){
            $organizationsArray[] = [
                'id' => $organization->getId(),
                'nomOrg' => $organization->getNomOrg(),
                'adresse' => $organization->getAdresse(),
                'phone' => $organization->getPhone(),
                'email' => $organization->getEmail(),
                'logo' => $organization->getLogo(),
            ];
        }
        return $organizationsArray;
    }
    //update organization
    public function updateOrganization(array $organizationData, int $id): void
    {
        $entitymanager = $this->doctrine->getManager();
        $organization = $this->doctrine->getRepository(Organization::class)->findOneBy(["id"=>$id]);
        if(isset($organizationData['nomOrg'])) {
            $organization->setNomOrg($organizationData['nomOrg']);
        }
        if(isset($organizationData['adresse'])) {
            $organization->setAdresse($organizationData['adresse']);
        }
        if(isset($organizationData['phone'])) {
            $organization->setPhone($organizationData['phone']);
        }
        if(isset($organizationData['email'])) {
            $organization->setEmail($organizationData['email']);
        }
        if(isset($organizationData['logo'])) {
            $organization->setLogo($organizationData['logo']);
        }
        $entitymanager->flush();
    }
    //delete organization
    public function deleteOrganization(int $id): void
    {
        $entitymanager = $this->doctrine->getManager();
        $organization = $this->doctrine->getRepository(Organization::class)->findOneBy(["id"=>$id]);
        $entitymanager->remove($organization);
        $entitymanager->flush();
    }
    //
}
    

