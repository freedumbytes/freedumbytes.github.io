(function($) {
  includeGenericNavigation();
  includeLatestGameStatistics();
  includeCurrentGameScoreSheet();
  includeGenericFooter();
  copyrightPeriod();
  createVideoModalTriggers();

  $(window).on('load', function () {
    generatedIn();
  });
}(jQuery));

function includeGenericNavigation() {
  $("#generic-navigation").load("navigation.xhtml #navigation-container", function() {
    activateCurrentPageMenu();
    removeFixedNavbarsForMobileAndTablet();
  });
}

function activateCurrentPageMenu() {
  var path = window.location.pathname.split("/").pop();

  $('.nav-item>a[href="' + path + '"]').parent().addClass('active');
}

function removeFixedNavbarsForMobileAndTablet() {
  if (viewport().width < 768) {
    $('.navbar').removeClass('navbar-fixed-top');
  }
}

function viewport() {
  var a = 'inner';
  var e = window;

  if (!('innerWidth' in window)) {
    a = 'client';
    e = document.documentElement || document.body;
  }

  return {
    width : e[a + 'Width'],
    height : e[a + 'Height']
  };
}

function includeLatestGameStatistics() {
  $("#latest-game-statistics").load("game-statistics.xhtml #game-statistics-card", function() {
  });

  $("#latest-game-stats-legenda").load("game-statistics.xhtml #game-stats-legenda-card", function() {
  });
}

function includeCurrentGameScoreSheet() {
  $("#current-game-score-sheet").load("score-sheet.xhtml #score-sheet-container", function() {
  });
}

function includeGenericFooter() {
  $("#generic-footer").load("footer.xhtml #footer-container", function() {
    generatedOn();
    showDisplayOrientation();
    generatedIn();
  });

  $(window).on("orientationchange", function() {
    showDisplayOrientation();
  });
}

function showDisplayOrientation() {
  if (window.orientation == 0) {
    $(".rotate").removeClass("landscape");
  } else {
    $(".rotate").addClass("landscape");
  }
}

function generatedOn() {
  var currentTime = new Date();
  var currentYear = currentTime.getFullYear();
  var currentMonth = addLeadingZeroes(currentTime.getMonth() + 1);
  var currentDay = addLeadingZeroes(currentTime.getDate());
  var currentHours = addLeadingZeroes(currentTime.getHours());
  var currentMinutes = addLeadingZeroes(currentTime.getMinutes());
  var currentSeconds = addLeadingZeroes(currentTime.getSeconds());

  var generatedOn = currentYear + "-" + currentMonth + "-" + currentDay + " "
      + currentHours + ":" + currentMinutes + ":" + currentSeconds;

  $("#generatedOn").html(generatedOn);
}

function addLeadingZeroes(s) {
  return ("0" + s).slice(-2);
}

function generatedIn() {
  if ("performance" in window) {
    if ("timing" in window.performance) {
      var generatedIn = "Page loaded in " + msToTime(window.performance.timing.responseEnd - window.performance.timing.navigationStart) + " and rendered in " + msToTime(window.performance.timing.loadEventStart - window.performance.timing.domLoading) + ".";
      
      $("#generatedIn").html(generatedIn);
    } else {
      $("#generatedIn").html("Page Timing API not supported.");
    }
  } else {
    $("#generatedIn").html("Page Performance API not supported.");
  }
}

function msToTime(duration) {
  if (duration < 0) {
    return "-";
  }

  var milliseconds = parseInt(duration % 1000);
  var seconds = (duration < 1000) ? 0 : parseInt((duration / 1000) % 60);
  var minutes = (duration < 60000) ? 0 : parseInt((duration / (1000 * 60)) % 60);
  var hours = (duration < 3600000) ? 0 : parseInt((duration / (1000 * 60 * 60)) % 24);

  hours = (hours == 0) ? "" : hours + ":";
  minutes = (minutes == 0) ? (hours == 0) ? "" : "00:" : (minutes < 10) ? (hours == 0) ? minutes + ":" : "0" + minutes + ":" : minutes + ":";
  seconds = (seconds == 0) ? (minutes == 0 && hours == 0) ? "0." : "00." : (seconds < 10) ? (minutes == 0 && hours == 0) ? seconds + "." : "0" + seconds + "." : seconds + ".";
  milliseconds = (milliseconds < 10) ? "00" + milliseconds : (milliseconds < 100) ? "0" + milliseconds : milliseconds;

  return hours + minutes + seconds + milliseconds + ((minutes == 0 && hours == 0) ? "s" : "");
}

function copyrightPeriod() {
  var currentTime = new Date();
  var currentYear = currentTime.getFullYear();
  var inceptionYear = "2004";

  if (isNaN(inceptionYear) || (inceptionYear == currentYear)) {
    $("#copyrightPeriod").html(currentYear);
  } else {
    $("#copyrightPeriod").html(inceptionYear + "-" + currentYear);
  }
}

function createVideoModalTriggers() {
  var trigger = $("body").find('[data-toggle="modal"]');

  trigger.click(function() {
    $("#video-container").attr('src', $(this).attr("data-video-src"));
    $("#video-imagery").attr('src', $(this).attr("data-video-img"));
    $("#video-description").html($(this).attr("data-video-desc"));
  });

  $("[id*=video-modal]").on('hidden.bs.modal', function() {
    $("#video-container").removeAttr('src');
  });
}
