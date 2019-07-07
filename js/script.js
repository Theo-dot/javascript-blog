'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
 
  const activeArticles = document.querySelectorAll('.post');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  let articleSelection = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  let targetArticle = document.querySelector(articleSelection);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = ''){

  let html = '';

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  function clearMessages(){
    titleList.innerHTML = '';
  }

  clearMessages();
  
  /* for each article */
  
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  for (let article of articles){

    /* get the article id */

    const articleId = article.getAttribute('id');

    /* find the title element */
    /* get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
   
    /* insert link into titleList */
  
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function generateTags(){

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */

  for (let article of articles) {

    /* find tags wrapper */

    const tagList = article.querySelector(optArticleTagsSelector);
    
    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */

    for (let tag of articleTagsArray){

      /* generate HTML of the link */

      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '&nbsp</span></a></li>';

      /* add generated code to html variable */

      html = html + linkHTML;

    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */

    tagList.innerHTML = html;

  /* END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  
  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */

  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */

  for (let tagLink of tagLinks){

    /* remove class active */

    tagLink.classList.remove('active');

  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */

  const hrefLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */

  for (let hrefLink of hrefLinks){

    /* add class active */

    hrefLink.classList.add('active');

  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){

  /* find all links to tags */

  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */

  for (let link of tagLinks){

    /* add tagClickHandler as event listener for that link */

    link.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

/* Add author to specific article. After click on article author, sidebar will show others articles writed by this author */

function generateAuthors(){
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const authorList = article.querySelector(optArticleAuthorSelector);
    const articleAuthor = article.getAttribute('data-author'); 
    const linkHTML = '<a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '&nbsp</span></a>';
    authorList.innerHTML = linkHTML;
  }
}

generateAuthors();

function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  
  for (let authorLink of authorLinks){
    authorLink.classList.remove('active');
  }
  const hrefLinks = document.querySelectorAll('a[href="' + href + '"]');
  for (let hrefLink of hrefLinks){
    hrefLink.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  for (let link of authorLinks){
    link.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();
