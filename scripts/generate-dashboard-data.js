const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const projectsPath = path.join(dataDir, 'projects.json');
const dashboardPath = path.join(dataDir, 'dashboard.json');

const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

const statusMap = {
  'in-development': 'In Development',
  completed: 'Completed',
  'in-progress': 'In Progress',
  planned: 'Planned',
  backlog: 'Backlog'
};

const counts = {
  'in-development': 0,
  completed: 0,
  'in-progress': 0,
  planned: 0,
  backlog: 0
};

projects.forEach((project) => {
  const key = project.status in counts ? project.status : 'backlog';
  counts[key] += 1;
});

const categoryOrder = {
  course: 0,
  personal: 1
};

const statusOrder = {
  'in-development': 0,
  'in-progress': 0,
  planned: 1,
  completed: 2,
  backlog: 3
};

const projectsSorted = [...projects].sort((a, b) => {
  const categoryA = a.category in categoryOrder ? categoryOrder[a.category] : 99;
  const categoryB = b.category in categoryOrder ? categoryOrder[b.category] : 99;
  if (categoryA !== categoryB) {
    return categoryA - categoryB;
  }

  const statusA = a.status in statusOrder ? statusOrder[a.status] : 99;
  const statusB = b.status in statusOrder ? statusOrder[b.status] : 99;
  if (statusA !== statusB) {
    return statusA - statusB;
  }

  return (a.name || '').localeCompare(b.name || '');
});

const dashboard = {
  generatedAt: new Date().toISOString(),
  counts,
  totalProjects: projects.length,
  projects: projectsSorted
};

fs.writeFileSync(dashboardPath, JSON.stringify(dashboard, null, 2) + '\n');
