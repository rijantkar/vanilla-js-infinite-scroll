const postsContainer = document.querySelector('.post-container');
const loader = document.querySelector('.loader');
const filter = document.querySelector('.filter');

let limit = 5, page = 1;

async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

    const data = await res.json();

    return data;
}

//Render post in DOM

async function showPost() {
    const posts = await getPosts();
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">
                    ${post.title}
                </h2>
                <p class="post-body">
                    ${post.body}
                </p>
            </div>
        `;
        postsContainer.appendChild(postElement)
    })
}

showPost();

function showLoading() {
    loader.classList.add('show');
    setTimeout(() => {
        loader.classList.remove('show');
        page++;
        showPost();
    }, 1000)
}

window.addEventListener('scroll', () => {
    const {scrollTop, clientHeight, scrollHeight} = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading();
    }
});

filter.addEventListener('input', event => {
    const searchTerm = event.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if (title.indexOf(searchTerm) > -1 || body.indexOf(searchTerm) > -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    })
});