[JQuery Transition Slider](https://github.com/npny/jquery.transition-slider)
==========================
This is a small slider I wrote for a company website, where the slide would build up as its elements animated in, then the entire slide would disappear, letting the next one start building up, and so on.



Usage
-----

The only thing the javascript does is show/hide frames and add/remove classes to trigger the transitions, everything else is defined in CSS.  
Features autoplay, keyboard, and touchscreen navigation.

CSS setup is pretty straightforward. For each one of your slides, there's three things to do :
 - Define your slide normally, in its final state, title and content properly placed, colored.
 - In the `.start` subclass, you can define a starting configuration for the animation. Position elements hidden in corners, set some opacity to 0 here and there, that kind of stuff.
 - In the `.animation` subclass, you set the `transition-duration` and `transition-delay` for individual elements. That's where you implement that perfectly-timed choreography you have in mind.

As a fallback for non-javascript browsers, you can add a simple rule to hide all slides except one. For instance : `li:not(:first-child) {display:none;}`
Another neat feature is that it will still function as a normal slider (i.e. instant slide change) on browsers that do not support css-transitions


Example Code
------------

```html
<ul>
	<li class="slide">
		<h1>Awesome Title !</h1>
		<p>	Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
		<img src="http://placekitten.com/490/245" />
	</li>
</ul>
```

```css
.slide
{
	h1 {color: #EFEFEF;}
	p {opacity: 1;}
	img {margin-left: 0; opacity: 1;}
}


.start
{
	h1 {color: transparent}
	p {opacity: .5;}
	img {margin-left: -100%; opacity: 0;}
}

.animation
{
	h1 {transition: color 250ms;}
	p {transition: opacity 500ms; transition-delay: 100ms}
	img {transition: margin-left 250ms, opacity 250ms;}
}
```

License
-------

jquery.transition-slider.js is released under the [MIT license](http://opensource.org/licenses/mit-license.php).
Pierre Boyer, 2013
