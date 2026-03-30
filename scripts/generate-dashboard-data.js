const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const projectsPath = path.join(dataDir, 'projects.json');
const dashboardPath = path.join(dataDir, 'dashboard.json');

const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

const statusMap = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  planned: 'Planned',
  backlog: 'Backlog'
};

const counts = {
  completed: 0,
  'in-progress': 0,
  planned: 0,
  backlog: 0
};

projects.forEach((project) => {
  const key = project.status in counts ? project.status : 'backlog';
  counts[key] += 1;
});

const dashboard = {
  generatedAt: new Date().toISOString(),
  counts,
  totalProjects: projects.length,
  projects
};

fs.writeFileSync(dashboardPath, JSON.stringify(dashboard, null, 2) + '\n');
