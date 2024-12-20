<?php 
// config/packages/security.php
use App\Entity\Swimmer;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Config\SecurityConfig;

return static function (SecurityConfig $security): void {
    // ...

    // auto hasher with default options for the User class (and children)
    $security->passwordHasher(Swimmer::class)
        ->algorithm('auto');

    // auto hasher with custom options for all PasswordAuthenticatedUserInterface instances
    $security->passwordHasher(PasswordAuthenticatedUserInterface::class)
        ->algorithm('auto')
        ->cost(15);
};