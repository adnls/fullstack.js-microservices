import requests
import json

rep = requests.post("http://localhost:5000/auth/signIn", 
    json={
        "firstname": "David",
        "lastname": "Ayache",
        "username": "adnls",
        "about": "nothing",
        "email": "david.ayache90@gmail.com",
        "password": "123azerty"
    })

"""print(rep)
print(rep.json())

rep = requests.get("http://localhost:5000/auth/logOut", 
                    cookies=rep.cookies)

print(rep)
print(rep.json())

rep = requests.get("http://localhost:5000/auth/isLogged", 
                    cookies=rep.cookies)

print(rep)
print(rep.json())


rep = requests.post("http://localhost:5000/auth/logIn",
     json={
        "email":"david.ayache90@gmail.com", "password":"123azerty"
    })

print(rep)
print(rep.json())

rep = requests.get("http://localhost:5000/auth/signOut", 
                    cookies=rep.cookies)

print(rep)
print(rep.json())"""