/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
let studentRecords = document.getElementsByClassName('student-item');
const PAGESIZE = 10;

//Add search box in the header if there are records
if(studentRecords.length>0){
   let searchDiv = document.createElement('div');
   searchDiv.classList.add('student-search');
   let inputBox = document.createElement('input');
   inputBox.placeholder='Search for students...';
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
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/
/*** 
 This function takes page number as an argument that could be any value greater than 1.
 It will then calculate from index and to index based on page size.
 It takes into consideration that index in studentRecords array starts from 0.
 so page 1 means we want to show records 0 to 9.
***/
function showPage(pageNumber,searchPhrase){
   let fromIndex = PAGESIZE * (pageNumber-1);
   let toIndex = fromIndex + (PAGESIZE-1);
   console.log(`From:${fromIndex} To:${toIndex}`);

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
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
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
   }
   //get the first page shown by default
   showPage(1);
   //add click listener at pagination div level to catch click event for li items
   paginationDiv = document.querySelector('.pagination');
   paginationDiv.addEventListener('click',loadPage);

}

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
appendPageLinks();
// Remember to delete the comments that came with this file, and replace them with your own code comments.