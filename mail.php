<?php
    
    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        
        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["name"]));
        $subject = strip_tags(trim($_POST["subject"]));
        $number = strip_tags(trim($_POST["number"]));
        $name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $message = trim($_POST["message"]);

        $lang = trim($_GET["lang"]);

        // Check that data was sent to the mailer.
        if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Oops! Message Not Send.";
            exit;
        }

        // Set the recipient email address.
        // FIXME: Update this to your desired email address.
        
        $recipient = "domingos@dotproduct.com.br";
        

        // Set the email subject.
        $subject = "Contato através do site";

        // Build the email content.
        $email_content = "Nome: $name\n";
        $email_content .= "Email: $email\n\n";
        $email_content .= "Assunto: $subject\n\n";
        $email_content .= "Telefone: $number\n\n";
        $email_content .= "Mensagem:\n$message\n";

        // Build the email headers.
        $email_headers = "From: Dot Product <$recipient>";

        $successMessage = "Thanks! Message has been sent successfully.";
        $errorMessage = "Oops! Something went wrong. Please try again.";
        
        if ($lang != 'en')
        {
            $successMessage = "Obrigado! Sua mensagem foi enviada com sucesso.";
            $errorMessage = "Oops! Alguma coisa deu errado. Por favor, tente novamente.";
        }

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo $successMessage;
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo $errorMessage;
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "Oops! Something went wrong.";
    }

?>
