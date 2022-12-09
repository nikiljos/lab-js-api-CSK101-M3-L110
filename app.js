let $content=document.getElementById("content")

if (typeof gnewsApiKey != "string") {
    let error = "Missing API Key! Refer 'env.sample.js' file for more info...";
    $content.innerHTML = `<div class="error"><h2>🚧🚧 Sorry, Some Error Occured 🚧🚧</h2><code>${error}</code></div>`;
    throw error;
}
getNews()

// Progression 1: create a function and fetch the api using axios
function getNews(){
    let url=`https://gnews.io/api/v4/top-headlines?token=${gnewsApiKey}&topic=breaking-news&lang=en&country=in`
    axios.get(url)
    .then(res=>{
        console.log(res.data)
        res.data.articles.forEach(elt=>{
            $content.append(renderNews(elt))
        })
    })
    .catch(err=>{
        console.log(err)
        $content.innerHTML = "<h2>🚧🚧 Sorry, Some Error Occured 🚧🚧</h2>";
    })
}

function renderNews(article){
    let $article=document.createElement("div")
    $article.classList.add("news-card")
    let $title=document.createElement("h1")
    $title.innerText=article.title
    let $img=document.createElement("img")
    $img.setAttribute("src",article.image)
    let $desc=document.createElement("p")
    $desc.innerText=article.content
    $article.append($title,$img,$desc)
    return $article
}
