	/*
	 * jQuery App Folders Plugin 0.2
	 * www.app-folders.com/
	 * Copyright 2013, Stephen Saucier
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
            internalLinkSelector: '.jaf-internal a',// a jQuery selector containing links to content within a jQuery App Folder
			instaSwitch: false
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
				
				// // Auto-scroll to the folder being clicked
				// if( settings.marginTopAdjust == false) {
				// 	$('html, body').animate({
				// 		scrollTop: $(this).offset().top
				// 	}, settings.animationSpeed);
				// }

				//If there is no currently displayed content area...
				if ($(" .jaf-container .active-tool").length === 0){
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
					if( settings.marginTopAdjust === false) {
						return false;
					//if no margin-top adjustment, leave it alone
					} else {
					// To enable shifting of the rows' top margin on click (works best with overflow: hidden):
						var $i = $(this).parent().index('.jaf-row');
						var marTop = settings.marginTopBase - (settings.marginTopIncrement * ($i))
						$(this).parent().parent().animate({ marginTop: marTop }, settings.animationSpeed );
					}


//--Add the id to the URL but change it temporarily
//--to keep it from scrolling to it
					var hash = $(clickedFolder).attr('id');
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

						document.location.hash = '';
						
						//Reset the margin-top for the container
						$(this).parent().parent().animate({ marginTop: settings.marginTopBase }, settings.animationSpeed );
					
					} else {

						if (settings.instaSwitch !== false) {


							var speed = settings.animationSpeed;

							if ($(this).parent().find('.active-tool').length !== 0){
								speed = 0;
							}

							//Inactive icon was clicked
							$('.folderContent').slideUp(speed);
							$('.active-tool').removeClass('active-tool');
							$(' .jaf-container .folder').animate({ opacity: 1.00 }, speed);

							//Open clicked icon
							var row = clickedFolder.parent(".jaf-row");
							$(row).after(folderContent);
										
							$(this).addClass('active-tool', speed);
							$(folderContent).slideToggle(speed);
									
							$(" .jaf-container").find(".folder").not(clickedFolder).each(function() {
								if (!folderContentShown) {
									$(this).animate({ opacity: settings.opacity }, speed);
								}
								else {
									$(this).animate({ opacity: 1.00 }, speed);
								}
							});

							var hash = $(clickedFolder).attr('id');
							var node = $( '#' + hash );

							document.location.hash = hash;
							if ( node.length ) {
								node.attr( 'id', hash );
							}

							// Set the margin top to the correct value for the newly clicked folder - See line 69
							if( settings.marginTopAdjust === false) {
								return false;
								//if no margin-top adjustment, leave it alone
							} else {
								// To enable shifting of the rows' top margin on click (works best with overflow: hidden):
								var $i = $(this).parent().index('.jaf-row');
								var marTop = settings.marginTopBase - (settings.marginTopIncrement * ($i))
								$(this).parent().parent().animate({ marginTop: marTop }, settings.animationSpeed );
							}

						} else {

							//Inactive icon was clicked
							$('.folderContent').slideUp(settings.animationSpeed);
							$('.active-tool').removeClass('active-tool');
							$('.jaf-container .folder').animate({ opacity: 1.00 }, settings.animationSpeed);
											
							//Reset the margin-top for the container
							$(this).parent().parent().animate({ marginTop: settings.marginTopBase }, settings.animationSpeed );

						}
					}
				}
				
				event.preventDefault();
				return false;
			});

			// close button
			$('.jaf-close').click(function(){

				$(".folder").removeClass("active-tool");
				$(this).parent().slideToggle(settings.animationSpeed);
				
				//Reset the margin-top for the container
				$(this).parent().parent().animate({ marginTop: settings.marginTopBase }, settings.animationSpeed );
			});
			
			
// ==============
// ! OPEN SECTION BY URL HASH on load   
// ==============
			var clickedFolder = $(window.location.hash),
				openFolder = $(clickedFolder).attr('id'),
				folderContent = $('.' + openFolder),
				folderContentShown = $(folderContent).css("display") != "none",
				row = clickedFolder.parent(".jaf-row");
			
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
