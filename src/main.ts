import { Developer } from './components/Developer';
import { Project } from './components/Project';
import { Task, TASK_STATUS } from './components/Task';

const logDiv = document.getElementById('log');

function addLog(msg: string) {
  if (!logDiv) return;
  const div = document.createElement('div');
  div.textContent = msg;
  logDiv.append(div);
}

const project = new Project('New Project');
const tom = new Developer('Tom', addLog);
const anna = new Developer('Anna', addLog);

project.attach(tom);
project.attach(anna);

const devMap: Record<string, Developer> = { Tom: tom, Anna: anna };

const statuses: TASK_STATUS[] = Object.values(TASK_STATUS);

const allTasks: Task[] = [];

const tasksList = document.createElement('div');
tasksList.id = 'tasksList';
document.body.append(document.createElement('hr'));

const tasksTitle = document.createElement('h2');
tasksTitle.textContent = 'Tasks';

document.body.append(tasksTitle);
document.body.append(tasksList);

function renderTasks() {
  tasksList.innerHTML = '';

  allTasks.forEach((task) => {
    const taskDiv = document.createElement('div');
    taskDiv.style.marginBottom = '10px';
    taskDiv.textContent = `${task.getName()} [status: ${task.getStatus()}]`;

    const select = document.createElement('select');
    statuses.forEach((status) => {
      const option = document.createElement('option');
      option.value = status;
      option.textContent = status;

      if (status === task.getStatus()) {
        option.selected = true
      };

      select.append(option);
    });

    select.addEventListener('change', () => {
      const newStatus = select.value as TASK_STATUS;

      task.setStatus(newStatus);

      addLog(`Status of task '${task.getName()}' changed to ${newStatus}`);
      renderTasks();
    });

    taskDiv.append(document.createTextNode(' '));
    taskDiv.append(select);

    tasksList.append(taskDiv);
  });
}

const form = document.getElementById('taskForm') as HTMLFormElement;
const inputName = document.getElementById('taskName') as HTMLInputElement;
const selectDev = document.getElementById('developerSelect') as HTMLSelectElement;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskName = inputName.value.trim();
  const devName = selectDev.value;

  if (!taskName || !devName) return;

  const task = new Task(taskName);

  const dev = devMap[devName];
  task.attach(dev);

  project.add(task);

  allTasks.push(task);

  task.notify(`Task '${taskName}' created and assigned to ${devName}`);

  renderTasks();

  inputName.value = '';
  selectDev.value = '';
});

renderTasks();
