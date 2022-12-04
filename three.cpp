#include <fstream>
#include <iostream>
#include <vector>
#include <string>
#include <bits/stdc++.h>
#include <map>

int getNumber(char c) {
	int val = int(c);
	if (val <= 90)
		val -= 38;
	else if (val <= 122) {
		val -= 96;
	}
	std::cout << c << " " << val << std::endl;
	return val;
}


int main() {
	std::ifstream in;
	in.open("input.txt");
	int score = 0;
	while (!in.eof()) {
		std::string s;
		std::getline(in, s);

		std::map<char, int> occ;

		for (int i = 0; i < s.length(); i++) {
			occ[s[i]] = 1;
		}
		std::getline(in, s);
		for (int i = 0; i < s.length(); i++) {
			if (occ[s[i]] == 1)
				occ[s[i]] = 2;
		}
		std::getline(in, s);
		for (int i = 0; i < s.length(); i++) {
			if (occ[s[i]] == 2) {
				score += getNumber(s[i]);
				break;
			}
		}
	}
	std::cout << score;
	return 0;
}

/**int main() {
	std::ifstream in;
	in.open("input.txt");
	int score = 0;
	while (!in.eof()) {
		std::string s;
		std::getline(in, s);
		std::string half = s.substr(0, s.length() / 2);
		std::string otherHalf = s.substr(s.length() / 2);

		std::map<char, int> occ;

		for (int i = 0; i < half.length(); i++) {
			occ[half[i]]++;
		}
		for (int i = 0; i < half.length(); i++) {
			if (occ[otherHalf[i]] != 0) {
				score += getNumber(otherHalf[i]);
				occ[otherHalf[i]] = 0;
			}
		}
	}
	std::cout << score;
	return 0;
}**/