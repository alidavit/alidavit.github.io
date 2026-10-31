const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.navigation');

menuButton?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.work-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle('active', item === button));

    projectCards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.category.split(' ').includes(filter);
      card.hidden = !matches;
    });
  });
});

const projectDetails = {
  'employee-tracking': {
    title: 'Employee Tracking',
    type: 'WEB APP · REAL-TIME DATA',
    description: 'A real-time employee movement tracking platform using BLE, with a Go backend and Svelte interface.',
    tags: ['Go', 'Fiber', 'PostgreSQL', 'Svelte']
  },
  uniguardz: {
    title: 'UniGuardZ',
    type: 'WEB APP · SECURITY',
    description: 'Continued development of a security-focused application with a NestJS and React stack, deployed on Google Cloud Run.',
    tags: ['NestJS', 'React', 'Cloud Run', 'Firebase']
  },
  'oee-dashboard': {
    title: 'OEE Dashboard Web',
    type: 'WEB APP · OPERATIONS',
    description: 'A Laravel and PostgreSQL dashboard for monitoring operational efficiency, with real-time data delivered through MQTT.',
    tags: ['Laravel', 'PostgreSQL', 'MQTT', 'Docker']
  },
  hcform: {
    title: 'HCForm Web',
    type: 'WEB APP · INTERNAL SYSTEM',
    description: 'An HR and GA process digitization platform built with CodeIgniter 3 and MySQL, deployed on Ubuntu with Docker and Nginx.',
    tags: ['CodeIgniter 3', 'MySQL', 'Docker', 'Nginx']
  },
  cashflow: {
    title: 'Simple CashFlow System',
    type: 'WEB APP · FINANCE',
    description: 'A CodeIgniter 4 application for recording incoming cash, outgoing cash, corrections, and currency conversion.',
    tags: ['CodeIgniter 4', 'PHP', 'MySQL']
  },
  payroll: {
    title: 'Doorlock and Payroll',
    type: 'WEB APP · HR OPERATIONS',
    description: 'A payroll reporting system generated from RFID attendance data, built with Laravel, Bootstrap, and jQuery.',
    tags: ['Laravel', 'Bootstrap', 'jQuery']
  },
  'ptt-management': {
    title: 'PTT Management System',
    type: 'WEB APP · MANAGEMENT',
    description: 'A user and company management system with Laravel and Mumble push-to-talk, deployed to DigitalOcean droplets.',
    tags: ['Laravel', 'Mumble', 'DigitalOcean']
  },
  'residual-oxygen': {
    title: 'Residual Oxygen Online',
    type: 'DATA PLATFORM · IOT',
    description: 'A monitoring dashboard that collects residual oxygen data over MQTT and visualizes it with Node-RED and Highcharts.',
    tags: ['MQTT', 'Node-RED', 'Laravel', 'Highcharts']
  }
};

const dialog = document.querySelector('#project-dialog');
const dialogTitle = document.querySelector('#dialog-title');
const dialogType = document.querySelector('#dialog-type');
const dialogDescription = document.querySelector('#dialog-description');
const dialogTags = document.querySelector('#dialog-tags');

projectCards.forEach((card) => {
  card.addEventListener('click', () => {
    const project = projectDetails[card.dataset.project];
    if (!project || !dialog) return;
    dialogTitle.textContent = project.title;
    dialogType.textContent = project.type;
    dialogDescription.textContent = project.description;
    dialogTags.innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join('');
    dialog.showModal();
  });
});

document.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

document.querySelector('#year').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section, .work-card, .contact-box').forEach((element) => {
  element.classList.add('reveal');
  revealObserver.observe(element);
});
