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
  // missing picture
  const missingURL = "https://tinyurl.com/tv-missing";

  let response = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
  let shows = response.data;
  return shows.map(function(eachShow){
    return {
        id: eachShow.show.id,
        name: eachShow.show.name,
        summary: eachShow.show.summary,
        image: eachShow.show.image ? eachShow.show.image.medium : missingURL
    };
  })

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
          <img class="card-img-top" src="${show.image}">
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">${show.summary}</p>
          </div>
          <button type="button" class="btn btn-primary" id="episode-btn">Episodes</button>
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
  let response = await axios.get(`https://api.tvmaze.com/shows/${id}/episodes`);
  
  let result = response.data;

  return result.map(function(episodeInfo){
    return {
      id: episodeInfo.id,
      name: episodeInfo.name,
      season: episodeInfo.season,
      number: episodeInfo.number
    }
  })

}

/** Populate episodes list:
 *     - provided an array of episodes info, and populates that into the #episodes-list part of the DOM.
 */

function populateEpisodes(episodes) {
  const $episodesList = $("#episodes-list");
  $episodesList.empty();

  for (let episode of episodes) {

    let newLi = document.createElement('li');
    newLi.innerText = `${episode.name} (season ${episode.season}, number ${episode.number})`;

    $episodesList.append(newLi);
  }
  $("#episodes-area").show();
}

/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#shows-list").on("click", "#episode-btn", async function handleSearch (evt) {
  // Why doesn't this part of my code work? 
  // Hannah's Code ???? -------------------------------------------
  let showId = $(evt.target).closest('div').data('show-id');

  // let getEpisodes = await getEpisodes(showId);

  // populateEpisodes(getEpisodes);
  // Hannah's Code ???? -------------------------------------------
  // let showId = $(evt.target).closest(".Show").data("show-id");
  // console.log(showId);
  let episodes = await getEpisodes(showId);
  populateEpisodes(episodes);

});