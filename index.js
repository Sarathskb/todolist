function addTask() {
    const taskInput = document.getElementById('taskInput');
    const datetimeInput = document.getElementById('datetimeInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value === '' || datetimeInput.value === '') {
        alert('Please enter a task and set a date and time.');
        return;
    }

    const listItem = document.createElement('li');
    const taskDate = new Date(datetimeInput.value);
    const now = new Date();
    const timeDiff = taskDate - now;

    if (timeDiff < 0) {
        alert('Please enter a future time.');
        return;
    }

    const taskDateTime = taskDate.toLocaleString();

    const taskText = document.createTextNode(`${taskInput.value} - ${taskDateTime}`);
    listItem.appendChild(taskText);

    const countdownTimer = document.createElement('span');
    countdownTimer.setAttribute('id', 'countdown');
    listItem.appendChild(countdownTimer);
    const completeButton = document.createElement('button');
    completeButton.innerHTML = 'Complete';
    completeButton.onclick = function () {
        listItem.classList.toggle('completed');
    };
    listItem.appendChild(completeButton);
  
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.onclick = function () {
        taskList.removeChild(listItem);
    };
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);

    taskInput.value = '';
    datetimeInput.value = '';

    const interval = setInterval(function () {
        const now = new Date().getTime();
        const distance = taskDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownTimer.innerHTML = `Time left: ${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(interval);
            countdownTimer.innerHTML = 'EXPIRED';
        }
    }, 1000);
}
