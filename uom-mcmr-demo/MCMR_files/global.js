
	/*------------------------------------------------*/
	/* Reset the global cache for ajax loaded scripts */
	/*------------------------------------------------*/
		$.ajaxSetup({
			cache: true
		});
	
	
	/* Global DOM elements */
		var html;
		var body;
		var bodyWidth;
		var sideMenuShowHide = $('.primaryLeftNav a.showHideIcon');
		var hideMenuTimer;
	
	
	/* Global Vars */
		var accordionOffsetTop = 0;
		var showFullScreenContent = false;
		var carouselInitialised = false;
		var screenResizerTimer;
		
		var accordionOffsetTop = 0;
		var tabMode;

	
	//---------------------------------
	//Equal Height for any class passed
	//---------------------------------
		$.fn.equalizeHeights = function ()
		{
			return this.height(Math.max.apply(this, $(this).map(function (i, e) 
			{
				return $(e).height()
			}).get()))
		}
	//-------------------------------------
	//END Equal Height for any class passed
	//-------------------------------------
	
	 
	$(document).ready(function()
	{
	
		/*----------------------------------------------------------------------------------------------*/
		/*		CUSTOM SCRIPT																			*/
		/*----------------------------------------------------------------------------------------------*/
		
		
			html = $('html');
			body = $('body');

			
			

			/* LAZY LOAD VIDEO */
				
				/* Insert the play button */
					$('.videoContainer.lazyLoad').each(function()
					{
						$(this).append('<div class="playButton"></div>');
					})
				
				
				
				/* Insert the iframe for the video & hide poster image and play button */
					$('.playButton').on('click', function(e)
					{
						e.preventDefault();
						
						var posterImage = $(this).prev()
						console.log(posterImage)

						var videoID = posterImage.attr('src').split('vi/').pop();
						console.log('videoID: '+videoID);

						videoID = videoID.split('/').shift();
						console.log('videoID: '+videoID);

						$('html, body').animate({scrollTop: 0});
						
						$('.responsve-video-wrapper').empty();
						setTimeout(function()
						{
							$('.responsve-video-wrapper').append('<iframe src="https://www.youtube-nocookie.com/embed/'+videoID+'?wmode=transparent&autoplay=1" frameborder="0" allowfullscreen></iframe>')
							
						},100)

					})
			
			/* END LAZY LOAD VIDEO */




			/*------------*/
			/* SOCIAL TAB */
			/*------------*/
				$('.social-tab span').on('click', function(e)
				{
					e.preventDefault();
					
					$('.social-tab').addClass('active');

					$('.overlay').addClass('active');

					if ( $(this).hasClass('twitter') )
					{
						openTwitter();

					}else if ( $(this).hasClass('facebook') ){
						
						openFacebook();
						
					}else if ( $(this).hasClass('arrow') ){
						
						if($(this).hasClass('active')){
							
							closeSocialTab();
							
						}else if($('.social-tab').has('span.twitter')){
							
							openTwitter();
							
						}else if($('.social-tab').has('span.facebook')){
							
							openFacebook();
						}
					}
					else
					{
						closeSocialTab()
					}
				})

				$('.overlay').on('click', function()
				{
					closeSocialTab()
				})

				function openTwitter()
				{
					$('.tab_container').addClass('active')
					$('.social-content').hide();
					$('.twitter-content').show();
					$('.social-tab span').removeClass('active')
					$(this).addClass('active')
					$('.social-tab .arrow').addClass('active')
				}
				function openFacebook()
				{
					$('.tab_container').addClass('active')
					$('.social-content').hide();
					$('.facebook-content').show()
					$('.social-tab span').removeClass('active')
					$(this).addClass('active')
					$('.social-tab .arrow').addClass('active')
				}
				function closeSocialTab()
				{
					$('.social-tab').removeClass('active');
					$('.tab_container').removeClass('active');
					$('.social-tab span').removeClass('active')
					$('.overlay').removeClass('active');
					$('.social-tab .arrow').removeClass('active')
				}
			/*----------------*/
			/* END SOCIAL TAB */
			/*----------------*/


			

			/*---------------------------------------*/
			/* ROLLOVER FOR INLINE BACKGROUND IMAGES */
			/*---------------------------------------*/

			// $('.discover a').mouseenter(function()
			// {
			// 	$(this).find('span.icon').css({'background-position':'0 -73px'})
				
			// })
			// $('.discover a').mouseleave(function()
			// {
			// 	$(this).find('span.icon').css({'background-position':'0 0'})
				
			// })
			/*-------------------------------------------*/
			/* END ROLLOVER FOR INLINE BACKGROUND IMAGES */
			/*-------------------------------------------*/


			/*-----------*/
			/* MEGA MENU */
			/*-----------*/
				$(".megaMenu").hoverIntent({
					over: showMegaMenu,
					out: hideMegaMenu,
					timeout: 400,
					selector: "li.menuItem"
				});
				function showMegaMenu() {
					$(this).addClass("hover");
				}

				function hideMegaMenu() {
					$(this).removeClass("hover");
				}
			
			// $('.megaMenu').on('mouseenter', '.megaLink', function()
			// {
			// 	$(this).next().show();
			// })
			/*---------------*/
			/* END MEGA MENU */
			/*---------------*/
			
			
			
			/*--------------*/
			/* SEARCH PANEL */
			/*--------------*/
				$('.search-icon').click(function(e)
				{
					e.preventDefault();
					$('.search-options').slideToggle(function()
					{
						$('.searchInputWrapper input').focus()						
					});
				})
			/*------------------*/
			/* END SEARCH PANEL */
			/*------------------*/
			
			
			/*-----------*/
			/* ACCORDION */
			/*-----------*/
				var singlePanel = false;		//true = expand only 1 panel | false = expand multiple panels
				
				$('.accordionPanel .titleHeader').on('click', function()
				{
					if ( singlePanel )
					{
						$('.contentDetails').slideUp();
			
						if( $(this).siblings().is(':hidden') == true )
						{
							$(this).next().slideDown('normal');
						} 
					}
					else
					{
						if ( !$(this).parent().hasClass('active') )
						{
							$(this).parent().addClass('active');
							$(this).next('.contentDetails').slideDown();
						}
						else
						{
							$(this).next('.contentDetails').slideUp(function()
							{
								$(this).parent().removeClass('active');
							});
						}
					}
				})
				
				
				/* Show a panel if it's already set to active */
				if ( $('.accordionPanel').length )
				{
					$('.accordionPanel').each(function()
					{
						if ( $(this).hasClass('active') )
						{
							$(this).children('.contentDetails').show()
						}
					})
				}
				
			/*---------------*/
			/* END ACCORDION */
			/*---------------*/		



			/*------------------*/
			/* Tabs / Accordion */
			/*------------------*/
			
				/* Tabs */
				$('.tabTitles li a.tabLink').click(function(e)
				{
					e.preventDefault();
					
					$('.tabTitles li').removeClass('activeTabLink');
					$(this).parent().addClass('activeTabLink');
					
					var thisIndex = $(this).parent().index();

					$('.tabPanelContainer .tabPanel').addClass('jsHide');
					$('.tabPanelContainer .tabPanel:eq('+thisIndex+')').removeClass('jsHide');
					
					forceLazyLoad(thisIndex);
				});

				var hash = window.location.hash.substr(1).replace("d.en.", "");

				if ($("#d\\.en\\." + hash).hasClass("internalTitle"))
				{
					$("#d\\.en\\." + hash + " a.accordionLink").addClass("activeAccordionLink");
					$("#d\\.en\\." + hash).next().slideDown().addClass("activeAccordionPanel");

					var thisIndex = $("#d\\.en\\." + hash).parent().index();
					forceLazyLoad(thisIndex);
				}

				/* Accordion */
				$("h2.internalTitle a.accordionLink").click(function(e) {
					e.preventDefault();
					var $this = $(this);
					
					/* If we're NOT clicking the already active title */
					if (!$(this).hasClass("activeAccordionLink")) {
						$(this).addClass("activeAccordionLink");
						$(this).parent().next().slideDown().addClass("activeAccordionPanel");

						// Lazy load images in this accordion item.
						$("#d\\.en\\." + $this.parent().attr("id").replace("d.en.", "")).parent().find("img").lazyload();

						// Equalise the heights of colour promo boxes within rows.
						if ($(".inner .clearfix .sixcol.colourPromo").length > 1) {
							$(".inner .clearfix").has(".sixcol.colourPromo").each(function() {
								equaliseHeightRows(".sixcol.colourPromo", this);
							});
						}

						if ($(".inner .clearfix .fourcol.colourPromo").length > 1) {
							$(".inner .clearfix").has(".fourcol.colourPromo").each(function() {
								equaliseHeightRows(".fourcol.colourPromo", this);
							});
						}

						if (bodyWidth >= 960) {
							if ($("div.tabPanelWrapper.activeAccordionPanel ul.gridList.displayAsGrid").not(".noEqualise").length > 0) {
								$("div.tabPanelWrapper.activeAccordionPanel ul.gridList.displayAsGrid").not(".noEqualise").each(function() {
									equaliseHeightRows("li", this);
								});
							}
						} else {
							$("ul.gridList.displayAsGrid li").removeAttr("style");
						}
					}
					else {
						$this.removeClass("activeAccordionLink");
						$this.parent().next().slideUp().removeClass("activeAccordionPanel");
					}
				});
			/*----------------------*/
			/* END Tabs / Accordion */
			/*----------------------*/


		
		
			/*--------------------------------------*/
			/* 2 touch process for mega menu 		*/
			/* touch class is added via modernizr 	*/
			/*--------------------------------------*/
				$('.touch .menuItem a.megaLink').on('touchstart', function(e)
				{
					if ( !$(this).parent().hasClass('active') )
					{
						$('.touch .menuItem').removeClass('active');
						$(this).parent().addClass('active');
						$(this).next('.megaContent').addClass('active')
						return false;
					}
					else
					{
						return true
					}
				})
				
				
				$('body').on('touchstart click', function(e)
				{
					//if parent of this click is NOT clickout AND this click is NOT clickout then hide stuff
					if( !$(e.target).parents().is('.clickOut') )
					{
						$('.touch .menuItem').removeClass('active');
						$('.megaContent').removeClass('active')
					}
				});
				
			/*-----------------------------------*/
			/* END 2 touch process for mega menu */
			/*-----------------------------------*/
			
			
			
			/*-----------------------*/
			/* Multi Col Test & Load */
			/*-----------------------*/
				Modernizr.load(
				{
					test: 		Modernizr.csscolumns,
					nope: 		'/assets/js/libs/columnizer.js',
					callback:	function(url, result, key)
								{
									$('.multiColList').makeacolumnlists({cols:3, colWidth:0, equalHeight: 'ul', startN: 1});
								}
				});
			/*---------------------------*/
			/* END Multi Col Test & Load */
			/*---------------------------*/

			
			
			/*----------------------------------*/
			/* Auto expand menu - Memory effect */
			/*----------------------------------*/
			
				/* Initialise if menu shows persistent active state */
					var memoryEffect = true;
				
				/* Show menu expanded to show active state */
					if ( $('.primaryLeftNav li.activeMenuLink').length && memoryEffect)
					{
						$('li.activeMenuLink').parents('ul').each(function()
						{
							$(this).show();
							$(this).parent().addClass('open');
						})						
					}
			
			/*--------------------------------------*/
			/* END Auto expand menu - Memory effect */
			/*--------------------------------------*/
			
			
			
			
			
			/*-------------------------------*/
			/* Show / Hide Sub Nav (DESKTOP) */
			/*-------------------------------*/
			
				/* Initialise collapse menu */
					var collapseSideAll = true;  //false = collapse this branch | true = collapse every open branch
				
				
				/* Collapse menu functions */
					function getSideBranch(elem)  //LI parent of clicked A is passed
					{
						var thisChildLists = $(elem).find('ul');  //get all child UL's in every sub level in this LI branch
						var thisChildLinks = thisChildLists.find('a.showHideIcon');  //get all A's in every sub level that can be expanded
						var thisChildLinksActive = thisChildLists.find('li.activeMenuLink');  //get all A's in every sub level that can be expanded
						
						return {'thisChildLists': thisChildLists, 'thisChildLinks': thisChildLinks, 'thisChildLinksActive':thisChildLinksActive};
					}
					
					function closeSideBranch(branch)
					{
						$(branch.thisChildLists).hide();  //Hide all the UL's at every sub level
						$(branch.thisChildLinks).parent().parent().removeClass('open');  //remove "open" class from all open LI's
					}
				
			
				$(sideMenuShowHide).click(function(e)
				{
					e.preventDefault(); 
					
					/* OPEN STUFF */
					if ( !$(this).parent().parent().hasClass('open') )
					{
						if (collapseSideAll)
						{
							var prevLI = $(this).parent().parent().siblings('li.open');  //get the siblings branch that is open
							
							$(prevLI).find('ul').slideUp(200).promise().done(function()  //find ALL the UL's in the open branch and close them
							{
								$(prevLI).removeClass('open');
								
								var branch = getSideBranch(prevLI);
								closeSideBranch(branch);  //close all the child branches
							})
						}
					
						$(this).parent().parent().addClass('open'); //adds "open" to the LI
						$(this).parent().parent().find('ul').first().slideDown(200); 
					}
					
					/* CLOSE STUFF */
					else
					{
						var branch = getSideBranch( $(this).parent().parent() );
						
						$(this).parent().parent().removeClass('open'); 
						$(this).parent().parent().find('ul').first().slideUp(200, function()
						{
							closeSideBranch(branch);
						}); 
					}
				}); 
			/*-----------------------------------*/
			/* END Show / Hide Sub Nav (DESKTOP) */
			/*-----------------------------------*/	
			

			
			/*------------------*/
			/* Tabs / Accordion */
			/*------------------*/
			
				/* Tabs */
				$('.tabTitles li a.tabLink').click(function(e)
				{
					e.preventDefault();
					
					$('.tabTitles li').removeClass('activeTabLink');
					$(this).parent().addClass('activeTabLink');
					
					var thisIndex = $(this).parent().index();

					$('.tabPanelContainer .tabPanel').addClass('jsHide');
					$('.tabPanelContainer .tabPanel:eq('+thisIndex+')').removeClass('jsHide');
					
					forceLazyLoad(thisIndex);
				})
				
				
				/* Accordion */
				$('h2.internalTitle a.accordianLink').click(function(e)
				{
					e.preventDefault();
					
					var thisIndex = $(this).parent().parent().index();
					
					/* If we're NOT clicking the already active title */
					if ( !$(this).hasClass('activeAccordionLink') )
					{
						/* All active titles, remove active class */
						$('h2.internalTitle a').removeClass('activeAccordionLink');
						$(this).addClass('activeAccordionLink');
						
						/* All panels, slide up, remove active class */
						$('.tabPanelContainer .activeAccordionPanel').slideUp(function()
						{
							$(this).removeClass('activeAccordionPanel');
						})
						$(this).parent().next().slideDown().addClass('activeAccordionPanel');
						
						forceLazyLoad(thisIndex);
						
						/* get accordion link height */
							var linkHeight = $(this).outerHeight();
							
						/* how many links high */
							var totalLinkHeight = linkHeight * thisIndex;
						
						/* scroll to the top of this tab */
							$('html, body').animate({scrollTop: accordionOffsetTop+totalLinkHeight}, 1000, function()
							{
								$('.secondMenuBar').removeClass('slideSecondMenu');
							});
					}
				})
			/*----------------------*/
			/* END Tabs / Accordion */
			/*----------------------*/

			
			
			/*------------------------------------*/
			/* Scroll - show secondary menu icon */
			/*------------------------------------*/
				var currentScroll=0;
				var previousScroll = 0;
				var scrollThreshold = 500;
				var android3Plus = false
				
				
				/* Check for specific threshold of Android */
					var ua = navigator.userAgent;
					if( ua.indexOf("Android") >= 0 )
					{
						var androidversion = parseFloat(ua.slice(ua.indexOf("Android")+8)); 
						if (androidversion > 3)
						{
							android3Plus = true
						}
					}
				
				
				/* JS Detect mobile platforms */
					var isMobile =	{	BlackBerry: function()	{return navigator.userAgent.match(/BlackBerry/i);},
										iOS: function()			{return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
										Opera: function()		{return navigator.userAgent.match(/Opera Mini/i);},
										Windows: function()		{return navigator.userAgent.match(/IEMobile/i);},
										any: function()			{return (isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
									};
				/* END JS Detect mobile platforms */
				
				
				
				
				$(window).scroll(function()
				{
					currentScroll = $(this).scrollTop();
					
					if ( isMobile.any() || android3Plus)
					{
						if (currentScroll > scrollThreshold)  //threshold has been reached - can we show the menu?
						{
							if (currentScroll > previousScroll)  //we are scrolling down, HIDE the menu
							{
								$('.secondMenuBar').removeClass('slideSecondMenu');
							}
							else
							{
								$('.secondMenuBar').addClass('slideSecondMenu');  //we are scrolling up, SHOW the menu
							}
							previousScroll = currentScroll;
						}
						else
						{
							$('.secondMenuBar').removeClass('slideSecondMenu');  //we are lower than threshold, HIDE the menu
						}
					}
				});
			/*---------------------------------------*/
			/* END Scroll - show secondary menu icon */
			/*---------------------------------------*/
		
		
		
		
		
		
		
		
		/*----------------------------------------------------------------------------------------------*/
		/*		FORM SCRIPT																				*/
		/*----------------------------------------------------------------------------------------------*/
		
			/*------------------*/
			/* Fake Placeholder */
			/*------------------*/
				if(!Modernizr.input.placeholder)
				{
					$("input:not('.noIEPlaceholder'), textarea").each(function()  //loop through all inputs & textareas
					{
					
						var thisPlaceholderText = $(this).attr("placeholder")  //get the placeholder text
					
						if( $(this).val() == "" && thisPlaceholderText != "" )  //if the current "value" attribute is empty AND placeholder text isn't empty
						{
							$(this).val( thisPlaceholderText );  //set the "value" attibute to the placeholder text
							$(this).addClass('placeholderTextColor');  //set the text to the fake color (placeholder colour)
							
							$(this).focus(function()
							{
								if( $(this).val() == thisPlaceholderText )  //if the "value" attribute is equal to the placeholder value, i.e. empty
								{
									$(this).val("");  //clear the "value" attribute
									$(this).addClass('formFocusTextColor')  //change the colour to the proper input colour
								}
							});
							
							$(this).blur(function()
							{
								if($(this).val()=="") //if the "value" attribute is empty, (no text was entered)
								{
									$(this).val( thisPlaceholderText );  //set the "value" attibute to the placeholder text
									$(this).removeClass('formFocusTextColor');  //remove the colour to the proper input colour, reverts back to placeholder colour
								}
							});
						}
					});
				};
			/*----------------------*/
			/* END Fake Placeholder */
			/*----------------------*/
			
			
			
			/*-------------------*/
			/* Postcode validate */
			/*-------------------*/
				$('.postcodeCheck').blur(function()
				{	
					if ( $(this).val() != '' )
					{
						var myregex = /^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$/
						
						var matches = myregex.exec($(this).val());
						
						if (matches)
						{
							$('.crossIcon').remove();
							$(this).after('<div class="tickIcon" />');
							$(this).addClass('doubleIconPadding');
						}
						else
						{
							$('.tickIcon').remove();
							$(this).after('<div class="crossIcon" />');
							$(this).addClass('doubleIconPadding');
						}
					}
					else
					{
						$('.crossIcon').remove();
						$('.tickIcon').remove();
						$(this).removeClass('doubleIconPadding');
					}
				})
			/*-----------------------*/
			/* END Postcode validate */
			/*-----------------------*/
			
			
			
			/*-----------------------*/
			/* Email format validate */
			/*-----------------------*/
				$('.emailCheck').blur(function()
				{
					if ( $(this).val() != '' )
					{
						var myregex = /^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
						
						var matches = myregex.exec($(this).val());
					
						if (matches)
						{
							$('.crossIcon').remove();
							$(this).after('<div class="tickIcon" />');
							$(this).addClass('doubleIconPadding');
						}
						else
						{
							$('.tickIcon').remove();
							$(this).after('<div class="crossIcon" />');
							$(this).addClass('doubleIconPadding');
						}
					}
					else
					{
						$('.crossIcon').remove();
						$('.tickIcon').remove();
						$(this).removeClass('doubleIconPadding');
					}
				})
			/*---------------------------*/
			/* END Email format validate */
			/*---------------------------*/
		
		
		
			/*--------------*/
			/* Numbers only */
			/*--------------*/
				var inputObject = $('.numberCheck');
			
				/*Restrict the INPUT to numbers only*/
				$(inputObject).keydown(function(event)
				{
					checkKeycode(event);
				});

				function checkKeycode(event)
				{
					/*TRIGGER LIST*/
						if ( (!event.shiftKey && !event.ctrlKey && !event.altKey) &&  ( (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) ) )
						{
							return;
						}
					/*IGNORE LIST - If its one of these keys, just ignore it*/
						else if ( event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 35 || event.keyCode == 36 || event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 46 )
						{
							return;
						}
					//RESET THE INPUT TO BLANK
						else if( event.keyCode == 27 )
						{
							$(inputObject).val('');
						}
					/*PREVENT LIST - else, its not ignorable, or a number, therefore we don't want it*/
						else
						{
							event.preventDefault();
						}
				}
			/*------------------*/
			/* END Numbers only */
			/*------------------*/	



			/*----------------------------------------*/
			/* Dropdown: show/hide hidden form fields */
			/*----------------------------------------*/
				$('.titleSelect').change(function()
				{
					var changeTo = $(this).val();
					var extraRow = $(this).parent().find('.extraRow');
					
					if(changeTo == "other" || changeTo == "Other")
					{
						extraRow.slideDown().removeClass('hidden');
					}
					else
					{
						extraRow.slideUp().addClass('hidden');
					}
				});
			/*--------------------------------------------*/
			/* END Dropdown: show/hide hidden form fields */
			/*--------------------------------------------*/
			
			
			/*------------------------------------------------------------------------------*/
			/* Character Counter - http://hycus.com/2011/03/25/simple-jquery-character-count
			/*------------------------------------------------------------------------------*/
				$('.commentsCount').bind('keyup', function()
				{
					var maxchar = 500;
					var count = $(this).val().length;
					var remainingchar = maxchar - count;
					if(remainingchar < 0)
					{
						$('#counterNumber').html('0');
						$(this).val($(this).val().slice(0, 500));
					}
					else
					{
						$('#counterNumber').html(remainingchar);
					}
				});
			/*----------------------------------------------------------------------------------*/
			/* END Character Counter - http://hycus.com/2011/03/25/simple-jquery-character-count
			/*----------------------------------------------------------------------------------*/



			/*----------------*/
			/* Add Clear Icon */
			/*----------------*/
				$('.gt-ie7 input:text, .gt-ie7 input:password, .gt-ie7 input.numberCheck, .gt-ie7 input.emailCheck, .gt-ie7 textarea').not(".noClear").each(function()
				{
					$(this).wrap('<div class="inputWrapper" />');
					$(this).after('<div class="clearIcon" />');
					$(this).addClass('clearIconPadding');
				})
			/*--------------------*/
			/* END Add Clear Icon */
			/*--------------------*/
			
			
			
			/*-------------------*/
			/* Add Password Icon */
			/*-------------------*/
				$('.gt-ie7 input:password').not(".noClear").each(function()
				{
					$(this).after('<div class="passwordIcon" />');
					$(this).addClass('doubleIconPadding');
				})
			/*-----------------------*/
			/* END Add Password Icon */
			/*-----------------------*/
			
			

			/*------------------------*/
			/* Show / Hide clear icon */
			/*------------------------*/
				// var clearInputTimer; - if no errors, delete this
				
				/* FOCUS */
				function inputFocus()
				{
					$('.gt-ie7 input:text, .gt-ie7 input:password, .gt-ie7 input.numberCheck, .gt-ie7 input.emailCheck, .gt-ie7 textarea').focus(function()
					{						
						$(this).siblings('.clearIcon').show();
						$(this).siblings('.passwordIcon').addClass('movePasswordIcon');
					})
				}
				inputFocus();

				
				/* BLUR */
				function inputBlur()
				{
					$('.gt-ie7 input:text, .gt-ie7 input:password, .gt-ie7 input.numberCheck, .gt-ie7 input.emailCheck, .gt-ie7 textarea').blur(function()
					{
						if ( $(this).val() == '')
						{
							$(this).siblings('.clearIcon').hide();
							$(this).siblings('.passwordIcon').removeClass('movePasswordIcon');
						}
					})
				}
				inputBlur();
			/*----------------------------*/
			/* END Show / Hide clear icon */
			/*----------------------------*/

			
			
			/*--------------------*/
			/* Password show/hide */
			/*--------------------*/
				//Get all ATTRs for DOM element
				$.fn.getAttributes = function()
				{
					var attributes = {}; 

					if(!this.length)
						return this;

					$.each(this[0].attributes, function(index, attr)
					{
						attributes[attr.name] = attr.value;
					}); 
					return attributes;
				}
				
				//Create a new HTML string for our password input box
				function createNewPasswordInput(attrList)
				{
					var htmlString = '<input ';
					$.each(attrList, function(key, value)
					{ 
						htmlString += key +'="'+value+'" ';
					});
					htmlString +='>';
					return htmlString;
				}
				
				
				$('.passwordIcon').click(function()
				{
					//DOM Element - password input
						var passwordInputBox = $(this).prev('input');
					
					//Get password input attributes
						var attrList = $(passwordInputBox).getAttributes();
						
					//Upate the VALUE ATTR with what has been typed
						$(attrList).attr('value', $(passwordInputBox).val());
					
					
					if ( !$(this).hasClass('passwordIcon-show') ) //is checkbox checked
					{
						$(this).addClass('passwordIcon-show');
						$(attrList).attr('type', 'text');  //Change TYPE to TEXT
						passwordInputClone = createNewPasswordInput(attrList);  //Create new INPUT box with changed type & value attributes
					}
					else
					{
						$(this).removeClass('passwordIcon-show');
						$(attrList).attr('type', 'password');  //Change TYPE to TEXT
						passwordInputClone = createNewPasswordInput(attrList);  //Create new INPUT box with changed type & value attributes
					}
					$(passwordInputBox).replaceWith(passwordInputClone);
					
					inputFocus();
					inputBlur();
					listenForEscKey();
					
				});
			/*------------------------*/
			/* END Password show/hide */
			/*------------------------*/
			
			
			
			/*-------------------------------------------*/
			/* Clear the input field with the clear icon */
			/*-------------------------------------------*/
				$('.clearIcon').click(function()
				{
					$(this).siblings('input').val('');
					$(this).siblings('textarea').val('');
					$('#counterNumber').text('500');
					
					$(this).hide();
					$(this).siblings('.passwordIcon').removeClass('movePasswordIcon');
					$('.crossIcon').remove();
					$('.tickIcon').remove();
					$(this).removeClass('doubleIconPadding');
				})
			/*-----------------------------------------------*/
			/* END Clear the input field with the clear icon */
			/*-----------------------------------------------*/
			
			
			
			/*----------------------------------------*/
			/* Clear the input field with the Esc key */
			/*----------------------------------------*/
				function listenForEscKey()
				{
					$('input:text, input.password, input.numberCheck, input.emailCheck, textarea').keydown(function(event)
					{
						if( event.keyCode == 27 )
						{
							$(this).val('');
						}
					});
				}
				listenForEscKey()
			/*--------------------------------------------*/
			/* END Clear the input field with the Esc key */
			/*--------------------------------------------*/

			
		
		
		/*----------------------------------------------------------------------------------------------*/
		/*		PLUGIN SCRIPT																			*/
		/*----------------------------------------------------------------------------------------------*/



			/*------------------*/
			/* Lazy load images */
			/*------------------*/
				$("img.lazy:not('img.noLazy')").lazyload({
					effect:	"fadeIn",
					load : function()
		            {
						if ( $(this).attr("src") != "data:image/gif;base64,R0lGODlhAQABAIAAAPT09AAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==")
						{
							$('.eqHeights-lazy').attr('style','')
							$('.eqHeights-lazy').equalizeHeights();
						}
		            }
				});
			/*----------------------*/
			/* END Lazy load images */
			/*----------------------*/
/* emt */
			/*----------------------*/
			/*       Video          */
			/*----------------------*/
			$(".playvideo2").click(function() {
			//			$("span", this).hide();
			
						var containerId = $(this).siblings("div.video").prop("id");
						var videoSource = $(this).attr("data-videosource");
						var videoId = $(this).attr("data-videoid");
						var videoUrl = $(this).attr("data-videourl");
						var poster = $("img.poster", this).prop("src");
			
			//			if (videoSource == "university")
			//			{
							if (window.jwplayer)
							{
								playVideo(containerId, videoSource, videoId, videoUrl, poster);
							}
							else
							{
								//$.getScript("http://jwpsrv.com/library/wrqx4EevEeOv_CIACqoGtw.js", function() {
								//$.getScript("//jwpsrv.com/library/wrqx4EevEeOv_CIACqoGtw.js", function() {
								$.getScript("https://content.jwplatform.com/libraries/GAxgn6Z5.js", function() {
									playVideo(containerId, videoSource, videoId, videoUrl, poster);
								});
							}
			/*
						}
						else
						{
							$("#" + containerId).replaceWith('<iframe src="https://www.youtube-nocookie.com/embed/' + videoId + '?wmode=transparent&autoplay=1" frameborder="0" allowfullscreen></iframe>');
						}
			*/
						return false;
					});
					
					
					
function playVideo(containerId, videoSource, videoId, videoUrl, poster) {
		var width;
		var height;

		if ($("html").hasClass("ie7"))
		{
			width = 640;
			height = 360;
		}
		else
		{
			width = "100%";
			height = 0;
		}

		if (videoSource == "YouTube")
		{
			jwplayer(containerId).setup({
				"id": containerId,
				width: width,
//				height: height,
				aspectratio: "16:9",
				"stretching": "fill",
//				"abouttext": "The University of Manchester",
//				"aboutlink": "http://www.manchester.ac.uk",
				"image": poster,
				"autostart": "true",
				file: "http://www.youtube.com/watch?v=" + videoId,
				ga: {},
				sharing: {
					heading: "Share video"
				}
			});
		}
		else if (videoSource == "Video Portal")
		{
			jwplayer(containerId).setup({
				"id": containerId,
				width: width,
				aspectratio: "16:9",
				"stretching": "fill",
				"image": poster,
				"autostart": "true",
				file: videoUrl,
				ga: {},
				sharing: {
					heading: "Share video"
				}
			});
		}
		else
		{
/*
How to resize images and video to fit the display. Can be none (keep original dimensions), exactfit (stretch disproportionally), uniform (stretch proportionally; black borders) or fill (stretch proportionally; parts cut off). Defaults to uniform.
*/
			jwplayer(containerId).setup({
				"id": containerId,
				width: width,
//				height: height,
				aspectratio: "16:9",
//				"stretching": "none",
				"stretching": "exactfit",
//				"stretching": "uniform",
//				"stretching": "fill",
//				"abouttext": "The University of Manchester",
//				"aboutlink": "http://www.manchester.ac.uk",
				"image": poster,
				"autostart": "true",
				sources: [
					{ file: "http://helix.stream.manchester.ac.uk/flash/" + videoId + "_lo.mp4", label: "SD" },
					{ file: "http://helix.stream.manchester.ac.uk/flash/" + videoId + "_hi.mp4", label: "HD", "default": "true" },
					{ file: "rtmp://helix.stream.manchester.ac.uk/flash/" + videoId + "_hi.mp4", label: "HD" }
				],
				ga: {},
				sharing: {
					heading: "Share video"
				}
			});
		}
	}					
					
					
					
					
			/*----------------------*/
			/*   End Video          */
			/*----------------------*/
/* emt */

			/*------------------------------------------------------*/
			/* Custom lazy load										*/
			/* Find all lazy load images, swap src, make opacity 0	*/
			/* Animate fade in										*/
			/*------------------------------------------------------*/
				function forceLazyLoad(position)
				{
					$('.tabPanelContainer .tabPanel:eq('+position+') img.noLazy').each(function()
					{
						if ( !$(this).hasClass('loaded') )
						{
							$(this).addClass('loaded');
							var origImg = $(this).attr('data-original');
							
							$(this).css({'opacity':'0'}).attr('src', origImg);
							
							$(this).animate({'opacity':'1'});
						}
					})
				}
			/*----------------------*/
			/* END Custom lazy load */
			/*----------------------*/

	});



	
	

	$(window).load(function ()
	{
		$('.eqHeights').equalizeHeights();
		$('.tabsContainer a').equalizeHeights();
		


			$('a.lightbox').imageLightbox(
			{

			});

			if ( $('.colourPromo').length )
			{
				equaliseHeightRows('.colourPromo')
			}


		/*----------------*/
		/* Slick Carousel */
		/*----------------*/
			$('.main-slider').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				fade: true,
				asNavFor: '.nav-slider'
			});

			$('.nav-slider').slick({
				arrows:true,
				prevArrow: '<a class="gallery-carousel-prev" href="#">Previous</a>',
				nextArrow: '<a class="gallery-carousel-next" href="#">Next</a>',
				slidesToShow: 4,
				asNavFor: '.main-slider',
				swipeToSlide:true,
				focusOnSelect: true
			});
		/*--------------------*/
		/* END Slick Carousel */
		/*--------------------*/


		/*-----------------------------------*/
		/* Get the offset of accordion panel */
		/*-----------------------------------*/
			function accordionOffset()
			{
				if ( $('.tabAccordianContainer').length )
				{
					var accordionOffset = $('.tabAccordianContainer').offset();
					accordionOffsetTop = parseInt(accordionOffset.top);
				}
			}
			accordionOffset()
		/*---------------------------------------*/
		/* END Get the offset of accordion panel */
		/*---------------------------------------*/
		
		
		/*----------------------------------------*/
		/* Equalise Tab Widths - Table based tabs */
		/*----------------------------------------*/
			function carouselTabWidth()
			{
				if ( $('table.masthead-pagination').length )
				{
					var td = $('table.masthead-pagination td');
					var tdWidth = 100 / td.length;
					
					$(td).css({'width':''+tdWidth+'%'});
				}
			}
			carouselTabWidth();
		/*--------------------------------------------*/
		/* END Equalise Tab Widths - Table based tabs */
		/*--------------------------------------------*/
		
		
		
		/*-------------------*/
		/* Masthead Carousel */
		/*-------------------*/
			function setCarouselHeight()
			{
				var slideHeight = $('.masthead-slide').height()
				$('.masthead-container').height(slideHeight)
			}
			if ( $('.masthead-container').length )  // Call the masthead height script on load
			{
				setCarouselHeight()
			}
			
			
			$('.masthead-pagination').on('click', 'a', function(e)
			{
				e.preventDefault();
				
				$('.masthead-pagination td').removeClass('active')
				$(this).parent().addClass('active')

				var whichLink = $(this).parent().index();

				var panelToShow = $('.masthead-slide:eq('+whichLink+')');
				
				if ( !$(panelToShow).hasClass('active') )
				{
					$(panelToShow).hide().addClass('working').fadeIn(function()
					{
						$('.masthead-slide').removeClass('active');
						$(this).addClass('active').removeClass('working');
					})
				}
			})
		/*-----------------------*/
		/* END Masthead Carousel */
		/*-----------------------*/

			function initCarousel()
			{					
				if ( $('.carousel').length)  //if it exists and hasn't been initialised
				{
				    $('.carousel').carouFredSel(
					{
							responsive:	true,
							auto:		false,
							items:	{
										// start: 'random',
										width:350,
										visible:{
													min:3,
													max:10
												}
									},
							scroll: 1,
							prev:	{
							            button: function () {
							                return $(this).parents(".wrapper").find('.prev');
							            },
							            key: "left"
									},
							next:	{
							            button: function () {
							                return $(this).parents(".wrapper").find('.next');
							            },
										key         : "right"
									}
					});
						
				    $('.carousel').swipe(
						{
						    swipeLeft:		function(event, direction, distance, duration, fingerCount)
						    {
						        $(this).trigger('next');
						    },
						    swipeRight:		function(event, direction, distance, duration, fingerCount)
						    {
						        $(this).trigger('prev');
						    },
							tap: 			function(event, target) {
							  	$(target).parent().trigger('click');
							},
						    allowPageScroll:'vertical',
						    excludedElements:"button, input, select, textarea, .noSwipe"
					});
						
					carouselInitialised = true
				}
			}
			/* emt */
		/*--------------*/
		/* END Carousel */
		/*--------------*/
		
		
		
		/*--------------------------*/
		/* Equalise heights in rows */
		/*--------------------------*/
			function equaliseHeightRows(objsToEqualise)
			{
				$(objsToEqualise).height('auto')
				var currentTallest = 0,
					 currentRowStart = 0,
					 rowDivs = new Array(),
					 $el,
					 topPosition = 0;

				 $(objsToEqualise).each(function() {

				   $el = $(this);
				   topPostion = $el.position().top;
				   
				   if (currentRowStart != topPostion) {

					 /* we just came to a new row.  Set all the heights on the completed row */
					 for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
					   rowDivs[currentDiv].height(currentTallest);
					 }

					 /* set the variables for the new row */
					 rowDivs.length = 0; // empty the array
					 currentRowStart = topPostion;
					 currentTallest = $el.height();
					 rowDivs.push($el);

				   } else {

					 /* another div on the current row.  Add it to the list and check if it's taller */
					 rowDivs.push($el);
					 currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);

				  }
				   
				  /* do the last row */
				   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
					 rowDivs[currentDiv].height(currentTallest);
				   }
				   
				 });
			}
		
		/*------------------------------*/
		/* END Equalise heights in rows */
		/*------------------------------*/

		
		/*------------*/
		/* Body width */
		/*------------*/
			function bodyWidths()
			{
				// console.log('bodywidth called');
				bodyWidth = viewportSize.getWidth();  //get the true viewport width
				// console.log('bodyWidth: '+bodyWidth);
				
				/*--------------*/
				/*		600		*/
				/*--------------*/
					if (bodyWidth >= 600)
					{
						// console.log('width > 600');
						if ( $('.carousel').length && !carouselInitialised)
						{
							initCarousel();
						}
					}
					else
					{
						// console.log('width < 600');
						if ( $('.carousel').length)
						{
							$('.carousel').trigger('destroy');  //destroy the carousel
							$('.carousel').removeAttr('style');  //remove attributes that destroy method doesn't...grrrrrr
							$('.slide').removeAttr('style');
							carouselInitialised = false
						}
					}
				/*--------------*/
				/*		700		*/
				/*--------------*/
					if (bodyWidth >= 700)
					{
						// console.log('width > 700');
						var firstHeight = $('.studyEq:eq(0)').height()
						$('.studyEq:eq(1)').height(firstHeight)

						$('.eqHeights').attr('style','')
						$('.eqHeights-lazy').attr('style','')
						$('.eqHeights').equalizeHeights();
						$('.eqHeights-lazy').equalizeHeights();
					}
					else
					{
						// console.log('width < 700');
						$('.studyEq').removeAttr('style')
						$('.eqHeights').attr('style','')
						$('.eqHeights-lazy').attr('style','')
					}
			}
			bodyWidths();
		/*----------------*/
		/* END Body width */
		/*----------------*/
		

		
		/*-----------------*/
		/* Window Resizing */
		/*-----------------*/
			$(window).on('resize', function()
			{
				clearTimeout(screenResizerTimer);
						
				screenResizerTimer = setTimeout(function()
				{
					
					bodyWidths();
					accordionOffset();
					
					// setCourseFinderHeight()
				
					if ( $('.masthead-container').length )
					{
						setCarouselHeight();
					}
					
					if ( $('.colourPromo').length )
					{
						equaliseHeightRows('.colourPromo')
					}

				},500);
			})
		/*---------------------*/
		/* END Window Resizing */
		/*---------------------*/




		/*-----------*/
		/* Live Chat */
		/*-----------*/
			setTimeout(function()
			{
				$('.uom_liveChat_container').addClass('hide');
			},500)

			$('.uom_liveChat_tab').click(function()
			{
				$('.uom_liveChat_container').toggleClass('hide');			
			})
		/*---------------*/
		/* END Live Chat */
		/*---------------*/

	});

	
