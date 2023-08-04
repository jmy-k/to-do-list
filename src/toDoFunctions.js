/// DOM MANIPULATOR

const dashboardTitle = document.querySelector('#dashboard-title');
const taskList=document.querySelector('#task-list');
const popupFormBody = document.querySelector('#form-body-create-new');
const navProject = document.querySelector('#side-project-container');
const popupFormButtons = document.querySelector('#create-new-buttons');

const editPopup = document.querySelector('#edit');
const overlay=document.querySelector('.overlay')

const allTasksList = [];
const projectList = [];

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
        while (navProject.children.length>1){ //empty the sidebar
            navProject.children[1].remove();
        }
        for (let i=0; i<projectList.length; i++){
            const sidebarProjectName = document.createElement('div');
            sidebarProjectName.textContent = projectList[i].title;
            sidebarProjectName.className="side-project-names";

            sidebarProjectName.addEventListener('click', () =>{
                emptyDashboard();
                renderDashboardTitle(sidebarProjectName.textContent);
                const projectName = sidebarProjectName.textContent;
                displayProjectTask(projectName);
            })

            navProject.appendChild(sidebarProjectName);
        }
    }


    // CREATING TASKS/PROJECTS DOM
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
        dateFormInput.type="text";
        dateFormInput.placeholder="dd/mm/yyyy";
        dateFormInput.onfocus=function(){dateFormInput.type='date'};
        dateFormInput.onblur=function(){dateFormInput.type='text'};
        dateFormInput.id="task-date";
        dateFormGroup.appendChild(dateFormInput);

        //project name
        const projectFormGroup=document.createElement('div');
        projectFormGroup.className="form-group";

        const projectFormLabel = document.createElement('label');
        projectFormLabel.htmlFor = "task-project";
        projectFormLabel.textContent = "Project: "
        projectFormGroup.appendChild(projectFormLabel);

        const projectSelect = document.createElement('select');
        projectSelect.name = "task-project";
        projectSelect.id = "task-project";

        const projectSelectOption = document.createElement('option');

        projectSelectOption.textContent = ""; //default for tasks not associated with any project
        projectSelect.appendChild(projectSelectOption);

        for (let i=0; i<projectList.length; i++){
            const projectSelectOption = document.createElement('option');
            projectSelectOption.textContent = projectList[i].title;
            projectSelectOption.value = projectList[i].title;
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

        const detailsFormInput = document.createElement('textarea');
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
            overlay.style.display="none";
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

        const projectDetailsFormInput = document.createElement('textarea');
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
        createProjectButton.addEventListener('click',()=>{
            overlay.style.display="none"
            toDoManager.submitProject();
        })
        popupFormButtons.appendChild(createProjectButton);
    }



    // display ALL tasks for the home page
    function displayAllTask(){
        console.log(allTasksList);
        if (allTasksList.length === 0){
            const noTasksYet = document.createElement('div');
            noTasksYet.textContent = "No Tasks Yet!"
            taskList.appendChild(noTasksYet);
        }

        for (let i = 0; i < allTasksList.length; i++){
            const task = allTasksList[i];

            const newTaskContainer = document.createElement('div');
            newTaskContainer.className="task-container";
            if (allTasksList[i].status==="done"){
                newTaskContainer.classList.add("checked")
            }
            else{
                newTaskContainer.classList.add("unchecked")
            }


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
            if (task.status === "not done"){
                newTaskStatus.classList.add("unchecked");
                newTaskStatus.classList.remove("checked")
            }
            else if (task.status === "done"){
                newTaskStatus.classList.add("checked");
                newTaskStatus.classList.remove("unchecked")
            }
            newTaskStatus.addEventListener('click',()=>{
                toDoManager.toggleComplete(newTaskStatus);
            })

            const taskButtonsContainer = document.createElement('div');

            taskButtonsContainer.className="task-buttons-container";
            const editTaskButton = document.createElement('div');
            editTaskButton.className = "edit task-button";
            editTaskButton.textContent="Edit";
            editTaskButton.addEventListener('click', () =>{
                overlay.style.display='flex'; //overlay
                emptyEditPopup(); // clears the popup form so it's "refreshed"
                renderEditTask(editTaskButton); // the appropriate placeholders will appear in the form
                editPopup.style.display = "grid";
            })
            taskButtonsContainer.appendChild(editTaskButton);

            const deleteTaskButton = document.createElement('div');
            deleteTaskButton.className = "delete task-button";
            deleteTaskButton.textContent = "Delete";
            deleteTaskButton.addEventListener('click',()=>{
                toDoManager.deleteTask(deleteTaskButton)
            })
            taskButtonsContainer.appendChild(deleteTaskButton);

            newTaskContainer.appendChild(newTaskStatus);
            newTaskContainer.appendChild(newTaskName);
            newTaskContainer.appendChild(newTaskDate);
            newTaskContainer.appendChild(newTaskProject);
            newTaskContainer.appendChild(taskButtonsContainer);

            taskList.appendChild(newTaskContainer);
        }
    }

    // display ALL projects when nav project link is clicked
    function displayAllProject(){
        if (projectList.length === 0){
            const noProjectsYet = document.createElement('div');
            noProjectsYet.textContent = "No Projects Yet!"
            taskList.appendChild(noProjectsYet);
        }

        for (let i =0; i<projectList.length;i++){
            const project = projectList[i];

            const newProjectContainer = document.createElement('div');
            newProjectContainer.className="project-container";

            const newProjectName = document.createElement('div');
            newProjectName.className="project-name";
            newProjectName.textContent = project.title;

            newProjectName.addEventListener('click', () =>{
                emptyDashboard();
                renderDashboardTitle(newProjectName.textContent);
                const projectName = newProjectName.textContent;
                displayProjectTask(projectName);
            })

            const projectButtonsContainer = document.createElement('div');
            projectButtonsContainer.className="project-buttons-container";
            const editProjectButton = document.createElement('div');
            editProjectButton.className = "edit project-button";
            editProjectButton.textContent="Edit";
            editProjectButton.addEventListener('click', ()=>{
                overlay.style.display='flex';
                emptyEditPopup(); // clears edit form so it's "refreshed"
                renderEditProject(editProjectButton); // appropriate placeholders in the form
                editPopup.style.display = "grid";
            })
            projectButtonsContainer.appendChild(editProjectButton);


            const deleteProjectButton = document.createElement('div');
            deleteProjectButton.className = "delete project-button";
            deleteProjectButton.textContent = "Delete";
            deleteProjectButton.addEventListener('click',()=>{
                toDoManager.deleteProject(deleteProjectButton);
            })
            projectButtonsContainer.appendChild(deleteProjectButton);

            newProjectContainer.appendChild(newProjectName);
            newProjectContainer.appendChild(projectButtonsContainer);

            taskList.appendChild(newProjectContainer);
        }
    }
    
    // display tasks for specific project
    function displayProjectTask(projectName){
        console.log(allTasksList);
        if (allTasksList.length === 0){
            const noTasksYet = document.createElement('div');
            noTasksYet.textContent = "No Tasks Yet!"
            taskList.appendChild(noTasksYet);
        }

        for (let i=0; i<allTasksList.length; i++){
            if (allTasksList[i].project === projectName.trim()){ //only renders the task if the task's project name matches whatever project was clicked
                // same as rendering any task list 
                const task = allTasksList[i];

                const newTaskContainer = document.createElement('div');
                newTaskContainer.className="task-container";
                if (allTasksList[i].status==="done"){
                    newTaskContainer.classList.add("checked")
                }
                else{
                    newTaskContainer.classList.add("unchecked")
                }

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
            if (task.status === "not done"){
                newTaskStatus.classList.add("unchecked");
                newTaskStatus.classList.remove("checked")
            }
            else if (task.status === "done"){
                newTaskStatus.classList.add("checked");
                newTaskStatus.classList.remove("unchecked")
            }
            newTaskStatus.addEventListener('click',()=>{
                toDoManager.toggleComplete(newTaskStatus);
            })

                const taskButtonsContainer = document.createElement('div');
                taskButtonsContainer.className="task-buttons-container";
                const editTaskButton = document.createElement('div');
                editTaskButton.className = "edit task-button";
                editTaskButton.textContent="Edit";
                editTaskButton.addEventListener('click',()=>{
                    overlay.style.display='flex';
                    emptyEditPopup(); // clears edit form so it's "refreshed"
                    renderEditTask(editTaskButton); // appropriate placeholders in the form
                    editPopup.style.display = "grid";
                })
                taskButtonsContainer.appendChild(editTaskButton);

                const deleteTaskButton = document.createElement('div');
                deleteTaskButton.className = "delete task-button";
                deleteTaskButton.textContent = "Delete";
                deleteTaskButton.addEventListener('click',()=>{
                    toDoManager.deleteTaskFromProject(deleteTaskButton)
                })
                taskButtonsContainer.appendChild(deleteTaskButton);

                newTaskContainer.appendChild(newTaskStatus);
                newTaskContainer.appendChild(newTaskName);
                newTaskContainer.appendChild(newTaskDate);
                newTaskContainer.appendChild(newTaskProject);
                newTaskContainer.appendChild(taskButtonsContainer);

                taskList.appendChild(newTaskContainer);
            }
        }
    }

    // display TODAY's tasks
    function displayTodayTask(){
        console.log(allTasksList);
        if (allTasksList.length === 0){
            const noTasksYet = document.createElement('div');
            noTasksYet.textContent = "No Tasks Yet!"
            taskList.appendChild(noTasksYet);
        }

        const date = new Date();

        let day = ("0" + date.getDate()).slice(-2);
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let year = date.getFullYear();

        let currentDate = (year+"-"+month+"-"+day)

        for (let i = 0; i < allTasksList.length; i++){
            if (currentDate === allTasksList[i].date){
                const task = allTasksList[i];

            const newTaskContainer = document.createElement('div');
            newTaskContainer.className="task-container";
            if (allTasksList[i].status==="done"){
                newTaskContainer.classList.add("checked")
            }
            else{
                newTaskContainer.classList.add("unchecked")
            }


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
            if (task.status === "not done"){
                newTaskStatus.classList.add("unchecked");
                newTaskStatus.classList.remove("checked")
            }
            else if (task.status === "done"){
                newTaskStatus.classList.add("checked");
                newTaskStatus.classList.remove("unchecked")
            }
            newTaskStatus.addEventListener('click',()=>{
                toDoManager.toggleComplete(newTaskStatus);
            })

            const taskButtonsContainer = document.createElement('div');

            taskButtonsContainer.className="task-buttons-container";
            const editTaskButton = document.createElement('div');
            editTaskButton.className = "edit task-button";
            editTaskButton.textContent="Edit";
            editTaskButton.addEventListener('click', () =>{
                overlay.style.display='flex';
                emptyEditPopup(); // clears the popup form so it's "refreshed"
                renderEditTask(editTaskButton); // the appropriate placeholders will appear in the form
                editPopup.style.display = "grid";
            })
            taskButtonsContainer.appendChild(editTaskButton);

            const deleteTaskButton = document.createElement('div');
            deleteTaskButton.className = "delete task-button";
            deleteTaskButton.textContent = "Delete";
            deleteTaskButton.addEventListener('click',()=>{
                toDoManager.deleteTask(deleteTaskButton)
            })
            taskButtonsContainer.appendChild(deleteTaskButton);

            newTaskContainer.appendChild(newTaskStatus);
            newTaskContainer.appendChild(newTaskName);
            newTaskContainer.appendChild(newTaskDate);
            newTaskContainer.appendChild(newTaskProject);
            newTaskContainer.appendChild(taskButtonsContainer);

            taskList.appendChild(newTaskContainer);
            }
        }
    }


    const editFormContainer = document.querySelector('#edit-main');
    const editButtonsContainer = document.querySelector('#edit-buttons');
    const editPopupTitle=document.querySelector('#edit-title');

    // EDITING TASKS DOM

    // empties edit task popup before being open
    function emptyEditPopup(){
        while (editFormContainer.children.length>0){
            editFormContainer.children[0].remove()
        }
        while (editButtonsContainer.children.length>0){
            editButtonsContainer.children[0].remove()
        }
    }

    // opens edit task popup
    function renderEditTask(button){
        const taskContainer = button.closest('.task-container');
        const oldTaskName = taskContainer.querySelector('.task-name');
        const oldTaskDate = taskContainer.querySelector('.task-date');
        const oldTaskProject = taskContainer.querySelector('.task-project');

        editPopupTitle.textContent = "Edit Task";

        for(let i=0;i<allTasksList.length;i++){
            // checks if the clicked container has the matching task info in case there are tasks with duplicate info
            if (allTasksList[i].title===oldTaskName.textContent && allTasksList[i].date === oldTaskDate.textContent && allTasksList[i].project === oldTaskProject.textContent){
                // edit task name
                const editTaskName = document.createElement('div');
                editTaskName.className="form-group";

                const oldTaskNameLabel = document.createElement('label');
                oldTaskNameLabel.htmlFor="old-task-name";
                oldTaskNameLabel.textContent="Name: ";
                editTaskName.appendChild(oldTaskNameLabel);

                const oldTaskNameInput = document.createElement('input');
                oldTaskNameInput.type="text";
                oldTaskNameInput.id="old-task-name";
                oldTaskNameInput.minLength="1";
                oldTaskNameInput.setAttribute('required','');
                oldTaskNameInput.value = allTasksList[i].title; // placeholder for the input is the current task name
                editTaskName.appendChild(oldTaskNameInput);

                const oldTaskNameInvalid =  document.createElement('div');
                oldTaskNameInvalid.className="invalid-feedback";
                oldTaskNameInvalid.id="edit-invalid";
                oldTaskNameInvalid.textContent="Task name is required";
                editTaskName.appendChild(oldTaskNameInvalid);

                // edit task date
                const editTaskDate =  document.createElement('div');
                editTaskDate.className="form-group";

                const oldTaskDateLabel =  document.createElement('label');
                oldTaskDateLabel.htmlFor="old-task-date";
                oldTaskDateLabel.textContent="Due: ";
                editTaskDate.appendChild(oldTaskDateLabel);

                const oldTaskDateInput =  document.createElement('input');
                oldTaskDateInput.type="text";
                oldTaskDateInput.id="old-task-date";
                oldTaskDateInput.value = allTasksList[i].date; // placeholder for input is current taskdate
                oldTaskDateInput.onfocus= function(){oldTaskDateInput.type='date'};
                oldTaskDateInput.onblur= function(){oldTaskDateInput.type='text'};
                editTaskDate.appendChild(oldTaskDateInput);

                // edit task project
                const editTaskProject = document.createElement('div');
                editTaskProject.className="form-group";

                const oldTaskProjectLabel =  document.createElement('label');
                oldTaskProjectLabel.htmlFor="old-task-project";
                oldTaskProjectLabel.textContent="Project: ";
                editTaskProject.appendChild(oldTaskProjectLabel);

                const oldProjectSelect = document.createElement('select');
                oldProjectSelect.name = "old-task-project";
                oldProjectSelect.id="old-task-project";
                const projectSelectOption = document.createElement('option');
                projectSelectOption.textContent=""; // still have an option to not pick a project
                oldProjectSelect.appendChild(projectSelectOption);

                for (let j=0; j<projectList.length; j++){
                    const projectSelectOption = document.createElement('option');
                    projectSelectOption.textContent = projectList[j].title;
                    projectSelectOption.value = projectList[j].title;

                    if (projectList[j].title === allTasksList[i].project){
                        projectSelectOption.setAttribute('selected','selected') // default selected option is the current project
                    }

                    oldProjectSelect.appendChild(projectSelectOption);
                    }
            
                
                editTaskProject.appendChild(oldProjectSelect);

                // edit task details
                const editTaskDetails = document.createElement('div');
                editTaskDetails.className="form-group";

                const oldTaskDetailsLabel = document.createElement('label');
                oldTaskDetailsLabel.htmlFor="old-task-details";
                oldTaskDetailsLabel.textContent="Details: ";
                editTaskDetails.appendChild(oldTaskDetailsLabel);

                const oldTaskDetailsInput = document.createElement('textarea');
                oldTaskDetailsInput.id="old-task-details";
                oldTaskDetailsInput.value=allTasksList[i].details;

                editTaskDetails.appendChild(oldTaskDetailsInput);

                //append all form parts
                editFormContainer.appendChild(editTaskName);
                editFormContainer.appendChild(editTaskDate);
                editFormContainer.appendChild(editTaskProject);
                editFormContainer.appendChild(editTaskDetails);

                // edit task buttons
                const editTaskClose = document.createElement('button');
                editTaskClose.id = "edit-task-close";
                editTaskClose.textContent = "Close";
                editTaskClose.addEventListener('click', ()=>{
                    editPopup.style.display="none";
                    overlay.style.display="none";
                } )
                editButtonsContainer.appendChild(editTaskClose);

                const editTaskSubmit = document.createElement('button');
                editTaskSubmit.id="edit-task-submit";
                editTaskSubmit.textContent="Update Task";
                editTaskSubmit.addEventListener('click', ()=>{
                    overlay.style.display="none";
                    toDoManager.updateTask(button); // refers to the same input as the one for render edit task function
                                                    // so it will look at the same task info
                })
                editButtonsContainer.appendChild(editTaskSubmit);
            }

        }
        
    }

    // EDITING PROJECTS DOM

    function renderEditProject(button){
        const projectContainer = button.closest('.project-container');
        const oldProjectName = projectContainer.querySelector('.project-name');

        editPopupTitle.textContent = "Edit Project"

        for (let i=0; i<projectList.length;i++){
            if (projectList[i].title === oldProjectName.textContent){
                // edit project name
                const editProjectName = document.createElement('div');
                editProjectName.className="form-group";

                const oldProjectNameLabel = document.createElement('label');
                oldProjectNameLabel.htmlFor="old-project-name";
                oldProjectNameLabel.textContent="Name: ";
                editProjectName.appendChild(oldProjectNameLabel);

                const oldProjectNameInput = document.createElement('input');
                oldProjectNameInput.type="text";
                oldProjectNameInput.id="old-project-name";
                oldProjectNameInput.minLength="1";
                oldProjectNameInput.setAttribute('required','');
                oldProjectNameInput.value = projectList[i].title; // placeholder for the input is the current task name
                editProjectName.appendChild(oldProjectNameInput);

                const oldProjectNameInvalid =  document.createElement('div');
                oldProjectNameInvalid.className="invalid-feedback";
                oldProjectNameInvalid.textContent="Project name is required";
                editProjectName.appendChild(oldProjectNameInvalid);

                // edit task details
                const editProjectDetails = document.createElement('div');
                editProjectDetails.className="form-group";

                const oldProjectDetailsLabel = document.createElement('label');
                oldProjectDetailsLabel.htmlFor="old-project-details";
                oldProjectDetailsLabel.textContent="Details: ";
                editProjectDetails.appendChild(oldProjectDetailsLabel);

                const oldProjectDetailsInput = document.createElement('textarea');
                oldProjectDetailsInput.id="old-project-details";
                oldProjectDetailsInput.value=projectList[i].details; // old project details already in textbox

                editProjectDetails.appendChild(oldProjectDetailsInput);

                // append form parts
                editFormContainer.appendChild(editProjectName);
                editFormContainer.appendChild(editProjectDetails);

                // edit project buttons
                const editProjectClose = document.createElement('button');
                editProjectClose.id = "edit-project-close";
                editProjectClose.textContent = "Close";
                editProjectClose.addEventListener('click', ()=>{
                    overlay.style.display="none";
                    editPopup.style.display="none";
                } )
                editButtonsContainer.appendChild(editProjectClose);

                const editProjectSubmit = document.createElement('button');
                editProjectSubmit.id="edit-project-submit";
                editProjectSubmit.textContent="Update Prpject";
                editProjectSubmit.addEventListener('click', ()=>{
                    overlay.style.display="none";
                    toDoManager.updateProject(button); // refers to the same "button" that was input for rendering the edit project popup
                                                        // so we are grabbing the same information as we did for the form placeholders
                })
                editButtonsContainer.appendChild(editProjectSubmit);
            }
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
        displayTodayTask,
        displayAllProject,
        displayProjectTask,
        renderEditTask,
        renderEditProject
    }
})();


const createNewPopup = document.querySelector('#create-new-popup');


export const toDoManager = (function() {

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
        const title = document.querySelector('#task-name').value.trim();
        const date = document.querySelector('#task-date').value;
        const details = document.querySelector('#task-details').value;
        const project = document.querySelector('#task-project').value;
        const status = "not done"; //default is not done
        const newTask = new Task(title, date, details, project,status);
        allTasksList.push(newTask);
    }

    //when u click "add task", calls addTask function, and updates task list display
    function submitTask(){ 
        const title = document.querySelector('#task-name').value.trim();
        const nameFormInvalid = document.querySelector('.invalid-feedback');
        // make sure name is not empty or just a bunch of white spaces
        if (title.length === 0){
            nameFormInvalid.style.visibility='visible';
        }
        else {
            addTask(); // add task to array
            domManipulator.emptyDashboard(); //empty the tasklist
            domManipulator.displayAllTask(); // fills in tasklist
            createNewPopup.style.display='none'; // close popup 
            domManipulator.renderDashboardTitle('All Tasks'); //defaults to all tasks page

        console.log(allTasksList)
        }
    }


    // "update task" button clicked.. i have to put this inside the render edit task function
    // so it knows which task to update
    function updateTask(button){ //button refers to whichever edit button is clicked, which shares
                                // parent node with the relevant function

        // same definitions and names as in the edit task popup render function
        const taskContainer = button.closest('.task-container');
        const oldTaskName = taskContainer.querySelector('.task-name');
        const oldTaskDate = taskContainer.querySelector('.task-date');
        const oldTaskProject = taskContainer.querySelector('.task-project');

        const oldTaskNameInput = document.querySelector('#old-task-name');
        const oldTaskDateInput = document.querySelector('#old-task-date');
        const oldProjectSelect = document.querySelector('#old-task-project');
        const oldTaskDetailsInput = document.querySelector('#old-task-details');

        const newTitle = oldTaskNameInput.value.trim();
        if (newTitle.length === 0){
            const nameFormInvalid = document.querySelector('#edit-invalid');
            console.log(nameFormInvalid)
            nameFormInvalid.style.visibility="visible"
        }
        else{
            for(let i=0;i<allTasksList.length;i++){
                if (allTasksList[i].title===oldTaskName.textContent && allTasksList[i].date === oldTaskDate.textContent && allTasksList[i].project === oldTaskProject.textContent){
                    allTasksList[i].title = oldTaskNameInput.value;
                    allTasksList[i].date = oldTaskDateInput.value;
                    allTasksList[i].project = oldProjectSelect.value;
                    allTasksList[i].details = oldTaskDetailsInput.value;
                    break
                }
            }
            domManipulator.emptyDashboard(); //empty the tasklist
            domManipulator.displayAllTask(); // fills in tasklist
            editPopup.style.display='none'; // close popup 
            domManipulator.renderDashboardTitle('All Tasks'); //defaults to all tasks page
        }
        
    }

    function deleteTask(button){ // same situation as above updateTask
        const taskContainer = button.closest('.task-container');
        const oldTaskName = taskContainer.querySelector('.task-name');
        const oldTaskDate = taskContainer.querySelector('.task-date');
        const oldTaskProject = taskContainer.querySelector('.task-project');

        // remove task from array
        for(let i=0;i<allTasksList.length;i++){
            if (allTasksList[i].title===oldTaskName.textContent && allTasksList[i].date === oldTaskDate.textContent && allTasksList[i].project === oldTaskProject.textContent){
                allTasksList.splice(i,1);
                break
            }
        }
        domManipulator.emptyDashboard(); //empty the tasklist
        domManipulator.displayAllTask(); // fills in tasklist with updated tasks
        domManipulator.renderDashboardTitle('All Tasks'); //defaults to all tasks page

    }

    // for individual project pages - only removes the task's project info
    function deleteTaskFromProject(button){
        const taskContainer = button.closest('.task-container');
        const oldTaskName = taskContainer.querySelector('.task-name');
        const oldTaskDate = taskContainer.querySelector('.task-date');
        const oldTaskProject = taskContainer.querySelector('.task-project');

        for(let i=0;i<allTasksList.length;i++){
            if (allTasksList[i].title===oldTaskName.textContent && allTasksList[i].date === oldTaskDate.textContent && allTasksList[i].project === oldTaskProject.textContent){
                allTasksList[i].project="";
                break
            }
        }
        domManipulator.emptyDashboard(); //empty the tasklist
        domManipulator.displayProjectTask(oldTaskProject.textContent); // fills in tasklist
        domManipulator.renderDashboardTitle(oldTaskProject.textContent); //defaults to all tasks page
    }

    // complete/uncomplete a task
    function toggleComplete(button){
        const taskContainer = button.closest('.task-container');
        const taskName = taskContainer.querySelector('.task-name');
        const taskDate = taskContainer.querySelector('.task-date');
        const taskProject = taskContainer.querySelector('.task-project');

        for (let i = 0; i<allTasksList.length; i++){
            if (allTasksList[i].title === taskName.textContent && allTasksList[i].date === taskDate.textContent&& allTasksList[i].project === taskProject.textContent){
                if (button.classList.contains("checked")){
                    button.classList.add("unchecked");
                    button.classList.remove("checked");
                    taskContainer.classList.add("unchecked")
                    taskContainer.classList.remove("checked")

                    allTasksList[i].status="not done"
                }
                else if (button.classList.contains("unchecked")){
                    button.classList.add("checked");
                    button.classList.remove("unchecked");
                    taskContainer.classList.add("checked");
                    taskContainer.classList.remove("unchecked")

                    allTasksList[i].status="done"
                }
            }
        }
    }

    // object constructor
    class Project{
        constructor(title,details){
            this.title = title;
            this.details = details;
        }
    }

    // adds new project to projectList array
    function addProject(){
        const title = document.querySelector('#project-name').value;
        const details = document.querySelector('#project-details');

        const newProject = new Project(title, details);
        projectList.push(newProject);
    }

    function submitProject(){ // when u click "Add project"
        addProject(); // add project to the array
        domManipulator.emptyDashboard(); //empty the tasklist
        domManipulator.displayAllTask(); // fills in tasklist - default to home page
        domManipulator.renderProjectSidebar(); //empties and renders new sidebar
        createNewPopup.style.display='none'; // close popup 
        domManipulator.renderDashboardTitle('All Tasks'); //defaults to all tasks page

    }

    function updateProject(button){
        const projectContainer = button.closest('.project-container');
        const oldProjectName = projectContainer.querySelector('.project-name');

        const oldProjectNameInput = document.querySelector('#old-project-name');
        const oldProjectDetailsInput = document.querySelector('#old-project-details');
        for (let i = 0; i<projectList.length;i++){
            if (oldProjectName.textContent === projectList[i].title){
                projectList[i].title = oldProjectNameInput.value;
                projectList[i].details = oldProjectDetailsInput.value;
                break
            }
        }

        updateTaskProject(oldProjectName, oldProjectNameInput) // update all project names in task array


        domManipulator.emptyDashboard(); // empty dashboard
        domManipulator.displayAllProject(); //display all projects
        editPopup.style.display='none'; // close popup 
        domManipulator.renderDashboardTitle("Projects")
        domManipulator.renderProjectSidebar() // update sidebar
        console.log(projectList)
    }

    function deleteProject(button){
        const projectContainer = button.closest('.project-container');
        const oldProjectName = projectContainer.querySelector('.project-name');
        
        for(let i=0;i<projectList.length;i++){
            if (projectList[i].title===oldProjectName.textContent){
                projectList.splice(i,1);
                break
            }
        }

        for (let j = 0; j < allTasksList.length; j++){ // delete all instances of that project in tasks array
            if (allTasksList[j].project === oldProjectName.textContent){
                allTasksList[j].project="";
            }
        }
        domManipulator.emptyDashboard(); //empty the tasklist
        domManipulator.displayAllProject(); // fills in tasklist
        domManipulator.renderDashboardTitle('Projects'); //defaults to all tasks page
        domManipulator.renderProjectSidebar(); // update sidebar

    }


    // update the task's project name if project name is changed
    // called in update project function
    function updateTaskProject(oldProjectName, oldProjectNameInput){
        for (let i = 0; i < allTasksList.length; i++){
            if (oldProjectName.textContent === allTasksList[i].project){
                allTasksList[i].project = oldProjectNameInput.value;
            }
        }
    }


    return{
        addTask,
        submitTask,
        addProject,
        submitProject,
        updateTask,
        deleteTask,
        toggleComplete,
        deleteTaskFromProject,
        updateProject,
        updateTaskProject,
        deleteProject
    }
})();