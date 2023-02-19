const fs = require("fs");
const path = require("path");

// globals
let posts = [];
let categories = [];

module.exports.initialize = async () => {
  return new Promise((resolve, reject) => {
    // read post
    fs.readFile(
      path.join(__dirname, "data", "posts.json"),
      "utf8",
      (err, data) => {
        if (err) {
          // can't read file
          reject("Unable to read file");
        }
        posts = JSON.parse(data); // parse data
      }
    );

    // read categories
    fs.readFile(
      path.join(__dirname, "data", "categories.json"),
      "utf8",
      (err, data) => {
        if (err) {
          // can't read data
          reject("Unable to read file");
        }
        categories = JSON.parse(data); // parse data
      }
    );

    resolve();
  });
};

/**
 *
 * Get all posts from the posts array
 */
module.exports.getAllPosts = async () => {
  return new Promise((resolve, reject) => {
    if (posts.length === 0) {
      // no data
      reject("no results returned");
    }
    resolve(posts);
  }).catch((err) => {
    reject(err.message);
  });
};

/**
 * get published posts
 */
module.exports.getPublishedPosts = async () => {
  return new Promise((resolve, reject) => {
    if (posts.length === 0) {
      // no data
      reject("no results returned");
    }

    const publishedPosts = posts.filter((post) => post.published);

    if (publishedPosts.length === 0) {
      // no data
      reject("no results returned");
    }

    resolve(publishedPosts);
  }).catch((err) => {
    reject(err.message);
  });
};

/**
 * Get all categories
 */
module.exports.getCategories = async () => {
  return new Promise((resolve, reject) => {
    if (categories.length === 0) {
      // no data
      reject("no results returned");
    }
    resolve(categories);
  }).catch((err) => {
    reject(err.message);
  });
};

/**
 * Creates a new post, adds it to the posts array and returns the new post
 * @param {Object} postData
 * @returns {Object}
 */
module.exports.addPost = async (postData) => {
  return new Promise((resolve, reject) => {
    // set id property of postData
    postData.id = posts.length + 1;
    // set post published
    postData.published == postData.published ? true : false;
    // absolute number
    postData.category = Math.abs(postData.category);
    postData.postDate = new Date().toISOString().slice(0, 10);
    // push postData object to the posts array
    posts.push(postData);
    //resolve
    resolve(postData);
  }).catch((err) => {
    reject(err.message);
  });
};

/**
 * Returns Posts whose category equals the category provided
 * @param {*} category
 * @returns {Array}
 */
module.exports.getPostsByCategory = (category) => {
  return new Promise((resolve, reject) => {
    const filteredPosts = posts.filter(
      (post) => post.category === Math.abs(category)
    );
    if (filteredPosts.length > 0) {
      resolve(filteredPosts);
    } else {
      reject("no results returned");
    }
  }).catch((err) => {
    reject(err.message);
  });
};

/**
 * Returns arrays of posts
 * @param {String} minDateStr
 * @returns {Array}
 */
module.exports.getPostsByMinDate = (minDateStr) => {
  return new Promise((resolve, reject) => {
    const filteredPosts = posts.filter(
      (post) => new Date(post.postDate) >= new Date(minDateStr)
    );
    if (filteredPosts.length > 0) {
      resolve(filteredPosts);
    } else {
      reject("no results returned");
    }
  }).catch((err) => {
    reject(err.message);
  });
};

/**
 * Get post by id
 * @param {*} id
 * @returns {Object}
 */
module.exports.getPostById = (id) => {
  return new Promise((resolve, reject) => {
    const post = posts.find((post) => post.id === id);
    if (post) {
      resolve(post);
    } else {
      reject("no result returned");
    }
  }).catch((err) => {
    reject(err.message);
  });
};
