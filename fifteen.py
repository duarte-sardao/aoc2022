import re

lim = 20
ranges = {}

def thebigapple(xo, yo, xt, yt):
    return abs(xo-xt) + abs(yo-yt)



def fillout(pos,dist):
    for i in range(pos[0]-dist,pos[0]+dist+1):
        if(i < 0 or i > lim):
            continue
        diff = abs(i-pos[0])
        limback = max(0, pos[1]-dist+diff)
        limfront = min(lim, pos[1]+dist-diff)
        if(i == 14):
            print(str(limback) + " " + str(limfront))
        try:
            update = False
            for j in range(len(ranges[i])):
                rng = ranges[i][j]
                if(limback >= rng[0] and limfront <= rng[1]):
                    update = True
                    break
                elif(limback < rng[0] and limfront > rng[1]):
                    ranges[i][j] = (limback, limfront)
                    update = True
                    break
                elif(limback < rng[0] and limfront <= rng[1] and limfront >= rng[0]):
                    ranges[i][j] = (limback, rng[1])
                    update = True
                    break
                elif(limback >= rng[0] and limback <= rng[1] and limfront > rng[1]):
                    ranges[i][j] = (rng[0], limfront)
                    update = True
                    break
            if(not update):
                ranges[i].append((limback,limfront))
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

print(ranges)
