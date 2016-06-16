(function(angular){
    
    var app = angular.module('ForumApp')
    
    app.service('letterAvatarService', ['$http',letterAvatarServiceFunc])
    
    function letterAvatarServiceFunc($http){
        
        this.letters = {
	"letters": {

		"a": {
			"letter": "A",
			"URL": "http://imgur.com/fmJfhIO.png"
		},

		"b": {
			"letter": "B",
			"URL": "http://imgur.com/TAZ9VPU.png"
		},

		"c": {
			"letter": "C",
			"URL": "http://imgur.com/yyxf8Xa.png"
		},

		"d": {
			"letter": "D",
			"URL": "http://imgur.com/t3WVsh0.png"
		},

		"e": {
			"letter": "E",
			"URL": "http://imgur.com/Pe4sgjI.png"
		},

		"f": {
			"letter": "F",
			"URL": "http://imgur.com/6T8Bgeq.png"
		},
		"g": {
			"letter": "G",
			"URL": "http://imgur.com/BGsTWtG.png"
		},
		"h": {
			"letter": "H",
			"URL": "http://imgur.com/o5K40Jd.png"
		},
		"i": {
			"letter": "I",
			"URL": "http://imgur.com/sdt7apQ.png"
		},
		"j": {
			"letter": "J",
			"URL": "http://imgur.com/msHLCHR.png"
		},
		"k": {
			"letter": "K",
			"URL": "http://imgur.com/eoAJeWD.png"
		},
		"l": {
			"letter": "L",
			"URL": "http://imgur.com/zMVTSnK.png"
		},
		"m": {
			"letter": "M",
			"URL": "http://imgur.com/IDCb4on.png"
		},
		"n": {
			"letter": "N",
			"URL": "http://imgur.com/8AxVHBb.png"
		},
		"o": {
			"letter": "O",
			"URL": "http://imgur.com/cTdwHBz.png"
		},
		"p": {
			"letter": "P",
			"URL": "http://imgur.com/l92WBfJ.png"
		},
		"q": {
			"letter": "Q",
			"URL": "http://imgur.com/R2NdDC0.png"
		},
		"r": {
			"letter": "R",
			"URL": "http://imgur.com/TRBbK6s.png"
		},
		"s": {
			"letter": "S",
			"URL": "http://imgur.com/Yg5pCrN.png"
		},
		"t": {
			"letter": "T",
			"URL": "http://imgur.com/t44cYPo.png"
		},
		"u": {
			"letter": "U",
			"URL": "http://imgur.com/rwe2jHk.png"
		},
		"v": {
			"letter": "V",
			"URL": "http://imgur.com/tEuWVjS.png"
		},
		"w": {
			"letter": "W",
			"URL": "http://imgur.com/4YrkhS9.png"
		},
		"x": {
			"letter": "X",
			"URL": "http://imgur.com/rdCCRVK.png"
		},
		"y": {
			"letter": "Y",
			"URL": "http://imgur.com/IZLfNSA.png"
		},
		"z": {
			"letter": "Z",
			"URL": "http://imgur.com/qarqErq.png"
		}

	},

	"numbers": {

		"0": {
			"number": "0",
			"URL": "http://imgur.com/1rkedvr.png"
		},
		"1": {
			"number": "1",
			"URL": "http://imgur.com/WqINV9y.png"
		},
		"2": {
			"number": "2",
			"URL": "http://imgur.com/ILrgc45.png"
		},
		"3": {
			"number": "3",
			"URL": "http://imgur.com/hO7ULVQ.png"
		},
		"4": {
			"number": "4",
			"URL": "http://imgur.com/7lSq5mn.png"
		},
		"5": {
			"number": "5",
			"URL": "http://imgur.com/7DhaPD3.png"
		},
		"6": {
			"number": "6",
			"URL": "http://imgur.com/vQigaLy.png"
		},
		"7": {
			"number": "7",
			"URL": "http://imgur.com/Mq1EyLj.png"
		},
		"8": {
			"number": "8",
			"URL": "http://imgur.com/fqL6zzY.png"
		},
		"9": {
			"number": "9",
			"URL": "http://imgur.com/aeHrAeS.png"
		}

	},

	"Mystery": "http://imgur.com/mM5vPqB.png"
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