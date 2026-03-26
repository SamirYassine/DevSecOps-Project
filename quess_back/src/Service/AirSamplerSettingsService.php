<?php

namespace App\Service;

use App\Entity\AirSamplerSettings;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Air;
use DateTimeImmutable;
use App\Entity\Organization;



class AirSamplerSettingsService
{
    private $doctrine;

    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
    }
    public function createSetting(array $settingData): void
    {
        $organization = $this->doctrine->getRepository(Organization::class)->find($settingData['selectedOrgId']);
        $entityManager= $this->doctrine->getManager();
        $setting = new AirSamplerSettings();
        
        $setting->setDeviceName($settingData['deviceName']);
        $setting->setDeviceType($settingData['deviceType']);
        $setting->setCertificationDate(new \DateTimeImmutable($settingData['certificationDate']));
        $setting->setValidationDate(new \DateTimeImmutable($settingData['validationDate']));
        $setting -> setOrganization($organization);
        $entityManager->persist($setting);
        $entityManager->flush();
        
    }
    
    public function getSetting(int $id): AirSamplerSettings
    {
        $setting = $this->doctrine->getRepository(AirSamplerSettings::class)->find($id);
        if (!$setting) {
            throw new \Exception('Setting not found');
        }
        return $setting;
    }

    public function updateSetting(array $settingData, int $id): void
    {
        $entityManager = $this->doctrine->getManager();
        $setting = $entityManager->getRepository(AirSamplerSettings::class)->find($id);
        if (!$setting) {
            throw new \Exception('Setting not found');
        }
        if (isset($settingData['deviceName'])) {
            $setting->setDeviceName($settingData['deviceName']);
        }
        if (isset($settingData['deviceType'])) {
            $setting->setDeviceType($settingData['deviceType']);
        }
        if (isset($settingData['certificationDate'])) {
            $setting->setCertificationDate(new \DateTimeImmutable($settingData['certificationDate']));
        }
        if (isset($settingData['validationDate'])) {
            $setting->setValidationDate(new \DateTimeImmutable($settingData['validationDate']));
        }
        $entityManager->flush();
    }

    public function deleteSetting(int $id): void
    {
        $entityManager = $this->doctrine->getManager();
        $setting = $entityManager->getRepository(AirSamplerSettings::class)->find($id);
        if (!$setting) {
            throw new \Exception('Setting not found');
        }
        $entityManager->remove($setting);
        $entityManager->flush();
    }

    public function getAllSettings($OrgId): array
{
    $settings = $this->doctrine->getRepository(AirSamplerSettings::class)->findBy(['organization' => $OrgId]);

    $settingData = [];
    foreach ($settings as $setting) {
        $certificationDate = $setting->getCertificationDate()->format('Y-m-d');
        $validationDate = $setting->getValidationDate()->format('Y-m-d');
        $settingToCheck = ['id'=> $setting->getId()];
        $isUsed = $this->isAirsamplerUsed($settingToCheck, $this->doctrine);

        $settingData[] = [
            'id' => $setting->getId(),
            'deviceName' => $setting->getDeviceName(),
            'deviceType' => $setting->getDeviceType(),
            'certificationDate' => substr($certificationDate, 0, 10),
            'validationDate' => substr($validationDate, 0, 10),
            'isUsed' => $isUsed,
        ];
    }

    return $settingData;
}

private function isAirsamplerUsed( $airsampler,$doctrine): bool
{ 
  
    $isUsed = false;
    $formsair = $doctrine->getRepository(Air::class)->findAll();
    

   
    foreach ($formsair as $form) {
        if($form->getAirSamplers() == ""){
            continue;
        }
       else if (in_array($airsampler, $form->getAirSamplers())) {
            $isUsed=true;
            break;
        }

    }
    return $isUsed;
}
}