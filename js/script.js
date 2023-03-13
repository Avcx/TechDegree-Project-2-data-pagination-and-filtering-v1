/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

let currentPage = 1;
const pageLinks = document.querySelector('.link-list');
const ul = document.querySelector('.student-list');

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page) {
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;
   ul.innerHTML = ''

   function createStudent(studentData) {
      const listItem = document.createElement('li');
      listItem.classList.add('student-item', 'cf');

      const detailsDiv = document.createElement('div');
      detailsDiv.classList.add('student-details');
      listItem.appendChild(detailsDiv);

      detailsDiv.insertAdjacentHTML('afterbegin', `
         <img class="avatar" src="${studentData.picture.large}" alt="Profile Picture of ${studentData.name.first}">
         <h3>${studentData.name.first} ${studentData.name.last}</h3>
         <span class="email">${studentData.email}</span>
      `)

      const dateJoinedDiv = document.createElement('div');
      dateJoinedDiv.classList.add('joined-details');
      listItem.appendChild(dateJoinedDiv);

      dateJoinedDiv.insertAdjacentHTML('afterbegin', `
         <span class="date">${studentData.registered.date}</span>
      `);

      ul.appendChild(listItem);

   }

   for (const student of list) {
      if (list.indexOf(student) >= startIndex && list.indexOf(student) < endIndex) {
         createStudent(student);
      }
   }

   addPagination(list);

}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {

  const numOfPages = Math.ceil(list.length / 9);
  pageLinks.innerHTML = '';

  for (let i = 1; i <= numOfPages; i++) {
   if (i === +currentPage) {
      pageLinks.insertAdjacentHTML('beforeend', `
         <li>
            <button type="button" class="active">${i}</button>
         </li>
      `)
   } else {
      pageLinks.insertAdjacentHTML('beforeend', `
      <li>
         <button type="button">${i}</button>
      </li>
   `)
   }
  }
}


// Call functions

pageLinks.addEventListener('click', (e) => {

   if (e.target.tagName === 'BUTTON') {
      const page = e.target.textContent;
      currentPage = page;
      showPage(data, page);
   }

});

   const header = document.querySelector('.header');
   header.insertAdjacentHTML('beforeend', `
      <label for="search" class="student-search">
         <span>Search by name</span>
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
   `)
const searchBox = document.querySelector('label');
const searchField = document.querySelector('#search')

const search = (e) => {
   const searchResults = data.filter( student => {
      return student.name.first.toLowerCase().startsWith(searchField.value.toLowerCase()) || student.name.last.toLowerCase().startsWith(searchField.value.toLowerCase());
   })
   if (searchResults.length < 1) {
      return ul.innerHTML = `<h1>404 No Results Found for "${searchField.value}"</h1>`
   }
   showPage(searchResults, 1);
}

   searchBox.lastElementChild.addEventListener('click', search)

   searchField.addEventListener('input', search)
showPage(data, currentPage);