(function(angular){
    
    var app = angular.module('ForumApp')
    
    app.service('letterAvatarService', ['$http',letterAvatarServiceFunc])
    
    function letterAvatarServiceFunc($http){
        
        this.letters = {
	"letters": {

		"a": {
			"letter": "A",
			"URL": "https://i.imgsafe.org/80702e6a48.png"
		},

		"b": {
			"letter": "B",
			"URL": "https://i.imgsafe.org/8071bc0a44.png"
		},

		"c": {
			"letter": "C",
			"URL": "https://i.imgsafe.org/8074bcecd7.png"
		},

		"d": {
			"letter": "D",
			"URL": "https://i.imgsafe.org/8076021adb.png"
		},

		"e": {
			"letter": "E",
			"URL": "https://i.imgsafe.org/8076c1e58c.png"
		},

		"f": {
			"letter": "F",
			"URL": "https://i.imgsafe.org/8077d37398.png"
		},
		"g": {
			"letter": "G",
			"URL": "https://i.imgsafe.org/8078c68317.png"
		},
		"h": {
			"letter": "H",
			"URL": "https://i.imgsafe.org/807961a8bd.png"
		},
		"i": {
			"letter": "I",
			"URL": "https://i.imgsafe.org/8079fcc67d.png"
		},
		"j": {
			"letter": "J",
			"URL": "https://i.imgsafe.org/807a8d7f0f.png"
		},
		"k": {
			"letter": "K",
			"URL": "https://i.imgsafe.org/807b86c6f3.png"
		},
		"l": {
			"letter": "L",
			"URL": "https://i.imgsafe.org/807c95d97d.png"
		},
		"m": {
			"letter": "M",
			"URL": "https://i.imgsafe.org/807e3ac2d8.png"
		},
		"n": {
			"letter": "N",
			"URL": "https://i.imgsafe.org/807f4f28f3.png"
		},
		"o": {
			"letter": "O",
			"URL": "https://i.imgsafe.org/80804f11ee.png"
		},
		"p": {
			"letter": "P",
			"URL": "https://i.imgsafe.org/808141e6d7.png"
		},
		"q": {
			"letter": "Q",
			"URL": "https://i.imgsafe.org/8081fc5643.png"
		},
		"r": {
			"letter": "R",
			"URL": "https://i.imgsafe.org/8082bc920e.png"
		},
		"s": {
			"letter": "S",
			"URL": "https://i.imgsafe.org/808407a7c8.png"
		},
		"t": {
			"letter": "T",
			"URL": "https://i.imgsafe.org/80850ef5bc.png"
		},
		"u": {
			"letter": "U",
			"URL": "https://i.imgsafe.org/8085d081ef.png"
		},
		"v": {
			"letter": "V",
			"URL": "https://i.imgsafe.org/8086a80704.png"
		},
		"w": {
			"letter": "W",
			"URL": "https://i.imgsafe.org/80876e07ac.png"
		},
		"x": {
			"letter": "X",
			"URL": "https://i.imgsafe.org/808811fc04.png"
		},
		"y": {
			"letter": "Y",
			"URL": "https://i.imgsafe.org/8088daddd7.png"
		},
		"z": {
			"letter": "Z",
			"URL": "https://i.imgsafe.org/8089ce1ead.png"
		}

	},

	"numbers": {

		"0": {
			"number": "0",
			"URL": "https://i.imgsafe.org/808b5e9427.png"
		},
		"1": {
			"number": "1",
			"URL": "https://i.imgsafe.org/808c31726a.png"
		},
		"2": {
			"number": "2",
			"URL": "https://i.imgsafe.org/808e69280f.png"
		},
		"3": {
			"number": "3",
			"URL": "https://i.imgsafe.org/808f82b8e4.png"
		},
		"4": {
			"number": "4",
			"URL": "https://i.imgsafe.org/8090c37df7.png"
		},
		"5": {
			"number": "5",
			"URL": "https://i.imgsafe.org/809177bd5e.png"
		},
		"6": {
			"number": "6",
			"URL": "https://i.imgsafe.org/809295a3dc.png"
		},
		"7": {
			"number": "7",
			"URL": "https://i.imgsafe.org/80938a0f43.png"
		},
		"8": {
			"number": "8",
			"URL": "https://i.imgsafe.org/809490f006.png"
		},
		"9": {
			"number": "9",
			"URL": "https://i.imgsafe.org/8095cb42bd.png"
		}

	},

	"Mystery": "https://i.imgsafe.org/80971f0be0.png"
};
          
            
            
        this.loadJSON = function(){
            $http.get('services/assets/json/letterJSON.json').then(function(value) {
                this.letters = value.data
            })
        }    
        
        this.logLetter = function(){
            console.log(this.letters);
        }
        this.getLetterURL = function(string,loaderData){
            
                  var char = string.charAt(0);
                    var len = 0;
                    var lenNum = 0;
                    var URLVALUE = '';
                    
                    for(var i in this.letters.letters){
                        len++;
                        if(i == (char.toLowerCase())){
                            URLVALUE = this.letters.letters[i].URL;
                        }
                    }
                    
                    for(var i in this.letters.numbers){
                        lenNum++;
                        if(i == (char)){
                            URLVALUE = this.letters.numbers[i].URL;
                        }
                    }
                    
                    if(!URLVALUE){
                        URLVALUE = this.letters.Mystery
                    }
                    
                    return URLVALUE;
            
            
            

        }    
    
    }
})(angular);