(function(angular) {

  var app = angular.module('ForumApp')

  app.controller('authCtrl', ["$scope", "$state", "refService", "$firebaseObject", "hashService", "authCheckTrueService", authCtrl])

  function authCtrl($scope, $state, refService, $firebaseObject, hashService, authCheckTrueService) {
    authCheckTrueService.checkAuth(refService.ref(), "authHome.desc");
  
  //TODO:PROVIDERS
    /*$scope.providerUser = function(providerName){
      refService.ref().authWithOAuthPopup(providerName, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
        }
      });
    }*/
    
    $scope.forgotPass = function(){
      console.log("Hello")
      alertify.prompt(
        'Recover Password',
        'Enter Email Of Account', 
          function(evt, value){
            refService.ref().resetPassword({
              email: value
            }, function(error) {
              if (error) {
                switch (error.code) {
                  case "INVALID_USER":
                    alertify.error("The specified user account does not exist.");
                    break;
                  default:
                    alertify.error("Error resetting password:" + error);
                }
              } else {
                alertify.success("Password reset email sent successfully!");
              }
            });
          }
      );
    }

    $scope.login = function() {
      refService.ref().authWithPassword({
        "email": $scope.user.email,
        "password": $scope.user.password
      }, function(error, authData) {
        if (error) {
          alertify.error(`Error. Tested With Email. If No Green Signs shown, you 
                            have an unsucessfull Authentication`)
          var UsernameLogin = $firebaseObject(refService.ref().child("UserAuthInfo"));
          refService.ref().child("UserAuthInfo").once("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {

              var key = childSnapshot.key();
              var childData = childSnapshot.val();
              if (childData.Username == $scope.user.email) {
                var IV = '36ebe205bcdfc499a25e6923f4450fa8';
                var KEYH = 'be410fea41df7162a679875ec131cf2c';
                var hashedCheck = hashService.AESdyc(childData.Password, KEYH, IV)

                if (hashedCheck == $scope.user.password) {
                  refService.ref().authWithPassword({
                    "email": childData.Email,
                    "password": $scope.user.password
                  }, function(err, authData) {
                    if (err) {
                      alertify.error("Login Failed! " + err)
                    }
                    else {
                      alertify.success("Authenticated successfully");
                      $state.go('authHome');
                    }
                  })
                }
                else {
                  alertify.error("Login Failed! Wrong Password" + error)
                }
              }
              else {
                alertify.error("Login Failed! Wrong Username/Email" + error)
              }

            });
          });

        }
        else {
          alertify.success("Authenticated successfully");
          $state.go('authHome');
        }
      });
    }


    $scope.regissterForm = function() {

      if ($scope.register.terms) {
        refService.ref().createUser({
          email: $scope.register.email,
          password: $scope.register.password
        }, function(error, userData) {
          if (error) {
            switch (error.code) {
              case "EMAIL_TAKEN":
                alertify.error("The new user account cannot be created because the email is already in use.");
                break;
              case "INVALID_EMAIL":
                alertify.error("The specified email is not a valid email.");
                break;
              default:
                alertify.error("Error creating user:", error);
            }
          }
          else {
            var IV = '36ebe205bcdfc499a25e6923f4450fa8';
            var KEY = 'be410fea41df7162a679875ec131cf2c';
            alertify.success("Sucessfully Registered. Now Login!")
            refService.ref().child("UserAuthInfo").child(userData.uid).set({
              Username: $scope.register.username,
              Email: $scope.register.email,
              Password: hashService.AESCrypt($scope.register.password, KEY, IV),
              UID: userData.uid,
              Image: 'http://cs624223.vk.me/v624223037/2b1bb/GRTKddkmXiw.jpg',
              Moderator: false,
              BronzeBadge: 0,
              SilverBadge: 0,
              GoldBadge: 0,
              PlatinumBadge: 0
            })
            $state.go('login');
          }
        });
      }
      else{
        alertify.warning("You Must Accept Terms and Services Before Procceding!")
      }

    }


  }

})(angular);