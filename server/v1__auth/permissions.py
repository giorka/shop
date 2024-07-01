from __future__ import annotations

from rest_framework.permissions import BasePermission


class IsRegisteredByEmail(BasePermission):
    message = 'Пользователь зарегистрирован через OAuth2.'

    def has_permission(self, request, *args, **kwargs) -> bool:
        return bool(request.user.password)
