const fs = require("fs");

let posts = [];
let categories = [];

function initialize() {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/posts.json', 'utf8', (err, data) => {
            if (err) {
                reject("unable to read posts.json file");
                return;
            }
            posts = JSON.parse(data);
            fs.readFile('./data/categories.json', 'utf8', (err, data) => {
                if (err) {
                    reject("unable to read categories.json file");
                    return;
                }
                categories = JSON.parse(data);
                resolve();
            });
        });
    });
}

function getAllPosts() {
    return new Promise((resolve, reject) => {
        if (posts.length === 0) {
            reject("no results returned for getAllPosts");
        } else {
            resolve(posts);
        }
    });
}

function getPublishedPosts() {
    return new Promise((resolve, reject) => {
        const publishedPosts = posts.filter(post => post.published === true);
        if (publishedPosts.length === 0) {
            reject("no results returned for getPublishedPosts");
        } else {
            resolve(publishedPosts);
        }
    });
}

function getPublishedPostsByCategory(category){
  return new Promise((resolve, reject) => {
      const publishedPosts = posts.filter(post => post.published == true && post.category == category);
      if (publishedPosts.length === 0) {
          reject("no results returned for getPublishedPosts");
      } else {
          resolve(publishedPosts);
      }
  });
} 

function getCategories() {
    return new Promise((resolve, reject) => {
        if (categories.length === 0) {
            reject("no results returned for getCategories");
        } else {
            resolve(categories);
        }
    });
}

function addPost(postData) {
  postData.published==undefined ? postData.published  = false : postData.published  = true;
  postData.id = posts.length + 1;
  postData.id = nextId++;
  postData.postDate = new Date().toISOString().slice(0,10);
  posts.push(postData);

  return new Promise((resolve,reject) => {
      if (posts.length == 0) {
          reject ('no results');
      }
      else {
          resolve(posts);
        }
    })
};

function getPostsByCategory(category) {
    return new Promise((resolve, reject) => {
      const filteredPosts = posts.filter(post => post.category === category);
      if (filteredPosts.length > 0) {
        resolve(filteredPosts);
      } else {
        reject("No results returned");
      }
    });
  }

  function getPostsByMinDate(minDateStr) {
    return new Promise((resolve, reject) => {
      const filteredPosts = posts.filter(post => new Date(post.postDate) >= new Date(minDateStr));
      if (filteredPosts.length > 0) {
        resolve(filteredPosts);
      } else {
        reject("No results returned");
      }
    });
  }

  function getPostById(id) {
    return new Promise((resolve, reject) => {
      const foundPost = posts.find(post => post.id === id);
      if (foundPost) {
        resolve(foundPost);
      } else {
        reject("No result returned");
      }
    });
  }
  

module.exports = {
    initialize,
    getAllPosts,
    getPublishedPosts,
    getPublishedPostsByCategory,
    getCategories,
    addPost,
    getPostsByCategory,
    getPostsByMinDate,
    getPostById
};