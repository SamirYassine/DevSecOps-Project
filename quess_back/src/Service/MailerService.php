<?php   


namespace App\Service;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;



class MailerService {

    public function __construct(private MailerInterface $mailer){ }

    public function sendEmail($to, $subject, $body): void
    {
        $email = (new Email())
            ->from('yassine.samir@isimg.tn')
            ->to($to)
            ->subject($subject)
            ->text($body);

        $this->mailer->send($email);
    }
}
