import re

y = 2000000
impossible = set()

def thebigapple(xo, yo, xt, yt):
    return abs(xo-xt) + abs(yo-yt)

def fillout(pos,dist):
    moved = 0
    for i in range(0,dist+1):
        if(pos[1]+i == y or pos[1]-i == y):
            for j in range(0,dist+1-moved):
                if(pos[1]+i == y):
                    impossible.add((pos[0]+j,pos[1]+i))
                    impossible.add((pos[0]-j,pos[1]+i))
                if(pos[1]-i == y):
                    impossible.add((pos[0]+j,pos[1]-i))
                    impossible.add((pos[0]-j,pos[1]-i))
        moved += 1

def find_numbers(string, ints=True):    #cheating?        
    numexp = re.compile(r'[-]?\d[\d,]*[\.]?[\d{2}]*') #optional - in front
    numbers = numexp.findall(string)    
    numbers = [x.replace(',','') for x in numbers]
    if ints is True:
        return [int(x.replace(',','').split('.')[0]) for x in numbers]            
    else:
        return numbers

with open('input.txt', 'r') as f:
    s = list(map(lambda x: find_numbers(x), f.read().strip().split('\n')))

#s = [[8,7,2,10]]

for i in range(len(s)):
    blah = s[i]
    dist = thebigapple(blah[0],blah[1],blah[2],blah[3])
    fillout((blah[0],blah[1]),dist)

for i in range(len(s)):
    blah = s[i]
    try:
        impossible.remove((blah[2], blah[3]))
    except:
        continue


print(len(impossible))

