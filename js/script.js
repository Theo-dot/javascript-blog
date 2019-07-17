/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

'use strict';

const templates = {
  articleLink: Handlebars.compile(
    document.querySelector('#template-article-link').innerHTML
  ),
  tagLink: Handlebars.compile(
    document.querySelector('#template-tag-link').innerHTML
  ),
  authorLink: Handlebars.compile(
    document.querySelector('#template-author-link').innerHTML
  ),
  cloudTagLink: Handlebars.compile(
    document.querySelector('#template-tag-cloud').innerHTML
  ),
  cloudAuthorLink: Handlebars.compile(
    document.querySelector('#template-author-cloud').innerHTML
  ),
};

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this, //this odnosi sie do kliknietego elementu
    activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  clickedElement.classList.add('active');
  const activeArticles = document.querySelectorAll('.post');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  let articleSelection = clickedElement.getAttribute('href'),
    targetArticle = document.querySelector(articleSelection);

  targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
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
    const articleId = article.getAttribute('id'),
      articleTitle = article.querySelector(optTitleSelector).innerHTML,
      linkHTMLData = {id: articleId, title: articleTitle},
      linkHTML = templates.articleLink(linkHTMLData);
    html = html + linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags) {
  const params = {
    min: 999999,
    max: 0,
  };

  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min,
    normalizedMax = params.max - params.min,
    percentage = normalizedCount / normalizedMax,
    classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}

function generateTags() {
  const articles = document.querySelectorAll(optArticleSelector);
  let allTags = {};

  for (let article of articles) {
    const tagList = article.querySelector(optArticleTagsSelector),
      articleTags = article.getAttribute('data-tags'),
      articleTagsArray = articleTags.split(' ');
    let html = '';

    for (let tag of articleTagsArray) {
      const linkHTMLData = {id: tag, title: tag},
        linkHTML = templates.tagLink(linkHTMLData);

      html = html + linkHTML;
      if (!Object.prototype.hasOwnProperty.call(allTags, tag)) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    tagList.innerHTML = html;
  }

  const tagList = document.querySelector('.tags'),
    allTagsData = {tags: []},
    tagsParams = calculateTagsParams(allTags);

  for (let tag in allTags) {
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams),
    });
  }
  tagList.innerHTML = templates.cloudTagLink(allTagsData);
}
generateTags();

function tagClickHandler(event) {
  event.preventDefault();
  const clickedElement = this,
    href = clickedElement.getAttribute('href'),
    tag = href.replace('#tag-', ''),
    tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

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
  let allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const authorList = article.querySelector(optArticleAuthorSelector),
      articleAuthor = article.getAttribute('data-author'),
      linkHTMLData = {id: articleAuthor, title: articleAuthor},
      linkHTML = templates.authorLink(linkHTMLData);

    if (!Object.prototype.hasOwnProperty.call(allAuthors, articleAuthor)) {
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    authorList.innerHTML = linkHTML;
  }

  const authorsList = document.querySelector('.authors'),
    authorsParams = calculateTagsParams(allAuthors),
    allAuthorsHTML = {authors: []};

  for (let author in allAuthors) {
    allAuthorsHTML.authors.push({
      author: author,
      className: calculateTagClass(allAuthors[author], authorsParams),
    });
  }
  authorsList.innerHTML = templates.cloudAuthorLink(allAuthorsHTML);
}
generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this,
    href = clickedElement.getAttribute('href'),
    author = href.replace('#author-', ''),
    authorLinks = document.querySelectorAll('a[href^="#author-"]');

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
