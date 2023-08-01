import "./style.css";
import { domManipulator,toDoManager,allTasksList,projectList } from "./toDoFunctions.js";

// default renders
domManipulator.renderProjectSidebar();

// dashboard links and popups
const createNew = document.querySelector('#create-new-button');
const createNewPopup = document.querySelector('#create-new-popup');
const closeCreatePopup=document.querySelector('#create-new-close');



createNew.addEventListener('click', () =>{
    createNewPopup.style.display = 'grid';
    domManipulator.emptyPopup();   //empties the popup form area
    domManipulator.renderTaskForm(); //default form is the task form
})


closeCreatePopup.addEventListener('click',()=>{
    createNewPopup.style.display='none';
    // add function to clear the form values
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
    domManipulator.displayAllTask();
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
    domManipulator.displayAllProject();
})

// popup create new task/project render
const navNewTask = document.querySelector('#nav-new-task');
const navNewProject = document.querySelector('#nav-new-project')

navNewTask.addEventListener('click', () => {
    domManipulator.emptyPopup();
    domManipulator.renderTaskForm();
})

navNewProject.addEventListener('click',()=>{
    domManipulator.emptyPopup();
    domManipulator.renderProjectForm();
})
