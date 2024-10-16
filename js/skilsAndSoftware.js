const categorizedSkills = {
    "Visual Design": [
        { title: '3D Graphics', icon: '../images/home/skills__software/3d-graphics.png', startDate: new Date('2019-04-01') },
        { title: '2D Graphics/Illustrations', icon: '../images/home/skills__software/2d-graphics.png', startDate: new Date('2021-02-01') },
        { title: 'Photography', icon: '../images/home/skills__software/photography.png', startDate: new Date('2021-01-01') },
        { title: 'Video Editing', icon: '../images/home/skills__software/video-editing.png', startDate: new Date('2018-02-01') },
        { title: '3D Modelling', icon: '../images/home/skills__software/3d-modelling.png', startDate: new Date('2021-06-01') },
        { title: 'Texture Design', icon: '../images/home/skills__software/texture-design.png', startDate: new Date('2020-07-01') },
        { title: 'UI/UX Design', icon: '../images/home/skills__software/ui-design.png', startDate: new Date('2024-08-01') },
        { title: 'VFX (Videogames)', icon: '../images/home/skills__software/vfx.png', startDate: new Date('2023-07-01') },
        { title: 'Animation', icon: '../images/home/skills__software/animation.png', startDate: new Date('2022-08-01') },
        { title: 'Concept Art', icon: '../images/home/skills__software/concept-art.png', startDate: new Date('2024-07-01') }
    ],
    "Development": [
        { title: 'Project Management', icon: '../images/home/skills__software/project-management.png', startDate: new Date('2020-07-01') },
        { title: 'Game Development', icon: '../images/home/skills__software/game-development.png', startDate: new Date('2019-04-01') },
        { title: 'App Development', icon: '../images/home/skills__software/app-development.png', startDate: new Date('2021-04-01') },
        { title: 'Web Development', icon: '../images/home/skills__software/web-development.png', startDate: new Date('2024-08-29') }
    ],
    "Programming Languages": [
        { title: 'Lua', icon: '../images/home/skills__software/lua.png', startDate: new Date('2022-02-01') },
        { title: 'Python', icon: '../images/home/skills__software/python.png', startDate: new Date('2022-04-01') },
        { title: 'Java', icon: '../images/home/skills__software/java.png', startDate: new Date('2024-08-29') },
        { title: 'HTML', icon: '../images/home/skills__software/html.png', startDate: new Date('2024-08-29') },
        { title: 'CSS', icon: '../images/home/skills__software/css.png', startDate: new Date('2024-08-29') }
    ],
    "Marketing": [
        { title: 'Social Media Marketing', icon: '../images/home/skills__software/social-media-marketing.png', startDate: new Date('2023-06-01') },
        { title: 'Advertising', icon: '../images/home/skills__software/writing.png', startDate: new Date('2017-01-01') }
    ],
    "Languages": [
        { title: 'English', icon: '../images/home/skills__software/english.png', hoverText: 'Fluent' },
        { title: 'Spanish', icon: '../images/home/skills__software/spanish.png', hoverText: 'Fluent' },
        { title: 'French', icon: '../images/home/skills__software/french.png', hoverText: 'Learning' } 
    ]
};

const categorizedSoftware = {
    "Multimedia": [
        { title: 'Adobe Photoshop', icon: '../images/home/skills__software/photoshop.png', startDate: new Date('2019-09-01') },
        { title: 'Adobe Illustrator', icon: '../images/home/skills__software/illustrator.png', startDate: new Date('2022-01-01') },
        { title: 'Adobe Substance Painter', icon: '../images/home/skills__software/substance-painter.png', startDate: new Date('2020-05-01') },
        { title: 'Adobe XD', icon: '../images/home/skills__software/xd.png', startDate: new Date('2024-03-01') },
        { title: 'Paint.net', icon: '../images/home/skills__software/paint-net.png', startDate: new Date('2019-04-01') },
        { title: 'Adobe Premiere Pro', icon: '../images/home/skills__software/premiere-pro.png', startDate: new Date('2022-01-01') },
        { title: 'Adobe Lightroom', icon: '../images/home/skills__software/lightroom.png', startDate: new Date('2020-02-01') }
    ],
    "Development Software": [
        { title: 'Roblox Studio', icon: '../images/home/skills__software/roblox-studio.png', startDate: new Date('2019-02-01') },
        { title: 'Blender', icon: '../images/home/skills__software/blender.png', startDate: new Date('2019-04-01') },
        { title: 'Visual Studio Code', icon: '../images/home/skills__software/vscode.png', startDate: new Date('2022-04-01') }
    ],
    "Other": [
        { title: 'Jira', icon: '../images/home/skills__software/jira.png', startDate: new Date('2024-07-01') },
        { title: 'Confluence', icon: '../images/home/skills__software/confluence.png', startDate: new Date('2024-07-01') },
        { title: 'Trello', icon: '../images/home/skills__software/trello.png', startDate: new Date('2022-07-01') },
        { title: 'Pureref', icon: '../images/home/skills__software/pureref.png', startDate: new Date('2023-03-01') },
        { title: 'Audacity', icon: '../images/home/skills__software/audacity.png', startDate: new Date('2024-07-01') },
        { title: 'Acrobat', icon: '../images/home/skills__software/acrobat.png', startDate: new Date('2024-04-01') }
    ]
};

function calculateYears(startDate) {
    const currentDate = new Date();
    let years = currentDate.getFullYear() - startDate.getFullYear();
    let months = currentDate.getMonth() - startDate.getMonth();
    let days = currentDate.getDate() - startDate.getDate();

    if (days < 0) {
        months--;
        days += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    const totalYears = years + months / 12;

    let result = '';

    if (totalYears >= 1) {
        result += `${totalYears.toFixed(1)} ${totalYears.toFixed(1) === '1.0' ? 'Year' : 'Years'}`;
    } else if (months >= 1) {
        result += `${months} ${months === 1 ? 'Month' : 'Months'}`;
    } else if (days >= 0) {
        result += `${days} ${days === 1 ? 'Day' : 'Days'}`;
    }

    return result || '0 Days';
}




function populateCategorizedList(categories, listId) {
    const container = document.getElementById(listId);
    
    for (const [category, items] of Object.entries(categories)) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category-item'; // Class for each category

        const categoryTitle = document.createElement('h3');
        categoryTitle.innerText = category;
        categoryDiv.appendChild(categoryTitle);

        const list = document.createElement('ul');
        items.forEach(item => {
            const listItem = document.createElement('li');
            const defaultText = item.title;

            // Use hoverText directly for languages; otherwise, calculate years
            const hoverText = item.hoverText ? `${defaultText} : ${item.hoverText}` : `${defaultText}: ${calculateYears(item.startDate)}`;

            listItem.innerHTML = `
                <img src="${item.icon}" alt="${item.title} Icon" class="skill-icon">
                <span class="skill-text">${defaultText}</span>
            `;

            // Add event listeners to handle hover effect
            listItem.addEventListener('mouseover', () => {
                listItem.querySelector('.skill-text').innerText = hoverText;
            });

            listItem.addEventListener('mouseout', () => {
                listItem.querySelector('.skill-text').innerText = defaultText;
            });

            list.appendChild(listItem);
        });
        categoryDiv.appendChild(list);
        container.appendChild(categoryDiv);
    }
}

function highlightIfExceeds(containerId, paddingMarginIncluded = true) {
    const container = document.getElementById(containerId);
    const items = Array.from(container.children);
    
    // Get the width of the container (total row width)
    const containerWidth = container.offsetWidth;
    
    let totalItemsWidth = 0;
    let paddingMarginSum = 0;

    // Loop through each item to calculate their widths
    items.forEach((item, index) => {
        const itemStyles = window.getComputedStyle(item);
        let itemWidth = item.offsetWidth;

        // Optionally add padding and margins if specified
        if (paddingMarginIncluded) {
            const marginLeft = parseFloat(itemStyles.marginLeft);
            const marginRight = parseFloat(itemStyles.marginRight);
            const paddingLeft = parseFloat(itemStyles.paddingLeft);
            const paddingRight = parseFloat(itemStyles.paddingRight);
            
            paddingMarginSum += marginLeft + marginRight + paddingLeft + paddingRight;
            itemWidth += paddingLeft + paddingRight + marginLeft + marginRight;
        }

        totalItemsWidth += itemWidth;
    });

    // Get the last item in the row (we will check the expanded width of this)
    const lastItem = items[items.length - 1];
    const lastItemStyles = window.getComputedStyle(lastItem);
    
    // Save original content for last item
    const lastItemContent = lastItem.innerHTML;

    // Set the expanded content
    const expandedText = lastItem.querySelector('.skill-text').innerText + ": 2 Years";  // Example expanded content
    lastItem.querySelector('.skill-text').innerText = expandedText;

    // Calculate the width of the last item after expansion
    const expandedWidth = lastItem.offsetWidth;
    
    // Reset the original content of the last item
    lastItem.querySelector('.skill-text').innerText = lastItemContent;

    // Compare the total widths
    const totalWidthWithExpanded = totalItemsWidth - lastItem.offsetWidth + expandedWidth;

    // If the total expanded width exceeds the container width, highlight the last item
    if (totalWidthWithExpanded > containerWidth) {
        lastItem.style.backgroundColor = 'green';  // Highlight in green
    }
}




  


// Populate lists on document ready
document.addEventListener('DOMContentLoaded', function () {

    populateCategorizedList(categorizedSkills, 'skills-list');

    populateCategorizedList(categorizedSoftware, 'software-list');
    highlightLastItemOnExpand('skills-list'); // 'skills-list' should be the ID of your row container

});
