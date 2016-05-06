function r(f) {
  /in/.test(document.readyState) ? setTimeout("r(" + f + ")", 9) : f()
}
r(function() {
  var page = document.getElementsByClassName("page")[0];
  var headerLogo = document.getElementsByClassName("header-logo")[0];
  var headerMedia = document.getElementsByClassName("header-media")[0];
  var headerMediaToggle = () => {
    if (page.style.top === "-62px") {
      page.style.top = "0";
    }
    else {
      page.style.top = "-62px";
    }
  };

  headerLogo.onclick = headerMediaToggle;
});
