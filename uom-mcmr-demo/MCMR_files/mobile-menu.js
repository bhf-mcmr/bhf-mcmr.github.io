
	/* GLOBAL VARS */
		var viewportHeight;
		var viewportWidth;
		
		var oldIE;
		
		var html;
		var body;
		
		var resetMenu
		var onlyOneBranch
		
		var mobileIcon;
		var menuShowHide;
		var contentContainer;
		var movableOject;
		
		/* Mobile menu animate fallback */
		var moveOpen = {'right':'0px'};
		var moveClose = {'right':'-1000px'}

		
		
		
		
	/* GLOBAL FUNCTIONS */
		function closeMobileMenu()
		{
			$(mobileIcon).removeClass('active');
			$('.closeOverlay').removeClass('moveOver');
			
			/* Move the object using the most appropriate method */
			if (Modernizr.csstransitions)
			{
				$(movableOject).removeClass('moveOver').on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function()
				{
					resetMobileMenu();
				});
				
			}
			else
			{
				$(movableOject).animate(moveClose, function()
				{
					resetMobileMenu();
				})
			}
			
			
			/* enable scrolling on document */
			/* setTimeout for Firefox bug */
			setTimeout(function()
			{
				$(html).removeClass('noScroll');
				$(body).removeClass('noScroll');
			},25)
		}
		
		
		
		/* Reset ALL branches to closed when menu is closed */
		function resetMobileMenu()
		{
			if (resetMenu)
			{
				var openLI = $('#mobile-menu-container li.open');
				
				$(openLI).removeClass('open');
				$(openLI).find('a.showHideIcon').text('+').removeClass('active');
				
				var branch = getBranch(openLI);
				closeBranch(branch);  //close all the child branches
				refreshMenuSize();  //recalc iScroll limits
			}
		}		
		
		
		
		/* iScroll plugin recalc menu height */
		function refreshMenuSize()
		{
			if (!oldIE)  //only do this if it's IE9+
			{
				refreshMenu();  //recalc iScroll limits
			}
		}
		
		
	
		/* Collapse menu functions */
		function getBranch(elem)  //LI parent of clicked A is passed
		{
			var thisChildLists = $(elem).find('ul');  //get all child UL's in every sub level in this LI branch
			var thisChildLinks = thisChildLists.find('a.showHideIcon');  //get all A's in every sub level that can be expanded
			var thisChildLinksActive = thisChildLists.find('li.activeMenuLink');  //get the current active link
			
			return {'thisChildLists': thisChildLists, 'thisChildLinks': thisChildLinks, 'thisChildLinksActive':thisChildLinksActive};
		}

		

		function closeBranch(branch)
		{
			$(branch.thisChildLists).hide();  //Hide all the UL's at every sub level
			$(branch.thisChildLinks).parent().removeClass('open');  //remove "open" class from all open LI's
			$(branch.thisChildLinks).text('+').removeClass('active');  //reset "-" back to "+" for all expand A's in this branch
			
			/* - This removes the active class from the menu when collapsing branches
			$(branch.thisChildLinksActive).removeClass('activeMenuLink')
			*/
		}
	
	
	
	
	
	
	
	$(document).ready(function()
	{
		if ( $('html').hasClass('lt-ie9') )
		{
			oldIE = true;
		}
		
		html = $('html');
		body = $('body');
		
		/* Mobile Menu vars */
		resetMenu = true; 		//true = all open branches will be reset | false = menu will open in same state as it was closed
		onlyOneBranch = true;	//true = allow only one branch open | false = allow multiple branches open
		
		mobileIcon = $('.mobile-menu-icon');
		menuShowHide = $('#mobile-menu-container a.showHideIcon');
		contentContainer = $('.pageWrapper');
		movableOject = $('#mobile-menu-container');
		
		viewportWidth = viewportSize.getWidth();  //get the true viewport height
		
		
		/*-----------------*/
		/* Side slide menu */
		/*-----------------*/			
			$('.closeMenuLink, .closeOverlay').on('click', function(e)
			{
				e.preventDefault();
				closeMobileMenu();
				return false;
			})
	
			
			
			$(mobileIcon).click(function(e)
			{
				e.preventDefault();
				
				if ( !$(this).hasClass('active') )
				{
					$(this).addClass('active');
					
					/* Move the content over using the most appropriate method */
					if (Modernizr.csstransitions)
					{
						$(movableOject).addClass('moveOver');
					}
					else
					{
						$(movableOject).animate(moveOpen, 100);
					}
					
					/* Prevent scrolling */
					/* setTimeout to fix FF bug where change in overflow of parent prevents child transition animation */
					setTimeout(function()
					{
						$(html).addClass('noScroll');
						$(body).addClass('noScroll');
						$('.closeOverlay').addClass('moveOver');
						$('.closeOverlay').css({'width':viewportWidth-270})
					},25)
				}
				else
				{
					closeMobileMenu();
				}
				return false;
			})
		/*---------------------*/
		/* END Side slide menu */
		/*---------------------*/
		
		
		
		/*----------------------------*/
		/* Show / Hide Mobile Sub Nav */
		/*----------------------------*/
			$(menuShowHide).click(function(e)
			{
				e.stopImmediatePropagation();
				var animSpeed = 400;
				
				/* EXPAND MENU */
				if ( !$(this).parent().hasClass('open') )
				{
					
					/* If only one branch is allowed */
					if (onlyOneBranch)
					{
						var siblingLI = $(this).parent().siblings('li.open');  //get the immediate sibling branch that is open
						
						$(siblingLI).find('ul:eq(0)').slideUp(animSpeed).promise().done(function()  //find the first child UL within the sibling and collapse it
						{
							$(siblingLI).removeClass('open');
							$(siblingLI).find('a.showHideIcon').text('+').removeClass('active');
							
							/* Deep reset - Search ALL nested sub levels and reset them to closed */
							var branch = getBranch(siblingLI);
							closeBranch(branch);  //close all the child branches
							refreshMenuSize();  //recalc iScroll limits
						})
					}

					/* Expand the branch we just selected */
					$(this).text('-').addClass('active'); 
					$(this).parent().addClass('open').find('ul:eq(0)').slideDown(animSpeed, function()
					{
						refreshMenuSize();
					});
				}
				
				/* COLLAPSE MENU */
				else
				{
					$(this).text('+').removeClass('active'); 
					$(this).parent().removeClass('open').find('ul:eq(0)').slideUp(animSpeed).promise().done(function()  //find the first child UL within the sibling and collapse it
					{
						/* Deep reset - Search ALL nested sub levels and reset them to closed */
						var branch = getBranch( $(this).parent() );
						closeBranch(branch);
						refreshMenuSize();
					}); 
				}
			}); 
		/*--------------------------------*/
		/* END Show / Hide Mobile Sub Nav */
		/*--------------------------------*/
		
		
	});

	$(window).load(function ()
	{
		$(window).on('orientationchange', function()
		{
			closeMobileMenu()
		})
		
		$(window).on('resize', function()
		{
			viewportWidth = viewportSize.getWidth();  //get the true viewport height
			$('.closeOverlay').css({'width':viewportWidth-270})
		})
		
	});