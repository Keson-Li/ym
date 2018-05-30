import random
def ramdomPlaceCar(door):
    r = random.randint(0, len(door)-1)
    door[r]= 1
    return door

def ramdomPick():
    r = random.randint(0, 2)
    return r

def findEmpty(door,pickedP):
    if pickedP == 0:
        if door[1] == 0:
            return 1
        else:
            return 2
    
    if (pickedP == 1):
        if(door[0] == 0):
            return 0
        else:
            return 2

    if (pickedP == 2):
        if(door[0] == 0):
            return 0
        else:
            return 1

def isWin(door, destination):
    if door[destination] == 1:
        return True
    else:
        return False

def swap(picked, empty):
    door = [0,1,2]
    door.remove(picked)
    door.remove(empty)
    destination = door[0]
    return destination





    
def play():
    i=0
    j=0
    k=0
    while i < 1000000:
        hall1 = [0,0,0]
        hall2 = [0,0,0]
        door1 = ramdomPlaceCar(hall1)
        door2 = ramdomPlaceCar(hall2)
        pickPosition1 = ramdomPick()
        pickPosition2 = ramdomPick()
        if isWin(door1, pickPosition1):
            j += 1
        emptydoor = findEmpty(door2, pickPosition2)
        destination = swap(pickPosition2, emptydoor)
        if isWin(door2, destination):
            k += 1
        i += 1
    print('no swaping win ' + str(j/10000) + ' times.')
    print('with swaping win ' + str(k/10000) + ' times.')



play()