#include<iostream>
#include<string>

template<class T>
class Randomizer {
public:
	Randomizer(T num1, T num2):_NUM1(num1), _NUM2(num2){}
	T getRandom();
private:
	T _NUM1, _NUM2;
};

template<class T>
T Randomizer<T>::getRandom() {
	return(rand() % _NUM1 + _NUM2);
}

int main() {
	/*Randomizer Code:
	**Question : <http://stackoverflow.com/questions/37092913/if-vs-ifndef-vs-ifdef?noredirect=1>
	**01101110 or 110 = πάντα ῥεῖ
	**01101011 or 107 = tobi303*/
	std::string str;
	std::string winner;



	Randomizer<long> randomCode(01101110, 01101011);
	long randomNumber = randomCode.getRandom();
	std::cout << "RANDOM NUMBER" << randomNumber << std::endl;
	switch (randomNumber) {
		case 01101110:
			winner = "πάντα ῥεῖ";
			std::cout << "WINNER IS " << winner;

			break;
		case 01101011:
			winner = "tobi303";
			std::cout << "WINNER IS " << winner;
			break;

		default:
			if (randomNumber > 5000) {
				winner = "πάντα ῥεῖ";
				std::cout << "WINNER IS " << winner;
			}
			else {
				winner = "tobi303";
				std::cout << "WINNER IS " << winner;
			}
	}
    std::cin >> str;
}
