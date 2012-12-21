	/*
	 * jQuery App Folders Plugin 0.1
	 * www.app-folders.com/
	 * Copyright 2012, Stephen Saucier
	 * Free to use under the MIT license.
	 * http://www.opensource.org/licenses/mit-license.php
	*/

(function($) {

    $.fn.appFolders = function(options) {
    	//Defaults to extend options
        var settings = $.extend({  
            opacity: .2, 							// Opacity of non-selected items
            marginTopAdjust: false, 				// Adjust the margin-top for the folder area based on row selected?
            marginTopBase: '0px', 					// If margin-top-adjust is "true", the natural margin-top for the area
            marginTopFirst: '0px', 					// If margin-top-adjust is "true", the natural margin-top for the area
            marginTopIncrement: '-100px',			// If margin-top-adjust is "true", the increment of margin-top per row
            animationSpeed: 200,					// Time (in ms) for transition
            URLrewrite: false, 						// Use URL rewriting?
            URLbase: "",							// If URL rewrite is enabled, the URL base of the page where used
            internalLinkSelector: '.jaf-internal a'	// a jQuery selector containing links to content within a jQuery App Folder
		}, options);
		
		//Do work on each selector
        return this.each(function() {
	        
// ==============
// ! START jQuery App Folders SCRIPT   
// ==============

			var appFolders = $(".folderContent").hide();
			
			//when a folder is clicked,
			//position the content folder after the clicked row
			//and toggle all folder / app icon that is not the one clicked.
			//and toggle the folder content panel
			$(".folder").click(function(event) {
				var openFolder = $(this).attr('id');
				var folderContent = $('.folderContent.' + openFolder);
				var folderContentShown = $(folderContent).css("display") != "none";
				var clickedFolder = $(this);
				
				
				//If there is no currently displayed content area...
				if ($(" .jaf-container .active-tool").length == 0){
					var row = clickedFolder.parent(".jaf-row");
					$(row).after(folderContent);
								
					$(this).addClass('active-tool', settings.animationSpeed);
					$(folderContent).slideToggle(settings.animationSpeed);
							
					$(" .jaf-container").find(".folder").not(clickedFolder).each(function() {
						if (!folderContentShown) {
							$(this).animate({ opacity: settings.opacity }, settings.animationSpeed);
						}
						else {
							$(this).animate({ opacity: 1.00 }, settings.animationSpeed);
						}
					});
					
					
// ==============
// ! Shift Rows (margin-top-adjust)   
// ==============
					if( settings.marginTopAdjust == false) {
						return false;
					//if no margin-top adjustment, leave it alone
					} else {
					// To enable shifting of the rows' top margin on click (works best with overflow: hidden):
						// For Row 2, default -50px top-margin (change below and line 133)
						var $i = $(this).parent().index('.jaf-row');
						var marTop = settings.marginTopBase - (settings.marginTopIncrement * ($i))
						$(this).parent().parent().animate({ marginTop: marTop }, settings.animationSpeed );

					}


//--Add the id to the URL but change it temporarily
//--to keep it from scrolling to it
					hash = $(clickedFolder).attr('id');
					var node = $( '#' + hash );
					if ( node.length ) {
					  node.attr( 'id', '' );
					}
					document.location.hash = hash;
					if ( node.length ) {
					  node.attr( 'id', hash );
					}
		
		
				}
				
				//If there IS a currently displayed tool details area, CLOSE IT
				else {
					
					if (folderContentShown) {
						//Active icon was clicked
						$(this).toggleClass("active-tool");
						$(folderContent).slideToggle(settings.animationSpeed);
						$(" .jaf-container").find(".folder").not(clickedFolder).each(function() {
							if (!folderContentShown) {
								$(this).animate({ opacity: 0.20 }, settings.animationSpeed);
							}
							else {
								$(this).animate({ opacity: 1.00 }, settings.animationSpeed);
							}
						});
						
						//Reset the margin-top for the container
						$(this).parent().parent().animate({ marginTop: settings.marginTopBase }, settings.animationSpeed );
					}
					else {
						//Inactive icon was clicked
						$('.folderContent').slideUp(settings.animationSpeed);
						$('.active-tool').removeClass('active-tool');
						$(' .jaf-container .folder').animate({ opacity: 1.00 }, settings.animationSpeed);
										
						//Reset the margin-top for the container
						$(this).parent().parent().animate({ marginTop: settings.marginTopBase }, settings.animationSpeed );
					}
					
					// Set the URL Title to match the opened folder.
					// Pushstate only works in modern browsers, but it works with browser history as well.
					// This is optional and removes the trailing hash (#) from the URL.
					window.location.hash="";
					if (settings.URLrewrite != false) {
						window.history.pushState("object or string","Title" , settings.URLbase);
					}
				}
				
				event.preventDefault();
			});
			
			
// ==============
// ! OPEN SECTION BY URL HASH on load   
// ==============
			var clickedFolder = $(window.location.hash);
			var openFolder = $(clickedFolder).attr('id');
			var folderContent = $('.' + openFolder);
			var folderContentShown = $(folderContent).css("display") != "none";
			var row = clickedFolder.parent(".jaf-row");
			
			$(row).after(folderContent);
						
			$('#' + openFolder).addClass('active-tool');
			$(folderContent).delay(200).slideDown();
			
			$(" .jaf-container").find(".folder").not(clickedFolder).each(function() {
				if (!folderContentShown) {
					$(this).css('opacity', settings.opacity);
				}
				else {
					$(this).css('opacity', '1.00');
				}
			});
			
			// To enable shifting of the rows' top margin on click (works best with overflow: hidden)
			var $i = $(row).index('.jaf-row');
			if ($i != -1) {
				var marTop = settings.marginTopBase - (settings.marginTopIncrement * ($i))
				$(this).animate({ marginTop: marTop }, settings.animationSpeed );
							
				// Don't scroll to the linked item
				$('body').animate({scrollTop:0}, 200, 'linear');
			}

			// Re-load any links outside the App Folders that refer to an opened App Folder.
			$(settings.internalLinkSelector).click(function(event) {
				var link = $(this).attr('href');
				window.location.href = link;
				window.location.reload();
				//return false;
			});
			// data-ajax="false" ?
			
			
		}); // end EACH function
	}
}) ( jQuery );
