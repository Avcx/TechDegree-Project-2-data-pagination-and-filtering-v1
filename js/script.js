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
let currentList = data;
const pageLinks = document.querySelector('.link-list');
const ul = document.querySelector('.student-list');

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page) {

/*
   Start off calculating the beginning and ending index from the "data" array to display on the selected page.
*/
   const startIndex = (page * 9) - 9; 
   const endIndex = page * 9;

// Clears all listItems off of the page.
   ul.innerHTML = ''


/*
   'createStudent' function takes the object passed into the "studentData" parameter and structures it into an "li"
    element with specific information showing.
*/
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


      ul.appendChild(listItem); // Prints the student's info card to the page.

   }

   // Runs this code block for each "student" object of the "list" array
   for (let student = startIndex; student < endIndex; student++) {

      // If the index number of the student is within the starting and ending index numbers for the page page being printed
      // Their information will be ran through the `createStudent` function to be added to the page. 
         if (list[student]) {
            createStudent(list[student]);
         } else {
            break;
         }
   }

   addPagination(list);

}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {

   if (currentList.length < 1) {
      return false;
   }
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

   if (e.target.tagName === 'BUTTON' && e.target.className !== 'active') {
      const page = e.target.textContent;
      currentPage = page;
      showPage(currentList, page);
   }

});

// Adds a search bar to the header of the page...
   const header = document.querySelector('.header');
   header.insertAdjacentHTML('beforeend', `
      <label for="search" class="student-search">
         <span>Search by name</span>
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
   `)

// Stores the button and the text field into variables
const searchButton = document.querySelector('label > button');
const searchField = document.querySelector('#search');

/*
   `search` Function takes the "data" array and uses the `filter` method to filter
*/
const search = (_e) => {

   const userSearch = searchField.value;

   const searchResults = data.filter( student => {
      const firstName = student.name.first;
      const lastName = student.name.last;

      return firstName.toLowerCase().startsWith(userSearch.toLowerCase()) || lastName.toLowerCase().startsWith(userSearch.toLowerCase());
   })
   if (searchResults.length < 1) {
      return ul.innerHTML = `<h1>404 No Results Found for "${userSearch}"</h1>`
   }
   currentList = searchResults;
   currentPage = 1;

   showPage(searchResults, currentPage);
}

   searchButton.addEventListener('click', search)

   searchField.addEventListener('input', search)
showPage(currentList, currentPage);