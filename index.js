const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = "AIzaSyB5wDWKKvdRnOYBrt1dLh7U1vOKKnvsgo4";

function getDataFromApi(searchTerm, callback) {
  const query = {
    q: `${searchTerm}`,
    part: 'snippet',
    key: API_KEY,
    viewCount: "viewCount"
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
    console.log(data);
}


function renderResult(result) {
  return `
    <div><a href='http://www.youtube.com/watch?v=${result.id.videoId}' target='_blank'><img src='${result.snippet.thumbnails.high.url}' alt="video thumbnail"></a><div><p>${result.snippet.title}</p></div></div>
    `;
}

function displayYouTubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);
