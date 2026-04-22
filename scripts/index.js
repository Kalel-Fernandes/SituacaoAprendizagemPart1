let tasks = [];

// Criação da Tarefa
function addTask() {
    const nameInput = document.getElementById('taskName');
    const hourInput = document.getElementById('taskHours');
    const hourlyRateInput = document.getElementById('hourly-rate');
    const tax = document.getElementById('tax');
    let cost = (parseFloat(hourInput.value) * parseFloat(hourlyRateInput.value)) * (1 + parseFloat(tax.value)/100);
    const urgencyInput = document.getElementById('urgency');

    if (nameInput.value === '' || hourInput.value === '' || hourlyRateInput.value === '') {
        alert ("Preencha todos os campos!");
        return;
    } else if (hourlyRateInput.value <= 40 && hourInput.value < 5) {
        alert ("A quantidade de horas e o preço estão muito baixos!");
        return;
    } else if (hourlyRateInput.value <= 40) {
        alert ("O preço da hora está muito baixo!");
        return;
    } else if (hourInput.value < 5) {
        alert ("A quantidade de horas está muito baixa!");
        return;
    } 

    if (urgencyInput.value === 'medium') {
        cost += cost * 0.2;
    } else if (urgencyInput.value === 'high') {
        cost += cost * 0.5;
    }

    const task = {
        id: Date.now(),
        urgency: urgencyInput.value,
        name: nameInput.value,
        hour: parseFloat(hourInput.value),
        cost: cost
    };

    tasks.push(task);
    nameInput.value = '';
    hourInput.value = '';
    hourlyRateInput.value = '';
    tax.value = '';
    urgencyInput.value = '';

    renderTasks();    
}

// Exiba Tarefa
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span id="name" class="${task.urgency}">
                ${task.name}
            </span>
            <div class="container">
                <p>Tempo estimado</p>
                <span class="time">
                    <img src="../img/tempo.png" class="iconTime" alt="icon">
                    ${task.hour} Horas
                </span>
            </div>
            <div class="container">
                <p>Valor estimado</p>
                <span class="cash">R$${task.cost.toFixed(2)}</span>
            </div>
            <button class="delete-btn" onclick="deleteTask(${task.id})">X</button>
        `;
        taskList.appendChild(li);
    });

    calculateBudget();
    calculateHours();
    document.getElementById('result').classList.remove('hidden');
}

// Calculo de orçamento
function calculateBudget() {
    const totalBudget = tasks.reduce((sum, task) => sum + task.cost, 0); // Soma os custos
    document.getElementById('out-cost').innerText = "R$" + totalBudget.toFixed(2);
}

// Soma total de horas
function calculateHours() {
    const totalHours = tasks.reduce((sum, task) => sum + parseFloat(task.hour), 0); // Soma as horas
    document.getElementById('out-hours').innerText = totalHours.toFixed(2) + "h";
}

// Exclua Tarefa
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id); // Remove do array usando filter
    renderTasks();
}