const tags = {
    "3D GRAPHICS": './images/home/skills__software/3d-graphics.png',
    "2D GRAPHICS": './images/home/skills__software/2d-graphics.png',
    "UI/UX": './images/home/skills__software/app-development.png',
    "MODELING": './images/home/skills__software/3d-modelling.png',
    "TEXTURING": './images/home/skills__software/texture-design.png',
    "PROGRAMMING": './images/home/skills__software/game-development.png',
};

const additionalTags = {
    "PHOTOGRAPHY": './images/home/skills__software/photography.png',
    "ANIMATION": './images/home/skills__software/animation.png',
    "VIDEO EDITING": './images/home/skills__software/video-editing.png',
    "CONCEPT ART": './images/home/skills__software/concept-art.png',
    "VFX": './images/home/skills__software/VFX.png',
    "ROBLOX CLOTHING": './images/home/skills__software/roblox-clothing.png',
    "OTHER": './images/home/skills__software/other.png'
};

// Combine tags and additionalTags
const allTags = { ...tags, ...additionalTags };
let activeTags = []; // Keep track of active tags

let paginatedPosts = [];
let currentPage = 1;
let lastPage = 1;

async function loadBlogPosts(searchTerm = '', tagFilter = []) {
    const postContainer = document.getElementById('post-container');
    postContainer.innerHTML = ''; // Clear previous results
    const postCount = 9; // Set maximum number of posts per page
    const numberOfPosts = 132;
    let posts = [];

    // Load posts
    for (let postIndex = 1; postIndex <= numberOfPosts; postIndex++) {
        const postModule = await import(`./blogposts/posts/${postIndex}/post.js`);
        posts.push(postModule.default.BlogPostThumbnail);
    }

    // Filter posts if searchTerm is provided
    if (searchTerm) {
        searchTerm = searchTerm.toLowerCase();
        posts = posts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) || 
            post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }

    // Filter posts by selected tags if any are active
    if (tagFilter.length > 0) {
        posts = posts.filter(post => tagFilter.some(tag => post.tags.includes(tag)));
    }

    // Group posts into arrays of up to 9
    paginatedPosts = [];
    for (let i = 0; i < posts.length; i += postCount) {
        const chunk = posts.slice(i, i + postCount);
        if (chunk.length > 0) { // Only include non-empty chunks
            paginatedPosts.push(chunk);
        }
    }

    // Set lastPage based on the number of chunks
    lastPage = paginatedPosts.length;

    // Display the first page of posts
    displayPosts(paginatedPosts[0]);
    updatePaginationNumbers();
}

// Function to display posts from a given chunk
function displayPosts(postsChunk) {
    const postContainer = document.getElementById('post-container');
    postContainer.innerHTML = ''; // Clear previous results

    postsChunk.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.classList.add('blog-post');

        // Image container
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('blog-post-image');
        imageContainer.style.backgroundImage = `url(./images/blogposts/posts/${index + 1}/media/${post.thumbnail})`;
        imageContainer.style.backgroundSize = 'cover';
        imageContainer.style.backgroundPosition = 'center';
        imageContainer.style.height = '70%';

        // Divider
        const divider = document.createElement('div');
        divider.classList.add('blog-post-divider');

        // Info container
        const infoContainer = document.createElement('div');
        infoContainer.classList.add('blog-post-info');

        const title = document.createElement('h2');
        title.textContent = post.title;

        const date = document.createElement('p');
        date.textContent = post.date;

        // Create a tags container
        const tagsContainer = document.createElement('div');
        tagsContainer.classList.add('tags-container');

        // Add icons to valid tags from the `tags` object
        post.tags.forEach(tag => {
            if (tags[tag]) {  // Check if the tag exists in the `tags` object
                const tagElement = document.createElement('div');
                tagElement.classList.add('tag');

                const tagIcon = document.createElement('img');
                tagIcon.src = tags[tag];  // Use the tag's image path
                tagIcon.alt = tag;        // Set alt text for accessibility

                const tagText = document.createElement('span');
                tagText.textContent = tag;

                // Append the icon and the text
                tagElement.appendChild(tagIcon);
                tagElement.appendChild(tagText);
                tagsContainer.appendChild(tagElement);
            }
        });

        // Append title, date, and tags to the info container
        infoContainer.appendChild(title);
        infoContainer.appendChild(date);
        infoContainer.appendChild(tagsContainer);

        // Append containers and divider to the post element
        postElement.appendChild(imageContainer);
        postElement.appendChild(divider);
        postElement.appendChild(infoContainer);

        // Append the post element to the post container
        postContainer.appendChild(postElement);

        // Add a click event for redirection to the individual post page
        postElement.addEventListener('click', () => {
            window.location.href = `post.html?post=${index + 1}`;
        });
    });
}

// Function to update pagination numbers
function updatePaginationNumbers() {
    const paginationNumbers = document.getElementById('pagination-numbers');
    paginationNumbers.innerHTML = ''; // Clear previous numbers

    for (let i = 1; i <= lastPage; i++) {
        const pageButton = document.createElement('button');
        pageButton.classList.add('page-btn');
        pageButton.classList.add('numerated');
        pageButton.textContent = i;
        pageButton.onclick = () => goToPage(i);
        paginationNumbers.appendChild(pageButton);
    }
}

// Function to go to a specific page
function goToPage(page) {
    if (page < 1 || page > lastPage) return; // Validate page range
    currentPage = page;
    displayPosts(paginatedPosts[currentPage - 1]); // Adjust for zero-based index
}



// Search functionality
function handleSearch() {
    const searchBar = document.getElementById('search-bar');
    const searchTerm = searchBar.value.trim();
    loadBlogPosts(searchTerm, activeTags); // Include activeTags in the filter
}

// Event listeners for search bar and spyglass icon
function initializeSearch() {
    const searchBar = document.getElementById('search-bar');
    const searchIcon = document.querySelector('.search-icon');

    // Trigger search when "Enter" is pressed
    searchBar.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // Trigger search when spyglass icon is clicked
    searchIcon.addEventListener('click', handleSearch);
}

function appendCostTags() {
    const tagContainer = document.getElementById('tag-container');

    // Function to filter posts based on the selected tag
    function filterPosts() {
        const searchTerm = document.getElementById('search-bar').value.trim();
        loadBlogPosts(searchTerm, activeTags); // Re-filter with the search term and active tags
    }

    // Loop through each tag and append it to the tag-container
    for (const tag in tags) {
        if (tags.hasOwnProperty(tag)) {
            // Create a tag element
            const tagElement = document.createElement('div');
            tagElement.classList.add('tag-button');

            // Create an image element for the tag icon
            const tagIcon = document.createElement('img');
            tagIcon.src = tags[tag];  // Use the image path from the tags object
            tagIcon.alt = tag;

            // Create a span element for the tag text
            const tagText = document.createElement('span');
            tagText.textContent = tag;

            // Append the icon and text to the tag element
            tagElement.appendChild(tagIcon);
            tagElement.appendChild(tagText);

            // Add click event listener to toggle the tag selection
            tagElement.addEventListener('click', () => {
                // Toggle tag selection (add/remove from activeTags)
                if (activeTags.includes(tag)) {
                    activeTags = activeTags.filter(activeTag => activeTag !== tag); // Remove tag if already active
                    tagElement.classList.remove('active'); // Remove highlight
                } else {
                    activeTags.push(tag); // Add tag to activeTags
                    tagElement.classList.add('active'); // Highlight the tag
                }

                // Update the dropdown item's state based on active tags
                const dropdownItem = Array.from(tagContainer.querySelectorAll('.dropdown-item')).find(item => item.textContent.trim() === tag);
                if (dropdownItem) {
                    dropdownItem.classList.toggle('active', activeTags.includes(tag));
                }

                // Filter posts by the updated active tags
                filterPosts();
            });

            // Append the tag element to the tag container
            tagContainer.appendChild(tagElement);
        }
    }

    // Append the "ALL" tag element outside the loop
    const allTagElement = document.createElement('div');
    allTagElement.classList.add('tag-button', 'dropdown');
    allTagElement.innerHTML = 'ALL <i class="fa-solid fa-caret-down"></i>';
    const dropdownContent = document.createElement('div');
    dropdownContent.classList.add('dropdown-content');

    // Hide dropdown by default
    dropdownContent.style.display = 'none';

    // Add click event listener to toggle dropdown visibility
    allTagElement.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent click from closing the dropdown
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block'; // Toggle visibility
    });

    // Create a header text element for the dropdown
    const dropdownText = document.createElement('h1');
    dropdownText.textContent = "Select Tags:"; // Update text as needed
    dropdownContent.appendChild(dropdownText);

    // Append all additional tags as dropdown items
    for (const additionalTag in allTags) {
        if (allTags.hasOwnProperty(additionalTag)) {
            const dropdownItem = document.createElement('div');
            dropdownItem.classList.add('tag-item', 'dropdown-item'); // Added 'dropdown-item' class



            // Create an image element for the tag icon
            const tagIcon = document.createElement('img');
            tagIcon.src = allTags[additionalTag];  // Use the image path from the tags object


            // Create a span element for the tag text
            const tagText = document.createElement('span');
            tagText.textContent = additionalTag;
            
            // Add the icon and text to the dropdown item
            dropdownItem.appendChild(tagIcon); // Append the icon
            dropdownItem.appendChild(tagText); // Append the text

            // Clear all tags functionality
            document.getElementById('clear-button').addEventListener('click', () => {
                activeTags = []; // Clear the active tags array

                // Remove 'active' class from all tag buttons
                const tagButtons = document.querySelectorAll('.tag-button');
                tagButtons.forEach(tagButton => {
                    tagButton.classList.remove('active'); // Remove highlight from all tags
                });

                // Re-load blog posts without any active tags
                const searchTerm = document.getElementById('search-bar').value.trim();
                loadBlogPosts(searchTerm, activeTags); // Load posts with cleared tags
            });

            // Add click event listener to toggle the dropdown tag selection
            dropdownItem.addEventListener('click', () => {
                if (activeTags.includes(additionalTag)) {
                    activeTags = activeTags.filter(activeTag => activeTag !== additionalTag); // Remove tag if already active
                    dropdownItem.classList.remove('active'); // Remove highlight from dropdown item
                } else {
                    activeTags.push(additionalTag); // Add tag to activeTags
                    dropdownItem.classList.add('active'); // Highlight the dropdown item
                }

                // Update the main tag element's state
                const mainTagElement = Array.from(tagContainer.children).find(child => child.textContent.trim() === additionalTag);
                if (mainTagElement) {
                    mainTagElement.classList.toggle('active', activeTags.includes(additionalTag));
                }

                filterPosts(); // Filter posts based on updated active tags
            });

            // Set active class for dropdown items based on activeTags
            if (activeTags.includes(additionalTag)) {
                dropdownItem.classList.add('active'); // Add active class if the tag is active
            }

            dropdownContent.appendChild(dropdownItem);
        }
    }

    allTagElement.appendChild(dropdownContent);
    tagContainer.appendChild(allTagElement);
}

// Event listener to close the dropdown when clicking outside
document.addEventListener('click', () => {
    const dropdowns = document.querySelectorAll('.dropdown-content');
    dropdowns.forEach(dropdown => {
        dropdown.style.display = 'none';
    });
});



// Initialize search functionality on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeSearch();
    appendCostTags();
    loadBlogPosts(); // Load posts initially without search term or filters
});
