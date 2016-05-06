(function(angular){
    var app = angular.module('ForumApp')
    app.service('hashService', [hashService])
    function hashService(){
        
        this.CryptoMD5 = function(text,amount){
            var hash = CryptoJS.MD5(text).words[amount]
            return hash;
        }
        this.HmacMD5 = function(text,key,amount){
            var hash = CryptoJS.HmacMD5(text,key).words[amount]
            return hash;
        }
        this.encryptHEXPARSE = function(text){
            var hash = CryptoJS.enc.Hex.parse(text)
            return hash;
        }
        this.encryptHEXSTRINGFY = function(encodingHex){
            var text = CryptoJS.enc.Hex.stringify(encodingHex)
            return text;
        }
        this.encryptLATINPARSE = function(text){
            var hash = CryptoJS.enc.Latin1.parse(text)
            return hash;
        }
        this.encryptLATINSTRINGFY = function(encodingHex){
            var text = CryptoJS.enc.Latin1.stringify(encodingHex)
            return text;
        }
        this.encryptUTF8PARSE = function(text){
            var hash = CryptoJS.enc.Utf8.parse(text)
            return hash;
        }
        this.encryptUTF8STRINGFY = function(encodingHex){
            var text = CryptoJS.enc.Utf8.stringify(encodingHex)
            return text;
        }
        this.AESCrypt = function(text,keyHEX,ivHEX){
             var key = CryptoJS.enc.Hex.parse('36ebe205bcdfc499a25e6923f4450fa8');
             var iv = CryptoJS.enc.Hex.parse('be410fea41df7162a679875ec131cf2c');
              var encrypted = CryptoJS.AES.encrypt(
              text,
              key,
              {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
              }
            );
            return (encrypted.toString());
        }
        
        this.AESdyc = function(encrypted,keyHEX,ivHEX){
          var key = CryptoJS.enc.Hex.parse('36ebe205bcdfc499a25e6923f4450fa8');
            var iv  = CryptoJS.enc.Hex.parse('be410fea41df7162a679875ec131cf2c');
            var decrypted = CryptoJS.AES.decrypt(
              encrypted,
              key,
              {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
              }
            );
            return (decrypted.toString(CryptoJS.enc.Utf8));
        }
        
    }
})(angular);