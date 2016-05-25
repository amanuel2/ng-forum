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
                            if (childData.UID = UID) {
                                ref.child("Topics").child(childData.pushKey).update({
                                    Avatar: srcData
                                })
                            }
                        })
                    })
                    
                    //Updating Replies. TODO: WILL DO THIS LATER
                    /*ref.child("Replies").once("value", function(snapshot) {

                        snapshot.forEach(function(childSnapshot) {
                            var key = childSnapshot.key();
                            var childData = childSnapshot.val();
                            childSnapshot.forEach(function(evenChildSnapshot) {
                                var keyC = evenChildSnapshot.key();
                                var childDataC = evenChildSnapshot.val();
                                console.log(childDataC)
                                   if(childDataC.replyCreatorUID == UID){
                                       ref.child("Topics").once("value", function(snapshotKRE) {

                                            snapshot.forEach(function(childSnapshot) {
                                                var keyToppic = snapshotKRE.key();
                                                var childDataToppic = snapshotKRE.val();
                                                
                                                console.log(childDataToppic)
                                                console.log(childDataToppic.replyCreatorUID + "VS" , UID);
                                                console.log(childDataToppic.Title , "VS" + childDataC.topicCreatorTitle);
                                                if(childDataToppic.replyCreatorUID == UID && childDataToppic.Title == childDataC.topicCreatorTitle){
                                                    console.log("TOPIC JACKOPOIT")
                                                }
                                            })
                                       })
                                            /*ref.child("Replies").child(replyService.creatorUsername + replyService.creatorDate).child(childDataC.pushKey).update({
                                                   replyCreatorAvatar : srcData     
                                            })*/
                                     }
                            })
                        })
                    })*/
                    return srcData;
                }

                fileReader.readAsDataURL(fileToLoad);
            }

        }

    }
})(angular);