/**
 * Created by sheena-d on 4/12/17.
 */
$(document).ready(function() {

  var ravArticles = new Array();

  $('.cast-on button').click(function(){
    showNextArticle();
    ravArticles[ravArticles.length] = getNewArticle(ravOpt);
  });

  $('.options-switch .opt').click(function(){
    var opt = $(this).attr('rav-opt');
    $('.options-switch').attr('rav-active-opt', opt);
    $(this).siblings('.opt.active').removeClass('active');
    $(this).addClass('active');
  });

  /**
   * Retrieves a new random pattern from Ravelry.com's API.
   *
   * @param ravOpt String
   *   'stats', 'desc', or 'both'
   *   sets whether to retrieve the pattern's stats or description, or both.
   *   @TODO - For now, switching the options will just change what data we load for future articles. In the future, may add ability to change what is loaded for past articles, too.
   * @returns article Object
   *   an article object including the following properties:
   *   - ravID = Ravelry unique ID
   *   - title = Title of the pattern
   *   - url = URL to the article on Ravelry
   *   - ravOpt = the option (stats, desc, or both) when this article was loaded
   *   - content = The content of the pattern to be displayed on this site.
   *
   */
  function getNewArticle(ravOpt) {
    var article = {};
    return article;
  }

  /**
   *  Moves the current article to the sidebar and displays the next article.
   */
  function showNextArticle() {
  }

  /**
   * Renders the HTML output for an article
   * @TODO would be handy to have a template with tokens that can be loaded instead of smashing all the HTML in here.
   *
   * @param article Object
   *   an Article object. See getNewArticle().
   */
  function renderArticle(article) {
    return "<article class='rav-article' id='rav-" + article.ravID + "'> " +
      "<h3>" + article.title + "</h3>" +
      "<div class='rav-content " + article.ravOpt + "'>" + article.content + "</div>" +
      "<div class='readmore'><a href='" + article.url + "'>View on Ravelry.com</a></div>"+
      "</article>";
  }


  function renderSidebarItem(article) {
    return "<li class='rav-link' id='rav-link-" + article.ravID + "'>" +
      "<a href='" + article.url +"'>" + article.title + "</a>" +
      "</li>";
  }

  /**
   * Sets ravOpt based on the choice selected by user.
   */
  function getOpt() {
  }

  /**
   * @todo Page load set-up, if needed.
   */
  function ravSetUp() {

  }



});