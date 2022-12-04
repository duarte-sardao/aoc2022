#include <fstream>
#include <iostream>
#include <vector>
#include <string>
#include <bits/stdc++.h>

int main() {
	std::ifstream in;
	in.open("input.txt");
	int cur = 0;
	std::vector<int> res;
	while (!in.eof()) {
		std::string neww;
		std::getline(in, neww);
		if (neww.length() == 0) {
			res.push_back(cur);
			cur = 0;
			continue;
		}
		cur += std::stoi(neww);
	}
	std::sort(res.begin(), res.end(), std::greater<int>());
	int sum = 0;
	for (int i = 0; i < 3; i++) {
		sum += res[i];
	}
	std::cout << sum;
	return 0;
}