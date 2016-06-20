(function(angular) {
    var app = angular.module('ForumApp')

    app.service('encodeImageToBase64', ['replyService', encodeImageToBase64]);
    
    function b64toBlob(b64, onsuccess, onerror) {
    var img = new Image();

    img.onerror = onerror;

    img.onload = function onload() {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(onsuccess);
    };

    img.src = b64;
}

    function encodeImageToBase64(replyService) {

        this.encode = function(document, file, ref, UID) {

            if (file.length > 0) {
                var fileToLoad = file[0];
                var fileReader = new FileReader();

                fileReader.onload = function(fileLoadedEvent) {
                    var srcData = fileLoadedEvent.target.result; // <--- data: base64
                   


b64toBlob(srcData,
    function(blob) {
        var url = window.URL.createObjectURL(blob);
        
        ref.child("UserAuthInfo").child(UID).update({
                              Image: srcData
                     })
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
                             childSnapshot.forEach(function(EvenChild){
                                 var keyNest = EvenChild.key();
                                 var childDataNest = EvenChild.val();
                                 if(childDataNest.replyCreatorUID == UID){
                                   ref.child("Replies").child(key).child(childDataNest.pushKey).update
                                     ({
                                         replyCreatorAvatar : srcData                   
                                     })
                                 }
                             })
                         })
                     })
        
        
    }, function(error) {
        // handle error
    });
                    return srcData;
                }

                fileReader.readAsDataURL(fileToLoad);
            }

        }

    }
})(angular);