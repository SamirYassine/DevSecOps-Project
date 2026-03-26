<?php

namespace App\Entity;

use App\Repository\SurfaceRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\DBAL\Types\Types;
use App\Enum\Laboratory;
use App\Enum\MedType;
use App\Enum\SamplingType;


#[ORM\Entity(repositoryClass: SurfaceRepository::class)]
class Surface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE,nullable: true)]
    private ?\DateTimeInterface $samplingDate = null;

    #[ORM\Column(length: 255)]
    private ?string $samplingType = SamplingType::BiAnnual;

    #[ORM\Column(length: 255,nullable: true)]
    private ?string $samplingBy =null ;
    

    #[ORM\Column(length: 255,nullable: true)]
    private ?string $agarsType = null;

    #[ORM\Column(length: 255,nullable: true)]
    private ?string $supplier = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE,nullable: true)]
    private ?\DateTimeInterface $expiryDate = null;

    #[ORM\Column(length: 255)]
    private ?string $laboratory = Laboratory::External;

    #[ORM\Column(type: Types::ARRAY)]
    private array $details = [];

    #[ORM\Column(length: 255,nullable: true)]
    private ?string $batch = null;

    #[ORM\Column(length: 255)]
    private ?string $medType = MedType::Dangerous;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: true)]
    private ?User $user = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Organization $organization = null;

    #[ORM\Column(type: Types::BOOLEAN)]
    private bool $isTemplate = false;

    #[ORM\Column(nullable: true)]
    private ?int $templateId = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $recommendations = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $revisionDate = null;

    #[ORM\Column(length: 255)]
    private ?string $formName = null;

    #[ORM\Column(nullable: true)]
    private ?bool $status = null;


    public function getUser(): ?User
    {
        return $this->user;
    }


    public function setUser(?User $user): static
    {
        $this->user = $user;
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

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSamplingDate(): ?\DateTimeInterface
    {
        return $this->samplingDate;
    }

    public function setSamplingDate(\DateTimeInterface $samplingDate): static
    {
        $this->samplingDate = $samplingDate;

        return $this;
    }

    public function getSamplingType(): ?string
    {
        return $this->samplingType;
    }

    public function setSamplingType(string $samplingType): static
    {
        $this->samplingType = $samplingType;

        return $this;
    }

    public function getSamplingBy(): ?string
    {
        return $this->samplingBy;
    }

    public function setSamplingBy(string $samplingBy): static
    {
        $this->samplingBy = $samplingBy;

        return $this;
    }

    public function getAgarsType(): ?string
    {
        return $this->agarsType;
    }

    public function setAgarsType(string $agarsType): static
    {
        $this->agarsType = $agarsType;

        return $this;
    }

    public function getSupplier(): ?string
    {
        return $this->supplier;
    }

    public function setSupplier(string $supplier): static
    {
        $this->supplier = $supplier;

        return $this;
    }

    public function getExpiryDate(): ?\DateTimeInterface
    {
        return $this->expiryDate;
    }

    public function setExpiryDate(\DateTimeInterface $expiryDate): static
    {
        $this->expiryDate = $expiryDate;

        return $this;
    }

    public function getLaboratory(): ?string
    {
        return $this->laboratory;
    }

    public function setLaboratory(string $laboratory): static
    {
        $this->laboratory = $laboratory;

        return $this;
    }

    public function getDetails(): array
    {
        return $this->details;
    }

    public function setDetails(array $details): static
    {
        $this->details = $details;

        return $this;
    }

    public function getBatch(): ?string
    {
        return $this->batch;
    }

    public function setBatch(string $batch): static
    {
        $this->batch = $batch;

        return $this;
    }

    public function getMedType(): ?string
    {
        return $this->medType;
    }

    public function setMedType(string $medType): static
    {
        $this->medType = $medType;

        return $this;
    }

    public function getIsTemplate(): bool
    {
        return $this->isTemplate;
    }

    public function setIsTemplate(bool $isTemplate): static
    {
        $this->isTemplate = $isTemplate;
        return $this;
    }

    public function getTemplateId(): ?int
    {
        return $this->templateId;
    }

    public function setTemplateId(?int $templateId): static
    {
        $this->templateId = $templateId;
        return $this;
    }

    public function getRecommendations(): ?string
    {
        return $this->recommendations;
    }

    public function setRecommendations(?string $recommendations): static
    {
        $this->recommendations = $recommendations;

        return $this;
    }

    public function getRevisionDate(): ?\DateTimeInterface
    {
        return $this->revisionDate;
    }

    public function setRevisionDate(?\DateTimeInterface $revisionDate): static
    {
        $this->revisionDate = $revisionDate;

        return $this;
    }

    public function getFormName(): ?string
    {
        return $this->formName;
    }

    public function setFormName(string $formName): static
    {
        $this->formName = $formName;

        return $this;
    }

    public function isStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(?bool $status): static
    {
        $this->status = $status;

        return $this;
    }
}
