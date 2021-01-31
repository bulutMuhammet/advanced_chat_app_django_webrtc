from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.contrib.auth import login as login_
from django.contrib.auth.models import User
from .models import Room,Message

@login_required(login_url="login")
def index(request):

    users=User.objects.all().exclude(username=request.user)


    return render(request, 'chat/index.html',{"users":users})

@login_required(login_url="login")
def room(request,room_name):
    users=User.objects.all().exclude(username=request.user)
    room=Room.objects.get(id=room_name)
    messages=Message.objects.filter(room=room)

    if request.user != room.first_user:
        if request.user!=room.second_user:
            return redirect("index")

    return render(request,'chat/room_v2.html',{'room_name': room_name,
                                               "room":room,
                                               "users":users,
                                               'messages':messages})

@login_required(login_url="login")
def video(request,room_name):
    room=Room.objects.get(id=room_name)
    if request.user != room.first_user:
        if request.user!=room.second_user:
            return redirect("index")
    return render(request,"chat/video_chat.html",{"room":room})

@login_required(login_url="login")
def start_chat(request,username):
    second_user=User.objects.get(username=username)
    try:
        room=Room.objects.get(first_user=request.user,second_user=second_user)
    except Room.DoesNotExist:
        try:
            room = Room.objects.get(second_user=request.user, first_user=second_user)
        except Room.DoesNotExist:

            room=Room.objects.create(first_user=request.user,second_user=second_user)
    return redirect("room",room.id)


def login(request):

    if request.method=="POST":
        username=request.POST.get("username")
        password=request.POST.get("password")
        user=authenticate(username=username,password=password)
        if user:
            login_(request,user)
            return redirect("index")

    return render(request,'chat/login.html')