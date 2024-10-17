const loadPost = async (postId) => {
    try {
        const post = await import(`./posts/${postId}/post.js`);
        const postContentDiv = document.getElementById('post-content');
        const introContainerDiv = document.querySelector('.intro-container');

        postContentDiv.innerHTML = ''; 
        introContainerDiv.innerHTML = ''; 

        const { PostContent, BlogPostThumbnail } = post.default;

        if (BlogPostThumbnail) {
            const titleElement = document.createElement('h1');
            titleElement.textContent = `${BlogPostThumbnail.title} - #${postId}`;
            introContainerDiv.appendChild(titleElement);

            const dateElement = document.createElement('p');
            dateElement.textContent = BlogPostThumbnail.date;
            introContainerDiv.appendChild(dateElement);

            const tagsElement = document.createElement('div');
            tagsElement.className = 'tags-container';
            BlogPostThumbnail.tags.forEach(tag => {
                const tagSpan = document.createElement('span');
                tagSpan.className = 'tag';
                tagSpan.textContent = tag;
                tagsElement.appendChild(tagSpan);
            });
            introContainerDiv.appendChild(tagsElement);
        }


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
                    blockDiv.className = 'BLOCK_1';
                    const blockContent = item.content;
                
                    for (const contentKey in blockContent) {
                        const contentValue = blockContent[contentKey];
                        
                        const contDiv = document.createElement('div');
                        contDiv.className = 'CONT_1';
                        
                        if (contentValue.IMG) {
                            const mediaSrc = `./images/blogposts/posts/${postId}/media/${contentValue.IMG}`;
                            const mediaTag = document.createElement('img');
                            
                            mediaTag.src = mediaSrc;
                            contDiv.appendChild(mediaTag);
                        }
                
                        if (contentValue.PI) {
                            const caption = document.createElement('p');
                            caption.className= 'PI';
                            caption.innerText = contentValue.PI;
                            contDiv.appendChild(caption);
                        }
                
                        blockDiv.appendChild(contDiv);
                    }
                
                    postContentDiv.appendChild(blockDiv);
                    break;

                case 'SPACE':
                    postContentDiv.appendChild(document.createElement('br'));
                    break;

                case 'DIV':
                    const divider = document.createElement('div');
                    divider.className = 'divider';
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



const getPostIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('post'); 
};

const postId = getPostIdFromUrl();
if (postId) {
    loadPost(postId);
} else {
    document.getElementById('post-content').innerHTML = '<p>No post specified.</p>';
}
