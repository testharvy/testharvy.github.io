$(function(){
	var $slide = $('.slide'),
	$slideshow = $('.slideshow'),
	current_x = 0,
	current_y = 0,
	slide_width = 300,
	slide_height = 300,
	window_width = $(window).width(),
	window_height = $(window).height(),
	width_center= window_width/2 - slide_width/2,
	height_center= window_height/2 - slide_height/2;


	var goTo = function(x, y) {
		a =  width_center-x*300 ;
		b =  height_center-y*300 ;
		$slideshow.css({ transform: 'translateX('+a+'px) translateY('+b+'px)' }); 
		current_x = x;
		current_y = y;
    };
    var makeActive = function(open) {
		for(var i=0; i<open.length; i++){
        	var coord = open[i].split(',')
        	$slide.filter('[data-x='+coord[0]+'][data-y='+coord[1]+']').addClass('-canmove');
		}
    };


    goTo(0,0 );
    makeActive(["1,0"]);

    var isMobile = function () {
        return (/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera);
    };
    if (!isMobile()) {
	    $slide.each(function (index, el) {
			var x = $(el).data('x'),
				y = $(el).data('y'),
				open = $(el).data('open').split(';');
	        $(el).click(function () {
	        	if($(el).hasClass('-canmove')){
	        		if( !$(el).hasClass('-show') ){
		        		$(el).addClass('-show');
		        		makeActive(open);
		        	}
		            goTo(x, y);
	        	}
	        });
	    });	
	    } else {
	    	    var trySwipe = function(x,y) {
	    	var $tmp_slide = $slide.filter('[data-x='+x+'][data-y='+y+']'),
	    		open = $tmp_slide.data('open').split(';');

	    		console.log('trySwipe'+x + y)

	    	if($slide.filter('[data-x='+x+'][data-y='+y+']').hasClass('-canmove')){
	    		goTo(x,y);
	    		$tmp_slide.addClass('-show');
	    		makeActive(open);
	    	}
	    	
	   	};

	    var goLeft = function() {
	    	var x = current_x+1,
	    		y = current_y;
	    	trySwipe(x,y);
	    	
	   	};
	   	var goRight = function() {
	    	var x = current_x-1,
	    		y = current_y;
	    	trySwipe(x,y);
	    	
	   	};

	   	var goUp = function() {
	   		var x = current_x,
	    		y = current_y+1;
	    	trySwipe(x,y);
	   	};
	   	var goDown = function() {
	   		var x = current_x,
	    		y = current_y-1;
	    	trySwipe(x,y);
	   	};

	    $slide.on( "swipeleft", goLeft );
	    $slide.on( "swiperight", goRight);
	    $slide.on( "swipeup", goUp );
	   	$slide.on( "swipedown", goDown );
    }


});
