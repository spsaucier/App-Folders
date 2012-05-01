jQuery App-Folders
===========

Use jQuery to create iOS-like App Folders on any website. They can contain any content and be styled in any way.

• Works great on mobiles
• Responsive design
• Fully styleable (it's easy!)
• Well-documented
• Very easy to use
• Can contain any content (images, text, video, complex layouts)
• Opened Folder can be linked to from other pages
• Configurable position changes for nth folder


===========

How to implement:

1. Include the following script within a <script> tag.

$(function() {
	$('.app-folders-container').appFolders();
});
							
2. Then, include the following elements:

<!--This is what you call in the function above-->
<div class="app-folders-container"> 
	
	<!-- jaf-row 1 (You can have as many rows as you like) -->
    <div class="jaf-row jaf-container">
    
      <!--You can have as many folders as you like-->
      <!--Folder's ID must match Class of the item that it opens-->
      <div class="folder" id="uno">
        
        <!--Anything wrapped by this link can open the content on click.-->
        <a href="#">
          <p>Folder 1</p>
        </a>
      </div><!--End Folder-->
    </div><!--End Row-->
    
    
    <!--Now, include the content that you want to show for each Folder-->

    <!-- CLASS must equal the ID of the item that calls it.-->
    <div class="folderContent uno">
      <div class="jaf-container">
      
        <!--Add whatever HTML you want in this area-->
        <p>Content for folder one.</p>
      
      </div>
    </div><!-- End folderContent uno-->
    
</div><!--End app-folders-container-->


==========

OPTIONS

You can pass these options through when you call the function:

$('.app-folders-container').appFolders({

	// Opacity of non-selected items
	opacity: .2,
	
	// Adjust the margin-top for the folder area based on row selected?
	marginTopAdjust: true,
	// If margin-top-adjust is "true", the natural margin-top for the area
	marginTopBase: 0,
	// If margin-top-adjust is "true", the absolute value of the increment of margin-top per row
	marginTopIncrement: 50,
	
	// Time (in ms) for transitions
	animationSpeed: 200,
	
	// Use URL rewriting?
	URLrewrite: true,
	// If URL rewrite is enabled, the URL base of the page where used.
	URLbase: "/barebones/",
	
	// a jQuery selector containing links to content within a jQuery App Folder
	internalLinkSelector: ".jaf-internal a"
});