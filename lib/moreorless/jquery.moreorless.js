/**
 *  moreorless.js - Developed by Travis Tidwell
 *
 *  http://github.com/travist/moreorless.js
 *
 *  Description:  This is an easy to use script that will make any element show
 *  more or less content.
 *
 *  License:  GPL version 3.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.

 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */
(function($) {
  jQuery.fn.moreorless = function(min_height, more_text, less_text) {

    // Default the parameters.
    min_height = min_height || 100;
    more_text = more_text || "more";
    less_text = less_text || "less";

    // Iterate over each element.
    this.each( function() {

      // Define all the elements of interest.
      var element = $(this);
      var div_height = element.height();
      var link = $('div.moreorless_link');
      var read_more = "<i><u>" + more_text + "</u></i>";
      var read_less = "<i><u>" + less_text + "</u></i>";

      // If the link is not found create it.
      if (link.length == 0) {
        link = $(document.createElement('div')).css({cursor: 'pointer'});
        link.addClass('moreorless_link');
        link.append(read_more);
      }

      // Set the content.
      var content = element.parent(".moreorless_content");
      if (content.length == 0) {
        content = element.wrap('<div></div>').parent();
        content.addClass("moreorless_content");
        content.css('overflow', 'hidden');
        content.height(min_height);
        content.after(link);
      }

      // Create a wrapper.
      var wrapper = content.parent('.moreorless_wrapper');
      if (wrapper.length == 0) {
        wrapper = content.wrap('<div></div>').parent();
        wrapper.addClass('moreorless_wrapper').css('position', 'relative');
      }


      function bindLink() {
        if (link.length > 0) {
          // Bind to when the link is clicked.
          link.unbind().bind('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            if( content.hasClass('expanded') ) {
              link.html(read_more);
              content.removeClass('expanded');
              content.css('overflow', 'hidden');
              content.animate({
                height:min_height
              }, 200);
            }
            else {
              link.html(read_less);
              content.addClass('expanded');
              content.animate({
                height:div_height
              }, 200, function() {
                content.css('overflow', '').height('inherit');
              });
            }
          });
        }
      }

      // Check the min or less height.
      function checkHeight() {
        if (div_height > min_height) {
          bindLink();
          link.html(read_more);
          content.removeClass('expanded').css('overflow', 'hidden');
          content.height(min_height).after(link);
        }
        else {
          content.css('overflow', '').height('inherit');
          link.remove();
        }
      }

      // Create a function to set the new height of the element.
      function setElementHeight() {
        div_height = element.height();
        checkHeight();
      }

      // Check the height.
      checkHeight();

      // Trigger when resize events occur, but don't trigger to fast.
      var resizeTimer = 0;
      $(window).unbind('resize').bind('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setElementHeight, 100);
      });
      element.unbind('resize').bind('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setElementHeight, 100);
      });
    });
  }
})(jQuery);