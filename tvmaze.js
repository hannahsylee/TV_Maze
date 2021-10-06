/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.

  const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
  let numberOfMovies = response.data.length;
  // let idx = Math.floor(Math.random() * numberOfMovies);
  // console.log(response.data[idx]);
  for (let idx = 0; idx < numberOfMovies; idx++){
    return [
      {
        id: response.data[idx].show.id,
        name: response.data[idx].show.name,
        summary: response.data[idx].show.summary,
        image: response.data[idx].show.image.original
      }
    ]
  }
  // return [
  //   {
  //     id: response.data[idx].show.id,
  //     name: response.data[idx].show.name,
  //     summary: response.data[idx].show.summary,
  //     image: response.data[idx].show.image.original
  //   }
  // ]
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
           </div>
         </div>
       </div>
      `);

    $showsList.append($item);
  }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes

  // TODO: return array-of-episode-info, as described in docstring above
  const response = await axios.get(`https://api.tvmaze.com/shows/${id}/episodes`);
  let numberOfEpisodes = response.data.length;
  // let idx = Math.floor(Math.random() * numberOfEpisodes);
  // console.log(response);

  for (let idx = 0; idx < numberOfEpisodes; idx++){
    return [
      {
        id: response.data[idx].id,
        name: response.data[idx].name,
        season: response.data[idx].season,
        number: response.data[idx].number
      }
    ]
  }
  // return [
  //   {
  //     id: response.data[idx].show.id,
  //     name: response.data[idx].show.name,
  //     summary: response.data[idx].show.summary,
  //     image: response.data[idx].show.image.original
  //   }
  // ]
}
