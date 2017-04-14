/**
 * Created by sheena-d on 4/12/17.
 */
$(document).ready(function () {

  var wikiArticles = [];
  var wikiIDs = new Array();
  // You can change the next two variables to any WikiMedia site and this script should work the same.
  // @todo add option to interface to switch between WikiMedia sources.
  var wikiURL = "https://en.wikipedia.org/wiki/";
  var restURL = "https://en.wikipedia.org/api/rest_v1/";

  // Click callback to retrieve and display random article.
  $('.roll button').click(function () {
    $('.indicator').addClass('processing'); // Add "processing" message.
    // keep a max of 99 articles
    if (wikiArticles.length > 98) {
      wikiArticles.shift();
      wikiIDs.shift();
    }
    // Retrieve and display the new article.
    getNewArticle($('.options-switch').attr('wiki-active-opt'));
  });

  // Click callback to switch the article View for the next article.
  $('.options-switch .opt').click(function () {
    var opt = $(this).attr('wiki-opt');
    $('.options-switch').attr('wiki-active-opt', opt); // Set the opt value in the DOM.
    // Change classes for styling.
    $(this).siblings('.opt.active').removeClass('active');
    $(this).addClass('active');
  });

  /**
   * Retrieves a new random pattern from Wikipedia.org's API.
   *
   * @param wikiOpt String
   *   'stats', 'desc', or 'both'
   *   sets whether to retrieve the article's title, title & summary, or title, summary & image.
   *   @TODO - For now, switching the options will just change what data we load for future articles. In the future, may add ability to change what is loaded for past articles, too.
   * @returns article Object
   *   an article object including the following properties:
   *   - wikiID = The machine title
   *   - title = The human-readable title
   *   - url = URL to the article on Wikipedia
   *   - wikiOpt = the option (title, summ, full) when this article was loaded
   *   - content = The content of the article to be displayed on this site.
   *   - image = URL to the main article image.
   *   - related = list of related articles. @todo - add a "show random related article" button.
   *
   */
  function getNewArticle(wikiOpt) {
    var article = {};
    var count = wikiArticles.length;
    // Submit to API for a random page title.
    $.getJSON(restURL + "page/random/title", function (data) {

      // Don't duplicate displayed articles.
      if (wikiIDs.indexOf(data.items[0].title) == -1) {
        // Populate common article properties.
        article.wikiID = data.items[0].title;
        article.url = encodeURIComponent(article.wikiID);
        article.wikiOpt = wikiOpt;

        $.getJSON(restURL + "page/summary/" + article.wikiID, function (data) {
          article.title = data.title; // Human-readable title.
          // Only add extra data if needed to prevent utilizing unnecessary memory.
          if (wikiOpt == 'summ' || wikiOpt == 'full') {
            article.content = data.extract;
            if (wikiOpt == 'full') {
              article.image = data.originalimage.source;
            }
          }
        })
        // After the AJAX process has completed, render the articles.
          .done(function () {
            wikiArticles.push(article);
            wikiIDs.push(article.wikiID);
            showNextArticle();
          });
      }
      else {
        // If we get a random title that has already been used, get a different article.
        getNewArticle(wikiOpt);
      }
    });
  }

  /**
   *  Moves the current article to the sidebar and displays the next article.
   */
  function showNextArticle() {
    var count = wikiArticles.length;
    var article = wikiArticles[count - 1]; // current article.
    $('.wiki-articles .wiki-article').detach(); // remove old article.
    $('.wiki-articles').html(renderArticle(article)); // replace with the current article.
    $('.indicator').removeClass('processing'); // hide the "processing" message.
    // If this is not the first article, add the last article to the sidebar.
    if (count > 1) {
      $('.init').removeClass('init'); // removes class that hides the sidebar title.
      $('#viewed-articles ul').prepend(renderSidebarItem(wikiArticles[count - 2]));
    }
  }

  /**
   * Renders the HTML output for an article
   * @TODO would be handy to have a template with tokens that can be loaded instead of smashing all the HTML in here.
   *
   * @param article Object
   *   an Article object. See getNewArticle().
   */
  function renderArticle(article) {
    return "<article class='wiki-article clearfix " + article.wikiOpt + "' id='wiki-" + article['wikiID'] + "'> " +
      "<h3>" + article['title'] + "</h3>" +
      (typeof(article.image) != 'undefined' ? "<img class='wiki-img' src='" + article.image + "' alt='" + article.title + "' />" : "") +
      (typeof(article.content) != 'undefined' ? "<p class='wiki-content'>" + article.content + "</p>" : "") +
      "<p class='readmore'><a href='" + wikiURL + article.url + "'>View on Wikipedia.org</a></p>" +
      "</article>";
  }

  /**
   * Renders the HTML output for a previous article in the sidebar.
   * @TODO would be handy to have a template with tokens that can be loaded instead of smashing all the HTML in here.
   *
   * @param article Object
   *   an Article object. See getNewArticle().
   */
  function renderSidebarItem(article) {
    return "<li class='wiki-link' id='wiki-link-" + article.wikiID + "'>" +
      "<a href='" + wikiURL + article.url + "'>" + article.title + "</a>" +
      "</li>";
  }

});