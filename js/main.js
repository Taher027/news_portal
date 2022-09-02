const loadAllBlog = async() =>{
    const response = await fetch("https://openapi.programming-hero.com/api/news/categories");
    const data = await response.json();
    return data.data;
}
const setAllMenu = async() => {
    const data = await loadAllBlog();
    // console.log(data.news_category[5].category_name)
    const catOne = data.news_category[0].category_name;
    const catTow = data.news_category[1].category_name
    const catThree = data.news_category[2].category_name
    const catFour = data.news_category[3].category_name
    const CatFive = data.news_category[4].category_name
    const catSix = data.news_category[5].category_name
    const catSeven = data.news_category[6].category_name
    const catEight = data.news_category[7].category_name
    console.log(catOne, catThree, catTow, catFour, CatFive, catSix, catSeven, catEight)
}
setAllMenu();