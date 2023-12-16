from django.urls import path
from app.api import account

urlpatterns = [
    path('register/', account.RegisterView.as_view(), name='register'),
    path('me/', account.RetreiveUserView.as_view(), name='me'),

]
