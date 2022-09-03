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
        <a  class="nav-link" href="#" onclick="categoryPost('${category.category_id ? category.category_id : 'no post found'}')" >${category.category_name}</a>
        `;
        categoriesMenu.appendChild(a);
    });
};



// display product 
const categoryPost = (code) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${code}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryPosts(data.data))
}

const displayCategoryPosts = (posts) => {

    const categoryDiv = document.getElementById('categories_post');
    categoryDiv.innerHTML = "";
    console.log(posts)
    for(const post of posts){
        
        const div = document.createElement('div');
        div.classList.add('blog');
        div.classList.add('p-3');
        div.innerHTML = `
        
        <div>
                    <img src="${post.thumbnail_url}" alt="">

                </div>
                <div>
                    <h2>${post.title}</h2>
                    <p>${post.details}</p>
                    
                    <!-- blog details div  -->
                    <div class="blog_details">
                        <div class="blog_details ">
                            <div>
                                <img class="author1 " src="img/img2.png" alt="">
                            </div>
                            <div class="ms-2">
                                <h5 class="fs-6 fw-normal">author name</h5>
                                <h5 class="fs-6 fw-normal">date</h5>
                            </div>
                        </div>
                        <div>
                            <h5 class="fs-6 fw-normal">1.5M</h5>
                        </div>
                        <div>
                            <i class="fa-regular fa-star-half-stroke fs-6 fw-normal"></i>
                            <i class="fa-regular fa-star fs-6 fw-normal"></i>
                            <i class="fa-regular fa-star fs-6 fw-normal"></i>
                            <i class="fa-regular fa-star fs-6 fw-normal"></i>
                            <i class="fa-regular fa-star fs-6 fw-normal"></i>
                        </div>
                        <div>
                            <button class="btn btn-primary fs-5">Load more</button>
                        </div>
                    </div>
                </div>
        
        `
        categoryDiv.appendChild(div);
    }
    
    // displayCategoryPosts funtion end 
};






setAllMenu()