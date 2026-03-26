<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
#[ORM\Entity(repositoryClass: UserRepository::class)]
class User implements UserInterface,PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    #[ORM\Column(length: 255)]
    private ?string $prenom = null;

    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    private ?string $username = null;

    #[ORM\Column(length: 255)]
    private ?string $password = null;

    public function __construct()
    {
        $this->organization = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): static
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): static
    {
        $this->username = $username;

        return $this;
    }

    
    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    
 public function getRoles()
                      {
                          // Return an array of roles for the user
                          return ['ROLE_USER']; // Adjust this according to your application's logic
                      }


    public function getSalt()
    {
        // This method is not needed when using bcrypt for password hashing
        // Bcrypt automatically generates and handles the salt
        return null;
    }

    public function eraseCredentials()
    {
        // Implement this method if you store any sensitive information
        // in the user object that should be cleared after authentication
        // This method is usually left empty when no action is needed
    }

    /**
     * @return Collection<int, Organization>
     */
    public function getOrganization(): Collection
    {
        return $this->organization;
    }

    public function addOrganization(Organization $organization): static
    {
        if (!$this->organization->contains($organization)) {
            $this->organization->add($organization);
        }

        return $this;
    }

    public function removeOrganization(Organization $organization): static
    {
        $this->organization->removeElement($organization);

        return $this;
    } 

}
