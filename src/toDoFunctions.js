/// DOM MANIPULATOR

const dashboardTitle = document.querySelector('#dashboard-title');
const taskList=document.querySelector('#task-list');
const popupFormBody = document.querySelector('#form-body-create-new');
const navProject = document.querySelector('#side-project-container');
const popupFormButtons = document.querySelector('#create-new-buttons');

const allTasksList = [];
const projectList = [{title: "Poop", details: ""}, {title:"yaaa", details:""}, {title:"Birthday Plans",details:""}];

export const domManipulator = (function() {
    function emptyDashboard(){
        while (taskList.children.length>0){
            taskList.children[0].remove();
        }
    }

    // called when nav link is clicked and renders appropriate title
    function renderDashboardTitle(title){
        dashboardTitle.textContent = title;
    }

    // render project names in sidebar
    function renderProjectSidebar(){
        while (navProject.children.length>1){
            navProject.children[1].remove();
        }
        for (let i=0; i<projectList.length; i++){
            const sidebarProjectName = document.createElement('div');
            sidebarProjectName.textContent = projectList[i].title;
            sidebarProjectName.className="side-project-names";
            navProject.appendChild(sidebarProjectName);
        }
    }

    // create new popup render, default is create new task
    // empty the popup
    function emptyPopup(){
        while (popupFormBody.children.length>0){
            popupFormBody.children[0].remove();
        }
    }

    // fill it in with the appropriate form when popup nav link is clicked
    function renderTaskForm(){
        //just for the name portion of the form
        const nameFormGroup = document.createElement('div');
        nameFormGroup.className = "form-group";

        const nameFormLabel = document.createElement ('label');
        nameFormLabel.textContent = "Name: ";
        nameFormLabel.htmlFor = "task-name";
        nameFormGroup.appendChild(nameFormLabel);

        const nameFormInput = document.createElement('input');
        nameFormInput.type = "text";
        nameFormInput.id = "task-name";
        nameFormInput.minLength = "1";
        nameFormInput.setAttribute('required','');
        nameFormGroup.appendChild(nameFormInput);

        const nameFormInvalid = document.createElement('div');
        nameFormInvalid.className = "invalid-feedback";
        nameFormInvalid.textContent = "Task name is required";
        nameFormGroup.appendChild(nameFormInvalid);

        //due date
        const dateFormGroup = document.createElement('div');
        dateFormGroup.className = "form-group";

        const dateFormLabel = document.createElement('label');
        dateFormLabel.htmlFor = "task-date";
        dateFormLabel.textContent="Due: ";
        dateFormGroup.appendChild(dateFormLabel);

        const dateFormInput = document.createElement('input');
        dateFormInput.type="date";
        dateFormInput.id="task-date";
        dateFormGroup.appendChild(dateFormInput);

        //project name
        const projectFormGroup=document.createElement('div');
        projectFormGroup.className="form-group";

        const projectFormLabel = document.createElement('label');
        projectFormLabel.htmlFor = "task-project";
        projectFormGroup.appendChild(projectFormLabel);

        const projectSelect = document.createElement('select');
        projectSelect.name = "task-project";
        projectSelect.id = "task-project";

        for (let i=0; i<projectList.length; i++){
            const projectSelectOption = document.createElement('option');
            projectSelectOption.textContent = projectList[i];
            projectSelectOption.value = projectList[i].split(" ").join("");
            projectSelect.appendChild(projectSelectOption);
        }
        projectFormGroup.appendChild(projectSelect);

        // task details
        const detailsFormGroup = document.createElement('div');
        detailsFormGroup.className="form-group";

        const detailsFormLabel = document.createElement('label');
        detailsFormLabel.htmlFor="task-details";
        detailsFormLabel.textContent="Details: ";
        detailsFormGroup.appendChild(detailsFormLabel);

        const detailsFormInput = document.createElement('input');
        detailsFormInput.type = "textarea";
        detailsFormInput.id = "task-details";
        detailsFormGroup.appendChild(detailsFormInput);

        // append all form parts to the container
        popupFormBody.appendChild(nameFormGroup);
        popupFormBody.appendChild(dateFormGroup);
        popupFormBody.appendChild(projectFormGroup);
        popupFormBody.appendChild(detailsFormGroup);

        // sets the correct button to submit a TASK, but leaves the close popup button alone
        while(popupFormButtons.children.length>1){
            popupFormButtons.children[1].remove();
        }
        const createTaskButton = document.createElement('button');
        createTaskButton.id="create-new-submit-task";
        createTaskButton.textContent = "Add Task";
        createTaskButton.addEventListener('click',()=>{
            toDoManager.submitTask();
        })
        popupFormButtons.appendChild(createTaskButton);
    }

    function renderProjectForm(){
        // project name input
        const projectNameFormGroup = document.createElement('div');
        projectNameFormGroup.className="form-group";

        const projectNameFormLabel = document.createElement ('label');
        projectNameFormLabel.textContent = "Name: ";
        projectNameFormLabel.htmlFor = "project-name";
        projectNameFormGroup.appendChild(projectNameFormLabel);

        const projectNameFormInput = document.createElement('input');
        projectNameFormInput.type = "text";
        projectNameFormInput.id = "project-name";
        projectNameFormInput.minLength = "1";
        projectNameFormInput.setAttribute('required','');
        projectNameFormGroup.appendChild(projectNameFormInput);

        const projectNameFormInvalid = document.createElement('div');
        projectNameFormInvalid.className = "invalid-feedback";
        projectNameFormInvalid.textContent = "Project name is required";
        projectNameFormGroup.appendChild(projectNameFormInvalid);

        // project details input
        const projectDetailsFormGroup = document.createElement('div');
        projectDetailsFormGroup.className="form-group";

        const projectDetailsFormLabel = document.createElement('label');
        projectDetailsFormLabel.htmlFor="project-details";
        projectDetailsFormLabel.textContent="Details: ";
        projectDetailsFormGroup.appendChild(projectDetailsFormLabel);

        const projectDetailsFormInput = document.createElement('input');
        projectDetailsFormInput.type = "textarea";
        projectDetailsFormInput.id = "project-details";
        projectDetailsFormGroup.appendChild(projectDetailsFormInput);

        popupFormBody.appendChild(projectNameFormGroup);
        popupFormBody.appendChild(projectDetailsFormGroup);

        // sets the correct button to submit a PROJECT, but leaves the close popup button alone
        while(popupFormButtons.children.length>1){
            popupFormButtons.children[1].remove();
        }
        const createProjectButton = document.createElement('button');
        createProjectButton.id="create-new-submit-project";
        createProjectButton.textContent = "Add Project";
        popupFormButtons.appendChild(createProjectButton);
    }

    // display ALL tasks for the home page
    function displayAllTask(){
        for (let i = 0; i < allTasksList.length; i++){
            const task = allTasksList[i];

            const newTaskContainer = document.createElement('div');
            newTaskContainer.className="task-container";

            const newTaskName = document.createElement('div');
            newTaskName.className="task-name";
            newTaskName.textContent= task.title;

            const newTaskDate = document.createElement('div');
            newTaskDate.className = "task-date";
            newTaskDate.textContent=task.date;

            const newTaskProject =document.createElement('div');
            newTaskProject.className="task-project";
            newTaskProject.textContent=task.project;

            const newTaskStatus = document.createElement('div');
            newTaskStatus.className="task-status";
            newTaskStatus.className=task.status;

            const taskButtonsContainer = document.createElement('div');
            taskButtonsContainer.className="task-buttons-container";
            const editTaskButton = document.createElement('div');
            editTaskButton.className = "edit task-button";
            editTaskButton.textContent="Edit";
            taskButtonsContainer.appendChild(editTaskButton);
            const deleteTaskButton = document.createElement('div');
            deleteTaskButton.className = "delete task-button";
            deleteTaskButton.textContent = "Delete";
            taskButtonsContainer.appendChild(deleteTaskButton);

            newTaskContainer.appendChild(newTaskName);
            newTaskContainer.appendChild(newTaskDate);
            newTaskContainer.appendChild(newTaskProject);
            newTaskContainer.appendChild(newTaskStatus);
            newTaskContainer.appendChild(taskButtonsContainer);

            taskList.appendChild(newTaskContainer);
        }
    }

    // display ALL projects when nav project link is clicked
    function displayAllProject(){
        for (let i =0; i<projectList.length;i++){
            const project = projectList[i];

            const newProjectContainer = document.createElement('div');

            const newProjectName = document.createElement('div');
            newProjectName.className="project-name";
            newProjectName.textContent = project.title;

            const newProjectDetails = document.createElement('div');
            newProjectDetails.className="project-details";;
            newProjectDetails.textContent=project.details;

            const projectButtonsContainer = document.createElement('div');
            projectButtonsContainer.className="project-buttons-container";
            const editProjectButton = document.createElement('div');
            editProjectButton.className = "edit project-button";
            editProjectButton.textContent="Edit";
            projectButtonsContainer.appendChild(editProjectButton);
            const deleteProjectButton = document.createElement('div');
            deleteProjectButton.className = "delete task-button";
            deleteProjectButton.textContent = "Delete";
            projectButtonsContainer.appendChild(deleteProjectButton);

            newProjectContainer.appendChild(newProjectName);
            newProjectContainer.appendChild(newProjectDetails);
            newProjectContainer.appendChild(projectButtonsContainer);

            taskList.appendChild(newProjectContainer);
        }
    }
    
    
    return{
        emptyDashboard,
        renderDashboardTitle,
        emptyPopup,
        renderTaskForm,
        renderProjectForm,
        renderProjectSidebar,
        displayAllTask,
        displayAllProject,
    }
})();


const createNewPopup = document.querySelector('#create-new-popup');
export const toDoManager = (function() {

    let currentProject = "home";

    // object constructor //
    class Task{
        constructor(title,date,details,project,status){
            this.title = title;
            this.date = date;
            this.details = details;
            this.project = project;
            this.status = status;
        }
    }

    // add a new task to the allTasksList array
    function addTask(){
        const title = document.querySelector('#task-name').value;
        const date = document.querySelector('#task-date').value;
        const details = document.querySelector('#task-details').value;
        const project = document.querySelector('#task-project').value;
        const status = "not done"; //default is not done

        const newTask = new Task(title, date, details, project,status);
        allTasksList.push(newTask);
    }

    function submitTask(){ //when u click create task
        addTask(); // add task to array
        domManipulator.emptyDashboard(); //empty the tasklist
        domManipulator.displayAllTask(); // fills in tasklist
        createNewPopup.style.display='none'; // close popup 
        domManipulator.renderDashboardTitle('All Tasks'); //defaults to all tasks page
    }

    class Project{
        constructor(title,details){
            this.title = title;
            this.details = details;
        }
    }

    function addProject(){
        const title = document.querySelector('#project-name').value;
        const details = document.querySelector('#project-details');

        const newProject = new Project(title, details);
        projectList.push(newProject);

    }

    return{
        addTask,
        submitTask,
        addProject
    }
})();