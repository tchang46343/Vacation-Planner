'use strict';

const apiKey = 'api_key=IFG9lzVqlJVIrnLUSBtJOFKPe86a3iR5942IpNAP';

function watchForm(){
    $('form').submit(event =>{
        event.preventDefault();
        console.log("😭");
        const searchTerm = $('.stateSearch').val();
        const maxResults = $('.parkQty').val();
    getNationalParks(searchTerm, maxResults);
    });
}
function createUrl(searchTerm,maxResults){
  const baseurl = 'https://developer.nps.gov/api/v1/parks';
  const userState = 'stateCode='+ searchTerm;
  const resultsQty = 'limit=' + maxResults;
  const url = baseurl + '?' + userState + '&' + resultsQty+ '&' + apiKey;
  return url;
}
function getNationalParks(searchTerm,maxResults){
    $('#js-searchParks').empty();
      // console.log(url);
      const url = createUrl(searchTerm,maxResults);
      fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      throw new Error();
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('.error-message').text(`Something went wrong.Try again later.`);
      });
}

function displayResults(responseJson){
  console.log(responseJson);
  $('#result-list').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    $('#result-list').append(
      `<h3>Article Title: ${responseJson.data[i].fullName}</h3>
        <ul>
          <h4>Description:</h4>
          <li>${responseJson.data[i].description}</li>
          <h4>For More info visit:</h4>
          <li>${responseJson.data[i].url}</li>
        </ul>`
      )};
  $('#results').removeClass('hidden');

}
$(watchForm);