(function($) {

  /**
   * This adds a Chosen style selector for the tree select widget.
   *
   * This widget requires chosen.css.
   */
  $.fn.chosentree = function(params) {

    // Setup the default parameters.
    params = $.extend({
      width: 350,
      default_text: 'Select Item',
      selected: null
    },params);

    // Iterate through each instance.
    return $(this).each(function() {

      // Keep track of the treeselect.
      var selector = null;
      var choices = null;
      var search = null;
      var input = null;
      var treeselect = null;
      var treewrapper = null;
      var selectedTimer = 0;

      // Show or hide the tree.
      function showTree(show) {
        if (show) {
          treewrapper.addClass('treevisible').show('fast');
        }
        else {
          treewrapper.removeClass('treevisible').hide('fast');
        }
      }

      /** Called when a node is selected. */
      function nodeSelected(node, selected) {

        if (selected) {

          // Hide the choices.
          choices.hide();

          // Get and add a new choice.
          var choice = $(document.createElement('li'));
          choice.addClass('search-choice');
          choice.attr('id', 'choice_' + node.id);

          var span = $(document.createElement('span'));
          span.text(node.title);

          var close = $(document.createElement('a'));
          close.addClass('search-choice-close');
          close.attr('href', 'javascript:void(0)');

          // Bind when someone clicks on the close button.
          close.bind('click', {node: node}, function(event) {

            // Prevent the default.
            event.preventDefault();

            // Remove the choice.
            $('li#choice_' + event.data.node.id, choices).remove();

            // Deselect this node.
            event.data.node.select(false, true);
          });

          // Add this to the choices.
          search.before(choice.append(span).append(close));
        }
        else {

          // If not selected, then remove the choice.
          $('li#choice_' + node.id, choices).remove();
        }

        // Make sure we don't do this often for performance.
        clearTimeout(selectedTimer);
        selectedTimer = setTimeout(function() {

          // Show the choices again.
          if (selected) {
            choices.show('fast');
          }

          // If the moreorless widget is defined, then use it to keep the
          // selections from becoming unwieldy.
          if (jQuery.fn.moreorless) {
            var numselected = $('li.search-choice', choices).length;
            choices.moreorless(100, '+' + numselected + ' more');
          }
        }, 100);
      }

      // Create the selector element.
      selector = $(document.createElement('div'));
      selector.addClass('chzn-container chzn-container-multi');

      // Create the choices.
      choices = $(document.createElement('ul'));
      choices.addClass('chzn-choices chosentree-choices');
      choices.css('width', params.width + 'px');

      // Create the search element.
      search = $(document.createElement('li'));
      search.addClass('search-field');

      // Create the input element.
      input = $(document.createElement('input'));
      input.attr({
        'type': 'text',
        'value': params.default_text,
        'class': 'default',
        'autocomplete': 'off'
      });
      input.css('width', '100%');
      input.focus(function(event) {
        showTree(true);
      });

      // Creat the chosen selector.
      selector.append(choices.append(search.append(input)));

      treewrapper = $(document.createElement('div'));
      treewrapper.addClass('treewrapper');
      treewrapper.css('width', params.width + 'px');
      treewrapper.hide();

      // Get the tree select.
      treeselect = $(document.createElement('div'));
      treeselect.addClass('treeselect');

      // Setup the keyevents.
      $(this).keyup(function(event) {
        if (event.which == 27) {
          showTree(false);
        }
      });

      // Add the treeselect widget.
      $(this).append(selector.append(treewrapper.append(treeselect)));

      // Now declare the treeselect.
      var treeparams = params;

      // Reset the selected callback.
      treeparams.selected = function(node, selected) {
        nodeSelected(node, selected);
      };

      // Now declare our treeselect control.
      $(treeselect).treeselect(treeparams);
    });
  };
})(jQuery);