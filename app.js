//define Ui variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load All Event Listeners
loadEventListeners();


function loadEventListeners(){
    //DOM Load Event
    document.addEventListener('DOMContentLoaded',getTask);
    //Add Task Event
    form.addEventListener('submit',addTask);
    //remove task
    taskList.addEventListener('click',removeTask);
    //clear task
    clearBtn.addEventListener('click',clearTasks);
    //filter task
    filter.addEventListener('keyup',filterTasks);

}


//Function Get Task from Local storage
function getTask(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        //Create li Elements
        const li = document.createElement('li');
        //Add Class
        li.className = 'collection-item';
        //Create Text Node N Append To li
        li.appendChild(document.createTextNode(task));
        //Create New Link Element
        const link = document.createElement('a');
        //Add Class
        link.className = 'delete-item secondary-content';
        //Add Icon Element
        link.innerHTML= '<i class="fa fa-remove"></i>';
        //Append the Link to Li
        li.appendChild(link);
        //Append li to ul
        taskList.appendChild(li);
    });
}


//Function to add Task to the list
function addTask(e){
    if(taskInput.value===''){
        alert('Please Enter a Task Value');
    }
    else{
    //Create li Elements
    const li = document.createElement('li');
    //Add Class
    li.className = 'collection-item';
    //Create Text Node N Append To li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create New Link Element
    const link = document.createElement('a');
    //Add Class
    link.className = 'delete-item secondary-content';
    //Add Icon Element
    link.innerHTML= '<i class="fa fa-remove"></i>';
    //Append the Link to Li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);
    //Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);
    //Clear Input
    taskInput.value='';
    }
    e.preventDefault();
}


//Function Storing tasks in Local Storage 
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));

}


//Function Removing Task from List 
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You sure, You want to remove the item from your task list?')){
            e.target.parentElement.parentElement.remove();

            //Remove from LS
            removeTaskFromLocalStorage( e.target.parentElement.parentElement);
        }
    }
}


//Function to remove task from localstorage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task,index){
        if(taskItem.textContent===task){
            tasks.splice(index,1);
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
}


//Function Clearing entire task from list
function clearTasks(e){
    
        if(confirm('Are You sure, You want to remove the entire task from your list?')){
            while(taskList.firstChild){
                taskList.removeChild(taskList.firstChild);
            }
        }
        filter.value="";
    //clear task from LS
    clearTaskFromLocalStorage();
}  


//Function to clear tasks from LOcalStorage
function clearTaskFromLocalStorage(){
    localStorage.clear();
}


//Function Filtering task from list
function filterTasks(e){
    const val=e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item=task.firstChild.textContent;
        if(item.toLowerCase().indexOf(val)!=-1){
            task.style.display ='block';
        }
        else{
            task.style.display ='none';
        }
    });
}