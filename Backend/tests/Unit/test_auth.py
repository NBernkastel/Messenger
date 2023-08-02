from fastapi import HTTPException
import pytest
from contextlib import nullcontext as does_not_raise
from Utils.auth_utils import auth_user, generate_token, verification, verify_token


class TestAuth:
    @pytest.mark.parametrize(
        'username, expectation',
        [
            ('Nexeland', does_not_raise()),
            ('Bernkasetel', does_not_raise()),
            (12, pytest.raises(ValueError)),
        ]
    )
    def test_token(self, username, expectation):
        with expectation:
            assert verify_token(generate_token(username)) == username

    @pytest.mark.parametrize('token ,username, expectation',
                             [
                                 (generate_token('Nexeland'),
                                  'Nexeland', does_not_raise()),
                                 ('fggfgfghfgid654564845', 'Test',
                                  pytest.raises(HTTPException))
                             ]
                             )
    def test_auth(self, token, username, expectation):
        with expectation:
            assert auth_user(token) == username
        