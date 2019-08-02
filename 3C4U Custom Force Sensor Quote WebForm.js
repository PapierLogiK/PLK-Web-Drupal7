 <script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js">
</script>

 <script type="text/javascript" src="/sites/all/themes/TreeCell4U17/js/script.js">
</script>



<script>  (function ($) {

	// WebForm VARIABLES:
	var unit = $('.webform-component--unit select option:selected').attr('value'); // Selected Unit
	var unitString = "cm";  // case unit = "1"
		// default no rescale
	var XpixPerUnitResolution = 20;      // Default Resolution = 20 px / cm
	var YpixPerUnitResolution = 20;      // Default Resolution = 20 px / cm
	if ( unit == "2" ) {
		unitString = "inch";
		XpixPerUnitResolution = XpixPerUnitResolution * 2.54;   // px / inches
		YpixPerUnitResolution = YpixPerUnitResolution * 2.54;   // px / inches
	}


	// SVG VARIABLES
	var paper = Raphael("holder");  // CANVAS
	//$('#holder').attr('width', paperWidth);
			
	var paperHolderWidth = $('#holder').width() ; // Canvas Width in Pixels			//	alert( "paperWidth = " + paperWidth );
	var paperHeight = 300; // Canvas Height 				//	alert( "paperHeight = " + paperHeight );
	$('.webform-component--generated-svg').attr('height', paperHeight);				
	$('#holder').attr('height', paperHeight);			
	
	var paperWidth = 400;
	var X0 = 60;  // Draw Origins on Canvas in pixels
	var Y0 = 80;

	$(".webform-client-form webform-client-form-16").ready(function(){ // for chnage on form 16 (custom force sensor prod)
 		// Check Selected Shape
		//var selectedShape = $('#edit-submitted-force-sensor-shape option:selected').attr('value'); // Selected Shape ID
		manageSelecteShapeEditorAndData();
	})
				
	// ON CHANGE ***************** ********************* *********************		
    // Methodes - On Change Functions related to Custom Force Sensor Webform		
 	$("#edit-submitted-force-sensor-shape").change(function(){
 		//alert("edit-submitted-force-sensor-shape change");
 		manageSelecteShapeEditorAndData();
 	})
		
	// Methodes - On Change Functions related to Rectangular Force Sensor Webform	 	
 	$("#cid-21_component_element_wrapper .webform-component--width input").change(function() {
    	manageSelecteShapeEditorAndData();
	})
	$("#cid-22_component_element_wrapper .webform-component--length input").change(function() {
    	 manageSelecteShapeEditorAndData();
	})
		
	// Methodes - On Change Functions related to Rectangular Force Sensor Webform	 	
 	$("#cid-24_component_element_wrapper .webform-component--Diameter input").change(function(){
    	manageSelecteShapeEditorAndData();
	});
	
	// Methodes - On Change Functions related to Rectangular Force Sensor Webform	 	
 	$(".webform-component--connections-and-wiring select").change(function(){
 		manageSelecteShapeEditorAndData();
	});
	// Add Tail Length - On Change Functions related to Rectangular Force Sensor Webform	 
		
	// Add Quantity - On Change Functions related to Rectangular Force Sensor Webform	 	
 		
	
		
		
		
		
		// ***************** ********************* *********************		
    	// Methodes - On Change Fucntions related to Custom Force Sensor Weboform		
 		
		
		// Hide all objects at start
		function hideAllButSensorShape() {
		//alert("hiding all");
			$("#edit-submitted-force-sensor-shape se").css("border-color", "#a09000");  // Shape Selecctor
			
			$('.webform-component--unit').hide();
			$("#cid-21_component_element_wrapper .webform-component--width").hide(); // Rect Case:  Width Selector
			$("#cid-22_component_element_wrapper .webform-component--length").hide(); // Rect Case:  Height Selector
			$("#cid-24_component_element_wrapper .webform-component--Diameter").hide(); // Round Case:  Diameter Selector
			
			$('.webform-component--force-sensitivity').hide();   // Selected Quantity
			$(".webform-component--embedding").hide();   
			$(".webform-component--more-embedding-options").hide();   
			
			$('.webform-component--connections-and-wiring').hide();  // Connector  Selecctor
		
			$('.webform-component--number').hide();   // Selected Quantity
			
			$("#cid-20_component_element_wrapper .webform-component--mp-cost-estimate").hide();  // Estimated Cost
			/* WebForm Fields specific for - cost-estimate-abd-currency-selector Fields select */
			$(".webform-component--related-cost-estimate-abd-currency-selector").hide();
			/* WebForm Fields specific for - shape-and-size-unit-cost Fields select */
			$(".webform-component--shape-and-size-unit-cost").hide();
			/* WebForm Fields specific for - shape-and-size-unit-cost Fields select */
			$(".webform-component--connector-and-wiring-cost").hide();

			$('#edit-submitted-your-file-ajax-wrapper .webform-component--your-file').hide();  // Other Shape Case: File Upload

			//	$("#holder").hide();  // SVG Canvas
			$(".form-actions").hide();   // next page button
		}
		
			
		//************
		// main Editor Function: FOrm manage selected shape to cost estimate
		function manageSelecteShapeEditorAndData() {
			var selectedShape = $('#edit-submitted-force-sensor-shape option:selected').attr('value'); // Selected Shape ID
			//alert("selectedShape var = " + selectedShape + "FFF" );
			
			// Hide all Forms items but Sensor Shape Selection:
			hideAllButSensorShape();
			
			// manage svg Drawing of File Upload canvas Holder
			$("#holder").show(); 
			paper.clear(); 
			
			if ( selectedShape == '0'){ // Select a Shape ID: FIRST
				$("#edit-submitted-force-sensor-shape").css("border-color", "#a09000");  // orange borders = User Warning
				paperHeight = 260; // adapt Paper Height
			}
			else {
				$("#edit-submitted-force-sensor-shape").css("border-color", "transparent"); // orange borders OFF
				
				if ( selectedShape !='3') {   // Not the last (other request)
				
					if ( selectedShape == '1'){  // Rectangle ID
						manageRectSizingEditorAndData();	//alert("selectedShape == 1");
					}
					else if ( selectedShape == '2'){   // Round ID
						manageRoundSizingEditorAndData();
					}
				}
				else if ( selectedShape == '3'){  // LAST SELECTION: Other Shape ID
					paperHeight = 260; // adapt Paper Height
					//show "Upload Your File Editor"
					enableFileUplaodEditor();
				 }
			 	//update Canvas Height
				 paper.setSize(paperWidth, paperHeight);
			}
		}		
		
		// ******************************* Rect selection managers
		// Rect Size - Force Sensor Editor manager
		function manageRectSizingEditorAndData() {
			var UEWidth = $('#cid-21_component_element_wrapper .webform-component--width input').attr('value'); // Selected Shape ID
			var UEHeight = $('#cid-22_component_element_wrapper .webform-component--length input').attr('value'); // Selected Shape ID
			// $("#holder").show();
			$(".webform-component--unit").show();   // show Sinzing and Unit selector and Editor
			$(".webform-component--unit select").removeAttr('disabled');
			
			enableRectSizingEditor( );
			manageSVGRectDrawingRescale(UEWidth, UEHeight );
		}
		
		// enable Sizing papameters editor visibility
		function enableRectSizingEditor(  ) {
			$("#cid-21_component_element_wrapper .webform-component--width").show();
			$("#cid-21_component_element_wrapper .webform-component--width input").removeAttr('disabled');
			$("#cid-22_component_element_wrapper .webform-component--length").show();
			$("#cid-22_component_element_wrapper .webform-component--length input").removeAttr('disabled');
		}
		
		
		
		// ******************************* Round selection managers
		// Round Size - Force Sensor Editor manager
		function manageRoundSizingEditorAndData() {
			var UEDiameter = $('#cid-24_component_element_wrapper .webform-component--Diameter input').attr('value'); // Selected Shape ID
			enableRoundSizingEditor();
			//$("#holder").show();
			
			manageSVGRoundDrawingRescale( UEDiameter );
		}
			
		// enable Sizing papameters editor visibility
		function enableRoundSizingEditor(  ) {
			$("#cid-24_component_element_wrapper .webform-component--Diameter").show();
			$("#cid-24_component_element_wrapper .webform-component--Diameter input").removeAttr('disabled');
		}
		
		
		// *********************************** Main SVG drawing method up to Cost estimate
		// Dynamic SVG: Setup Scaled Sensitive Rect Shape Drawing
		function manageSVGRectDrawingRescale( UEWidth, UEHeight ){
			// Manage gUI SIZE to Fit and Rescale ScaleMap Resolution
			var scaledPixWidth;
			var scaledPixHeight;
			if ( UEWidth == "?" || UEHeight == "?"  ){
				if ( UEWidth == "?"){
					scaledPixWidth = 100;
					$("#cid-21_component_element_wrapper .webform-component--width input").css("border-color", "#a09000");
				}
				else {
					scaledPixWidth = UEWidth * XpixPerUnitResolution;
				}
				
				if ( UEHeight == "?"){
					scaledPixHeight = 100;
					$("#cid-22_component_element_wrapper .webform-component--width input").css("border-color", "#a09000");
				}
				else {
					scaledPixHeight = UEHeight * YpixPerUnitResolution;
				}
				
				// draw Default ? sized SenSitive Area Rectangle
				var rect = paper.rect( ( ( paperWidth - X0 - scaledPixWidth ) / 2) + X0, Y0, scaledPixWidth, scaledPixHeight); 
				rect.attr({
					'stroke': '#a90', 'stroke-width': 2, 'stroke-opacity':1, 'stroke-dasharray': '-',
  				    'fill': 'black', 'fill-opacity': 1,
  				});
  			}
			else if ( UEWidth != "?" && UEHeight != "?" ) {
				// remove warning orange borders
				$("#cid-21_component_element_wrapper .webform-component--width input").css("border-color", "transparent");
				$("#cid-22_component_element_wrapper .webform-component--length input").css("border-color", "transparent");
				//**** Setup Scaled to Fit Page SVG Drawing
				// rescale Width
				var rescaledPixSize = rescaleRectToFitPage( UEWidth, UEHeight, 30, 300 );
				scaledPixWidth = rescaledPixSize[0];
				scaledPixHeight = rescaledPixSize[1];
				
				// Draw ScaleMap arrow and Width and Height Arrow
				drawLegendWidthScaleArrow(unitString);
				drawLegendHeightScaleArrow(unitString);
			
				// Draw RECTANGLE FORCE SENSOR
				var border3PercentOfX = scaledPixWidth * 4 / 100; // draw SenSitive Area Rectangle MINUS 4% Borders
				var border3PercentOfY = scaledPixHeight * 4 / 100;
				var sensitivePixX1 = X0 + ( ( paperWidth - X0 - scaledPixWidth ) / 2) + border3PercentOfX;
				var sensitivePixY1 = Y0 + border3PercentOfY;
				var sensitivePixWidth = scaledPixWidth - 2*border3PercentOfX;
				var sensitivePixHeight = scaledPixHeight - 2*border3PercentOfY;
				var SArect = paper.rect( sensitivePixX1, sensitivePixY1, sensitivePixWidth, sensitivePixHeight); 
				SArect.attr({
					'stroke': '#222', 'stroke-width': 0, 'stroke-opacity':1, //   'stroke-dasharray': '-',
  				    'fill': 'black', 'fill-opacity': 0.8,
  				});
  				//Draw 4% width rounded corner - cover Area
  				var borderPixRadius = 15;
				var SACoverPixX1 = X0 + ( ( paperWidth - X0 - scaledPixWidth ) / 2);
				var SACoverPixY1 = Y0;
				var SACoverPixWidth = scaledPixWidth;
				var SACoverPixHeight = scaledPixHeight;
				var  SACover = paper.roundedRectangle(SACoverPixX1, SACoverPixY1, SACoverPixWidth, SACoverPixHeight, 
							borderPixRadius, borderPixRadius, borderPixRadius, borderPixRadius );
				 SACover.attr({
					'stroke': '#445', 'stroke-width': 0, 'stroke-opacity':1, //   'stroke-dasharray': '-',
  				    'fill': '#445', 'fill-opacity': 0.5,
  				});
				
				
  				 // Show Connection Setup Editor
  				manageRectConnectionsEditor( scaledPixWidth, scaledPixHeight );
  				
  				
			}

			
			// ScaleMap Text
			var sensorName = "Rectangular Force Sensor"
			var scaleMapText = paper.text( X0 + (paperWidth - X0 ) / 2, 30, sensorName);
			scaleMapText.attr(  "font-size", "22" );
			scaleMapText.attr("fill", "#444" );
			scaleMapText.attr("color", "#666" );
			
			scaleMapText.attr("text-decoration", "underline" );
				
			drawWidthScaleArrow(UEWidth);
			drawHeightScaleArrow(UEWidth, UEHeight);
			
			//update holer height if needed
			var lastY = scaledPixHeight + 20;
			updateSVGHolderHeight( lastY );
			
			return null;
		}
		
		// SPECIAL Raaphael JS Functioon: Rect with Rounded corner
		 //roundedRectangle(x, y, width, height, upper_left_corner, upper_right_corner, lower_right_corner, lower_left_corner)
   		 Raphael.fn.roundedRectangle = function (x, y, w, h, r1, r2, r3, r4){
   	  	    var array = [];
    	    array = array.concat(["M",x,r1+y, "Q",x,y, x+r1,y]); //A
      	    array = array.concat(["L",x+w-r2,y, "Q",x+w,y, x+w,y+r2]); //B
      	    array = array.concat(["L",x+w,y+h-r3, "Q",x+w,y+h, x+w-r3,y+h]); //C
      	    array = array.concat(["L",x+r4,y+h, "Q",x,y+h, x,y+h-r4, "Z"]); //D

      	    return this.path(array);
  	    };
		
		
		
		
		//******  GLOBAL SVG DRAWING SUB FUNCTIONS **********************
		function rescaleRectToFitPage( UEWidth, UEHeight, minVal, maxVal ) {
			var rescaledPixSize = [];
			rescaledPixSize[0] = UEWidth * XpixPerUnitResolution;
			rescaledPixSize[1] = UEHeight * YpixPerUnitResolution;
			if ( rescaledPixSize[0] > maxVal || rescaledPixSize[1] > maxVal ) {				// Reduce scaled size (Zoom Out)
				if  ( rescaledPixSize[0] > rescaledPixSize[1] ) {  // resize by keeping X/Y ratio
					XpixPerUnitResolution = XpixPerUnitResolution * maxVal / rescaledPixSize[0];
					YpixPerUnitResolution = YpixPerUnitResolution * maxVal / rescaledPixSize[0];
				}
				else {  // Increase scaled size (Zoom In)
					YpixPerUnitResolution = YpixPerUnitResolution * maxVal / rescaledPixSize[1];
					XpixPerUnitResolution = XpixPerUnitResolution * maxVal / rescaledPixSize[1];
				}
				rescaledPixSize[0] = UEWidth * XpixPerUnitResolution;  
				rescaledPixSize[1] = UEHeight * YpixPerUnitResolution;
			}
			if ( rescaledPixSize[0] < minVal || rescaledPixSize[1] < minVal ) {				// Reduce scaled size (Zoom Out)
				if  ( rescaledPixSize[0]  < minVal ) {  // resize by keeping X/Y ratio
					XpixPerUnitResolution = XpixPerUnitResolution * minVal / rescaledPixSize[0];
				}
				else {  // Increase scaled size (Zoom In)
					YpixPerUnitResolution = YpixPerUnitResolution * minVal / rescaledPixSize[1];
				}
				rescaledPixSize[0] = UEWidth * XpixPerUnitResolution;  
				rescaledPixSize[1] = UEHeight * YpixPerUnitResolution;
			}
			// Manage X/Y resize the smallest element for long rectangles by a factor of 10
			if (  rescaledPixSize[0]  < ( rescaledPixSize[1] / 10 ) ) {
				XpixPerUnitResolution = XpixPerUnitResolution * (10  * rescaledPixSize[0]) / rescaledPixSize[1];
				rescaledPixSize[0] =  rescaledPixSize[1] / 10;
			}
			if ( rescaledPixSize[1] < ( rescaledPixSize[0] / 10 ) ) {
				YpixPerUnitResolution = YpixPerUnitResolution * (10  * rescaledPixSize[1] ) / rescaledPixSize[0];
				rescaledPixSize[1] =  rescaledPixSize[0] / 10;
			}
			return rescaledPixSize;
		}
		
		
		function enableRectConnectionsEditor() {
			$(".webform-component--connections-and-wiring").show();
			$(".webform-component--connections-and-wiring select").removeAttr('disabled');
		}
		// ************************* ************************************
		
		
			
		
		// *********************************** Main SVG drawing method up to Cost estimate
		// Dynamic SVG: Setup Scaled Sensitive Rect Shape Drawing
		function manageSVGRoundDrawingRescale( UEDiameter ) {
			// Manage gUI SIZE to Fit and Rescale ScaleMap Resolution
			var scaledPixDiameter;
			if ( UEDiameter == "?" ){
				scaledPixDiameter = 100;
				$("#cid-24_component_element_wrapper .webform-component--Diameter input").css("border-color", "#a09000");
			
				// draw default circle
				var Xc = X0 + ( ( paperWidth - X0 ) / 2);
				var Yc = Y0 + scaledPixDiameter / 2;
				var sensitiveRadius = ( scaledPixDiameter / 2 );
				
				var SACircle = paper.circle(Xc, Yc, sensitiveRadius); // Creates circle at x = Xc, y = Yc, with radius sensitiveRadius
				SACircle.attr({
					'stroke': '#a90', 'stroke-width': 2, 'stroke-opacity':1, 'stroke-dasharray': '-',
  				    'fill': 'black', 'fill-opacity': 1,
  				});
  				alert("TOTO");
			
			}
		
			else if ( UEDiameter != "?"  ) {
				// remove warning orange borders
				$("#cid-24_component_element_wrapper .webform-component--Diameter input").css("border-color", "transparent");
			
				// rescale Width
				scaledPixDiameter = rescaleCircleToFitPage( UEDiameter, 30, 300 );
				
				// Draw ScaleMap arrow and Width and Height Arrow
				drawLegendWidthScaleArrow(unitString);
				drawLegendHeightScaleArrow(unitString);
			
				// Draw Circle FORCE SENSOR
						// Sets the fill attribute of the circle to red (#f00)
				var border3PercentOfX = scaledPixDiameter * 4 / 100; // draw SenSitive Area Rectangle MINUS 4% Borders
			//	var border3PercentOfY = scaledPixHeight * 4 / 100;
				var Xc = X0 + ( ( paperWidth - X0 ) / 2);
				var Yc = Y0 + scaledPixDiameter / 2;
				var sensitiveRadius = ( scaledPixDiameter / 2 ) - border3PercentOfX;
				
				var SACircle = paper.circle(Xc, Yc, sensitiveRadius); // Creates circle at x = Xc, y = Yc, with radius sensitiveRadius
				SACircle.attr({
					'stroke': '#222', 'stroke-width': 0, 'stroke-opacity':1, //   'stroke-dasharray': '-',
  				    'fill': 'black', 'fill-opacity': 0.8,
  				});
  				
  				//Draw 4% width rounded corner - cover Area
  				var coverRadius = ( scaledPixDiameter / 2 );
				var  SACover = paper.circle(Xc, Yc, coverRadius);
				 SACover.attr({
					'stroke': '#445', 'stroke-width': 0, 'stroke-opacity':1, //   'stroke-dasharray': '-',
  				    'fill': '#445', 'fill-opacity': 0.5,
  				});
				
				
				
  				 // Show Connection Setup Editor
  			//	manageRoundConnectionsEditor( scaledPixDiameter );
  				
  				
			}

			
			// ScaleMap Text
			var sensorName = "Rounded Force Sensor";
			var scaleMapText = paper.text( X0 + (paperWidth - X0 ) / 2, 30, sensorName);
			scaleMapText.attr(  "font-size", "22" );
			scaleMapText.attr("fill", "#444" );
			scaleMapText.attr("color", "#666" );
			
			scaleMapText.attr("text-decoration", "underline" );
				
			drawWidthScaleArrow(UEDiameter);
			
			//update holer height if needed
			var lastY = Y0 + scaledPixDiameter + 20;
			updateSVGHolderHeight( lastY );
			
			return null;
		}
		
		
		
		
		
				
		//******  GLOBAL SVG DRAWING SUB FUNCTIONS **********************
		function rescaleCircleToFitPage( UEDiameter, minVal, maxVal ) {
			var rescaledPixDiameter = UEDiameter * XpixPerUnitResolution;
			//rescaledPixSize[1] = UEHeight * YpixPerUnitResolution;
			if  ( rescaledPixDiameter > maxVal ) {  // Reduce scaled size (Zoom Out)
				XpixPerUnitResolution = XpixPerUnitResolution * maxVal / rescaledPixDiameter;
			}
			rescaledPixDiameter = UEDiameter * XpixPerUnitResolution;  
			
			if  ( rescaledPixDiameter  < minVal ) {  // resize by keeping X/Y ratio
				XpixPerUnitResolution = XpixPerUnitResolution * minVal / rescaledPixDiameter;
			}
			rescaledPixDiameter = UEDiameter * XpixPerUnitResolution;  
			
			return rescaledPixDiameter;
		}
		
		
		
		
		
		
		// *********************************
		// ScaleMap Arrows and Shape Editor Parameters Arrows SVG Drawing Functions
		function drawLegendWidthScaleArrow() {
			var scalMapVal = 1;
			if (unitString == "cm") {
				scalMapVal = 2;
			}
			var x1 = X0;
			var xm = X0 + scalMapVal * XpixPerUnitResolution / 2;
			var x2 = X0 + scalMapVal * XpixPerUnitResolution;
			
			//draw scale arrow
			
			var PathString = "M" + x1 + " " + Y0 + "L" + x2 + " " + Y0; //line & Arrows
			right_arrow = paper.path( PathString ).attr({ 'stroke':'#666', 'stroke-width': 2, 'arrow-end':'classic-wide-long'});
		//	PathString = "M" + xm + " " + Y0 + "L" + x1 + " " + Y0;
		//	left_arrow = paper.path( PathString ).attr({ stroke:'#666', 'stroke-width': 2, 'arrow-end':'classic-wide-long'}); //.transform("100r180");
		
			// ScaleMap Text
			var scaleMap =  "" + scalMapVal + " " + unitString; // actual size of a line of 100 px
		    var scaleMapText = paper.text(xm, (Y0-10), scaleMap);
			scaleMapText.attr(  "font-size", "9" );
			scaleMapText.attr("fill", "#666" );
			
			return null;
		}
		
		function drawLegendHeightScaleArrow(  ) {
			var scalMapVal = 1;
			if (unitString == "cm") {
				scalMapVal = 2;
			}
			
			//draw scale arrow
			var y1 = Y0;
			var ym = Y0 + scalMapVal * YpixPerUnitResolution / 2;
			var y2 = Y0 + scalMapVal * YpixPerUnitResolution;
			var PathString = "M" + X0 + " " + y1 + "L" + X0 + " " + y2;//line & Arrows
			right_arrow = paper.path( PathString ).attr({ 'stroke':'#666', 'stroke-width': 2, 'arrow-end':'classic-wide-long'});
		    //	PathString = "M" + X0 + " " + ym + "L" + X0 + " " + y1;
		    //	left_arrow = paper.path( PathString ).attr({ 'stroke':'#666', 'stroke-width': 2, 'arrow-end':'classic-wide-long'}); //.transform("100r180");
		
			// ScaleMap Text
			var scaleMap =  "" + scalMapVal + " " + unitString; // actual size of a line of 100 px
		    var scaleMapText = paper.text((X0-25), ym, scaleMap);
			scaleMapText.attr(  "font-size", "9" );
			scaleMapText.attr("fill", "#666" );
			
			return null;
		}
		
		function drawWidthScaleArrow( UEWidth ) {
			var scaleMap =  "W = " + UEWidth + " " + unitString; // actual size of a line of 100 px
			var scaledPixWidth = 100;
			if ( UEWidth == "?" ) {
				scaledPixWidth = 100;
			}
			else {
				scaledPixWidth = UEWidth * XpixPerUnitResolution;
			}
			//draw scale arrow
			//line & Arrows
			var x1 = ( ( paperWidth - X0 ) - ( scaledPixWidth ) ) / 2 + X0;
			var xm = x1 + ( ( scaledPixWidth ) / 2 );
			var x2 = x1 + ( scaledPixWidth );
			// alert( "xm = " + xm );
			var yArrowPos = Y0 - 10;
			var PathString = "M" + xm + " " + yArrowPos + "L" + x2 + " " + yArrowPos;
			right_arrow = paper.path( PathString ).attr({'stroke': '#444', 'stroke-width': 2, 'arrow-end':'classic-wide-long'});
			PathString = "M" + xm + " " + yArrowPos + "L" + x1 + " " + yArrowPos;
			left_arrow = paper.path( PathString ).attr({'stroke':'#444', 'stroke-width': 2, 'arrow-end':'classic-wide-long'}); //.transform("100r180");
			
			// ScaleMap Text
			var scaleMapText = paper.text( xm, yArrowPos-10, scaleMap);
			scaleMapText.attr("font-size", "12" );
			scaleMapText.attr("fill", "#444" );
			return null;
		}
		
		function drawHeightScaleArrow(UEWidth, UEHeight) {
			//draw scale arrow
			var yLegend =  "H = " + UEHeight + " " + unitString; // actual size of a line of 100 px
			var scaledPixWidth = 100;
			if ( UEWidth == "?" ) {
				scaledPixWidth = 100;
			}
			else {
				scaledPixWidth = UEWidth * XpixPerUnitResolution;
			}
			// alert( "XpixPerUnitResolution = " + XpixPerUnitResolution);
			// alert( "scaledPixWidth = " + scaledPixWidth);
			var scaledPixHeight = 100;
			if ( UEHeight == "?" ) {
				scaledPixHeight = 100;
			}
			else {
				scaledPixHeight = UEHeight * YpixPerUnitResolution;
			}//line & Arrows
			var y1 = Y0;
			var ym = y1 + ( ( scaledPixHeight ) / 2 );
			var y2 = y1 + ( scaledPixHeight ) ;
			
			var xArrowPos = ( ( paperWidth - X0 ) - ( scaledPixWidth ) ) / 2 + ( X0 / 2 );
			var PathString = "M" + xArrowPos + " " + (ym-10) + "L" + xArrowPos + " " + y1 ;
			// alert( "xArrowPos = " + xArrowPos);
			up_arrow = paper.path( PathString ).attr({'stroke':'#444', 'stroke-width': 2, 'arrow-end':'classic-wide-long'});
			PathString = "M" + xArrowPos + " " + (ym+10) + "L" + xArrowPos + " " + y2 ;
			down_arrow = paper.path( PathString ).attr({'stroke':'#444', 'stroke-width': 2, 'arrow-end':'classic-wide-long'}); //.transform("100r180");
		
			// ScaleMap Text
			var scaleMapText = paper.text( xArrowPos, ym, yLegend );
			scaleMapText.attr("font-size", "12" );
			scaleMapText.attr("fill", "#444" );
			
			return null;
			
		}
		
		
		
		// (Rect) CONNECTIONS JS METHODS
		function manageRectConnectionsEditor( scaledPixWidth, scaledPixHeight ) {
			//enable editors setup objects
			enableSensitivityClassSelector(); 
				
			enableEmbeddingMethodSelector(); 
			enableMoreEmbeddingOptionsSelector();
			enableRectConnectionsEditor();
			
			// setup selected option
			var selectedConnection = $('.webform-component--connections-and-wiring option:selected').attr('value'); // Selected Shape ID
			//	alert("selectedConnection = " + selectedConnection );
			if ( selectedConnection == '0'){ // Select a Shape ID
				$(".webform-component--connections-and-wiring select").css("border-color", "#a09000");
				drawTailNotSetup( scaledPixWidth, scaledPixHeight );
			}
			else {
				$(".webform-component--connections-and-wiring select").css("border-color", "transparent");
				
				var connectorCost = 1; //default : 1$
				if ( selectedConnection == '1'){ //  Tail with In/out soldering pads
					
					drawTailWithInOutSolderingPads( scaledPixWidth, scaledPixHeight );
					
					//	$('#webform-client-form-16 .webform-component--unit').style.display = "none";
				}
				else  if ( selectedConnection == '2'){ //   Tail with 2 (in/out) 2.54mm Male Pins
					//	$('#webform-client-form-16 .webform-component--unit').style.display = "none";
					connectorCost = 2;
				}
				else  if ( selectedConnection == '3'){ //   Tail with Voltage Divider and 3 (in/out/gnd) 2.54mm Male Pins
					connectorCost = 3;
					//	$('#webform-client-form-16 .webform-component--unit').style.display = "none";
				}
				else  if ( selectedConnection == '4'){ //   Wired with 2 (in/out) 2.54mm Male Pins
					//	$('#webform-client-form-16 .webform-component--unit').style.display = "none";
					connectorCost = 5;
				}
				else  if ( selectedConnection == '5'){ //   Wired with Voltage Divider and 3 (in/out/gnd) 2.54mm Male Pins
					//	$('#webform-client-form-16 .webform-component--unit').style.display = "none";
					connectorCost = 7;
				}
				else  if ( selectedConnection == '6'){ //  Other request
					//	$('#webform-client-form-16 .webform-component--unit').style.display = "none";
				}
				
				
				
				// Finalise edition:
				enableCostEstimateEditor();  // Cost details
				enableQuantitySetupEditor();  // Qunatity selector
				enableEstimatedCostEditor();   // TOTAL COST estimate
				
				//recalculate and update cost data displayed
				var SelectedQuantity = $("#cid-21_component_element_wrapper .webform-component--width input").attr('value');
				calculateAndDisplayForceSensorEstimatedCost( scaledPixWidth, scaledPixHeight, connectorCost, SelectedQuantity );
				
				
				// TO DO CHANGE TEXT OF NEXT PAGE BUTTON
				$(".form-actions").show();   // next page button
				
			}
		
		}
		
		
		
		
		function enableSensitivityClassSelector() {
			$('.webform-component--force-sensitivity').show();   // Selected Quantity
			$(".webform-component--force-sensitivity input").removeAttr('disabled');
		}
		
		function enableEmbeddingMethodSelector() {
			$('.webform-component--embedding').show();   // Selected Quantity
			$(".webform-component--embedding input").removeAttr('disabled');
		}
		
		function enableMoreEmbeddingOptionsSelector() {
			$('.webform-component--more-embedding-options').show();   // Selected Quantity
			$(".webform-component--more-embedding-options input").removeAttr('disabled');
		}
		
		
		function enableCostEstimateEditor() {
			//show related cost info
			$(".webform-component--related-cost-estimate-abd-currency-selector").show();
			$(".webform-component--shape-and-size-unit-cost").show();
			$(".webform-component--connector-and-wiring-cost").show();

		}			
		
		function enableQuantitySetupEditor() {
			$('.webform-component--number').show();   // Selected Quantity
			$("#cid-21_component_element_wrapper .webform-component--width input").removeAttr('disabled');
			
		}	
		function enableEstimatedCostEditor() {
			$("#cid-20_component_element_wrapper .webform-component--mp-cost-estimate").show();  // Estimated Cost
		}	
		
		
		
		
		// EVALUATE COST PER TYPE, SIZE AND QUANTITY
		
		function calculateAndDisplayForceSensorEstimatedCost( scaledPixWidth, scaledPixHeight, connectorCost, SelectedQuantity ) {
		
			// Material Cost
			var dimensionalUnitCost = getDimensionalUnitCostForRect(  scaledPixWidth, scaledPixHeight);
			alert("dimensionalUnitCost = " + dimensionalUnitCost );
				
			$(".webform-component--shape-and-size-unit-cost label").text( Math.round(dimensionalUnitCost) + " US$ / unit");
			
			var RealWidth = ( scaledPixWidth / XpixPerUnitResolution);
			var RealHeight = ( scaledPixHeight / YpixPerUnitResolution);
			
			// labor Cost: Security coef * Work Labor + STOCK + SHIPPING + INS  / Resel (*1.3)  ) (IN US$)
			var unitLaborCost = 3 + RealWidth + RealHeight;
			if ( unitString == "cm") {
				unitLaborCost = 3 + RealWidth / 2.54 + RealHeight / 2.54;
			}
			alert("unitLaborCost = " + unitLaborCost );
			
			// labor Cost: Security coef * (Work Labor + STOCK + SHIPPING + INS  ) (IN US$)
			var unitCost  = 1.2 * unitLaborCost  * 1.3;
			alert("unitCost = " + unitCost );
			
			// Connector Cost
			// var connectorCost
			$(".webform-component--connector-and-wiring-cost label").text( Math.round(connectorCost) +  " US$ / unit");
			var TotalUnitCostEstimate = unitCost + connectorCost;
			alert("TotalUnitCostEstimate = " + TotalUnitCostEstimate );
			
			
			// Quantity Factor: linear degressive
			if ( SelectedQuantity <= 8) {
				var minUnitCost = unitCost;
				var maxUnitCost = 6 * unitCost
				var minQty = 1;
				var maxQty = 5;
				
			}
			else if ( SelectedQuantity <= 50) {
				var minUnitCost = unitCost * 0.9;
				var maxUnitCost = unitCost
				var minQty = 6;
				var maxQty = 50;
			}
			
			var slope = ( maxUnitCost - minUnitCost ) / ( maxQty - minQty );
			var quantityCostFactor = slope * SelectedQuantity + maxUnitCost - 5 * slope;
			
			TotalEstimatedCost = SelectedQuantity * quantityCostFactor;
			$("#cid-20_component_element_wrapper .webform-component--mp-cost-estimate label").text( Math.round(connectorCost) + " US$");
			//displayEstimatedCostAtLeftSVG( usedRessourceCost, unitLaborCost, unitCost, quantityCostFactor, TotalEstimatedCost);
			
		}
			
		function getDimensionalUnitCostForRect(  scaledPixWidth, scaledPixHeight) {
				
				// TO DO : if Currency = US$
				var unitCost = 20 / 144; // (for 1 inch square, based on a rate of 200 collars per square foot
				if ( unitString == "cm") {
					unitCost = unitCost / ( 2.54 * 2.54);  // unit prece per square cm
				}
				alert("unitCost = " + unitCost );
				
				var RealWidth = ( scaledPixWidth / XpixPerUnitResolution);
				var RealHeight = ( scaledPixHeight / YpixPerUnitResolution);
			
				var RequiredArea = RealWidth * RealHeight;
				alert("RequiredArea = " + RequiredArea );
				return ( unitCost * RequiredArea);
		}
		
		
			
			
		/* OLD SVG COST ESTIMATE RETURN		
		function displayEstimatedCostAtLeftSVG ( usedRessourceCost, unitLaborCost, unitCost, quantityCostFactor, TotalEstimatedCost) {
				var x1 = 70;
				var y1 = Y0;
				
				// ScaleMap usedRessourceCost
				var text = "Ressources Cost:   " + Math.round( usedRessourceCost );
				var scaleMapText = paper.text( x1, y1, text );
				scaleMapText.attr("font-size", "11" );
				scaleMapText.attr("fill", "#444" );
				
				y1 = y1 + 20;
				// ScaleMap unitLaborCost
				text = "Labor Cost:   " + Math.round( unitLaborCost );
				var scaleMapText = paper.text( x1, y1, text );
				scaleMapText.attr("font-size", "11" );
				scaleMapText.attr("fill", "#444" );
				
				y1 = y1 + 20;
				// ScaleMap unitCost
				text = "Unit Cost:   " + Math.round( unitCost );
				var scaleMapText = paper.text( x1, y1, text );
				scaleMapText.attr("font-size", "12" );
				scaleMapText.attr("fill", "#444" );
				
				y1 = y1 + 20;
				// ScaleMap quantityCostFactor
				text = "Qtity Cost Factor:   " + Math.round( quantityCostFactor );
				var scaleMapText = paper.text( x1, y1, text );
				scaleMapText.attr("font-size", "11" );
				scaleMapText.attr("fill", "#444" );
				
				y1 = y1 + 30;
				// ScaleMap TotalEstimatedCost
				text = "COST ESTIMATE: ";
				var scaleMapText = paper.text( x1, y1, text );
				scaleMapText.attr("font-size", "18" );
				scaleMapText.attr("fill", "#444" );
				y1 = y1 + 20;
				text = "" + Math.round ( TotalEstimatedCost ) + " US$";
				var scaleMapText = paper.text( x1, y1, text );
				scaleMapText.attr("font-size", "18" );
				scaleMapText.attr("fill", "#444" );
		}
			
		*/
				
  		
		
		
		
		
		// TAIL SETUP JOINT FONCTION
		function drawRectTailJoint( scaledPixWidth, scaledPixHeight, TailWidth, JointHeight ) {
			// alert("drawRectTailJoint");
				
			var x = X0 + ( paperWidth - X0  ) / 2 - TailWidth / 2;
			var y = Y0 + scaledPixHeight;
			var SAJointPixWidth = TailWidth;
			var SAJointPixHeight = 1 * YpixPerUnitResolution;
			var borderPixRadius = 1 * YpixPerUnitResolution;
			var  SATailJoint = paper.roundedTailJoint(x, y, SAJointPixWidth, SAJointPixHeight, borderPixRadius );
				 SATailJoint.attr({
					'stroke': '#445', 
  				    'fill': '#445',
  				    'fill-opacity': 0.5,
 			 	   'stroke-width': 0,
 			 	   'stroke-opacity':1,
 			 	//   'stroke-dasharray': '-',
  				});		
		}
				
		Raphael.fn.roundedTailJoint = function (x, y, w, h, r){
   	  //	    alert("Raphael.fn.roundedTailJoint");
			var array = [];
    	    array = array.concat(["M",x-r,y, "Q",x,y, x,y+r]); //A     // "Q","CurvPointX", "CurvPointY", "DestPointX", "DestPointY"
      	    array = array.concat(["L",x+w,y+r, "Q",x+w,y, x+w+r,y]); //B
      	    array = array.concat(["L",x-r,y, "Z"]); //D

      	    return this.path(array);
  	     };
	
		
		// TAIL VERSION !:  TailWithInOutSolderingPads
		function drawTailWithInOutSolderingPads( scaledPixWidth, scaledPixHeight ) {
			var tailPosition = 1; // 1 = center
			var tailLength = 5 * YpixPerUnitResolution;  // default length (cm)
			var connectorType = "0"; //pads
			var pinsNb = 2;
			var connectorsWidth = 0.3 * XpixPerUnitResolution;
  			var  TailWidth = ( pinsNb * connectorsWidth ) + ( 0.1 * (pinsNb - 1) * XpixPerUnitResolution );
		
			// get Position
			var x1 = X0;
			var y1 = Y0 + scaledPixHeight;
			if ( tailPosition == 1 )
				x1 = x1 + ( paperWidth - X0 ) / 2 - TailWidth/2;
				
			var JointHeight = TailWidth;
				
			drawRectTailJoint( scaledPixWidth, scaledPixHeight, TailWidth, JointHeight );
				
		
			DrawConnectorTail(x1, y1+ JointHeight, TailWidth, tailLength - JointHeight, pinsNb, connectorsWidth);
			
			drawTailWidthAndHeightScaleArrow(x1, y1, TailWidth, tailLength);
  			
			
		}
		
		// Draw Connectors / TIles Wire
		function drawTailNotSetup( scaledPixWidth, scaledPixHeight ) {
			var tailPosition = 1; // 1 = center
			var tailLength = 5 * YpixPerUnitResolution;  // default length (cm)
		//	alert("tailLength = " + tailLength);
			var connectorType = "0"; //pads
			var pinsNb = 2;
			
			var connectorsWidth = 0.3 * XpixPerUnitResolution;
  		//	alert("connectorsWidth = " + connectorsWidth);
			var  TailWidth = ( pinsNb * connectorsWidth ) + ( 0.1 * (pinsNb - 1) * XpixPerUnitResolution );
		//	alert("TailWidth = " + TailWidth);
			
			var wireLength = 0;
			
			// get Position
			var x1 = X0;
			var y1 = Y0 + scaledPixHeight;
			if ( tailPosition == 1 )
				x1 = x1 + ( paperWidth - X0 ) / 2 - TailWidth/2;
			
			// Draw defaults Tail background
			DrawConnectorTail(x1, y1, TailWidth, tailLength, pinsNb, connectorsWidth);
			
			var TailConnectorNotSetup = paper.rect( x1, y1, TailWidth,  tailLength ); 
			TailConnectorNotSetup.attr({
				'stroke': '#9a0', 
  		    	'fill': '#9a0',
		    	'fill-opacity': 0.1,
 		    	'stroke-width': 2,
 		    	'stroke-opacity':1,
 		    	'stroke-dasharray': '-',
  			});
		}	
		
		
		
		function DrawConnectorTail(x1, y1, TailWidth, tailLength, pinsNb, connectorsWidth) {
		
			//set tail squeleton
			var Tail1stConnectorBand = paper.rect( x1, y1, connectorsWidth,  tailLength ); 
			Tail1stConnectorBand.attr({
				'stroke': '#999', 
  		    	'fill': '#999',
		    	'fill-opacity': 1,
 		    	'stroke-width': 0,
 		    	'stroke-opacity':1,
  			});
  				
			// Start draw Tail back rectangle
			var TailBackrect = paper.rect( x1 - 1, y1, TailWidth + 2, ( tailLength - (1 * YpixPerUnitResolution ) ) ); 
			TailBackrect.attr({
				'fill-opacity': 0.32,
 		    	'stroke-width': 0,
 		    	'stroke-opacity':0.1,
 		    	'stroke': '#445', 
  				'fill': '#445',
  			});
  			
			// draw Tail second connector band
			var Tail2ndConnectorBand = paper.rect( (x1 + connectorsWidth + 1), y1,  connectorsWidth, tailLength  ); 
			Tail2ndConnectorBand.attr({
				'stroke': 'transparent', 
  		    	'fill': '#999',
		    	'fill-opacity': 1,
 		    	'stroke-width': 0,
 		    	'stroke-opacity':1,
  			});
				
			if ( pinsNb == 3) {
				// draw Tail VD + third connector band
				// draw Tail first connector band
				var Tail3rdConnectorBand = paper.rect( x1 + 2 * (connectorsWidth + 1), y1, TailWidth, tailLength ); 
				Tail3rdConnectorBand.attr({
					'stroke': 'transparent', 
  		   		 	'fill': '#999',
		    		'fill-opacity': 1,
 		    		'stroke-width': 0,
 		    		'stroke-opacity':1,
  				});	
			}
				
			// End draw Tail front rectangle (Top)
			var TailFrontCoverrect = paper.rect( x1-1, y1, ( TailWidth + 2  ), ( tailLength - (1 * YpixPerUnitResolution ) ) ); 
			TailFrontCoverrect.attr({
				'fill-opacity': 0.32,
 		    	'stroke-width': 0,
 		    	'stroke-opacity':0.1,
 		    	'stroke': '#445', 
  				'fill': '#445',
  			});	
  			
  			
  			var lastY = y1 + tailLength;
  			updateSVGHolderHeight( lastY );
			
		}
		
		function drawTailWidthAndHeightScaleArrow(x1, y1, tailwidth,tailLength) {
			//draw Tail WIDTH scale arrow
			var tailXLegend =  "T = " + ( tailLength / YpixPerUnitResolution ) + " " + unitString; // actual size of a line of 100 px
			//line & Arrows
			var xm = x1 + (  tailwidth  / 2 );
			var x2 = x1 + tailwidth;
			var yArrowPos = y1 + tailLength + 10;
			var PathString = "M" + xm + " " + yArrowPos + "L" + x1 + " " + yArrowPos ;
			// alert( "xArrowPos = " + xArrowPos);
			up_arrow = paper.path( PathString ).attr({stroke:'#444', 'stroke-width': 2, 'arrow-end':'classic-wide-long'});
			PathString = "M" + xm + " " + yArrowPos + "L" + x2 + " " + yArrowPos ;
			down_arrow = paper.path( PathString ).attr({stroke:'#444', 'stroke-width': 2, 'arrow-end':'classic-wide-long'}); //.transform("100r180");
		
			// ScaleMap Text
			var scaleMapText = paper.text( xArrowPos, yArrowPos+10, tailXLegend );
			scaleMapText.attr("font-size", "12" );
			scaleMapText.attr("fill", "#444" );
			
			//draw Tail HEIGHT scale arrow
			var tailYLegend =  "T = " + ( tailLength / YpixPerUnitResolution ) + " " + unitString; // actual size of a line of 100 px
			//line & Arrows
			var ym = y1 + (  tailLength  / 2 );
			var y2 = y1 + tailLength;
			var xArrowPos = ( paperWidth - X0)  / 2 + ( X0 / 2 );
			var PathString = "M" + xArrowPos + " " + (ym-10) + "L" + xArrowPos + " " + y1 ;
			// alert( "xArrowPos = " + xArrowPos);
			up_arrow = paper.path( PathString ).attr({stroke:'#444', 'stroke-width': 2, 'arrow-end':'classic-wide-long'});
			PathString = "M" + xArrowPos + " " + (ym+10) + "L" + xArrowPos + " " + y2 ;
			down_arrow = paper.path( PathString ).attr({stroke:'#444', 'stroke-width': 2, 'arrow-end':'classic-wide-long'}); //.transform("100r180");
		
			// ScaleMap Text
			var scaleMapText = paper.text( xArrowPos, ym, tailYLegend );
			scaleMapText.attr("font-size", "12" );
			scaleMapText.attr("fill", "#444" );
			
			return null;
			
		}
		
		
		
		function updateSVGHolderHeight( lastY ) {
		//	alert("lastY = " + lastY );
			if ( paperHeight < ( lastY + 60 ) ) {
				paperHeight = ( lastY + 60 )
			}
			$('.webform-component--generated-svg').attr('height', paperHeight);				
	
			$('#holder').attr('height', paperHeight);
			
			//set Grid
		
		
		//  Horizontal grid: Start at Y0
			for (i = -2; i < (paperHeight - Y0) / ( 1 * YpixPerUnitResolution); i++) {
    			var PathString = "M" + (X0 - 2 * YpixPerUnitResolution ) + " " + ( Y0 + i * YpixPerUnitResolution) + "L" + paperWidth + " " + ( Y0 + i * YpixPerUnitResolution);
				right_arrow = paper.path( PathString ).attr({ 'stroke':'#000', 'stroke-width': 0.5, 
																'stroke-opacity':0.2, 'stroke-dasharray': '-'});
			
			}
			
			//vertical Grid: Start at X0
			for (i = -2; i < 400 / ( 1 * XpixPerUnitResolution); i++) {
    			var PathString = "M" + ( X0 + i * XpixPerUnitResolution ) + " " + ( Y0 - 2 * YpixPerUnitResolution ) + "L" + ( X0 + i * XpixPerUnitResolution) + " " + paperHeight;
				right_arrow = paper.path( PathString ).attr({ 'stroke':'#000', 'stroke-width': 0.5, 
																'stroke-opacity':0.1, 'stroke-dasharray': '-'});
			
			}
		
		}
		
		// ****************** *********************** ***********************

		
		
		// FILE UPLAOD EDITOR
		function enableFileUplaodEditor() {
			$('#edit-submitted-your-file-ajax-wrapper .webform-component--your-file').show();
			$("#edit-submitted-your-file-ajax-wrapper .webform-component--your-file input").removeAttr('disabled');
		}
	
	
		
  	}(jQuery.noConflict() ) );
</script>