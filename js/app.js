'use strict';

const animalArray = [];

function Animal(animalObj) {
  // eslint-disable-next-line camelcase
  this.image_url = animalObj.image_url;
  this.title = animalObj.title;
  this.description = animalObj.description;
  this.keyword = animalObj.keyword;
  this.horns = animalObj.horns;

  animalArray.push(this);
}

//Dropdown menu function
function renderDropdown(animalArray) {

  const tempArray = [];
  animalArray.forEach(animal => {
    if (!tempArray.includes(animal.keyword)) {
      tempArray.push(animal.keyword);
    }
  });
  tempArray.forEach(keyword => {
    const $newSection = $('<option></option>');
    $newSection.text(keyword);
    $('optgroup').append($newSection);
  });
}

Animal.prototype.render = function () {
  // make a template
  const myTemplate = $('#animal-template').html();

  // make a new section
  const $newSection = $('<section></section>');

  // put the template html into my new section
  $newSection.html(myTemplate);

  // find the h2 and fill it with the name
  $newSection.find('h2').text(this.title);

  // find the h3 tag and fill with horn
  $newSection.find('h3').text('This animal has ' + this.horns + ' horn/horns.');

  // find the img and fill the src and alt
  $newSection.find('img').attr('src', this.image_url);
  $newSection.find('img').attr('alt', this.keyword);

  // find the p tag and fill with description
  $newSection.find('p').text(this.description);

  $('main').append($newSection);
};

//Create dropdown menu - page one data
$(document).ready($.get('data/page-1.json', data => {
  data.forEach(animal => {
    new Animal(animal).render();
  });
  renderDropdown(data);
})
);

// page two data
$(document).ready($.get('data/page-2.json'), data => {
  data.forEach(animal => {
    new Animal(animal).render();
    $('main[id="page-two"] section').hide();
  });
});

// page one button
$('button:first-of-type').on('click', $.get('data/page-1.json'), data => {
  renderDropdown(data);
  $('section').hide();
  $('main[id="page-one"] section').show();
});

// page two button
$('button:last-of-type').on('click', $.get('data/page-2.json'), data => {
  renderDropdown(data);
  $('section').hide();
  $('main[id="page-two"] section').show();
});

//Filters animals via selections
$(document).ready($('#myselection').on('change', function () {
  $('section').hide();
  // $(`section:contains(${this.value})`).show();
  $(`img[alt=${this.value}]`).parent().show();
  // console.log(this.value);
})
);

