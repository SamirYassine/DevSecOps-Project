<?php

namespace App\Entity;

use App\Repository\AirSamplerSettingsRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AirSamplerSettingsRepository::class)]
class AirSamplerSettings
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $deviceName = null;

    #[ORM\Column(type: Types::DATE_IMMUTABLE)]
    private ?\DateTimeInterface $certificationDate = null;

    #[ORM\Column(type: Types::DATE_IMMUTABLE)]
    private ?\DateTimeInterface $validationDate = null;

    #[ORM\Column(length: 255)]
    private ?string $deviceType = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Organization $organization = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDeviceName(): ?string
    {
        return $this->deviceName;
    }

    public function setDeviceName(string $deviceName): static
    {
        $this->deviceName = $deviceName;

        return $this;
    }

    public function getCertificationDate(): ?\DateTimeInterface
    {
        return $this->certificationDate;
    }

    public function setCertificationDate(\DateTimeInterface $certificationDate): static
    {
        $this->certificationDate = $certificationDate;

        return $this;
    }

    public function getValidationDate(): ?\DateTimeInterface
    {
        return $this->validationDate;
    }

    public function setValidationDate(\DateTimeInterface $validationDate): static
    {
        $this->validationDate = $validationDate;

        return $this;
    }

    public function getDeviceType(): ?string
    {
        return $this->deviceType;
    }

    public function setDeviceType(string $deviceType): static
    {
        $this->deviceType = $deviceType;

        return $this;
    }

    public function getOrganization(): ?Organization
    {
        return $this->organization;
    }

    public function setOrganization(?Organization $organization): static
    {
        $this->organization = $organization;

        return $this;
    }

    
}
