const loadPost = async (postId) => {
    try {
        // Import the specific post.js file based on the postId
        const post = await import(`./posts/${postId}/post.js`);
        const postContentDiv = document.getElementById('post-content');
        const introContainerDiv = document.querySelector('.intro-container');

        // Clear previous content
        postContentDiv.innerHTML = ''; // Clear any existing content
        introContainerDiv.innerHTML = ''; // Clear intro container

        // Access the PostContent and BlogPostThumbnail from the imported post
        const { PostContent, BlogPostThumbnail } = post.default;

        // ---- Populate Intro Container ----
        if (BlogPostThumbnail) {
            // Title
            const titleElement = document.createElement('h1');
            titleElement.textContent = `${BlogPostThumbnail.title} - #${postId}`;
            introContainerDiv.appendChild(titleElement);

            // Date
            const dateElement = document.createElement('p');
            dateElement.textContent = BlogPostThumbnail.date;
            introContainerDiv.appendChild(dateElement);

            // Tags
            const tagsElement = document.createElement('div');
            tagsElement.className = 'tags-container'; // Add a class for CSS 
            BlogPostThumbnail.tags.forEach(tag => {
                const tagSpan = document.createElement('span');
                tagSpan.className = 'tag';
                tagSpan.textContent = tag;
                tagsElement.appendChild(tagSpan);
            });
            introContainerDiv.appendChild(tagsElement);
        }

        // ---- Populate Post Content ----
        PostContent.forEach(item => {
            switch (item.type) {
                case 'H1':
                    const h1 = document.createElement('h1');
                    h1.innerText = item.content;
                    postContentDiv.appendChild(h1);
                    break;

                case 'H2':
                    const h2 = document.createElement('p');
                    h2.innerText = item.content;
                    postContentDiv.appendChild(h2);
                    break;

                case 'BLOCK_1':
                    const blockDiv = document.createElement('div');
                    blockDiv.className = 'BLOCK_1'; // Add a class for CSS styling
                    const blockContent = item.content;
                
                    // Handle the block content
                    for (const contentKey in blockContent) {
                        const contentValue = blockContent[contentKey];
                        
                        const contDiv = document.createElement('div');
                        contDiv.className = 'CONT_1'; // Add the cont_1 class
                        
                        if (contentValue.IMG) {
                            const mediaSrc = `./images/blogposts/posts/${postId}/media/${contentValue.IMG}`;
                            const mediaTag = document.createElement('img');
                            
                            mediaTag.src = mediaSrc;
                            contDiv.appendChild(mediaTag); // Append to cont_1
                        }
                
                        if (contentValue.PI) {
                            const caption = document.createElement('p');
                            caption.className= 'PI';
                            caption.innerText = contentValue.PI;
                            contDiv.appendChild(caption); // Append to cont_1
                        }
                
                        blockDiv.appendChild(contDiv); // Append cont_1 to BLOCK_1
                    }
                
                    postContentDiv.appendChild(blockDiv);
                    break;

                case 'SPACE':
                    postContentDiv.appendChild(document.createElement('br'));
                    break;

                case 'DIV':
                    const divider = document.createElement('div');
                    divider.className = 'divider'; // Add a class for CSS styling
                    postContentDiv.appendChild(divider);
                    break;

                default:
                    console.warn(`Unrecognized type: ${item.type}`);
                    break;
            }
        });
    } catch (error) {
        console.error("Error loading the post:", error);
        document.getElementById('post-content').innerHTML = '<p>Failed to load post. Please try again later.</p>';
    }
};

// Function to get the post ID from the URL
const getPostIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('post'); // Get the 'post' query parameter
};

// Load the post using the specified postId
const postId = getPostIdFromUrl();
if (postId) {
    loadPost(postId); // Load the post using the extracted postId
} else {
    document.getElementById('post-content').innerHTML = '<p>No post specified.</p>';
}
