import "./style.css";
import { domManipulator,toDoManager } from "./toDoFunctions.js";

// dashboard links and popups
const createNew = document.querySelector('#create-new-button');
const createNewPopup = document.querySelector('#create-new-popup');
const editTaskButton = document.querySelectorAll('.edit');
const editTaskPopup = document.querySelector('#edit-task');
const closeCreatePopup=document.querySelector('#create-new-close');
const closeEditPopup = document.querySelector('#edit-task-close');

createNew.addEventListener('click', () =>{
    createNewPopup.style.display = 'grid';
})

editTaskButton.forEach((div)=>{
 div.addEventListener('click',()=>{
        editTaskPopup.style.display='grid';
    })
})

closeCreatePopup.addEventListener('click',()=>{
    createNewPopup.style.display='none';
    // add function to clear the form
})

closeEditPopup.addEventListener('click',()=>{
    editTaskPopup.style.display="none";
    //also need to add function to clear the form
})

// sidebar navigation and dashboard render
const homeNav = document.querySelector('#home-button');
const todayNav = document.querySelector('#today-button');
const weekNav = document.querySelector ('#week-button');
const projectHomeNav=document.querySelector('#project-button');
const projectNav = document.querySelectorAll('.side-project-names');

homeNav.addEventListener('click',()=>{
    domManipulator.emptyDashboard();
    domManipulator.renderDashboardTitle('All Tasks');
})

todayNav.addEventListener('click',()=>{
    domManipulator.emptyDashboard();
    domManipulator.renderDashboardTitle('Today');
})

weekNav.addEventListener('click',()=>{
    domManipulator.emptyDashboard();
    domManipulator.renderDashboardTitle('This Week');
})

projectHomeNav.addEventListener('click',()=>{
    domManipulator.emptyDashboard();
    domManipulator.renderDashboardTitle('Projects');
})

projectNav.forEach((div)=>{
    div.addEventListener('click', () =>{
        domManipulator.emptyDashboard();
        domManipulator.renderDashboardTitle(div.textContent);
    })
})