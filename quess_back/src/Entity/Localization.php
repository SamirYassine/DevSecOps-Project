<?php

namespace App\Entity;

use App\Repository\LocalizationRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: LocalizationRepository::class)]
class Localization
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column]
    private ?int $iso = null;

    #[ORM\Column]
    private ?int $threshold = null;

    #[ORM\ManyToOne(inversedBy: 'localizations')]
    private ?Zone $zone = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getIso(): ?int
    {
        return $this->iso;
    }

    public function setIso(int $iso): static
    {
        $this->iso = $iso;

        return $this;
    }

    public function getThreshold(): ?int
    {
        return $this->threshold;
    }

    public function setThreshold(int $threshold): static
    {
        $this->threshold = $threshold;

        return $this;
    }

    public function getZone(): ?Zone
    {
        return $this->zone;
    }

    public function setZone(?Zone $zone): static
    {
        $this->zone = $zone;

        return $this;
    }
}
