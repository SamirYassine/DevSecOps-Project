<?php

namespace App\Entity;

use App\Repository\ZoneRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ZoneRepository::class)]
class Zone
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'zones', cascade: ['persist'])]
    private ?Organization $organization = null;

    #[ORM\OneToMany(targetEntity: Localization::class, mappedBy: 'zone')]
    private Collection $localizations;

    #[ORM\Column(length: 255)]
    private ?string $type = null;

    public function __construct()
    {
        $this->localizations = new ArrayCollection();
    }

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

    /**
     * @return Collection<int, Localization>
     */
    public function getLocalizations(): Collection
    {
        return $this->localizations;
    }

    public function addLocalization(Localization $localization): static
    {
        if (!$this->localizations->contains($localization)) {
            $this->localizations->add($localization);
            $localization->setZone($this);
        }

        return $this;
    }

    public function removeLocalization(Localization $localization): static
    {
        if ($this->localizations->removeElement($localization)) {
            // set the owning side to null (unless already changed)
            if ($localization->getZone() === $this) {
                $localization->setZone(null);
            }
        }

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }
}
