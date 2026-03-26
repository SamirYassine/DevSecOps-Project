<?php

namespace App\Service;

use App\Entity\Organization;
use App\Entity\UserOrganization;
use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use App\Entity\Zone;
use App\Entity\Localization;




class OrganizationService {
    private $doctrine;

    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
    }

    // Add organization
    // public function addOrganization(array $organizationData): void
    // {
    //     $entitymanager = $this->doctrine->getManager();

    //     $organization = new Organization();
    //     $organization->setNomOrg($organizationData['nomOrg']);
    //     $organization->setAdresse($organizationData['adresse']);
    //     $organization->setPhone($organizationData['phone']);
    //     $organization->setEmail($organizationData['email']); 
    //      if (isset($organizationData['logo'])) {
    //     $organization->setLogo($organizationData['logo']);
    // }
        
                
    //     $entitymanager->persist($organization);
    //     $entitymanager->flush();
    //     // send mail
    //     /* $orgEmail = $organizationData['email'];
    //     $email = (new Email())
    //     ->from('your_email@example.com') // Replace with your email address
    //     ->to($orgEmail)
    //     ->subject('Your New Password')
    //     ->text('Your new password: ');
    //     $mailer->send($email);
    //      */
        
    // }

    public function addOrganization(array $organizationData): void
{
    $entityManager = $this->doctrine->getManager();

    // Create the organization
    $organization = new Organization();
    $organization->setNomOrg($organizationData['nomOrg']);
    $organization->setAdresse($organizationData['adresse']);
    $organization->setPhone($organizationData['phone']);
    $organization->setEmail($organizationData['email']);
    if (isset($organizationData['logo'])) {
        $organization->setLogo($organizationData['logo']);
    }

    // Define your zones and their localizations here
    $zonesWithLocations = $this->getZonesWithLocations();

    foreach ($zonesWithLocations as $zoneData) {
        // Create a new Zone
        $zone = new Zone();
        $zone->setName($zoneData['name']);
        $zone->setType($zoneData['type']); // Set the type
        $zone->setOrganization($organization);
        $entityManager->persist($zone);
        $entityManager->flush(); // Flush here to get the ID for zone

        foreach ($zoneData['localizations'] as $localizationData) {
            // Create a new Localization
            $localization = new Localization();
            $localization->setName($localizationData['name']);
            $localization->setIso($localizationData['iso']);
            $localization->setThreshold($localizationData['threshold']);
            $localization->setZone($zone);
            $entityManager->persist($localization);
        }
    }

    $entityManager->persist($organization);
    $entityManager->flush();
}

private function getZonesWithLocations(): array
{
    $data = [
        [
    'name' => 'Salle blanche de médicaments non-dangereux (SCAS)',
    'type' => 'A',
    'localizations' => [
        ['name' => 'Air', 'iso' => 7, 'threshold' => 10],
        ['name' => 'EPS #1 - 4 pi - centre', 'iso' => 5, 'threshold' => 1],
        ['name' => 'EPS #1 - 6 pi - Gauche', 'iso' => 5, 'threshold' => 1],
        ['name' => 'EPS #1 - 6pi - Droit', 'iso' => 5, 'threshold' => 1],
        ['name' => 'EPS #2 - 6pi - Droit', 'iso' => 5, 'threshold' => 1],
        ['name' => 'EPS #2 - 6pi - Gauche', 'iso' => 5, 'threshold' => 1],
        ['name' => 'IPS - 6pi - Droite', 'iso' => 5, 'threshold' => 1],
        ['name' => 'IPS - 6pi - Entrée', 'iso' => 5, 'threshold' => 1],
        ['name' => 'IPS - 6pi - Gauche', 'iso' => 5, 'threshold' => 1],
        ['name' => 'IPS - 6pi - Sortie', 'iso' => 5, 'threshold' => 1],
    ],
],
        [
    'name' => 'Salle blanche de médicaments non-dangereux (SCAS)',
    'type' => 'S',
    'localizations' => [
        ['name' => 'EPS #1 - Gauche', 'iso' => 5, 'threshold' => 3],
        ['name' => 'EPS #1 - Droit', 'iso' => 5, 'threshold' => 3],
        ['name' => 'Passe-Plat', 'iso' => 7, 'threshold' => 5],
        ['name' => 'Chariot #1', 'iso' => 7, 'threshold' => 5],
        ['name' => 'Mur près de la porte', 'iso' => 7, 'threshold' => 5],
        ['name' => 'Plancher', 'iso' => 7, 'threshold' => 5],
        ['name' => 'EPS #1 - 6 pi - Gauche', 'iso' => 5, 'threshold' => 3],
        ['name' => 'EPS #1 - 6pi - Droit', 'iso' => 5, 'threshold' => 3],
        ['name' => 'EPS #2 - 6pi - Gauche', 'iso' => 5, 'threshold' => 3],
        ['name' => 'EPS #2 - 6pi - Droit', 'iso' => 5, 'threshold' => 3],
        ['name' => 'Chariot #2', 'iso' => 7, 'threshold' => 5],
    ],
],
        [
    'name' => 'Salle blanche de médicaments dangereux (Chimio)',
    'type' => 'A',
    'localizations' => [
        ['name' => 'Air', 'iso' => 7, 'threshold' => 10],
        ['name' => 'EPS #1 - 4 pi - centre', 'iso' => 5, 'threshold' => 1],
        ['name' => 'EPS #1 - 6 pi - Gauche', 'iso' => 5, 'threshold' => 1],
        ['name' => 'EPS #1 - 6pi - Droit', 'iso' => 5, 'threshold' => 1],
        ['name' => 'IPS - 6pi - Droite', 'iso' => 5, 'threshold' => 1],
        ['name' => 'IPS - 6pi - Entrée', 'iso' => 5, 'threshold' => 1],
        ['name' => 'IPS - 6pi - Gauche', 'iso' => 5, 'threshold' => 1],
    ],
],
[
    'name' => 'Salle blanche de médicaments dangereux (Chimio)',
    'type' => 'S',
    'localizations' => [
        ['name' => 'EPS #1 - 4 pi - centre', 'iso' => 5, 'threshold' => 3],
        ['name' => 'Passe-Plat', 'iso' => 7, 'threshold' => 5],
        ['name' => 'Chariot #1', 'iso' => 7, 'threshold' => 5],
        ['name' => 'Mur près de la porte', 'iso' => 7, 'threshold' => 5],
        ['name' => 'Plancher', 'iso' => 7, 'threshold' => 5],
    ],
],
[
    'name' => 'SAS Chimio',
    'type' => 'A',
    'localizations' => [
        ['name' => 'Air', 'iso' => 7, 'threshold' => 10],
    ],
],
[
    'name' => 'SAS Chimio',
    'type' => 'S',
    'localizations' => [
        ['name' => 'Tablette de gantage', 'iso' => 7, 'threshold' => 5],
    ],
],
[
    'name' => 'SAS Non-dangereux',
    'type' => 'A',
    'localizations' => [
        ['name' => 'Air', 'iso' => 8, 'threshold' => 100],
    ],
],[
    'name' => 'SAS Non-dangereux',
    'type' => 'S',
    'localizations' => [
        ['name' => 'Tablette de gantage', 'iso' => 8, 'threshold' => 100],
    ],
],
[
    'name' => 'SAS Partagé',
    'type' => 'A',
    'localizations' => [
        ['name' => 'Air', 'iso' => 7, 'threshold' => 10],
    ],
],
[
    'name' => 'N/A',
    'type' => 'A',
    'localizations' => [
        ['name' => 'Gélose de contrôle', 'iso' => 0, 'threshold' => 0],
    ],
],
[
    'name' => 'N/A',
    'type' => 'S',
    'localizations' => [
        ['name' => 'Gélose de contrôle', 'iso' => 0, 'threshold' => 0],
    ],
]
    ];

    return $data;
}

    // Update organization
    public function updateOrganization(array $organizationData , int $id): void
    {
        $entitymanager = $this->doctrine->getManager();
        $organization = $this->doctrine->getRepository(Organization::class)->findOneBy(["id"=>$id]);
        if (isset($organizationData['nomOrg'])) {
        $organization->setNomOrg($organizationData['nomOrg']);
    }
    if (isset($organizationData['adresse'])) {
        $organization->setAdresse($organizationData['adresse']);
    }
    if (isset($organizationData['phone'])) {
        $organization->setPhone($organizationData['phone']);
    }
    if (isset($organizationData['email'])) {
        $organization->setEmail($organizationData['email']);
    }

        if (isset($organizationData['logo'])) {
            $organization->setLogo($organizationData['logo']);
        }
        $entitymanager->persist($organization);
        $entitymanager->flush();
    }


    //delete organization
    public function deleteOrganization(int $id): void
{
    $entityManager = $this->doctrine->getManager();
    $organization = $this->doctrine->getRepository(Organization::class)->findOneBy(["id" => $id]);
    $userOrganization = $this->doctrine->getRepository(UserOrganization::class)->findBy(["organization" => $id]);
    //dd($userOrganization); // Debugging output
    $zone = $this->doctrine->getRepository(Zone::class)->findBy(["organization" => $id]);
    foreach ($zone as $zone) {
        $localizations = $this->doctrine->getRepository(Localization::class)->findBy(["zone" => $zone]);
        foreach ($localizations as $localization) {
            $entityManager->remove($localization);
        }
        $entityManager->remove($zone);
    } 
    if (!$userOrganization) {
       $entityManager->remove($organization);
        $entityManager->flush();
        return;
    }
    else {
        foreach ($userOrganization as $userOrg) {
        $entityManager->remove($userOrg);
    } 
    }
           
    $entityManager->remove($organization);
    $entityManager->flush();

    /* // Get all users excluding the organization that was just deleted
    $users = $this->doctrine->getRepository(User::class)->findAll();
    foreach ($users as $user) {
        
        $userOrgs = $this->doctrine->getRepository(UserOrganization::class)->findBy(["User" => $user]);
        $userOrgCount = count($userOrgs);
        echo "User ID: {$user->getId()}, UserOrg Count: {$userOrgCount}" . PHP_EOL; // Debugging output
        if ($userOrgCount == 0) {
            echo "User marked for deletion: {$user->getId()}" . PHP_EOL; // Debugging output
            $entityManager->remove($user);
        }
    }
 
    $entityManager->flush();*/
}
//get organizations by id
 public function getOrganizationById(int $id): array
    {
        $organization = $this->doctrine->getRepository(Organization::class)->findOneBy(["id"=>$id]);
        $organizationArray = [
            'id' => $organization->getId(),
            'nomOrg' => $organization->getNomOrg(),
        ];
        return $organizationArray;
    }
    
}