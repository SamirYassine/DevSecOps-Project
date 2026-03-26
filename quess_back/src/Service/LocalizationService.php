<?php   

namespace App\Service;

use App\Entity\Localization;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Zone;




class LocalizationService
{
    private $doctrine;

    public function __construct(ManagerRegistry $doctrine)
    {
        $this->doctrine = $doctrine;
    }
    //create localization
    public function createLocalization(array $localizationData): void
    {
        $entityManager = $this->doctrine->getManager();

        $zoneId = $localizationData['zone_id'];
        $zone = $entityManager->getRepository(Zone::class)->find($zoneId);

        if (!$zone) {
            throw new \Exception('Zone not found.');
        }
        $localizationName = $localizationData['name'];
        $existingLocalization = $entityManager->getRepository(Localization::class)
            ->findOneBy(['name' => $localizationName, 'zone' => $zoneId]);

        if ($existingLocalization !== null) {
            throw new \Exception('Localization with the same name already exists in this zone.');
        }

        $localization = new Localization();
        $localization->setName($localizationName);
        $localization->setIso($localizationData['iso']);
        $localization->setThreshold($localizationData['threshold']);
        $localization->setZone($zone);

        $entityManager->persist($localization);
        $entityManager->flush();
    }

    //update localization
    public function updateLocalization(int $id, array $localizationData): void
    {
        $entityManager = $this->doctrine->getManager();
        $localization = $entityManager->getRepository(Localization::class)->find($id);

        if (!$localization) {
            throw new \Exception('Localization not found.');
        }

        $zoneId = $localizationData['zone_id'];
        $zone = $entityManager->getRepository(Zone::class)->find($zoneId);

        if (!$zone) {
            throw new \Exception('Zone not found.');
        }

        $localization->setName($localizationData['name']);
        $localization->setIso($localizationData['iso']);
        $localization->setThreshold($localizationData['threshold']);
        $localization->setZone($zone);

        $entityManager->flush();
    }

    //delete localization
    public function deleteLocalization(int $id): void
    {
        $entityManager = $this->doctrine->getManager();
        $localization = $entityManager->getRepository(Localization::class)->find($id);

        if (!$localization) {
            throw new \Exception('Localization not found.');
        }

        $entityManager->remove($localization);
        $entityManager->flush();
    }

    //get localization
    public function getLocalizationById(int $id): array
    {
        $localization = $this->doctrine->getRepository(Localization::class)->find($id);
        //dd($localization);

        if (!$localization) {
            throw new \Exception('Localization not found.');
        }

        $localizationData = [
            'id' => $localization->getId(),
            'name' => $localization->getName(),
            'iso' => $localization->getIso(),
            'threshold' => $localization->getThreshold(),
            'zone_id' => $localization->getZone()->getId(),
        ];



        return $localizationData;
    }

    //get all localizations of that zone 
    public function getLocalizationsByZone(int $zoneId): array
    {
        $zone = $this->doctrine->getRepository(Zone::class)->find($zoneId);

        if (!$zone) {
            throw new \Exception('Zone not found.');
        }
        $data = [];
        $localizations = $zone->getLocalizations();
        foreach ($localizations as $localization) {
            $data[] = [
                'id' => $localization->getId(),
                'name' => $localization->getName(),
                'iso' => $localization->getIso(),
                'threshold' => $localization->getThreshold(),
                'zone_id' => $localization->getZone()->getId(),
            ];
        }

        return $data;
    }

    public function createLocalizations(array $localizationsData): void
{
    $entityManager = $this->doctrine->getManager();

    foreach ($localizationsData as $localizationData) {
        $zoneId = $localizationData['zone_id'];
        $zone = $entityManager->getRepository(Zone::class)->find($zoneId);

        if (!$zone) {
            throw new \Exception('Zone not found.');
        }

        $localizationName = $localizationData['name'];
        $existingLocalization = $entityManager->getRepository(Localization::class)
            ->findOneBy(['name' => $localizationName, 'zone' => $zoneId]);

        if ($existingLocalization !== null) {
            throw new \Exception('Localization with the same name already exists in this zone.');
        }

        $localization = new Localization();
        $localization->setName($localizationName);
        $localization->setIso($localizationData['iso']);
        $localization->setThreshold($localizationData['threshold']);
        $localization->setZone($zone);

        $entityManager->persist($localization);
    }

    $entityManager->flush();
}

}