occupation = set() #no im just visiting
bottom = 0

def fill_vert(init, end):
    
    for i in range(min(init[1],end[1]),max(init[1],end[1])+1):
        occupation.add((init[0], i))

def fill_hori(init, end):
    for i in range(min(init[0],end[0]),max(init[0],end[0])+1):
        occupation.add((i, init[1]))

def get_occupied(s):
    global bottom
    global occupation
    bottom = 0
    occupation = set()
    for i in range(len(s)):
        line = s[i]
        for j in range(len(line)-1):
            init = line[j]
            end = line[j+1]
            if(init[0] == end[0]):
                fill_vert(init, end)
            else:
                fill_hori(init, end)
            if(init[1] > bottom):
                bottom = init[1]

def collided(pos):
    return pos in occupation or pos[1] == bottom+2

def down(pos):
    return (pos[0],pos[1]+1)
def left(pos):
    return (pos[0]-1,pos[1]+1)
def right(pos):
    return (pos[0]+1,pos[1]+1)

def drop_sand(bottomless):
    dropped = 0
    while(True):
        pos = (500,0)
        canMove = True
        while(canMove):
            if(bottomless and pos[1] > bottom):
                return dropped
            d = down(pos)
            if(not collided(d)):
                pos = d
                continue
            l = left(pos)
            if(not collided(l)):
                pos = l
                continue
            r = right(pos)
            if(not collided(r)):
                pos = r
                continue
            canMove = False
        occupation.add(pos)
        dropped += 1
        if(pos == (500,0)):
            return dropped
        
    return 0


with open('input.txt', 'r') as f:
    s = list(map(lambda x: list(map(lambda x: list(map(lambda x: int(x), x.split(','))), x.split(' -> '))), f.read().strip().split('\n'))) #lol

get_occupied(s)
print(drop_sand(True))
get_occupied(s)
print(drop_sand(False))