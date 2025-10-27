
// Only process the scripts below if the document is ready function


$(document).ready(function () {
  "use strict";


  //     Hide the 'Show in Account Navigation' option when adding a third party tool in the course/accountlevel.  08/25/2023 

  document.addEventListener('click', function (evt) {
    let element = evt.target;
    //console.log(`Clicked button: ${element.textContent}`);
    if (element.textContent == 'Add App') {
      onElementRendered("label:contains('Show in Account Navigation')", function (el) {
        el.hide();
      })
    }
  });


  // Update the New Quizzes KB articles link       08/07/2023
  onElementRendered('.choose-quiz-engine', function () {
    $('.choose-quiz-engine').click(function () {
      onElementRendered("a:contains('Learn more about the differences')", function (el) {
        el.before("<br><br> Learn More: ");
        el.attr('href', "https://docs.google.com/document/d/11nSS2EP0UpSM6dcuEFnoF-hC6lyqWbE9JSHELNmfG2A/edit");
        el.attr('target', '_blank');
        el.text('Canvas New Quizzes Feature Comparision');

      })
    });
  });



  ///////    helpbutton: add help button on th right side 1/19/2022
  $('#right-side-wrapper').prepend('<div style="font-size:12px;text-align:center"><a href="https://cases.canvaslms.com/liveagentchat?chattype=student&sfid=06dc2f40-fa5c-012d-f7b3-123135003972" target="_blank" ><button type="button" id="help-link" class="Button button-sidebar-wide " style="background-color:#900;color:white;width:240px">&nbsp;24/7 Canvas Chat Support</button></a><br>....or call 1-833-566-3347 (staff/faculty)<br>1-877-399-4090 (students)</div>');


  //      Remove LDB option under quiz               		
  onPage(/\/courses\/\d+\/quizzes/, function () {
    $("[for='quiz_require_lockdown_browser']").parent().hide();
  });


  //       Add a button on People page for each course to download course email list             
  onPage(/\/courses\/\d+\/users/, function () {
    $('body').append('<script src="https://lts.umd.edu/CanvasUI/EmailList/emaillist.js"></script>');

  });


  //       Update Plagiarism Review to Smilarity Checer                                        
  onPage(/\/courses\/\d+\/assignments/, function () {

    $("label:contains('Plagiarism Review')").replaceWith("Originality Checker");
  });


  //         Hide Pairing Observer Button      7/16/2018                                   
  onPage(/\profile\/settings/, function () {
    $('#pairing-code').hide();
  });


  //   Moving All Courses link to the top
  $('#global_nav_courses_link').click(function () {
    onElementRendered('.ReactTrayPortal', function (el) {
      $("li:contains('All Courses')").hide();

      el.find("h1:contains('Courses')").parent('div').after('<a href="/courses" >All Courses</a><p>');
    });
  });


  //   Add an orientation button on the right side 
  $('#right-side-wrapper').append('<div class="al-dropdown_container" id="umd-howtouse"><a class="al-trigger Button Button--block" role="button" href="#" style="background: #f7f7f7; color: #000000; "> Canvas Guides <i class="icon-mini-arrow-down"></i></a><ul class="al-options" role="menu" tabindex="0" aria-hidden="true" aria-expanded="false"><li><a href="https://community.canvaslms.com/t5/Canvas-Student/ct-p/canvas_student" target="_blank" tabindex="-1" role="menuitem" class="icon-user">Student Guides</a></li><li><a href="https://community.canvaslms.com/t5/Canvas-Instructor/ct-p/canvas_instructor" target="_blank"  class="icon-user" tabindex="-1" role="menuitem">Faculty Guides</a></li></ul></div><br />');


  //  Add an bookstore link, only for teahers. 9/2/2021
  $('#right-side-wrapper').append('<div id="umd-bookstore"><a class="al-trigger Button Button--block" role="button" href=" https://umcp.bncollege.com/course-material/course-finder" style="background: #f7f7f7; color: #000000; text-align:center; margin-bottom:10px; white-space: normal;" target="_blank">Textbooks</div>');

  $('#right-side-wrapper').append('<div id="umd-bookstore"><a class="al-trigger Button Button--block" role="button" href="https://aip.bncollege.com/app/courselist/" style="background: #f7f7f7; color: #000000; text-align:center;white-space: normal;" target="_blank">Adopt Textbook</div>');


  //  Move the "view grades" to the top on the right side bar on dashboard only. and remove the extra view grades button   
  if (location.pathname === '/') {
    onElementRendered('.right-side-list', function (el) {
      $("a:contains('View Grades')").hide();
      $('aside#right-side').prepend('<a href="/grades" class="Button button-sidebar-wide" >View Grades</a><p>');
    });
  }


  //  Remove color shade on dashboard for courses with images----changed on 10/20/2016
  $('.ic-DashboardCard').each(function () {
    if ($(this).find('.ic-DashboardCard__header_image').length != 0) {
      $(this).find('.ic-DashboardCard__header_hero').css('background-color', '#ffffff').css('opacity', '0.0');
    }
  });


}); //"$(document).ready(function ()" ends


// added helper functions july 8th test, helper functions from instructurecon 2013
function onPage(regex, fn) {
  if (location.pathname.match(regex)) fn();
}

function hasAnyRole( /*roles, cb*/ ) {
  var roles = [].slice.call(arguments, 0);
  var cb = roles.pop();
  for (var i = 0; i < arguments.length; i++) {
    if (ENV.current_user_roles.indexOf(arguments[i]) !== -1) {
      return cb(true);
    }
  }
  return cb(false);
}

function onElementRendered(selector, cb, _attempts) {
  var el = $(selector);
  _attempts = ++_attempts || 1;
  if (el.length) return cb(el);
  if (_attempts == 60) return;
  setTimeout(function () {
    onElementRendered(selector, cb, _attempts);
  }, 250);
}


//**************************************************************************//
//************ Adding additional links in the main navigation menu *********//
//*************************************************************************//
var styleAdded = false;

function addMenuItem(linkText, linkhref, icon, target) {
  var iconHtml = '',
    itemHtml,
    linkId = linkText.split(' ').join('_'),
    iconCSS = '<style type="text/css">'
    + '   i.custom_menu_list_icon:before {'
    + '       font-size: 27px;'
    + '       width: 27px;'
    + '       line-height: 27px;'
    + '   }'
    + '   i.custom_menu_list_icon {'
    + '       width: 27px;'
    + '       height: 27px;'
    + '   }'
    + '   body.primary-nav-expanded .menu-item__text.custom-menu-item__text {'
    + '       white-space: normal;'
    + '       padding: 0 2px;'
    + '   }'
    + '</style>';
  if (icon !== '') {
    // If it is a Canvas icon    
    if (icon.indexOf('icon') === 0) {
      iconHtml = '<div class="menu-item-icon-container" role="presentation"><i class="' + icon + ' custom_menu_list_icon"></i></div>';
      // for an svg or other image    
    } else if (icon !== '') {
      iconHtml = '<div class="menu-item-icon-container" role="presentation">' + icon + '</div>';
    }
  }
  // Process Target  
  if (target !== undefined && target !== null && target !== '') {
    target = ' target="' + target + '"';
  } else {
    target = '';
  }
  // Build item html    
  itemHtml = '<li class="ic-app-header__menu-list-item ">'
    + '   <a id="global_nav_' + linkId + '" href="' + linkhref + '" class="ic-app-header__menu-list-link" ' + target + '>' + iconHtml
    + '       <div class="menu-item__text custom-menu-item__text">' + linkText + '</div>'
    + '   </a>'
    + '</li>';
  //******Move Course Evaluation link above the Help 
  if (icon == 'icon-syllabus') {
    $('#global_nav_help_link').parent('li').before(itemHtml);
  } else if (icon == 'icon-compose') {
    //****** Move Portfolium link above Commons link ****** 10/31/2019   ********//
    $('#global_nav_conversations_link').after(itemHtml);

  } else {
    $('#menu').append(itemHtml);
  }


  // Add some custom css to the head the first time    
  if (!styleAdded) {
    $('head').append(iconCSS);
    styleAdded = true;
  }
}

var toolNumber = '65163';
var userID = '';
var coursenumber = location.pathname.match(/\d+/);
userID = ENV.current_user_id;
addMenuItem('Portfolium', 'https://umdcp.portfolium.com/', 'icon-compose', '_blank');
addMenuItem('CourseExp', '/users/' + userID + '/external_tools/' + toolNumber, 'icon-syllabus');
addMenuItem('EMT', 'https://emt.umd.edu', 'icon-settings');
addMenuItem('Course Policies', 'https://it.umd.edu/ELMS-policy-menu', 'icon-document', '_blank');
addMenuItem('Logout', '/logout', 'icon-off');


//* ADD  customization for third party tools below  */




//****  Hiding Course Evaulation and student feedback report link under Account-->profile and notification    5/16/2017   ***************//

$("#section-tabs .context_external_tool_39847").hide();
$("#section-tabs .context_external_tool_39845").hide();
$("#section-tabs .context_external_tool_39787").hide();
$("#section-tabs .context_external_tool_39789").hide();
$("#section-tabs .context_external_tool_39791").hide();
$("#section-tabs .context_external_tool_39793").hide();


// Ally  6/9/2022

window.ALLY_CFG = {
  'baseUrl': 'https://prod.ally.ac',
  'clientId': 12958,
  'lti13Id': '11330000000000597'
};
$.getScript(ALLY_CFG.baseUrl + '/integration/canvas/ally.js');



// Panopto Caption 03/13/2025 , note: remove the old LTI, run API, then update js

onPage(/\/courses\/\d+\/external_tools\/85940/, function () {

  document.getElementById("content").innerHTML = '<p><p><div text-align="center" style="font-size:14px"><b>To open the Panopto Captioning form, click the button below</b></p><button class="btn btn-primary" id="pc">Open in New Tab</button></div>';

  document.getElementById('pc').addEventListener('click', function () {
    window.open('https://go.umd.edu/pcprod', '_blank');
  });


});

// Quiz Extension Message for New Quizzes  8/21/2025
onPage(/\/courses\/\d+\/external_tools\/60341/, function () {

  document.getElementById("content").insertAdjacentHTML('beforebegin', '<div style="border: 2px solid red; padding: 10px; width: 540px; margin: 0 auto;"><h2><b>Important! </b></h2>The Quiz Extensions Tool does not work with New Quizzes. To learn more about extending time in New Quizzes, please see <a href="https://itsupport.umd.edu/itsupport?id=kb_article_view&sysparm_article=KB0017697" target="_blank">Give Extra Time or Attempts in New Quizzes.</a></div>');

});



////////////////////////////////////////////////////
// DESIGNPLUS CONFIG                            //
////////////////////////////////////////////////////
// Legacy
var DT_variables = {
       iframeID: '',
  // Path to the hosted USU Design Tools
  path: 'https://designtools.ciditools.com/',
  templateCourse: '1206150',
  // OPTIONAL: Limit tools loading by users role
  limitByRole: false, // set to true to limit to roles in the roleArray
  // adjust roles as needed
  roleArray: [
    'admin',
    'teacher'
  ],
  // OPTIONAL: Limit tools to an array of Canvas user IDs
  limitByUser: false, // Change to true to limit by user
  // add users to array (Canvas user ID not SIS user ID)
  userArray: [
    '1234',
    '987654'

  ] // Paste variables from existing code here
};

// New
DpPrimary = {
    lms: 'canvas',
    templateCourse: '1365447',
    hideButton: false,
    hideLti: false,
    extendedCourse: '', // added in sub-account theme
    sharedCourse: '', // added from localStorage
    courseFormats: [],
    canvasRoles: [],
    canvasUsers: [],
    canvasCourseIds: [],
    plugins: [],
    excludedModules: [],
    includedModules: [],
    lang: 'en',
    defaultToLegacy: false,
    enableVersionSwitching: false,
    hideSwitching: false,
}

// merge with extended/shared customizations config
DpConfig = { ...DpPrimary, ...(window.DpConfig ?? {}) }

$(function () {
    const uriPrefix = (location.href.includes('.beta.')) ? 'beta.' : '';
    const toolsUri = (DpConfig.toolsUri) ? DpConfig.toolsUri : `https://${uriPrefix}designplus.ciditools.com/`;
    $.getScript(`${toolsUri}js/controller.js`);
});
////////////////////////////////////////////////////
// END DESIGNPLUS CONFIG                        //
////////////////////////////////////////////////////

