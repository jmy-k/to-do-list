/// DOM MANIPULATOR

const dashboardTitle = document.querySelector('#dashboard-title')
const taskList=document.querySelector('#task-list')

export const domManipulator = (function() {
    function emptyDashboard(){
        while (taskList.children.length>0){
            taskList.children[0].remove();
        }
    }
    function renderDashboardTitle(title){
        dashboardTitle.textContent = title;
    }
    
    return{
        emptyDashboard, renderDashboardTitle
    }
})();

export const toDoManager = (function() {

    let currentProject = "home";

    function getCurrentProject(){
        return currentProject
    }

    function changeCurrentProject(newProject){
        currentProject = newProject;
    }

    return{getCurrentProject , changeCurrentProject}
})();