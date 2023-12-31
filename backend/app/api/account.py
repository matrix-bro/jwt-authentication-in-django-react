from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers,status, permissions
from django.contrib.auth import get_user_model
from app.services.account_services import create_user_account
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
User = get_user_model()

class RegisterView(APIView):
    class InputSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('first_name', 'last_name', 'email', 'password', 'confirm_password')

        password = serializers.CharField(write_only=True)
        confirm_password = serializers.CharField(write_only=True)

        def validate(self, attrs):
            if attrs['password'] != attrs['confirm_password']:
                raise serializers.ValidationError({
                    'password': "Password fields didn't match."
                })
            
            attrs.pop('confirm_password')   # Removing confirm_password from validated_data

            return attrs
        
    """
        POST: Creates user account
    """
    def post(self, request):
        serializer = self.InputSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        password = serializer.validated_data['password']

        try:
            validate_password(password, request.user)
        except ValidationError as e:
            return Response({
                'password': e.messages
            }, status=status.HTTP_400_BAD_REQUEST)

        user = create_user_account(**serializer.validated_data)

        response = self.InputSerializer(user)

        return Response({
            'success': 'Account created successfully.',
            'data': response.data,
            'status': status.HTTP_201_CREATED,
        }, status=status.HTTP_201_CREATED)
    

class RetreiveUserView(APIView):
    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('first_name', 'last_name', 'email')


    permission_classes = [permissions.IsAuthenticated]
    """
        GET: Displays logged in user details
    """
    def get(self, request):
        user = request.user
        response = self.OutputSerializer(user)

        return Response(response.data, status=status.HTTP_200_OK)
