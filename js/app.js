'use strict';
// create array for anime categories and fill the items in the select tag using option tag
var animeCat = ['History', 'Comedy', 'Horror', 'Romance', 'Supernatural'];
function fillCat() {
  var catlist = document.getElementById('animeCat');
  for (var i = 0; i < animeCat.length; i++) {
    var options = document.createElement('option');
    options.textContent = animeCat[i];
    catlist.appendChild(options);
  }

}
fillCat();


// Constructor to add from form to the table
function Anime(title, cat, season){
  this.animeTitle = title;
  this.animeCat = cat;
  this.animeSeason = season;
  Anime.all.push(this);
}


var animeList = JSON.parse(localStorage.getItem('animeList'));
if(animeList){
  Anime.all = animeList;
  renderAnimeList();
} else{
  Anime.all = [];
}

// Add event listner and handler to form
var addAnimeForm = document.getElementById('animeform');
addAnimeForm.addEventListener('submit', addAnimeFormHandler);

// Add anime form handler
function addAnimeFormHandler(e){
  e.preventDefault();
  var animeName = e.target.animeTitleInput.value;
  var animeCat = e.target.animeCat.value;
  var animeRandomSeason = Math.floor( Math.random() * 7 ) + 1 ;
  // eslint-disable-next-line no-unused-vars
  var animeItem = new Anime(animeName,animeCat,animeRandomSeason);
  localStorage.setItem('animeList', JSON.stringify(Anime.all));
  var animeTable = document.getElementById('animeListTable');
  animeTable.innerHTML = '';
  renderAnimeList();
  var addAnimeForm = document.getElementById('animeform');
  addAnimeForm.reset();
}


// Render Anime List function
function renderAnimeList(){
  renderAnimeListHeader();
  var animeTable = document.getElementById('animeListTable');
  var animeTableBody = document.createElement('tbody');
  for(var i = 0; i < Anime.all.length; i++){
    var animeTableRow = document.createElement('tr');
    var animeTableRowTitle = document.createElement('td');
    var animeTableRowCategory = document.createElement('td');
    var animeTableRowSeason = document.createElement('td');
    var animeTableRowRemove = document.createElement('td');
    var animeTableRowRemoveBtn = document.createElement('button');
    animeTableRowRemoveBtn.textContent = 'X' ;
    animeTableRowRemoveBtn.setAttribute('id', i);

    animeTableRowRemoveBtn.addEventListener('click', deleteAnimeFromList);

    animeTableRowTitle.textContent = Anime.all[i].animeTitle;
    animeTableRowCategory.textContent = Anime.all[i].animeCat;
    animeTableRowSeason.textContent = Anime.all[i].animeSeason;
    animeTableRowRemove.appendChild(animeTableRowRemoveBtn);

    animeTableRow.appendChild(animeTableRowTitle);
    animeTableRow.appendChild(animeTableRowCategory);
    animeTableRow.appendChild(animeTableRowSeason);
    animeTableRow.appendChild(animeTableRowRemove);

    animeTableBody.appendChild(animeTableRow);
  }
  animeTable.appendChild(animeTableBody);
}

// Render Anime List Table header function
function renderAnimeListHeader(){
  var animeTable = document.getElementById('animeListTable');
  var animeTableHeader = document.createElement('thead');
  var animeTableHeaderRow = document.createElement('tr');

  var animeTableHeaderTitle = document.createElement('th');
  var animeTableHeaderCat = document.createElement('th');
  var animeTableHeaderSeason = document.createElement('th');
  var animeTableHeaderRemove = document.createElement('th');

  animeTableHeaderTitle.textContent = 'Anime Title';
  animeTableHeaderCat.textContent = 'Category';
  animeTableHeaderSeason.textContent = 'Random Season';
  animeTableHeaderRemove.textContent = 'Remove';

  animeTableHeaderRow.appendChild(animeTableHeaderTitle);
  animeTableHeaderRow.appendChild(animeTableHeaderCat);
  animeTableHeaderRow.appendChild(animeTableHeaderSeason);
  animeTableHeaderRow.appendChild(animeTableHeaderRemove);

  animeTableHeader.appendChild(animeTableHeaderRow);
  animeTable.appendChild(animeTableHeader);
}

// Remove anime button handler
function deleteAnimeFromList(e){
  var selectedAnime = e.target.id;
  Anime.all.splice(selectedAnime, 1);
  localStorage.setItem('animeList', JSON.stringify(Anime.all));
  var animeTable = document.getElementById('animeListTable');
  animeTable.innerHTML = '';
  renderAnimeList();
}
