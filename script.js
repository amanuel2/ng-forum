(function(angular) {
  var app = angular.module('ForumApp' ,

/*

RELEASE 1.0 CODE CHANGES : https://github.com/amanuel2/ng-forum/commit/bfa46d42108b400c6b2c0c814ec1960e88a659aa
                Release 1.1
              ----------------
DO NOT FORGET TO CHANGE DATABASE WHEN PUSH TO GITHUB! https://uniquecoders.firebaseio.com/

BACKEND
--------
TODO : FIX REPLYNUM
TODO : <paper-data-table> http://david-mulder.github.io/paper-datatable/components/paper-datatable/demo/miscellaneous/theming.html
TODO : REPLY SO IT HAS MARKDOWN..... LIKE TOPICS.. JUST COPY IT.
TODO : SETTINGS NEED HELP ON OAuth
TODO : BOOKMARK,,BEST ANWSER, ....... Like button
TODO : FLAG = PRIVATEMESSAGING
TODO : IMGUR CONVERSIOIN BASE64
TODO : Notifications
TODO : Points
TODO : LOCALIZE, NO URL.
TODO : ADD CACHE IMAGES COMPRESSION
TODO: MOD Rights (Edit all posts, title etc.)
TODO : @name , and #topic
TODO: Add Email to share. (may need to be put for later releases)
FRONTEND
---------
TODO : ONLINE ICON PROFILE
TODO : FIX DESCRIPTON IN PROFILE PAGE
TODO : RESELOUTION PROFILE AVATAR IN PROFILE PAGE
TODO: 404 PAGE
TODO : FIREFOX HOME PAGE ICONS ARE OFF.
TODO : global.css chars
TODO : Fix textbox so it is center
TODO : FIX VERTICAL SCROLL PROFILE.HTML
TODO:i think we need a class for .avatar because its the same everywhere
TODO : add a word-break to 'create a new topic'

BACKEND AND FRONTENDs
---------------
TODO: Add Drag Drop Image upload 
TODO: Add settings to Profile (Allow to open from)

-------LATER RELEASES IDEAS--------
TODO : SESSIONS, for POEPLE TO WORK COLLABORATIVELY
TODO : We need to think about loading a css file before loading a content from .html file


AGENDA SHIMM
------
Profile
WHAT IS WRONG WITH FAILING TO LOAD IMAGES ON CONSOLE EVERY TIME
TOURING
TTABLE LISTING


             ----------------
*/
   [
      //Deps
        'ui.router',
        'ngMaterial',
        'firebase',
        'ngMessages',
        'material.svgAssetsCache',
        'ngMdIcons',
        'mdDataTable',
        'md.data.table',
        'vcRecaptcha',
        'angularScreenfull',
        'selectize',
        'ui.markdown',
        '720kb.socialshare'
    ]
    
)


})(angular);
