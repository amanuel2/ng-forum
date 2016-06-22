(function (angular) {

    angular.module('ForumApp', [
            //Deps
            'ui.router',
            'ngMaterial',
            'firebase',
            'ngMessages',
            'ngMdIcons',
            'ngSanitize',
            'vcRecaptcha',
            'angularScreenfull',
            'LocalStorageModule',
            '720kb.socialshare'
        ]
    );
})(angular);
/*
 Release 1.1
 ----------------
 PRODUCTION MODE DATABASE - https://uniquecoders.firebaseio.com/
 DEVELOPMENT MODE DATABASE - https://uniquecodersforums.firebaseio.com/

 POINTS
 ---------------
 Points Change----|
 |__ Lower-----------|
 |__ Higher---|      |__ TOPIC DOWNVOTE
 |___ TOPIC UPVOTE
 |___ REPLY LIKE
 |___ REPLY BEST_ANWSER


 TECHNIQUE:

 CHANGE DATABASE DIFFRENT SYSTEM. DONT
 CHANGE ACTUAL POINTS TO STOP HIJACK OF POINTS.

 LIKESOBJ-----
 |___UID___
 |__ +{POINT} , -{POINT}



 BACKEND
 --------
 Aman
 ------
 TODO : DISCOURSE REPLY BAR
 TODO : PROFILE
 TODO : BADGES
 TODO : TOURING
 TODO: Add Drag Drop Image upload
 TODO : OTHERUSERPROFILEPAGE
 TODO : PRIVATE MESSAGE/PUBLIC
 TODO : FLAG = PRIVATE MESSAGING MODERATORS
 TODO : Notifications
 TODO: Online icon profile
 TODO : SESSIONS
 TODO : CHATS
 
 Kyle
 -----
 TODO : FIX DESCRIPTON IN PROFILE PAGE
 TODO: LOADING SCREEN.. <-- NEED TO FIX AND SHOW ME HOW TO MAKE RESPONSIVE
 TODO : NEW TOPIC.HTML



 FRONTEND
 ---------$_

 Shim
 ------
 TODO: 404 Page

 Jeff
 -----
 TODO : DOCS .(LATER WE WILL PUT A GUIDE FOR COMPANIES TO USE THIS FORUM)

 BACKEND AND FRONTENDs
 ---------------

 
 -------LATER RELEASES IDEAS--------

 TODO : GZIP
 TODO : SESSIONS, for POEPLE TO WORK COLLABORATIVELY
 TODO : PYTHON INTERPRETOR : http://www.skulpt.org/ PHP: https://phpjs.hertzen.com/console.html. C++: https://ide.c9.io/amanuel2/ruby_interpreator_in_js#openfile-README.md


 HELPERS
 -----
 LAYOUTS
 ------
 SETTINGS : http://cdn1.tnwcdn.com/wp-content/blogs.dir/1/files/2016/01/MD3.png
 Forum MAterial : http://www.one-click-forum.com/live-preview/
 Google Forum Material : https://productforums.google.com/forum/#!topic/docs/FQVnUuzZusQ
 ----------------
 */
