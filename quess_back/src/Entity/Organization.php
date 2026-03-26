<?php

namespace App\Entity;

use App\Repository\OrganizationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: OrganizationRepository::class)]
class Organization
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;


    #[ORM\Column(length: 255,name: 'nomOrg')]
    private ?string $nomOrg  = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $email = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $adresse = null;

    #[ORM\Column(nullable: true)]
    private ?int $phone = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $logo = null;

    #[ORM\OneToMany(targetEntity: Zone::class, mappedBy: 'organization')]
    private Collection $zones;

    #[ORM\OneToMany(targetEntity: AirSamplerSettings::class, mappedBy: 'organization')]
    private Collection $airSamplerSettings;

    public function __construct()
    {
        $this->zones = new ArrayCollection();
        $this->airSamplerSettings = new ArrayCollection();
    }

    

    public function getId(): ?int
    {
        return $this->id;
    }

   

    public function getNomOrg(): ?string
    {
        return $this->nomOrg;
    }

    public function setNomOrg(string $nomOrg): static
    {
        $this->nomOrg = $nomOrg;

        return $this;
    }



    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(?string $adresse): static
    {
        $this->adresse = $adresse;

        return $this;
    }

    public function getPhone(): ?int
    {
        return $this->phone;
    }

    public function setPhone(?int $phone): static
    {
        $this->phone = $phone;

        return $this;
    }

    public function getLogo(): ?string
    {
        return $this->logo;
    }

    public function setLogo(?string $logo): static
    {
        $this->logo = $logo;

        return $this;
    }

    /**
     * @return Collection<int, Zone>
     */
    public function getZones(): Collection
    {
        return $this->zones;
    }

    public function addZone(Zone $zone): static
    {
        if (!$this->zones->contains($zone)) {
            $this->zones->add($zone);
            $zone->setOrganization($this);
        }

        return $this;
    }

    public function removeZone(Zone $zone): static
    {
        if ($this->zones->removeElement($zone)) {
            // set the owning side to null (unless already changed)
            if ($zone->getOrganization() === $this) {
                $zone->setOrganization(null);
            }
        }

        return $this;
    }

}
