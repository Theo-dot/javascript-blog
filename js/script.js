'use strict';


function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  clickedElement.classList.add('active');
  const activeArticles = document.querySelectorAll('.post');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  let articleSelection = clickedElement.getAttribute('href');
  let targetArticle = document.querySelector(articleSelection);
  targetArticle.classList.add('active');
}
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';
function generateTitleLinks(customSelector = '') {
  let html = '';
  const titleList = document.querySelector(optTitleListSelector);
  function clearMessages() {
    titleList.innerHTML = '';
  }

  clearMessages();
  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );

  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function generateTags() {
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const tagList = article.querySelector(optArticleTagsSelector);
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    for (let tag of articleTagsArray) {
      const linkHTML = `<li><a href="#tag-${tag}"><span>${tag}&nbsp</span></a></li>`;

      html = html + linkHTML;
    }
    tagList.innerHTML = html;
  }
}

generateTags();

function tagClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  for (let tagLink of tagLinks) {
    tagLink.classList.remove('active');
  }
  const hrefLinks = document.querySelectorAll('a[href="' + href + '"]');
  for (let hrefLink of hrefLinks) {
    hrefLink.classList.add('active');
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');
}
function addClickListenersToTags() {
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  for (let link of tagLinks) {
    link.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();

function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const authorList = article.querySelector(optArticleAuthorSelector);
    const articleAuthor = article.getAttribute('data-author');
    const linkHTML = `<a href="#author-${articleAuthor}"><span>${articleAuthor}&nbsp</span></a>`;

    authorList.innerHTML = linkHTML;
  }
}

generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  for (let authorLink of authorLinks) {
    authorLink.classList.remove('active');
  }
  const hrefLinks = document.querySelectorAll('a[href="' + href + '"]');
  for (let hrefLink of hrefLinks) {
    hrefLink.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  for (let link of authorLinks) {
    link.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();
