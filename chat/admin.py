from django.contrib import admin
from .models import Room,Message
# Register your models here.


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ["first_user",'second_user']

    class Meta:
        model=Room


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ["user", "room","created_date"]

    class Meta:
        model = Message