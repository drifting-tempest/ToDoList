document.addEventListener('DOMContentLoaded', () => {
    
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let nextId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    function showTasks() {
        taskList.innerHTML = ''; 
        
        tasks.forEach(task => {
            
            let li = document.createElement('li');
            
            if (task.completed) li.classList.add('completed');
            let text = document.createElement('span');
            text.textContent = task.text;
            
            let delBtn = document.createElement('button');
            delBtn.textContent = 'x';
            delBtn.classList.add('delete-btn');
            
            li.appendChild(text);
            li.appendChild(delBtn);
            
            text.addEventListener('click', () => toggleTask(task.id));
            delBtn.addEventListener('click', () => removeTask(task.id));
            taskList.appendChild(li);
        });
    }
    
    function addTask() {
        let text = taskInput.value.trim();
        
        if (!text) {
            taskInput.style.borderColor = 'var(--dark-raspberry)';
            setTimeout(() => taskInput.style.borderColor = 'var(--periwinkle)', 200);
            return;
        }
        
        let newTask = {
            id: nextId++,
            text: text,
            completed: false
        };
        
        tasks.push(newTask);
        saveTasks();
        taskInput.value = ''; 
        showTasks();
    }
    
    function toggleTask(id) {
        let task = tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            saveTasks();
            showTasks();
        }
    }
    
    function removeTask(id) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        showTasks();
    }
    
    addBtn.addEventListener('click', addTask);
    
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });
    
    showTasks();
    
});