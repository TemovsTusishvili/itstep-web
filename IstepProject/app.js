// gsap.registerPlugin(ScrollTrigger);

// gsap.to('.test', {
//      x: 1250,

//      duration: 3,

//      scrollTrigger: {


//           trigger: '.test',

//           start: "bottom 100%",
//           end: "top 10%",
//           scrub: true,
//         //   toggleActions: "start none reverse  none",


//           // markers: true
//      }
// })


const API_KEY = "07f4c56ff64392836837181739598358";

const url = `https://api.themoviedb.org/3/search/movie?api_key=07f4c56ff64392836837181739598358`



let inputElement = document.getElementById("searchBox");
let searchBtn = document.getElementById("searchBTN");
let movieSerachable = document.getElementById("movie-searchable");
let imgElement = document.querySelector(".SearchMovie")


function generateUrl(path){
    const url = `https://api.themoviedb.org/3${path}?api_key=07f4c56ff64392836837181739598358`
    return url;
}


function requestMovies(url, onComplete, onError){
    fetch(url)
    .then((res) => res.json())
    .then(onComplete)
    .catch(onError)
}



function movieSection(movies)
{
    return movies.map((movie) => {
        if(movie.poster_path)
        {
            return `<img 
            class="SearchMovie"
            src=https://image.tmdb.org/t/p/w500/${movie.poster_path} 
            data-movie-id=${movie.id} />  `;
        }
    })
}



function createMovieContainer(movies){
    const movieElement = document.createElement("div");
    movieElement.setAttribute("class", "movie")

    const movieTemplate = `
        <section class="section">
            ${movieSection(movies)}
        </section>

        <div class="backround">
            <div class="content"> 
                <p id="content-close">X</p>
            </div>
        </div>


    `;




    movieElement.innerHTML = movieTemplate;
    return movieElement;

}



function renderSearchMovies(data){
    movieSerachable.innerHTML = ""
    const movies = data.results
    const movieBlock = createMovieContainer(movies);
    movieSerachable.appendChild(movieBlock)        
    console.log("Data:",data)
}


function searchMovie(value){
    const path = "/search/movie";

    const newUrl = generateUrl(path) + `&query=` + value;


    requestMovies(url,renderSearchMovies,``)
}

function handleError(error){
    console.log('Error: ',error)
}



searchBtn.onclick = function(event)
{
    event.preventDefault();
    const value = inputElement.value;

    const path = "/search/movie";

    const newUrl = generateUrl(path) + `&query=` + value;

    console.log(newUrl);


    fetch(newUrl)
        .then((res) => res.json())
        .then(renderSearchMovies)
        .catch((error) => {
            console.log("error is", error)
        });
    ;

    inputElement.value = ""
}


function createIframe(video){
    const iframe = document.createElement("iframe")
    iframe.src = `https://youtube.com/embed/${video.key}`
    iframe.width = 480
    iframe.height = 415
    iframe.allowFullscreen = true

    return iframe
}


function createVideoTemplate(data,content){
    content.innerHTML = `<p id='content-close'>X</p>`
    const videos = data.results
    const lenght = videos.lenght > 4 ? 4 : videos.lenght;
    const iframeContainer = document.createElement("div")

    for (let i = 0 ;i < 1; i++) {
        const video = videos[i] //video
        const iframe = createIframe(video)
        iframeContainer.appendChild(iframe)
        content.appendChild(iframeContainer)
    }
}

document.onclick = function(event){
    const target = event.target
    console.log("ello")

    if(target.tagName.toLowerCase() === "img")
    {
        console.log("ello")
        const section = target.parentElement;
        const backround = section.nextElementSibling;
        const content = backround.firstElementChild;
        const movieId = target.dataset.movieId
        console.log(movieId)

        backround.classList.add("backround-display");
        content.classList.add("content-display");


        const path = `/movie/${movieId}/videos`
        const url = generateUrl(path);
        console.log(url)
        // Fetch movie videos

        fetch(url)
        .then((res) => res.json())
        .then((data) => createVideoTemplate(data,content))
        .catch((error) => {
            console.log("error is", error)
        });
        ;


    }

    if (target.id === 'content-close')
    {
        const content = target.parentElement;
        const backround = content.parentElement;

        backround.classList.remove("backround-display");
        content.classList.remove("content-display");

    }
}











