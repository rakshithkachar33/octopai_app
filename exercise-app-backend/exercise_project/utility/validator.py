import re

from rest_framework.exceptions import ValidationError


class Validators:
    @staticmethod
    def validate_email(value):
        email_regex = re.compile(
            r'^[a-zA-Z0-9_.+-]+@(?=[a-zA-Z0-9-]{1,63}\.)(?!-)[a-zA-Z0-9-]+(?<!-)\.[a-zA-Z]{2,}$'
        )
        if not email_regex.match(value):
            raise ValidationError('Invalid email format')

    @staticmethod
    def validate_password(value):
        password_regex = re.compile(r'^.{8,}$')

        if not password_regex.match(value):
            raise ValidationError('Password must be at least 8 characters long')