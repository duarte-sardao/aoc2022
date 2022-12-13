import json

score = 0

def compare(position, p1, p2):
    siz = min(len(p1), len(p2))
    for i in range(siz):
        it1 = p1[i]
        it2 = p2[i]
        if(type(it1) is int and type(it2) is int):
            if it1 < it2:
                return position
            elif it1 > it2:
                return 0
        elif(type(it1) is list and type(it2) is list):
            ret = compare(position, it1, it2)
            if(ret != -1):
                return ret
        else:
            if(type(it1) is int):
                it1 = [it1]
            else:
                it2 = [it2]
            ret = compare(position, it1, it2)
            if(ret != -1):
                return ret
    
    if(len(p1) == len(p2)):
        return -1
    elif(len(p1) > len(p2)):
        return 0
    else:
        return position

with open('input.txt', 'r') as f:
    s = list(map(json.loads, list(filter(None, f.read().strip().split('\n')))))

for i in range(0,len(s), 2):
    p1 = s[i]
    p2 = s[i+1]
    print("Comparing " + str(p1) + " and " + str(p2))
    res = compare(int(i/2+1), p1, p2)
    print("In order " + str(res))
    score += res

print(score)