$(function () {

    // Get the form.
    var form = $('#main_contact_form');

    // Get the messages div.
    var formMessages = $('#success_fail_info');

    // Set up an event listener for the contact form.
    $(form).submit(function (e) {
        // Stop the browser from submitting the form.
        e.preventDefault();

        // Serialize the form data.
        var formData = $(form).serialize();

        // Submit the form using AJAX.
        $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            })
            .done(function (response) {
                // Make sure that the formMessages div has the 'success' class.
                $(formMessages).removeClass('error');
                $(formMessages).addClass('success');

                var successMessage = 'Thanks! Message has been sent.';

                if ( document.documentElement.lang.toLowerCase() === "pt-br" ) {
                    successMessage = 'Obrigado! Sua mensagem foi enviada.';
                }

                // Set the message text.
                $(formMessages).text(successMessage);

                // Clear the form.
                $('#name').val('');
                $('#email').val('');
                $('#message').val('');
            })
            .fail(function (data) {
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass('success');
                $(formMessages).addClass('error');

                // Set the message text.
                if (data.responseText !== '') {
                    $(formMessages).text(data.responseText);
                } else {
                    var errorMessage = 'Oops! An error occured.';

                    if ( document.documentElement.lang.toLowerCase() === "pt-br" ) {
                        errorMessage = 'Oops! Ocorreu um erro.';
                    }

                    
                    $(formMessages).text(errorMessage);
                }
            });

    });

});