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
            'selectize',
            'djds4rce.angular-socialshare'
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
 TODO:  @name and #topic
 TODO:  Badges Backend
 TODO : OTHERUSERPROFILEPAGE
 TODO : PRIVATE MESSAGE/PUBLIC
 TODO : FLAG = PRIVATE MESSAGING MODERATORS
 TODO : IMGUsR CONVERSIOIN BASE64
 TODO : Notifications
 Nasr
 Kyle
 -----
 TODO : FIX BUG AUTHOME.HTML
 TODO : BROWSER-SYNC
 TODO : GZIP



 FRONTEND
 ---------

 Shim
 ------
 TODO:FIX AUTH.HTML's NON SHOWING LINES. PLEASE ASK AMANUEL FOR MORE INFO.
 TODO: NEWTOPIC.html, EDITTOPIC, and STUFF LIKE THAT FIX DO NOT FORGET TO Ask AMANUEL FOR MORE INFO PLZ
 TODO: 404 Page
 TODO: Online icon profile
 TODO: LOADING SCREEN.. <-- NEED TO FIX AND SHOW ME HOW TO MAKE RESPONSIVE
 TODO: Badges Front
 Jeff
 -----
 TODO : DOCS .(LATER WE WILL PUT A GUIDE FOR COMPANIES TO USE THIS FORUM)
 TODO: 404 Page
 TODO: Online icon profile
 TODO: LOADING SCREEN.. <-- NEED TO FIX AND SHOW ME HOW TO MAKE RESPONSIVE
 Todo: badges Front
 ALL Frontend
 -----------

 TODO : FIX DESCRIPTON IN PROFILE PAGE
 TODO : RESELOUTION PROFILE AVATAR IN PROFILE PAGE

 TODO : Fix textbox so it is center

 BACKEND AND FRONTENDs
 ---------------
 TODO: Add Drag Drop Image upload
 TODO: Add settings to Profile (Allow to open from)
 TODO: Downvote Best Answer
 TODO: AutoCorrect and Spell Check for editor http://www.javascriptspellcheck.com/

 -------LATER RELEASES IDEAS--------

 TODO : SESSIONS, for POEPLE TO WORK COLLABORATIVELY
 TODO : PYTHON INTERPRETOR : http://www.skulpt.org/ PHP: https://phpjs.hertzen.com/console.html. C++: https://ide.c9.io/amanuel2/ruby_interpreator_in_js#openfile-README.md
 TODO : TOURING


 HELPERS
 -----
 LAYOUTS
 ------
 SETTINGS : http://cdn1.tnwcdn.com/wp-content/blogs.dir/1/files/2016/01/MD3.png
 Forum MAterial : http://www.one-click-forum.com/live-preview/
 Google Forum Material : https://productforums.google.com/forum/#!topic/docs/FQVnUuzZusQ
 ----------------
 */
