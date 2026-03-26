<?php

namespace App\Entity;

use App\Repository\PlanRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PlanRepository::class)]
class Plan
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    private ?Organization $organization = null;

    #[ORM\Column(length: 255)]
    private ?string $image = null;

    #[ORM\Column]
    private array $imageSize = [];

    #[ORM\Column]
    private array $markers = [];

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

    public function getOrganization(): ?Organization
    {
        return $this->organization;
    }

    public function setOrganization(?Organization $organization): static
    {
        $this->organization = $organization;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): static
    {
        $this->image = $image;

        return $this;
    }

    public function getImageSize(): array
    {
        return $this->imageSize;
    }

    public function setImageSize(array $imageSize): static
    {
        $this->imageSize = $imageSize;

        return $this;
    }

    public function getMarkers(): array
    {
        return $this->markers;
    }

    public function setMarkers(array $markers): static
    {
        $this->markers = $markers;

        return $this;
    }
}
