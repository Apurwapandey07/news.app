
const apikey ="4bc776f1db694db28f3a5c94b2153ed8";
const blogcontainer=document.getElementById("blog_container");
const searchfield=document.getElementById("search_input");
const searchbutton=document.getElementById("search_button");
async function fetchRandomNews(){
    try{
        const apiUrl=`https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apikey}`
        const response=await fetch(apiUrl) ;
        const data= await response.json();
        return data.articles;

    } catch(error){
        console.error("Error in fetching the random news",error);
        return [];

    }
}
searchbutton.addEventListener("click", async()=>{
   const query=searchfield.value.trim()
   if(query!=""){
    try{
       const articles= await fetchNewsQuery(query);
       displayblogs(articles);
    }catch(error){
       console.log("Error in feteching newa by query",error);
    }
   }
});
async function fetchNewsQuery(query){
    try{
        const apiUrl=`https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apikey}`
        const response=await fetch(apiUrl) ;
        const data= await response.json();
        return data.articles;

    } catch(error){
        console.error("Error in fetching the random news",error);
        return [];

    }
}

function displayblogs(articles){
    blogcontainer.innerHTML=""
    articles.forEach((article)=>{
        const blogcard=document.createElement("div");
        blogcard.classList.add("blog_cards");
        const img=document.createElement("img");
        img.src=article.urlToImage;
        img.alt=article.title;
        const title=document.createElement("h2");
        const truncatedTitle=article.title.length>30?article.title.slice(0,30) + ".......":article.title;
        title.textContent=truncatedTitle;
        const description =document.createElement("p");
        description.textContent=article.description;
        blogcard.appendChild(img);
        blogcard.appendChild(title);
        blogcard.appendChild(description);
        blogcard.addEventListener("click",()=>{
        window.open(article.url,"_blank");
        });
        blogcontainer.appendChild(blogcard);
    })
}
(async ()=>{
    try{
        const articles=await fetchRandomNews();
        displayblogs(articles);

    }catch (error) {
        console.error("Error in fetching the random news",error);
    }
})();