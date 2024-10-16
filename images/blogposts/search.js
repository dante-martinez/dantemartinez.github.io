// search.js

// Search by name or tag
function searchPosts(query) {
    query = query.toLowerCase();
    let filteredPosts;

    if (query.startsWith('#')) {
        const tag = query.slice(1);
        filteredPosts = sortedPosts.filter(post => post.BlogPostThumbnail.tags.toLowerCase().includes(tag));
    } else {
        filteredPosts = sortedPosts.filter(post => post.BlogPostThumbnail.title.toLowerCase().includes(query));
    }

    displayFilteredPosts(filteredPosts);
}

// Function to display filtered posts
function displayFilteredPosts(posts) {
    const postContainer = document.getElementById('post-container');
    postContainer.innerHTML = '';

    posts.forEach(post => {
        postContainer.innerHTML += `
            <div class="post-thumbnail">
                <img src="${post.BlogPostThumbnail.thumbnail}" alt="${post.BlogPostThumbnail.title}">
                <h3>${post.BlogPostThumbnail.title}</h3>
                <p>${post.BlogPostThumbnail.date}</p>
                <p>${post.BlogPostThumbnail.tags}</p>
                <button onclick="openPost(${post.id})">Read More</button>
            </div>
        `;
    });
}

// Add event listener for the search bar
document.getElementById('search-bar').addEventListener('input', (event) => {
    searchPosts(event.target.value);
});

// Add event listeners to tags (if clicked)
const tags = document.querySelectorAll('.tag');
tags.forEach(tag => {
    tag.addEventListener('click', () => {
        searchPosts(`#${tag.textContent}`);
    });
});
