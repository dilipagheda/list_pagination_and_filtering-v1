/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   

//global variables
let studentRecords = document.getElementsByClassName('student-item');
const PAGESIZE = 10;

//Add search box in the header if there are records
if(studentRecords.length>0){
   let searchDiv = document.createElement('div');
   searchDiv.classList.add('student-search');
   let inputBox = document.createElement('input');
   inputBox.placeholder='Search for students...';

   //add keyup listener to inputbox so that search happens in real time as user types
   inputBox.addEventListener('keyup', search);
   let button = document.createElement('button');
   button.innerText = 'Search';

   //add listener to the button
   button.addEventListener("click",search);
   searchDiv.appendChild(inputBox);
   searchDiv.appendChild(button);
   let parentDiv = document.querySelector('.page-header');
   parentDiv.appendChild(searchDiv);
}

//initially, on the first page load, all elements should have a matched class
for(let i=0;i<studentRecords.length;i++){
   studentRecords[i].classList.add('matched');
}

//function to search records
function search(){
   //get the text value from search input box
   let inputBox = document.querySelector('.student-search input');
   let searchPhrase = inputBox.value;

   //use inputBox.value to search in name or email and display the matches
   for(let i=0;i<studentRecords.length;i++){
      let email = studentRecords[i].querySelector('.email').innerText;
      let name = studentRecords[i].querySelector('h3').innerText;
      if(email.includes(searchPhrase) || name.includes(searchPhrase)){
         studentRecords[i].classList.add('matched');
         studentRecords[i].style.display='block';
      }else{
         studentRecords[i].classList.remove('matched');

         studentRecords[i].style.display='none';
      }
   }
   appendPageLinks();
}


/*** 
 This function- showPage- takes page number as an argument that could be any value greater than 1.
 It will then calculate from index and to index based on page size.
 It takes into consideration that index in studentRecords array starts from 0.
 so page 1 means we want to show records 0 to 9.
***/
function showPage(pageNumber,searchPhrase){
   let fromIndex = PAGESIZE * (pageNumber-1);
   let toIndex = fromIndex + (PAGESIZE-1);

   //filter based on class matched
   let matchedStudents = Array.from(studentRecords).filter(a => a.classList.contains('matched'));
   //show only those records that are between from and to indices
   for(let i=0;i<matchedStudents.length;i++){
      if(i>=fromIndex && i<=toIndex){
         matchedStudents[i].style.display = 'block';
      }else{
         matchedStudents[i].style.display = 'none';
      }
   }
}

/*** 
 This function creates links at the bottom of the page.
 It uses helper function generateLIs to generate li tags based on total pages
 * ***/
function appendPageLinks(){
   let matchedStudents = Array.from(studentRecords).filter(a => a.classList.contains('matched'));
   let totalPages = Math.ceil(matchedStudents.length / PAGESIZE);

   //first remove previous pagination
   let page = document.querySelector('.page');
   let paginationDiv = document.querySelector('.pagination');
   if(paginationDiv){
      page.removeChild(paginationDiv);

   }
   //now recalculate new pages and add them back in
   if(totalPages > 0){
      let div = document.createElement('div');
      div.className='pagination';
      div.innerHTML = generateLIs(totalPages);
      page.appendChild(div);
   
      //get the first page shown by default
      showPage(1);
      //add click listener at pagination div level to catch click event for li items
      paginationDiv = document.querySelector('.pagination');
      paginationDiv.addEventListener('click',loadPage);
   }else{
      let div = document.createElement('div');
      div.className='pagination';
      div.innerHTML = "<p>Sorry! No records found!</p>";
      page.appendChild(div);

   }
}

//Function to generate li elements
function generateLIs(totalPages){
   let htmlString="";
   for(let i=1;i<=totalPages;i++){
      if(i===1){
         htmlString += `<li>
                           <a class='active' href="#">${i}</a>
                        </li>`;
      }else{
         htmlString += `<li>
                           <a href="#">${i}</a>
                        </li>`; 
      }
   }
   return htmlString;
}

//This function is called when any of the pagination button is clicked
function loadPage(event){
   let liSelected = event.target;
   resetClassForLIs();
   liSelected.classList.add('active');
   showPage(liSelected.text);
}

//This function will remove class='active' from all li elements that already has a class active
function resetClassForLIs(){
   let lis = document.getElementsByClassName('active');
   for(let i=0;i<lis.length;i++){
      lis[i].classList.remove('active');
   }

}

//initial call on first page load
appendPageLinks();
