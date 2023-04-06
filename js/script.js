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

      const detailsDiv = createDiv('student-details', studentData);

      listItem.appendChild(detailsDiv);

      const dateJoinedDiv = createDiv('joined-details', studentData);

      listItem.appendChild(dateJoinedDiv);

      ul.appendChild(listItem); // Prints the student's info card to the page.

   }

   function createDiv(divClass, studentData) {
      const div = document.createElement('div')
      div.classList.add(divClass);

      const divInfo = {
            studentDetails: `
               <img class="avatar" src="${studentData['picture']['large']}" alt="Profile Picture of ${studentData['name']['first']}">
               <h3>${studentData['name']['first']} ${studentData['name']['last']}</h3>
               <span class="email">${studentData['email']}</span>
            `,
            joinedDetails: `
               <span class="date">${studentData['registered']['date']}</span>
            `
            };
      if (divClass === "student-details") {
         div.insertAdjacentHTML("afterbegin", divInfo.studentDetails);

      } else if (divClass === "joined-details") {
         div.insertAdjacentHTML("afterbegin", divInfo.joinedDetails);
      }
      return div;
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

// Calculates the minimum number of pages need to display all the contents of the list.
  const numOfPages = Math.ceil(list.length / 9);

// Claars out the buttons
  pageLinks.innerHTML = '';

// Adds button to the page for each nesecessary page needed for the provided list.
  for (let i = 1; i <= numOfPages; i++) {

// If the button's number is the number of the current page set that button to the active button
   if (i === +currentPage) {
      pageLinks.insertAdjacentHTML('beforeend', `
         <li>
            <button type="button" class="active">${i}</button>
         </li>
      `)
// Else just insert a regular button.
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
   `search` Function takes the "data" array and uses the `filter` method to filter if the
   first or last name of a student in the list matches the text field.
*/
const search = (_e) => {

   const userSearch = searchField.value;

   const searchResults = data.filter( student => {

      const firstName = student.name.first;
      const lastName = student.name.last;

      return firstName.toLowerCase().includes(userSearch.toLowerCase()) || lastName.toLowerCase().includes(userSearch.toLowerCase());
   })
// If no results are found a messages is printed to the page.
   if (searchResults.length < 1) {
      return ul.innerHTML = `<h1><strong>404:</strong> No Results Found for "${userSearch}"</h1>`
   }

// Updates the global 'current' variables to retain page functionalty after a search is initiated.
   currentList = searchResults;
   currentPage = 1;

// Prints search results to the screen.
   showPage(searchResults, 1);
}

// Event listeners for when a search action is intiated.
   searchButton.addEventListener('click', search)

   searchField.addEventListener('input', search)

// Initalizes Program...
showPage(currentList, currentPage);