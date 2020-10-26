

// Please do not share or post this api key anywhere,
// Your JavaScript will go here, you can view api information at
// http://www.omdbapi.com/, but the short of it is you'll need to
// send an "s" param with your query, an "apiKey" which is provided above
// and a "type" param. The api also accepts "page" as a parameter, and
// accepts standard numbers as arguments (i.e. page=1)
let omdbUrl = 'http://www.omdbapi.com/';
let omdbKey = '87ee28c1';
let omdbType = 'movie';

// div to show the response of the search
const outputAllMovies = document.getElementById('output');

// div to show the movie detail
const outPutSingleMovie = document.getElementById('single-output')

// event listener on click at search
document.getElementById('search-movie').addEventListener('click', getMovies)
document.getElementById('next')
function getMovies(){
    // get the value of the input
    let page = 1
    let input = document.getElementById('user-input').value
    let url = `${omdbUrl}?apikey=${omdbKey}&s=${input}&type=${omdbType}&page=`
   
    let output = '';
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if(data.Response === 'True') {
            
            let output2 = ''
            // sort the dates from newest to oldest
            data.Search.sort((a, b) => b.Year - a.Year)
            data.Search.forEach((movie) => {
            
               output += `
                <div>
                <ul>
                    <li id="${movie.imdbID}" class="card" onclick="getMovieDetail(${movie.imdbID})">
                    <img src="${movie.Poster}" class="custom-img" alt="poster">
                        <p class="title-text">${movie.Title}</p>
                        <p>Year: ${movie.Year}</p>
                        <a id="redirect">
                        <button class="detail">See movie detail</button>
                        </a>
                        
                    </li>
                    
                </ul>
     
                </div>
            `


            });
            
            outputAllMovies.innerHTML = output;

            document.getElementById('next').addEventListener('click', (e)=> {
                console.log(e)
                let next = url + `${page}`
                page++
                fetch(next)
                .then(response => response.json())
                .then(data => {
                   data.Search.forEach(movie => {
                    output2 = `
                    <div>
                    <ul>
                        <li id="${movie.imdbID}" class="card" onclick="getMovieDetail(${movie.imdbID})">
                        <img src="${movie.Poster}" class="custom-img" alt="poster">
                            <p class="title-text">${movie.Title}</p>
                            <p>Year: ${movie.Year}</p>
                            <a id="redirect">
                            <button class="detail">See movie detail</button>
                            </a>
                            
                        </li>
                        
                    </ul>
         
                    </div>
                `
                   })


                })
                if(e) {
                    outputAllMovies.innerHTML = '';
                    document.getElementById('next-output').innerHTML = output2
                }
            });


            // show the data on the view
           
            // clear the input on click
            input.value = '';
            // clear the movie detail on search again
            outPutSingleMovie.innerHTML = '';
            

        } else if (data.Response === 'False') {
            // function to show the error div 
            showAlert(`${data.Error}`, 'alert')
        }
        
    })
    .catch(err => console.log(err));
}





function getMovieDetail(e) {

    let singleOutput = '';
    fetch(`${omdbUrl}?apikey=${omdbKey}&i=${e.id}&type=${omdbType}`)
    .then(res => res.json())
    .then(movie => {
        console.log(movie)
        singleOutput = `
  
            <div class="grid-container">
                
            <img src="${movie.Poster}" class="detail-img" alt="poster"></img>
                <ul>
                    <li><h2>${movie.Title}</h2></li>
                    <li style="width: 50%">${movie.Plot}</li>
                    <li><b>Actors:</b> ${movie.Actors}</li>
                    <li><b>Director:</b> ${movie.Director}</li>
                    <li><b>Genre:</b> ${movie.Genre}</li>
                    <li><b>IMDB Rating:</b> ${movie.imdbRating}</li>
                </ul>
            
            
            </div>

            <footer class="footer">
                <span>FlowMovie Searcher &copy;</span>
         
            </footer>


        `
        // clear the allMovies div 
        outputAllMovies.innerHTML = '';
        // show the data on single Movie detail view
        outPutSingleMovie.innerHTML = singleOutput;

        document.getElementById('next-output').innerHTML = ''



    })
}

function showAlert(msg, className) {
    // create div
    const div = document.createElement('div')
    // assing the class 
    div.className = className
    // create the message
    div.appendChild(document.createTextNode(msg))
    // get the parent
    const container = document.querySelector('.container');
    // get the search input
    const search = document.getElementById('user-input');
    // insert the message on the DOM
    container.insertBefore(div, search)

    
    // only show the error message for two seconds
    setTimeout(() => {
        this.clearAlert()
    }, 2000);

    
}

// clear the error message
function clearAlert() {
    const currentAlert = document.querySelector('.alert')
    if(currentAlert) {
        currentAlert.remove();
    }
}
