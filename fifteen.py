import re

lim = 4000000
ranges = {}

def thebigapple(xo, yo, xt, yt):
    return abs(xo-xt) + abs(yo-yt)

def update_range(ranges, limback, limfront):
    update = False
    for j in range(len(ranges)):
        rng = ranges[j]
        if(limback >= rng[0] and limfront <= rng[1]):
            update = True
            break
        elif(limback < rng[0] and limfront > rng[1]):
            ranges[j] = (limback, limfront)
            update = True
            break
        elif(limback < rng[0] and limfront <= rng[1] and limfront >= rng[0]-1):
            ranges[j] = (limback, rng[1])
            update = True
            break
        elif(limback >= rng[0] and limback <= rng[1]+1 and limfront > rng[1]):
            ranges[j] = (rng[0], limfront)
            update = True
            break
    if(not update):
        ranges.append((limback,limfront))
    return ranges

def fillout(pos,dist):
    for i in range(pos[0]-dist,pos[0]+dist+1):
        if(i < 0 or i > lim):
            continue
        diff = abs(i-pos[0])
        limback = max(0, pos[1]-dist+diff)
        limfront = min(lim, pos[1]+dist-diff)
        try:
            ranges[i] = update_range(ranges[i],limback, limfront)
        except KeyError:
            ranges[i] = [(limback,limfront)]


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


for i in range(len(s)):
    blah = s[i]
    dist = thebigapple(blah[0],blah[1],blah[2],blah[3])
    fillout((blah[0],blah[1]),dist)

def get_code(key, lst):

    baaah = min(lst[0][1]+1, lst[1][1]+1)
    print("It's at " + str(key)+ " "+str(baaah))
    print(key*4000000+baaah)

for key in ranges:
    print(key)
    curlen = len(ranges[key])
    start = ranges[key]
    while(True):
        if(len(ranges[key]) == 1):
            break
        first = ranges[key][0]
        ranges[key] = ranges[key][1:]
        ranges[key] = update_range(ranges[key],first[0],first[1])
        nlen = len(ranges[key])
        if(curlen == 2 and nlen == 2):
            get_code(key, ranges[key])
            break
        else:
            curlen = nlen
    if(curlen == 2):
        break
