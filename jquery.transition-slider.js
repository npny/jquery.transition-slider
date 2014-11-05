/**
 * jQuery Pure CSS transition slider plugin
 * The only thing the javascript does is show/hide frames and add/remove classes to trigger the transitions, everything else is defined in CSS
 * Features autoplay, keyboard, and touchscreen navigation
 *
 * CSS setup is pretty straightforward. For each one of your slides, there's three things to do :
 *   - Define your slide normally, in its final state, title and content properly placed, colored.
 *   - In the .start subclass, you can define a starting configuration for the animation. Position elements hidden in corners, set some opacity to 0 here and there, that kind of stuff.
 *   - In the .animation subclass, you set the transition-duration and transition-delay for individual elements. That's where you implement that perfectly-timed choreography you have in mind.
 * 
 * As a fallback for non-javascript browsers, you can add a simple rule to hide all slides except one. For instance : li:not(:first-child) {display:none;}
 * Another neat feature is that it will still function as a normal slider (i.e. instant slide change) on browsers that do not support css-transitions
 *
 * @requires jquery.touchwipe
 * @author Pierre Boyer
 */

(function($) { 
 	$.fn.transitionSlider = function(settings)
 	{
 		var config =
 		{
 			autoplayEnabled: true,
 			autoplayDelay: 5000,
 			onChange: function(newFrameElement){ }
 		};

 		if(settings) $.extend(config, settings);

 		this.each(function()
 		{
 			var container = $(this), currentFrame, autoplayTimer;

 			function init()
 			{
 				// Setup
 				container.children().hide();
	 			currentFrame = container.children().first();
	 			goto(currentFrame);
	 			start();

	 			// Autoplay hover interrupt
	 			container.hover(stop, start);

	 			// Keyboard navigation
	 			$(document).keydown(function (e){switch(e.which){
				    case 37: prev(); break; // left
				    case 39: next(); break; // right
				}});

	 			// Touchscreen navigation
	 			container.touchwipe({
	 				wipeLeft: 	prev,
	 				wipeRight: 	next,
	 			})
 			}

 			function goto(newFrame)
 			{
 				currentFrame.hide().removeClass("animation");
 				currentFrame = newFrame;
 				currentFrame.addClass("start animation").show();

 				// This is needed to avoid the browser adding then removing .start in the same tick, which would result in no transition being triggered. requestAnimationFrame is not used here because it would imply variants for each vendor prefix, and almost no mobile browser currently supports it. A 50ms timeout (20fps) seems to cover most use cases.
 				setTimeout(function() { currentFrame.removeClass("start"); }, 50);

 				config.onChange(currentFrame); // Call handlers
 				start(); // Reset the autoplayTimer
 			}

 			function prev() { goto(currentFrame.prev().length ? currentFrame.prev() : currentFrame.nextAll().last()); }
 			function next()	{ goto(currentFrame.next().length ? currentFrame.next() : currentFrame.prevAll().last()); }
 			function stop()	{ clearInterval(autoplayTimer); }
 			function start() { clearInterval(autoplayTimer); if(config.autoplayEnabled) autoplayTimer = setInterval(next, config.autoplayDelay); }
 			
 			init();
 		});
 	};
})(jQuery);