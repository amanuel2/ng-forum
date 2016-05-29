(function(angular) {
    var app = angular.module('ForumApp')

    app.service('encodeImageToBase64',['replyService', encodeImageToBase64]);

    function encodeImageToBase64(replyService) {

        this.encode = function(document, file, ref, UID) {

            if (file.length > 0) {
                var fileToLoad = file[0];
                var fileReader = new FileReader();

                fileReader.onload = function(fileLoadedEvent) {
                    var srcData = fileLoadedEvent.target.result; // <--- data: base64
                    ref.child("UserAuthInfo").child(UID).update({
                        Image: srcData
                    })
                    //Updating Topics
                    ref.child("Topics").once("value", function(snapshot) {

                        snapshot.forEach(function(childSnapshot) {
                            var key = childSnapshot.key();
                            var childData = childSnapshot.val();
                            if (childData.UID == UID) {
                                ref.child("Topics").child(childData.pushKey).update({
                                    Avatar: srcData
                                })
                            }
                        })
                    })
                    
                    ref.child("Replies").once("value", function(snapshot) {

                        snapshot.forEach(function(childSnapshot) {
                            var key = childSnapshot.key();
                            var childData = childSnapshot.val();
                            //ID NESTING
                            childSnapshot.forEach(function(EvenChild){
                                var keyNest = EvenChild.key();
                                var childDataNest = EvenChild.val();
                                if(childDataNest.replyCreatorUID == UID){
                                    //JackPot
                                   console.log(key)
                                   console.log(childDataNest.pushKey)
                                  ref.child("Replies").child(key).child(childDataNest.pushKey).update
                                    ({
                                        replyCreatorAvatar : srcData                   
                                    })
                                }
                            })
                            //ref.child("Replies").child()
                        })
                    })
                    return srcData;
                }

                fileReader.readAsDataURL(fileToLoad);
            }

        }

    }
})(angular);