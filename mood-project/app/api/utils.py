from flask import request


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


def load_csrf_token(form):
    """
    Copies the csrf_token cookie into the form so validate_on_submit can be
    used. A missing cookie fails validation instead of raising a KeyError.
    """
    form['csrf_token'].data = request.cookies.get('csrf_token')
