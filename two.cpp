#include <fstream>
#include <iostream>
#include <vector>
#include <string>
#include <bits/stdc++.h>

int pickScore(char me) {
	if (me == 'X')
		return 1;
	if (me == 'Y')
		return 2;
	if (me == 'Z')
		return 3;
}

int playScore(char me, char enemy) {
	if ((me == 'X' && enemy == 'C') || (me == 'Y' && enemy == 'A') || (me == 'Z' && enemy == 'B'))
		return 6;
	if ((me == 'X' && enemy == 'A') || (me == 'Y' && enemy == 'B') || (me == 'Z' && enemy == 'C'))
		return 3;
	return 0;
}

int chooserScore(char me, char enemy) {
	int tot = 0;
	if (me == 'Y') {
		tot += 3;
	}
	else if (me == 'Z') {
		tot += 6;
	}
	if ((enemy == 'A' && me == 'Y') || (enemy == 'B' && me == 'X') || (enemy == 'C' && me == 'Z')) {
		tot += 1;
	}
	else if ((enemy == 'B' && me == 'Y') || (enemy == 'C' && me == 'X') || (enemy == 'A' && me == 'Z')) {
		tot += 2;
	}
	else {
		tot += 3;
	}
	return tot;
}

int main() {
	std::ifstream in;
	in.open("input.txt");
	int score = 0;
	std::vector<int> res;
	while (!in.eof()) {
		std::string neww;
		std::getline(in, neww);
		char enemy = neww[0];
		char me = neww[2];
		if (neww.length() != 3)
			continue;

		//std::cout << neww << " ";
		//std::cout << pickScore(me) << " ";
		//std::cout << playScore(me, enemy) << std::endl;
		
		//score += pickScore(me);
		//score += playScore(me, enemy);
		//std::cout << chooserScore(me, enemy) << std::endl;
		score += chooserScore(me, enemy);
	}
	std::cout << score;
	return 0;
}