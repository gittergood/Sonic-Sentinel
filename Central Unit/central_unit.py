import socket, threading, firebase_admin
from firebase_admin import credentials
from firebase_admin import db  # For Realtime Database
from firebase_admin import firestore  # For Firestore

# Initial socket setup
serv = socket.socket()
host = socket.gethostbyname(socket.gethostname())               # Get IP address. Since this will be a RPi, the device will already be connected to the the network.
cred = credentials.Certificate('')                              # Will be replaced by the file on the raspberry pi
firebase_admin.initialize_app(cred, {
  'databaseURL': 'https://console.firebase.google.com/u/0/project/capstone-11656/overview'  # Only for Realtime Database
})
ref = db.reference('')
port = 5000

serv.bind((host, port))
serv.listen(10)                                            # Allow 10 connections to be held before closing the connection. Needs to be set to the number of modules

# Each module will be connected to this device. The dictionary will be a map between the device number and the socket
number_of_modules = 10                                     # This number depends on the house and the number of modules that are implemented
modules = {}     
path = {} 

# Read path info from the firebase
def get_paths(path_num):
    paths = []
    firestore_db = firestore.client()
    # Document reference
    doc_ref = firestore_db.collection('paths').document('path'+str(path_num))

    # Get the document
    doc = doc_ref.get()
    if doc.exists:
        # Access fields
        paths.insert(0, doc.to_dict().get('1'))
        paths.insert(1, doc.to_dict().get('2'))
        paths.insert(2, doc.to_dict().get('3'))
        paths.insert(3, doc.to_dict().get('4'))
        paths.insert(4, doc.to_dict().get('5'))
        paths.insert(5, doc.to_dict().get('6'))
        paths.insert(6, doc.to_dict().get('7'))
        paths.insert(7, doc.to_dict().get('8'))
        paths.insert(8, doc.to_dict().get('9'))
        paths.insert(9, doc.to_dict().get('10'))

    else:
        print('No such document!')

    return paths

# When a module connects
def connect_module(client_socket):
    request = client_socket.recv(10)
    modules[int(request)] = request                        # Insert this module into the dictionary
    
    while True:                                            # Keep listening for the module to request path. 
        handle_module(client_socket)
        if not int(request) in modules:                    # If the module is deleted during the handle_module process, stop the process for that connection
            break

# 
def close_connection(i):
    modules[i].close()                                     # Disconnect the modules
    modules.pop(i)

# 
def handle_module(client_socket):
    request = client_socket.recv(1024)                     # The client sends the user's spoken word
    request = str(request)                                 # Convert the input from binary to string

    # Go through each of the modules in the path
    module_path = path[request]

    for i in module_path:
        trial = 0
        while True:
            modules[i].send(b'b')                              # Send the letter 'b' to all the modules in the path to the destination to beep
            request = modules[i].recv(10)                      # Wait for the module to acknowledge that it sent 
            
            # Try three times to send data to module. If it fails all three times, remove it from list of connected modules and move on
            if(len(request) == 0):
                trial+=1
            elif(len(request) == 0 and trial == 3):
                close_connection(i)
                break
            else:
                break


# Wait for one of the modules to send send location 
if __name__ == "main":
    firestore_db = firestore.client()
    # Document reference
    doc_ref = firestore_db.collection('paths')
    doc = doc_ref.get()
    for i in range(0, doc.to_dict().get('total')):
        path[i] = get_paths(i)

    while True:
        client, addr = serv.accept()
        client_handler = threading.Thread(target=connect_module, args=(client,))
        client_handler.start()
