import "./style.css";
import { domManipulator,toDoManager,allTasksList,projectList } from "./toDoFunctions.js";

// default renders
domManipulator.renderProjectSidebar();

// dashboard links and popups
const createNew = document.querySelector('#create-new-button');
const createNewPopup = document.querySelector('#create-new-popup');
const closeCreatePopup=document.querySelector('#create-new-close');
const overlay=document.querySelector('.overlay')


createNew.addEventListener('click', () =>{
    createNewPopup.style.display = 'grid';
    overlay.style.display='flex';
    domManipulator.emptyPopup();   //empties the popup form area
    domManipulator.renderTaskForm(); //default form is the task form
})


closeCreatePopup.addEventListener('click',()=>{
    createNewPopup.style.display='none';
    overlay.style.display='none';
    // add function to clear the form values
})


// sidebar navigation and dashboard render
const homeNav = document.querySelector('#home-button');
const todayNav = document.querySelector('#today-button');
const projectHomeNav=document.querySelector('#project-button');

homeNav.addEventListener('click',()=>{
    domManipulator.emptyDashboard();
    domManipulator.renderDashboardTitle('All Tasks');
    domManipulator.displayAllTask();

    homeNav.classList.add("page");
    todayNav.classList.remove("page");
    projectHomeNav.classList.remove("page")
})

todayNav.addEventListener('click',()=>{
    domManipulator.emptyDashboard();
    domManipulator.renderDashboardTitle('Today');
    domManipulator.displayTodayTask();
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

    //for styling
    navNewTask.classList.add("clicked");
    navNewProject.classList.remove("clicked");
})

navNewProject.addEventListener('click',()=>{
    domManipulator.emptyPopup();
    domManipulator.renderProjectForm();

    //for styling
    navNewProject.classList.add("clicked");
    navNewTask.classList.remove("clicked");
})
