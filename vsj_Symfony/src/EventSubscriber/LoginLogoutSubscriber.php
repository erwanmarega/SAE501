<?php

namespace App\EventSubscriber;

use App\Entity\LoginHistory;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Http\Event\LoginSuccessEvent;
use Symfony\Component\Security\Http\Event\LogoutEvent;

class LoginLogoutSubscriber implements EventSubscriberInterface
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            LoginSuccessEvent::class => 'onLoginSuccess',
            LogoutEvent::class => 'onLogout',
        ];
    }

    public function onLoginSuccess(LoginSuccessEvent $event): void
    {
        $user = $event->getUser();
        if (!$user instanceof \App\Entity\Swimmer) {
            return; 
        }

        $loginHistory = new LoginHistory();
        $loginHistory->setUser($user);
        $loginHistory->setAction('login');
        $loginHistory->setDateTime(new \DateTime());

        $this->entityManager->persist($loginHistory);
        $this->entityManager->flush();
    }

    public function onLogout(LogoutEvent $event): void
    {
        $user = $event->getToken()->getUser();
        if (!$user instanceof \App\Entity\Swimmer) {
            return; 
        }

        $loginHistory = new LoginHistory();
        $loginHistory->setUser($user);
        $loginHistory->setAction('logout');
        $loginHistory->setDateTime(new \DateTime());

        $this->entityManager->persist($loginHistory);
        $this->entityManager->flush();
    }
}
