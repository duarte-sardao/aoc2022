#include <fstream>
#include <iostream>
#include <vector>
#include <string>
#include <bits/stdc++.h>
#include <map>

using namespace std;

int contains(int x1, int x2, int y1, int y2) {
	if ((x1 <= x2 && y1 >= y2) || x2 <= x1 && y2 >= y1)
		return 1;
	return 0;
}

int overlaps(int x1, int x2, int y1, int y2) {
	if ((y1 < x2) || (y2 < x1))
		return 0;
	return 1;
}

int main() {
	std::ifstream in;
	in.open("input.txt");
	int score = 0;
	while (!in.eof()) {
		std::string s;
		std::getline(in, s);
		if (s == "")
			break;
		std::stringstream  data(s);

		string x1, y1, x2, y2;

		std::getline(data, x1, '-');
		std::getline(data, y1, ',');
		std::getline(data, x2, '-');
		std::getline(data, y2);

		//cout << x1 << " " << y1 << " " << x2 << " " << y2 << std::endl;
		//score += contains(stoi(x1), stoi(x2), stoi(y1), stoi(y2));
		score += overlaps(stoi(x1), stoi(x2), stoi(y1), stoi(y2));

	}
	std::cout << score;
	return 0;
}