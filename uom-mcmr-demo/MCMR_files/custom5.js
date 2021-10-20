$(document).ready(function () {
  ActOnClasses();
  InitialiseVideoPlayers();
  setUpBannerLists();
});


/*
// *** Global variables that contains the locations of jQueryUI js and css, which can be dynamically loaded when needed ***
var jqueryCsvLocation = "http://assets.mhs.manchester.ac.uk/2015/js/libs/jquery.csv-0.71.min.js";
var courseListCsvLocation = "http://assets.mhs.manchester.ac.uk/MasterProgrammeList.csv";
var videoMediaElememtScript = "https://apps.mhs.manchester.ac.uk/videodb/scripts/MediaElement/build/mediaelement-and-player.min.js";
var videoMediaElememtCSS = "https://apps.mhs.manchester.ac.uk/videodb/scripts/MediaElement/build/mediaelementplayer.min.css";
var jqueryMagnificPopupLocation = "http://assets.mhs.manchester.ac.uk/2015/js/libs/magnific-popup/jquery.magnific-popup.min.js";
var mhsMagnificPopupCssFile = "http://assets.mhs.manchester.ac.uk/2015/js/libs/magnific-popup/magnific-popup.css";
// *** eScholar scripts ***
var eScholarJqueryUiScript = "http://assets.mhs.manchester.ac.uk/2015/js/eScholar/jquery-ui-1.8.4.custom.min.js";
var eScholarScript = "http://assets.mhs.manchester.ac.uk/2015/js/eScholar/escholar.js";
var eScholarSearchScript = "http://assets.mhs.manchester.ac.uk/2015/js/eScholar/searchmhs.js";
*/


// *** Global variables that contains the locations of jQueryUI js and css, which can be dynamically loaded when needed ***
var jqueryCsvLocation = "//pssweb.manchester.ac.uk/includes/faculty/bmh/assets/js/libs/jquery.csv-0.71.min.js";
var courseListCsvLocation = "//www.bmh.manchester.ac.uk/media/mhs/bmh-faculty/site-documents/csv/MasterProgrammeList.csv";

var videoMediaElememtScript = "https://apps.mhs.manchester.ac.uk/videodb/scripts/MediaElement/build/mediaelement-and-player.min.js";
var videoMediaElememtCSS = "https://apps.mhs.manchester.ac.uk/videodb/scripts/MediaElement/build/mediaelementplayer.min.css";

var jqueryMagnificPopupLocation = "//pssweb.manchester.ac.uk/includes/faculty/bmh/assets/js/libs/magnific-popup/jquery.magnific-popup.min.js";
var mhsMagnificPopupCssFile = "//pssweb.manchester.ac.uk/includes/faculty/bmh/assets/js/libs/magnific-popup/magnific-popup.css";

// *** eScholar scripts ***
var eScholarJqueryUiScript = "//pssweb.manchester.ac.uk/includes/faculty/bmh/assets/eScholar/jquery-ui-1.8.4.custom.min.js";
var eScholarScript = "//pssweb.manchester.ac.uk/includes/faculty/bmh/assets/js/eScholar/escholar.js";
var eScholarSearchScript = "//pssweb.manchester.ac.uk/includes/faculty/bmh/assets/js/eScholar/searchmhs.js";


//var videoJWPlayerScript = "//jwpsrv.com/library/wrqx4EevEeOv_CIACqoGtw.js";
var videoJWPlayerScript = "//content.jwplatform.com/libraries/GAxgn6Z5.js";
var videoJWPlayerLicenseKey = "IwZhg9CEFt53YPGlwFtrTw3LTACBPlhf8L3dSKIYhK8=";
var hasFlash;

//var youtubeEmbedDomain = "www.youtube.com";
var youtubeEmbedDomain = "www.youtube-nocookie.com";

function checkBannerListPanels(){
	
	if($( window ).width() > 680){		
		if($("#bannersubjectsarrow").hasClass('flipped')){ 
			$("#bannerlistmainpanelstudy").show();
			$("#bannerlistmainpanelresearch").hide();
		}else if($("#bannerresearcharrow").hasClass('flipped')){
			$("#bannerlistmainpanelresearch").show();
			$("#bannerlistmainpanelstudy").hide();
		}else{
			$("#bannerlistmainpanelstudy").hide();
			$("#bannerlistmainpanelresearch").hide();
		}
	}else{
		$("#bannerlistmainpanelstudy").show();
		$("#bannerlistmainpanelresearch").show();
	}
}

function setUpBannerLists(){
	$("#bannersubjects").click(function(e) {
		e.preventDefault();
		if($("#bannersubjectsarrow").hasClass('flipped')){ 
		  
			$("#bannersubjectsarrow").removeClass('flipped');
			$("#bannerlistmainpanelstudy").hide();	
			
		  }else{
			  
			 $("#bannersubjectsarrow").addClass('flipped');	
			 $("#bannerlistmainpanelstudy").fadeIn("slow");	  
			 
		  }
		  
		  if($("#bannerresearcharrow").hasClass('flipped')){
				 
			 $("#bannerresearcharrow").removeClass('flipped');
			 $("#bannerlistmainpanelresearch").hide();	  
		  }
		  
	});
	$("#bannerresearch").click(function(e) {
		e.preventDefault();
		if($("#bannerresearcharrow").hasClass('flipped')){ 
						  
			$("#bannerresearcharrow").removeClass('flipped');
			$("#bannerlistmainpanelresearch").hide();
												
		  }else{
			  
			 $("#bannerresearcharrow").addClass('flipped');
			 $("#bannerlistmainpanelresearch").fadeIn("slow");  					 
		  }
		  
		  if($("#bannersubjectsarrow").hasClass('flipped')){
				 
			 $("#bannersubjectsarrow").removeClass('flipped');
			 $("#bannerlistmainpanelstudy").hide();
		  }
	});		
}
function fnHasFlash() {
  if (hasFlash === undefined) {
    // test if Flash is available
    try {
      var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
      if (fo) hasFlash = true;
    } catch (e) {
      if (navigator.mimeTypes["application/x-shockwave-flash"] != undefined)
        hasFlash = true;
    }
  }
  return hasFlash;
}



/* === DYNAMICALLY LOAD SCRIPTS ============================================================ */
/* from https://api.jquery.com/jQuery.getScript/ */
jQuery.cachedScript = function (url, options) {
  "use strict";

  // allow user to set any option except for dataType, cache, and url
  options = $.extend(options || {}, {
    dataType: "script",
    cache: true,
    url: url
  });

  // Use $.ajax() since it is more flexible than $.getScript
  // Return the jqXHR object so we can chain callbacks
  return jQuery.ajax(options);
};

/* create a case insensitive version of :contains
http://stackoverflow.com/questions/2196641/how-do-i-make-jquery-contains-case-insensitive-including-jquery-1-8
*/
$.extend($.expr[":"], {
  "containsNC": function (elem, i, match, array) {
    return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
  }
});

function ActOnClasses() {
  "use strict";

  $(".publications.hasYearFilter").publicationsFilter();
  $("table.hasFilter").tableFilter();
  $("ul.hasFilter, ol.hasFilter").listFilter();
  $(".mhsListFilterButtons").mhsListFilterButtons();
  $('.mhsKeywordFilter').mhsKeywordFilter();  
  $(".eScholarList").mhsEscholarSearchableList();
  if ($('a.popup').length > 0) MakeLinksIntoPopups();
  if ($('.course-finder').length > 0) SetupCourseFinder();
  if ($('.course-list').length > 0) SetupCourseList();

  

  //$(".mhsJqStripe").mhsStripe();
  //$(".mhsJqAccordionH2").mhsAccordion({ header: 'h2' });
  //$(".mhsJqAccordionH3 ").mhsAccordion({ header: 'h3' });
  //$(".mhsJqRotateImages").mhsRotateImages();
  //$(".mhsJqTabifyH2 ").accessibleTabs({
  //    tabhead: 'h2',
  //    fx: "show",
  //    fxspeed: null
  //});
  //$(".mhsJqTabifyH3 ").accessibleTabs({
  //    tabhead: 'h3',
  //    fx: "show",
  //    fxspeed: null
  //});
  //$(".mhsKeywordSearchable").mhsKeywordSearchable();
  //$(".box-image-link a").mhsBoxImageLink();
  //$(".mhsEqualHeightChildren").mhsEqualHeightChildren();
  //$(".grid").mhsCreateCombinedCssClasses();
  //$(".mhsGallery").mhsAddGalleryCSSandJS();
}

/* === KeywordSearchable ============================================================ */
(function ($) {
  "use strict";

  $.fn.mhsKeywordFilter = function () {
    // return 'this' to allow chaining
    return this.each(function () {
      var $thisKeywordFilter = $(this);
      var $thisKeywordSearchable = $thisKeywordFilter.next();

      // keyword filter needs to be followed by a gridList
      if (!$thisKeywordSearchable.hasClass('gridList')) return;

      var tLabel = $thisKeywordFilter.attr("data-label");
      if (typeof tLabel === "undefined" || '' == tLabel) {
        tLabel = 'Enter keywords';
      }

      var tExample = $thisKeywordFilter.attr("data-example");
      if (typeof tExample !== "undefined" && tExample != '') {
        tExample = ' placeholder="' + tExample + '"';
      }

      $thisKeywordFilter.append('<fieldset class="fKeywordSearch"><label>' + tLabel + '<input type="text" ' + tExample + ' class="qKeywords"></label><input type="button" class="qKeywordsClear" Value="Clear" /></fieldset>');

      $thisKeywordSearchable.children().addClass('KeywordedItem');

      $thisKeywordFilter.find(".qKeywords").keyup(function () {
        $thisKeywordFilter.find(".qKeywordsClear:hidden").show();
        $thisKeywordSearchable.find(".KeywordedItem").removeClass("hasKeyword");
        var t = $thisKeywordFilter.find(".qKeywords").val();
        if ($thisKeywordFilter.hasClass("matchStartOfWord") || $thisKeywordFilter.hasClass("matchWholeWord")) {
          var searchPattern = "\\b(" + t + ")";
          if ($thisKeywordFilter.hasClass("matchWholeWord")) searchPattern = "\\b(" + t + ")\\b";
          var regex = new RegExp(searchPattern, 'gi');
          $thisKeywordSearchable.find(".KeywordedItem").filter(function () {
            return ((this.textContent).match(regex) != null);
          }).addClass("hasKeyword");
        }
        else {
          $thisKeywordSearchable.find(".KeywordedItem:Contains(" + t + ")").addClass("hasKeyword");
        }
        $thisKeywordSearchable.find(".KeywordedItem:not(.hasKeyword)").hide(1000);
        $thisKeywordSearchable.find(".KeywordedItem.hasKeyword:hidden").show(100);
      });

      $thisKeywordFilter.find(".qKeywordsClear").click(function () {
        $thisKeywordFilter.find(".qKeywords").val("");
        $thisKeywordSearchable.find(".KeywordedItem").removeClass("hasKeyword");
        $thisKeywordSearchable.find(".KeywordedItem:hidden").show(100);
      });
    });
  };
})(jQuery);

/* === A TO Z ============================================================ */
(function ($) {
  "use strict";

  $.fn.publicationsFilter = function () {
    // return 'this' to allow chaining
    return this.each(function () {
      var $thisComponent = $(this);

      // if there's no filterbar, then quit function
      if ($thisComponent.find(".filterbar-container").length == 0) return;

      // HTML has a list of links to jump to the year. Hide it.
      $thisComponent.find(".jumpToYearContainer").hide();

      // Create the filters
      $thisComponent.find(".filterbar-container").append("<div class=\"filterByType-container\"><p>View by: <a href=\"#\" class=\"viewByYear\">Year</a>/<a href=\"#\" class=\"viewAll\">All</a></p></div>");
      $thisComponent.find(".filterbar-container").append("<div class=\"filterByYear-container\"><label class=\"offScreen\" for=\"filterByYear\">Filter by year</label><select name=\"filterByYear\" class=\"filterByYear\"><option value=\"noValue\">Year</option></select></div>");

      // populate the dropdown with the years that are in the list of hidden links
      var $filterByYear = $thisComponent.find(".filterByYear");
      $thisComponent.find(".jumpToYearContainer li a").each(function () {
        $filterByYear.append("<option value=\"" + $(this).attr("href").substring(1) + "\">" + $(this).text() + "</option>");
      });

      // When an option in the dropdown has been selected; if it is the first "Year" option, then show all years; if it is any other years, hide all years other than the selected one.
      $thisComponent.find(".filterByYear").on('change', function (e) {
        e.preventDefault();
        var selectedYear = $(this).val();
        if ("noValue" == selectedYear)
        {
          $thisComponent.find(".year").show();
        }
        else
        {
          $thisComponent.find(".year").hide();
          $thisComponent.find("#" + selectedYear).show();
        }
      });

      // When the year link has been clicked, show the first (most recent) year
      $thisComponent.find(".viewByYear").click(function (e) {
        e.preventDefault();
        if ($thisComponent.find(".filterByYear option").length > 1) {
          var latestYear = $thisComponent.find(".filterByYear option:eq(1)").val();
          $thisComponent.find(".filterByYear").val(latestYear);
          $thisComponent.find(".year").hide();
          $thisComponent.find("#" + latestYear).show();
        }
      });

      // When the All link has been clicked, change the dropdown to the first option and show all years
      $thisComponent.find(".viewAll").click(function (e) {
        e.preventDefault();
        $thisComponent.find(".filterByYear").val('noValue');
        $thisComponent.find(".year").show();
      });
    });
  };
})(jQuery);

/* === Table Filter ============================================================ */
(function ($) {
  "use strict";

  $.fn.tableFilter = function () {
    // return 'this' to allow chaining
    return this.each(function () {
      var $thisTable = $(this);
      var thisId = $thisTable.attr('id');

      // if there's no filterbar, then quit function
      var filterLabel = $(this).attr('data-filter-label');
      if ("" == filterLabel || null == filterLabel) filterLabel = 'Enter keywords';

      var filterForm = '<fieldset class="inPageSearchBlock">' +
        '      <legend class="offScreen">Search</legend>' +
        '    <div class="fieldsetInnerContainer">' +
        '      <div class="formRowContainer">' +
        '          <label class="label offScreen" for="inPageSearch' + thisId + '">' + filterLabel + '</label>' +
        '               <div class="inputWrapper">' +
        '            <input id="inPageSearch' + thisId + '" name="inPageSearch' + thisId + '" class="filter clearIconPadding" type="text" placeholder="' + filterLabel + '">' +
        '              <div class="clearIcon" style="display: none;"></div>' +
        '          </div>' +
        '               <span class="magGlass"></span>' +
        '      </div>' +
        '    </div>' +
        '  </fieldset>';

      $thisTable.before(filterForm);

      var $filterForm = $thisTable.prev("fieldset");

      var $filterBox = $filterForm.find("input.filter");

      $filterForm.find(".clearIcon").click(function (e) {
        e.preventDefault();
        $(this).hide();
        $filterBox.val('');
        $thisTable.find('tbody tr').show();
        $thisTable.find('tbody tr').removeClass('matchesFilter');
        $thisTable.removeClass('isFiltered');
        $filterBox.focus();
      });

      // based on http://stackoverflow.com/a/2885716
      // Save current value of element
      $filterBox.data('oldVal', $filterBox.val());

      // Look for changes in the value
      $filterBox.bind("propertychange change click keyup input paste", function(event){
        // If value has changed...
        if ($filterBox.data('oldVal') != $filterBox.val()) {
          // Updated stored value
          $filterBox.data('oldVal', $filterBox.val());

          // Filter table
          $thisTable.find('tbody tr').removeClass('matchesFilter');
          $thisTable.find('tbody tr:has(*:containsNC("' + $filterBox.val() + '"))').addClass('matchesFilter');
          $thisTable.find('tbody tr.matchesFilter').show();
          $thisTable.find('tbody tr:not(.matchesFilter)').hide();
          $thisTable.addClass('isFiltered');
          
          $thisTable.find('tbody tr.matchesFilter:even').css("background-color", "transparent");
          $thisTable.find('tbody tr.matchesFilter:odd').css("background-color", "#eee");
        }
        if ('' != $filterBox.val()) $filterForm.find(".clearIcon:hidden").show();
      });
    });
  };
})(jQuery);

/* === List Filter ============================================================ */
(function ($) {
  "use strict";

  $.fn.listFilter = function () {
    // return 'this' to allow chaining
    return this.each(function () {
      var $thisList = $(this);
      var thisId = $thisList.attr('id');

      // if there's no filterbar, then quit function
      var filterLabel = $(this).attr('data-filter-label');
      if ("" == filterLabel || null == filterLabel) filterLabel = 'Enter keywords';

      var filterForm = '<fieldset class="inPageSearchBlock">' +
        '      <legend class="offScreen">Search</legend>' +
        '    <div class="fieldsetInnerContainer">' +
        '      <div class="formRowContainer">' +
        '          <label class="label offScreen" for="inPageSearch' + thisId + '">' + filterLabel + '</label>' +
        '               <div class="inputWrapper">' +
        '            <input id="inPageSearch' + thisId + '" name="inPageSearch' + thisId + '" class="filter clearIconPadding" type="text" placeholder="' + filterLabel + '">' +
        '              <div class="clearIcon" style="display: none;"></div>' +
        '          </div>' +
        '               <span class="magGlass"></span>' +
        '      </div>' +
        '    </div>' +
        '  </fieldset>';

      $thisList.before(filterForm);

      var $filterForm = $thisList.prev("fieldset");

      var $filterBox = $filterForm.find("input.filter");

      $filterForm.find(".clearIcon").click(function (e) {
        e.preventDefault();
        $(this).hide();
        $filterBox.val('');
        $thisList.find('li').show();
        $thisList.find('li').removeClass('matchesFilter');
        $filterBox.focus();
      });

      // based on http://stackoverflow.com/a/2885716
      // Save current value of element
      $filterBox.data('oldVal', $filterBox.val());

      // Look for changes in the value
      $filterBox.bind("propertychange change click keyup input paste", function (event) {
        // If value has changed...
        if ($filterBox.data('oldVal') != $filterBox.val()) {
          // Updated stored value
          $filterBox.data('oldVal', $filterBox.val());

          // Filter table
          $thisList.find('li').removeClass('matchesFilter');
          $thisList.find('li:containsNC("' + $filterBox.val() + '")').addClass('matchesFilter');
          $thisList.find('li.matchesFilter').show();
          $thisList.find('li:not(.matchesFilter)').hide();
        }
        if ('' != $filterBox.val()) $filterForm.find(".clearIcon:hidden").show();
      });
    });
  };
})(jQuery);


/* === Make Links Into Popups ============================================================ */

function MakeLinksIntoPopups() {
  // check if the header already contains mhsMagnificPopupCssLink and if not then load it
  if (0 == $("#cssMagnificPopup").length) {
    var mhsMagnificPopupCssLink = '<link id="cssMagnificPopup" type="text/css" rel="stylesheet" href="' + mhsMagnificPopupCssFile + '" />';
    $("head").append(mhsMagnificPopupCssLink);
  };
  
  $.cachedScript(jqueryMagnificPopupLocation).done(function (script, textStatus) {
    $('a.popup').magnificPopup({ 
      type: 'iframe'
      // other options
    });
  });
}

/* === eScholar Searchable Lists ============================================================ */
var presetEscholarSearchQuery;
(function ($) {
  "use strict";

  $.fn.mhsEscholarSearchableList = function () {
    // return 'this' to allow chaining
    return this.each(function () {
      //presetEscholarSearchQuery = "r.isbelongsto.pid:\"uk-ac-man-per:abcde20\" AND m.year:2015";
      presetEscholarSearchQuery = "";

      if (typeof eScholarListPerson !== 'undefined') {
          // the variable is defined
          if(presetEscholarSearchQuery != "") presetEscholarSearchQuery += " AND ";
          presetEscholarSearchQuery += "r.isbelongsto.pid:\"uk-ac-man-per:" + eScholarListPerson + "\"";
      }
      if (typeof eScholarListYear !== 'undefined') {
          // the variable is defined
          if(presetEscholarSearchQuery != "") presetEscholarSearchQuery += " AND ";
          presetEscholarSearchQuery += "m.year:" + eScholarListYear;
      }
            
      $.getScript(eScholarJqueryUiScript).done(function () {
        $.getScript(eScholarScript).done(function () {
          $.getScript(eScholarSearchScript).done(function () {           

            //alert(presetEscholarSearchQuery);
          });
        });
      });
    });
  };
})(jQuery);

/* === List Filter Buttons ============================================================ */
(function ($) {
  "use strict";

  $.fn.mhsListFilterButtons = function () {
    // return 'this' to allow chaining
    return this.each(function () {
      var $thisFilter = $(this);
      var thisFilterId = $thisFilter.attr("id");
      var thisFilterName = "filter" + thisFilterId;
      
      var $thisList = $(this).nextAll(".gridList").first();
      if(null == $thisList) return;
      
      var thisFilterNumber = $thisFilter.attr('data-filter-number');
      if(null == thisFilterNumber) return;
      
      var allFilterValues = []; // array of all values to filter on
      var theseFilterValues; // array of values to filter on for each list item
      $thisList.children("li").each(function(){
        // the list item may have multiple values to be filtered on that are comma separated, so split them and add them to the array
        theseFilterValues = $(this).attr('data-filter' + thisFilterNumber).split(',');
        Array.prototype.push.apply(allFilterValues,theseFilterValues);
      }).get()

      allFilterValues = $.distinctTrimmed(allFilterValues).sort();
      
      var thisId = 'filter' + thisFilterId + 'valueAll';
      $thisFilter.append('<input type="radio" class="offScreen" id="' +thisId+ '" name="' +thisFilterName+ '" checked><label for="' +thisId+ '" data-filter="">All</label> ');
      
      jQuery.each(allFilterValues, function(index, value) {
        if(value=='') return;
        thisId = 'filter' + thisFilterId + 'value' + value;
        $thisFilter.append('<input type="radio" class="offScreen" id="' +thisId+ '" name="' +thisFilterName+ '"><label for="' +thisId+ '" data-filter="' +value+ '">' +value.split('_').join('&nbsp;')+ '</label> ');
      });   
      
      $thisFilter.find('label').click(function() {
        var thisFilterValue = $(this).attr('data-filter');
        //alert(thisFilterValue);       
        
        if('' == thisFilterValue)
        {
          $thisList.children('li[data-filter' +thisFilterNumber+ ']').removeClass('isHiddenByFilter' + thisFilterNumber);    
        }
        else
        {
          $thisList.children('li[data-filter' +thisFilterNumber+ ']').addClass('isHiddenByFilter' + thisFilterNumber);    
          $thisList.children('li[data-filter' +thisFilterNumber+ '*=",' +thisFilterValue+ ',"]').removeClass('isHiddenByFilter' + thisFilterNumber);
        }
        
        $thisList.children('li[class*="isHiddenByFilter"]').hide();
        $thisList.children('li:not([class*="isHiddenByFilter"])').show();
      });
    });
  };
})(jQuery);

/* START ********************** Course Finder ********************** */

function SetupCourseFinder() {

  // Course Finder functions

  function SetupCourseFinderInner() {
    var thread = null;
    var data;
    $.ajax({
      url: courseListCsvLocation,
      async: true,
      success: function (csvd) {
        data = $.csv2Array(csvd);
      },
      dataType: "text",
      complete: function () {
        // call a function on complete 
        var html = '<ul class="matchingCourses">';
        var schoolFilter = $('#courseKeywords').attr('data-schoolfilter');
        var levelFilter = $('#courseKeywords').attr('data-levelfilter');

        jQuery.each(data, function (i, column) {
          if (0 == i) return; // continue to next row
          if (typeof schoolFilter !== "undefined") {
            if (schoolFilter.length > 0) {
              var schools = column[15].split(',');
              if ($.inArray(schoolFilter, schools) == -1) return; // list of schools doesn't contain the school being filtered on, so skip to the next row
            }
          }
          if (typeof levelFilter !== "undefined") {
            if (levelFilter.length > 0) {
              var levels = levelFilter.split(',');
              // for each level, check if the corresponding column says 'Yes'. If there is at least one match, continue, otherwise return. 
              var isOfLevel = false;
              $.each(levels, function (index, level) {
                if (level == 'PGT' && column[4] == 'Yes') isOfLevel = true;
                if (level == 'UG' && column[5] == 'Yes') isOfLevel = true;
                if (level == 'PGR' && column[6] == 'Yes') isOfLevel = true;
                if (level == 'CPD' && column[7] == 'Yes') isOfLevel = true;
              });
              if (!isOfLevel) return;
            }
          }
          var url = column[0];
          var title = column[1];
          var level = column[3];
          var keywords = column[13];

          html += '<li class="matchLevel"><a href="' + url + '">' + title + ' ' + level + '<span class="offScreen keywords">' + keywords + '</span></a></li>';
        });
        html += '</ul>';
        $('body').append(html);
        PositionMatchingCoursesBelowInput();
      }
    });

    $('#courseKeywords').keyup(function () {
      clearTimeout(thread);
      $this = $(this);
      thread = setTimeout(function () {
        showMatchingCourses($this.val());
      }, 200);
    });
  }

  function SetupCourseFinderHome() {
    var thread = null;
    var data;
    $.ajax({
      url: courseListCsvLocation,
      async: true,
      success: function (csvd) {
        data = $.csv2Array(csvd);
      },
      dataType: "text",
      complete: function () {
        // call a function on complete 
        var html = '<ul class="matchingCourses">';
        var schoolFilter = $('#courseKeywords').attr('data-schoolfilter');

        jQuery.each(data, function (i, column) {
          if (0 == i) return; // continue to next row
          if (schoolFilter.length > 0) {
            var schools = column[15].split(',');
            if ($.inArray(schoolFilter, schools) == -1) return; // list of schools doesn't contain the school being filtered on, so skip to the next row
          }
          var url = column[0];
          var title = column[1];
          var level = column[3];
          var keywords = column[13];
          var levelClass = ' class="';
          if (column[4] == 'Yes') levelClass += 'PGT ';
          if (column[5] == 'Yes') levelClass += 'UG ';
          if (column[6] == 'Yes') levelClass += 'PGR ';
          if (column[7] == 'Yes') levelClass += 'CPD ';
          levelClass += '"';

          html += '<li' + levelClass + '><a href="' + url + '">' + title + ' ' + level + '<span class="offScreen keywords">' + keywords + '</span></a></li>';
        });
        html += '</ul>';
        $('body').append(html);
        PositionMatchingCoursesBelowInput();
        FilterMatchingCoursesByLevel();
      }
    });

    $('#courseKeywords').keyup(function () {
      clearTimeout(thread);
      $this = $(this);
      thread = setTimeout(function () {
        showMatchingCourses($this.val());
      }, 200);
    });
  }

  function PositionMatchingCoursesBelowInput() {
    var courseKeywordOffset = $('#courseKeywords').offset();
    var courseKeywordHeight = $('#courseKeywords').outerHeight();
    var courseKeywordWidth = $('#courseKeywords').outerWidth();

    $('.matchingCourses').css('top', courseKeywordOffset.top + courseKeywordHeight + 1);
    $('.matchingCourses').css('left', courseKeywordOffset.left);
    $('.matchingCourses').css('width', courseKeywordWidth - 1);
  }

  function showMatchingCourses(searchText) {
    FilterMatchingCoursesBySearch(searchText);
    $('.matchingCourses:has(li.matchKeyword.matchLevel)').show();
    $('.matchingCourses:not(:has(li:visible))').hide();
  }

  function FilterMatchingCoursesBySearch(searchText) {
    $('.matchingCourses li.matchKeyword').removeClass('matchKeyword');
    $('.matchingCourses li').has("a:containsNC('" + searchText + "')").addClass('matchKeyword'); // case-insensitive search
  }

  function FilterMatchingCoursesByLevel() {
    var StudyLevel = $('#studyLevel').val();
    $('.matchingCourses li.matchLevel').removeClass('matchLevel');
    $('.matchingCourses li.' + StudyLevel).addClass('matchLevel');
  }

  // Course Finder events

  // load the jquery.csv file from location in global variable then set up the approriate course finder
  $.cachedScript(jqueryCsvLocation).done(function (script, textStatus) {
    if ($('.course-finder-inner').length > 0) SetupCourseFinderInner();
    if ($('.course-finder-home').length > 0) SetupCourseFinderHome();
  });

  $('.course-finder .clearIcon').click(function (e) {
        e.preventDefault();
    $('.matchingCourses').hide();
    $('.matchingCourses li.matchKeyword').removeClass('matchKeyword');
  });

  $('#studyLevel').change(function () {
      // change the action of the form to match the level
      var classLevel = $('#studyLevel option:selected').val();
        // get the url from the link in the list of link that has the same class
      var formAction = $('.course-finder .arrows li.' + classLevel + ' a').attr('href');
      $(this).closest('form').attr('action', formAction);

    //$('.matchingCourses').hide();
    FilterMatchingCoursesByLevel();
  });

  $(window).resize(function () {
    PositionMatchingCoursesBelowInput();
	checkBannerListPanels()
  });
}

/* END ********************** Course Finder ********************** */

/* START ********************** Course List ********************** */
function SetupCourseList() {

      $(document).ready(function () {
            var viewportWidth = viewportSize.getWidth();
            var columnHeadingsShowAt = 600;
          var optionsShowAt = 360;
            $("#loadingText, #clearFilters, #advancedToggle").show();

            if (viewportWidth >= columnHeadingsShowAt) {
                $("#columnHeadings").show();
            }

            if (viewportWidth >= optionsShowAt) {
                $("#advancedToggle").show();
            }
            
            if($('#customSearch').val() != '') {
              FilterMatchingCoursesBySearch($('#customSearch').val());
          }

            var thread = null;
      
            $("#clearFilters").click(function (e) {
                e.preventDefault();
                $('.notKeyword').removeClass('notKeyword');
                // remove all classes that start "filter-"
                $(".courseList").removeClass(function (index, css) {
                    return (css.match(/(^|\s)filter-\S+/g) || []).join(' ');
                });

                $("#studyAbroad").prop("checked", false);
                $("#foreignLanguage").prop("checked", false);
                $("#industrialExperience").prop("checked", false);
                $("#scholarships").prop("checked", false);
                $("#foundation").prop("checked", false);
                $("#certificate").prop("checked", false);
                $("#diploma").prop("checked", false);
                $("#distance").prop("checked", false);
                $("#full").prop("checked", false);
                $("#part").prop("checked", false);
                $("#customSearch").val("");
                
                if (viewportWidth >= columnHeadingsShowAt) {
                    $("#columnHeadings").show();
                }

                $("ul.courseList").show();

                $("#courseSearchNoResults").hide();

                return false;
            });

            $("#advancedToggle, #filterClose").click(function (e) {
                e.preventDefault();
                $("#advancedOptions").toggle(0, function () {
                    if ($(this).css("display") == "block") {
                        $("#advancedToggle").addClass("open");
                        $("#advancedToggle").val("Fewer options");
                    } else {
                        $("#advancedToggle").removeClass("open");
                        $("#advancedToggle").val("More options");
                    }
                });

                return false;
            });

            $('#customSearch').keyup(function () {
                clearTimeout(thread);
                $this = $(this);
                thread = setTimeout(function () {
                    FilterMatchingCoursesBySearch($this.val());
                }, 200);
            });

            $('#courseSearch .clearIcon').click(function (e) {
                e.preventDefault();
                $('.courseList li.notKeyword').removeClass('notKeyword');
            });

            function FilterMatchingCoursesBySearch(searchText) {
                $('.courseList li.notKeyword').removeClass('notKeyword');
                $('.courseList li:not(:has(a:containsNC("' + searchText + '")))').addClass('notKeyword'); // case-insensitive search
            }

            $('#advancedOptions input:checkbox').change(function () {
                var id = $(this).attr('id');
                if ($(this).is(":checked")) {
                    //alert(id + ' checked');
                    $('.courseList').addClass('filter-' + id);
                }
                else
                {
                    //alert(id + ' not checked');
                    $('.courseList').removeClass('filter-' + id);
                }
            });
        });

}
/* END ********************** Course List ********************** */



/* ============================== VIDEO START ============================== */
function InitialiseVideoPlayers() {
  if ($(".mhsVideo, .mhsVideoPlaylist").length > 0) {
    if (window.jwplayer) {
      InitialiseVideoPlayersPart2();
    }
    else {
      $.getScript(videoJWPlayerScript, function () {
        InitialiseVideoPlayersPart2();
      });
    }
  }
/*
  if ($(".vidPromoVideo").length > 0){
    $(".vidPromoVideo").mouseover(function(){
      $(this).children("figcaption").hide();
    });
    $(".vidPromoVideo").mouseout(function(){
      $(this).children("figcaption").show();
    });
  }
*/
}

function InitialiseVideoPlayersPart2() {
  var urlParams;
  (window.onpopstate = function () {
    var match,
      pl = /\+/g,  // Regex for replacing addition symbol with a space
      search = /([^&=]+)=?([^&]*)/g,
      decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
      query = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
      urlParams[decode(match[1])] = decode(match[2]);
  })();

  firstItem = -1;
  if ("firstItem" in urlParams) {
    firstItem = urlParams['firstItem'];
  }

  var image = new Image();
  image.onload = function () {
    // The user can access YouTube
    if ($(".mhsVideo").length > 0) DoAllVideo(true, firstItem);
    if ($(".mhsVideoPlaylist").length > 0) DoAllPlaylists(true, firstItem);
  };
  image.onerror = function () {
    // The user can't access YouTube
    if ($(".mhsVideo").length > 0) DoAllVideo(false, firstItem);
    if ($(".mhsVideoPlaylist").length > 0) DoAllPlaylists(false, firstItem);
  };
  var d = new Date();
  image.src = "//youtube.com/favicon.ico?ms=" + d.getTime();
}

function DoAllVideo(canYouTubeBeAccessed, firstItem) {
  "use strict";

  //alert("YouTube: " + canYouTubeBeAccessed);

  $(".mhsVideo").each(function () {
    var thisVideo = this;
    var videoid = this.id.substr(5);
    var classes = $(this).attr('class').toLowerCase() + ' ';
    $(thisVideo).empty(); // div may need to contain some text so that WYSIWYG editor doesnt strip it out, so now remove the text
    var autoplay = false;
    if ($(this).hasClass('autoplay')) autoplay = true;

    var jqxhr = $.getJSON("https://apps.mhs.manchester.ac.uk/videodb/api/video/" + videoid + "?format=json&callback=?", function () {
      //console.log("success");
    })
    .fail(function () {
      //console.log("error");
    })
    .always(function () {
      //console.log("complete");
    })
    .complete(function () {
      //console.log("second complete");
    })
    .done(function (data) {
      LoadVideo(thisVideo, canYouTubeBeAccessed, data, autoplay);
    });
  });
}

function DoAllPlaylists(canYouTubeBeAccessed, firstItem) {
  "use strict";

  //alert("YouTube: " + canYouTubeBeAccessed);

  $(".mhsVideoPlaylist").each(function () {
    var thisPlaylist = this;
    var playlistid = this.id.substr(8);
    var classes = $(this).attr('class').toLowerCase() + ' ';
    $(thisPlaylist).empty(); // div may need to contain some text so that WYSIWYG editor doesnt strip it out, so now remove the text
    var isDebug = false;
    if ($(this).hasClass('debug')) isDebug = true;

    var jqxhr = $.getJSON("https://apps.mhs.manchester.ac.uk/videodb/api/playlist/" + playlistid + "?format=json&callback=?", function () {
      //console.log("success");
    })
    .fail(function () {
      //console.log("error");
    })
    .always(function () {
      //console.log("complete");
    })
    .complete(function () {
      //console.log("second complete");
    })
    .done(function (data) {
      //if (fnHasFlash()) {
        LoadPlaylist(thisPlaylist, canYouTubeBeAccessed, data);
      //} else {
      //    LoadPlaylistNoFlash(thisPlaylist, canYouTubeBeAccessed, data);
      //}
    });
  });
}

function LoadVideo(container, canYouTubeBeAccessed, data, autoplay) {
//console.log(data);
  var poster = '';
  if (data.stillURL) poster = 'https://apps.bmh.manchester.ac.uk/includes/video/thumbnails/' + data.stillURL;

  var videoFile = '';
  var useYouTube = true;
  var videoid = data.videoId;
  var videoTitle = data.videoTitle;
  var videoDescription = data.videoDescription;
  var videoTitleAndDescription = '<div class="mhsVideoTitleAndDescription"><h2>' + videoTitle + '</h2>';
  if(null != videoDescription) videoTitleAndDescription += '<div>' + videoDescription + '</div>'
  videoTitleAndDescription += '</div>';

  var videoHtml = '<section><div class="videobox2 mobile fullwidth" itemprop="video" itemscope="" itemtype="http://schema.org/VideoObject">';
  /* add meta data */
  videoHtml += '<meta itemprop="name" content="' + videoTitle.replace(/"/g, '&quote;') + '">';
  if(null != videoDescription) videoHtml += '<meta itemprop="description" content="' + videoDescription.replace(/"/g, '&quote;') + '">';
  videoHtml += '<meta itemprop="thumbnailUrl" content="https://apps.bmh.manchester.ac.uk/includes/video/thumbnails/' + data.thumbnailURL + '">';
  // set embedUrl
  if (null != data.fileURLonYouTube) {
    videoHtml += '<meta itemprop="embedUrl" content="' + data.fileURLonYouTube + '">';

	  var youtubeEmbedUrl;
//console.log(fileURLonYouTube);
	  if (data.fileURLonYouTube.includes("watch")) {
		  //alert("YT watch URL");
		  var youtubeUrlVParameter = data.fileURLonYouTube.match(/v=[a-zA-Z0-9_-]{11}/);
		  var youtubeVideoId = youtubeUrlVParameter[0].substring(2);
		  youtubeEmbedUrl = "https://" + youtubeEmbedDomain + "/embed/" + youtubeVideoId;
	  } else if (data.fileURLonYouTube.includes("https://youtu.be/")) {
		  youtubeEmbedUrl = "https://" + youtubeEmbedDomain + "/embed/" + data.fileURLonYouTube.substring(17);
//https://youtu.be/SfdvDmUFZIo
	  } else {
		  youtubeEmbedUrl = data.fileURLonYouTube;
	  }

	videoHtml += "<div class=\"embed-container youtube\"><iframe src=\"" + youtubeEmbedUrl + "\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe></div>";
  }  else  {
//console.log(fileURLonVLS);
    if (null != data.fileURLonVLS) videoHtml += '<meta itemprop="embedUrl" content="http://helix.stream.manchester.ac.uk/flash/' + data.fileURLonVLS + '">';
	  videoHtml += '<a href="#" class="playvideo2"><img class="poster" src="' + poster + '" width="640" height="360" alt="' + videoTitle + '" /><span class="video-play-button">Play</span></a>';
	  videoHtml += '<div class="video" id="jw' + videoid + '"></div></div>';
  }
  // set uploadDate
  if (null != data.createdDate) {
    var createdDate = convertJsonDateToJavascriptDate(data.createdDate);
    if (null != createdDate) videoHtml += '<meta itemprop="uploadDate" content="' + createdDate + '">';
  }
  
    if (!$(container).hasClass("mhsVideoWithoutTitleOrDescription")) videoHtml += videoTitleAndDescription;

    videoHtml += "</section>";

  if ((data.hostChoiceRule == 0) || (data.hostChoiceRule == 2)) {
    videoFile = data.fileURLonYouTube;
    if ((canYouTubeBeAccessed == false) || (data.fileURLonYouTube == '') || (data.fileURLonYouTube == null)) {
      videoFile = data.fileURLonVLS;
      useYouTube = false;
    }
  }

  if ((data.hostChoiceRule == 1) || (data.hostChoiceRule == 3)) {
    videoFile = data.fileURLonVLS;
    useYouTube = false;
  }

  $(container).prepend(videoHtml);

  var jwp;
  

  
  if (fnHasFlash()) {
    $(container).find(".playvideo2").click(function (e) {
      e.preventDefault();
      // when the poster has been clicked, load the video into the container and start it playing
      var containerId = "jw" + videoid;
      jwp = playVideo(containerId, poster, useYouTube, videoFile, data, true);
	  	//hide the caption overlay
	    $(container).next('figcaption').hide();
      return false;
    });
  } else {
    // Flash not supported, so replace the poster with the video but don't autoplay it
    $(container).find(".playvideo2").removeAttr('href');
    var containerId = "jw" + videoid;
    jwp = playVideo(containerId, poster, useYouTube, videoFile, data, false);
		//hide the caption overlay
	  $(container).next('figcaption').hide();
  }

  // if the video has been set to autoplay, simulate a click on the poster image
  if (autoplay) {
    $(container).find(".playvideo2").click();
		//hide the caption overlay
	  $(container).next('figcaption').hide();
  }
	
  return jwp;
}

function playVideo(containerId, poster, useYouTube, videoFile, data, autostart) {
  var width;
  var height;

  if ($("html").hasClass("ie7")) {
    width = 640;
    height = 360;
  }
  else {
    width = "100%";
    height = 0;
  }

  var hasStarted = false;

  // set parameters to be used by JWPlayer
  var params = {
    id: containerId,
    width: width,
    aspectratio: "16:9",
    autostart: false,
    //        "abouttext": "The University of Manchester",
    //        "aboutlink": "http://www.manchester.ac.uk",
    image: poster,
    skin: "glow",
    ga: {},
    sharing: {
      heading: "Share video"
    }
  };

  // add parameters for when to start and end the video
  if (null != data.startPlayingAt || null != data.endPlayingAt)
  {
    events = {};

    if (null != data.startPlayingAt) {
      events.onPlay = function (event) {
        if (!hasStarted) this.seek(data.startPlayingAt);
        hasStarted = true;
      }
    }

    if (null != data.endPlayingAt) {
      events.onTime = function (event) {
        if (event.position >= data.endPlayingAt) {
          this.pause();
        }
      }
    }

    params.events = events;
  }

  // add parameters that depend on whether the source is YouTube or the VLS
  if (useYouTube) {
    params.stretching = "fill";
    params.file = videoFile;
  } else {
    params.stretching = "exactfit";
    params.stretching = "fill";
    videoFile = videoFile.replace("_hi.mp4","").replace("_lo.mp4","").replace("http://helix.stream.manchester.ac.uk/flash/",""); // strip out any extra _hi.mp4 and _lo.mp4
    params.sources = [
        { file: "http://helix.stream.manchester.ac.uk/flash/" + videoFile + "_lo.mp4", label: "SD" },
        { file: "http://helix.stream.manchester.ac.uk/flash/" + videoFile + "_hi.mp4", label: "HD", "default": "true" },
        { file: "rtmp://helix.stream.manchester.ac.uk/flash/" + videoFile + "_hi.mp4", label: "HD" }
    ];
  }

  if (data.hasCaptions) {
    params.tracks = [{
      file: 'https://apps.mhs.manchester.ac.uk/videodb/captions/' + data.videoId,
      label: 'English',
      kind: 'captions',
      "default": true
    }]
  }

  var jwp = jwplayer(containerId).setup(params);
  // jwplayer is only loaded dynamically when a user clicks on a poster, so play the video once loaded.
  //jwplayer.onReady(function () { jwplayer.play(); });  
  if (autostart) {
    jwp.onReady(function () {
      jwp.play();
    });
  }

  return jwp;
  //jwplayer.load(videoFile).play();
}


function LoadPlaylist(container, canYouTubeBeAccessed, data) {
  $(container).append('<div class="mhsVideo"></div><div class="videoCarousel"></div>');
  var carousel = $(container).find('.videoCarousel');
  var video = $(container).find('.mhsVideo');

  // load the first video
   LoadVideo(video, canYouTubeBeAccessed, data.ApiPlaylistItems[0].ApiVideo, false);

  // add playlist items to the carousel
  jQuery.each(data.ApiPlaylistItems, function () {
    var playlistItem = this;
    var imageUrl = playlistItem.ApiVideo.stillURL;
    if (typeof imageUrl == 'undefined' || null == imageUrl || '' == imageUrl) playlistItem.ApiVideo.thumbnailURL;
    imageUrl = 'https://apps.bmh.manchester.ac.uk/includes/video/thumbnails/' + imageUrl;

    var slide = '<div class="slide"><a href="#jw' + playlistItem.videoId + '">';
    slide += '<div class="carouselImage"><img width="360" src="' + imageUrl + '" alt="' + playlistItem.videoTitle + '" /></div>';
    slide += '<div class="carouselContent">';
    slide += '<h3 class="largeTitle">' + playlistItem.videoTitle + '</h3>';
    if(null != playlistItem.videoDescription) slide += '<p class="description">' + playlistItem.videoDescription + '</p>';
    slide += '</div></a></div>';
    // add the slide to the carousel and add a click event to clear the video area, add the selected video and autoplay it
    $(slide).appendTo(carousel).click(function (e) {
      e.preventDefault();
      // stop the current video before emptying the container, so that events can fire
      var currentPlayerId = $(container).find('.mhsVideo .jwplayer').attr('id');
      if(currentPlayerId) {
        if(jwplayer(currentPlayerId)) {
          if( jwplayer(currentPlayerId).getState() == "PLAYING" || jwplayer(currentPlayerId).getState() == "BUFFERING" ) {
            jwplayer(currentPlayerId).stop();
          }
        }
      }
      $(video).empty();
      LoadVideo(video, canYouTubeBeAccessed, playlistItem.ApiVideo, true);
    });
  });
  if ($(container).width() > 600) {
    $(container).addClass('mhsVideoPlaylistWithCarousel');
    $(carousel).wrap('<div class="wrapper"></div>');
    $(carousel).before('<a href="#" class="prev" title="Show previous"> </a><a href="#" class="next" title="Show next"> </a>');
    CarouselifyPlaylist(carousel);
  } else {
    $(container).addClass('mhsVideoPlaylistWithoutCarousel');
  }
}


function CarouselifyPlaylist(thiscarousel) {
  $(thiscarousel).carouFredSel({
    responsive:  false,
    auto:    false,
    circular: false,
    items:  {
      visible:{
        min:3,
        max:10
      }
    },
    scroll: 1,
    prev:  {
      button: function () {
        return $(this).parents(".wrapper").find('.prev');
      },
      key: "left"
    },
    next:  {
      button: function () {
        return $(this).parents(".wrapper").find('.next');
      },
      key         : "right"
    }
  });

  $(thiscarousel).swipe(
    {
      swipeLeft: function (event, direction, distance, duration, fingerCount) {
        $(thisCarousel).trigger('next');
      },
      swipeRight: function (event, direction, distance, duration, fingerCount) {
        $(thisCarousel).trigger('prev');
      },
      allowPageScroll: 'vertical',
      excludedElements: "button, input, select, textarea, .noSwipe"
    });
}

/* ============================== VIDEO END ============================== */

function convertJsonDateToJavascriptDate(input) {
  if (typeof input != 'undefined') {
    var dateJavaScript = new Date(Date.parse(input));
    return dateJavaScript;
  }
  else {
    return null;
  }
}

/* ============================== Helper Functions ============================== */
$.extend({
    distinct : function(anArray) {
       var result = [];
       $.each(anArray, function(i,v){
           if ($.inArray(v, result) == -1) result.push(v);
       });
       return result;
    }
});

$.extend({
    distinctTrimmed : function(anArray) {
       var result = [];
       $.each(anArray, function(i,v){
           v = v.trim();
           if ($.inArray(v, result) == -1) result.push(v);
       });
       return result;
    }
});