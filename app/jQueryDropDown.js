/*
 * jDropDown
 * http://do-web.com/jdropdown/overview
 *
 * Copyright 2011, Miriam Zusin
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://do-web.com/jdropdown/license
 */
(function(a){a.fn.jDropDown=function(b){var b=a.extend({selected:0,callback:""},b);return this.each(function(){var c=this,d=c;a(c).addClass("jDropDown");c.ul=a(c).find("ul");c.li_list=c.ul.find("li");c.div=a(c).find("div");c.par=a(c).find("p");c.par.text(c.ul.find("li:eq("+b.selected+")").text());c.close=function(){d.ul.hide()};c.div.click(function(a){a.stopPropagation();if(d.ul.is(":visible"))d.close();else d.ul.show()});c.li_list.click(function(){var e=a(this).index(),c=a(this).text();d.par.text(c);d.close();a.isFunction(b.callback)&&b.callback(e,c)});a(document).click(function(){d.close()})})}})(jQuery);