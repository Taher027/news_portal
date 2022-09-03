const loadAllBlog = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    try {
        const res = await fetch(url);
        const data = await res.json()
        return (data.data.news_category)
    }
    catch(error){
        console.log(error)
    }
};
const setAllMenu = async() => {
    const data = await loadAllBlog();
    const categoryMenu = document.getElementById("all_category");
    data.forEach(category => {
        // console.log(category.category_name)
        const a = document.createElement('a')
        a.innerHTML =`
        <a class="nav-link" href="#">${category.category_name}</a>
        `;
        categoryMenu.appendChild(a)
    });
}

setAllMenu()