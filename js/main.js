const loadAllCategories = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    try {
        const res = await fetch(url);
        const data = await res.json()
        return (data.data.news_category)
    }
    catch (error) {
        console.log(error)
    }
};
const setAllMenu = async () => {
    const catagories = await loadAllCategories();

    const categoriesMenu = document.getElementById("all_category");

    catagories.forEach(category => {

        const a = document.createElement('a')
        a.innerHTML = `
        <a  class="nav-link" href="#" onclick="categoryPost('${category.category_id}')" >${category.category_name}</a>
        `;
        categoriesMenu.appendChild(a);
    });
};



// display product 
const categoryPost = (code) => {
    toggleSpinner(true)
    const url = `https://openapi.programming-hero.com/api/news/category/${code}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryPosts(data.data))
}

const displayCategoryPosts = (posts) => {
    toggleSpinner(false);
    const categoryDiv = document.getElementById('categories_post');

    const noData = document.getElementById('no_found_data')
    if (posts.length === 0) {
        noData.classList.remove('d-none')

    }
    else {
        noData.classList.add('d-none')
    }
    categoryDiv.innerHTML = "";
    const postLength = document.getElementById('post_count');
    postLength.innerText = `${posts.length} news found for this category`

    for (const post of posts) {

        const div = document.createElement('div');
        div.classList.add('blog');
        div.classList.add('p-3');
        div.classList.add('setmedia')
        div.innerHTML = `
        
        <div>
                    <img src="${post.thumbnail_url}" alt="">

                </div>
                <div>
                    <h2>${post.title}</h2>
                    <p>${post.details.slice(0, 250) + '....'}</p>
                    
                    <!-- blog details div  -->
                    <div class="blog_details">
                        <div class="blog_details ">
                            <div>
                                <img class="author1 " src="${post.author.img}" alt="">
                            </div>
                            <div class="ms-2">
                                <h5 class="fs-6 fw-normal">Author: ${post.author.name ? post.author.name : 'No data available'}</h5>
                                <h5 class="fs-6 fw-normal">date: ${post.author.published_date ? post.author.published_date : 'No data available'}</h5>
                            </div>
                        </div>
                        <div>
                            <h5 class="fs-6 fw-normal">Views: ${post.total_view ? post.total_view : 'no views'}</h5>
                        </div>
                        <div>
                            <i class="fa-regular fa-star-half-stroke fs-6 fw-normal"></i>
                            <i class="fa-regular fa-star fs-6 fw-normal"></i>
                            <i class="fa-regular fa-star fs-6 fw-normal"></i>
                            <i class="fa-regular fa-star fs-6 fw-normal"></i>
                            <i class="fa-regular fa-star fs-6 fw-normal"></i>
                        </div>
                        <div>
                            <button onclick ="loadPostModal('${post._id}')" class="btn btn-primary fs-5" data-bs-toggle="modal" data-bs-target="#postDetailModal">Load more</button>
                            
                        </div>
                    </div>
                </div>
        
        `
        categoryDiv.appendChild(div);




    };
    toggleSpinner(false)
    posts.length = '';



    // displayCategoryPosts funtion end 
};




const loadPostModal = (postId) => {
    const url = `https://openapi.programming-hero.com/api/news/${postId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPostModal(data.data[0]))
};
const displayPostModal = post => {

    const modalTilte = document.getElementById('postDetailModalLabel');
    modalTilte.innerText = post.title;
    const postDetails = document.getElementById('postDetails');
    postDetails.innerHTML = `
    
    <img src = "${post.thumbnail_url}">
    <p>${post.details.slice(0, 350)}</p>
    <p>Rating: ${post.rating.number}</p>
    <p>Total View: ${post.total_view ? post.total_view : 'No data available'}</p>
    <p>Author Name: ${post.author.name ? post.author.name : 'No data available'}</p>
    
    
    
    `
};

// spinner 
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none');
    }
}



setAllMenu();