
const fetchingAboutMeData = () => {
    fetch('starter/data/aboutMeData.json')
      .then(response => response.json())
      .then(data => {
        const aboutMeDiv = document.getElementById('aboutMe');
  
        const bio = document.createElement('p');
        bio.textContent = data.aboutMe;
        const headshotContainer = document.createElement('div');
        headshotContainer.className = 'headshotContainer';
  
        const headshotImage = document.createElement('img');
        headshotImage.src = data.headshot;
        headshotImage.alt = 'Headshot';
        headshotContainer.appendChild(headshotImage);
        aboutMeDiv.appendChild(bio);
        aboutMeDiv.appendChild(headshotContainer);
      })
      .catch(error => {
        console.error('Error loading JSON:', error);
      });
  }
  
  const setupProjectNavigation = () => {
    const leftArrow = document.querySelector('.arrow-left');
    const rightArrow = document.querySelector('.arrow-right');
    const projectList = document.getElementById('projectList');
    const scrollAmount = 200;
  
    const mediaQuery = window.matchMedia('(max-width: 768px)');
  
    const getScrollDirection = () => (mediaQuery.matches ? 'horizontal' : 'vertical');
  
    const scrollProjectList = (direction) => {
      const scrollDir = getScrollDirection();
  
      if (scrollDir === 'horizontal') {
        projectList.scrollBy({
          left: direction === 'forward' ? scrollAmount : -scrollAmount,
          behavior: 'smooth'
        });
      } else {
        projectList.scrollBy({
          top: direction === 'forward' ? scrollAmount : -scrollAmount,
          behavior: 'smooth'
        });
      }
    };
  
    leftArrow.addEventListener('click', () => scrollProjectList('backward'));
    rightArrow.addEventListener('click', () => scrollProjectList('forward'));
  
  
  };
  
  const fetchingCardsData = () => {
    fetch('starter/data/projectsData.json')
      .then(response => response.json())
      .then(data => {
        const projectListDiv = document.getElementById('projectList');
        const spotlight = document.getElementById('projectSpotlight');
        const spotlightTitles = document.getElementById('spotlightTitles');
  
        const updateSpotlight = (project) => {
          const imagePath = project.spotlight_image
            ? `starter/${project.spotlight_image.replace('../', '')}`
            : 'starter/images/spotlight_placeholder_bg.webp';
  
          spotlight.style.backgroundImage = `url('${imagePath}')`;
          spotlight.style.backgroundSize = 'cover';
          spotlight.style.backgroundPosition = 'center';
  
          spotlightTitles.innerHTML = `
            <h2>${project.project_name || 'Project Name Not Available'}</h2>
            <p>${project.long_description || 'No description available.'}</p>
            ${project.url ? `<a href="${project.url}" target="_blank">View Project</a>` : ''}
          `;
        };
  
        data.forEach((project, index) => {
          const card = document.createElement('div');
          card.className = 'projectCard';
          card.id = project.project_id;
  
          const imagePath = project.card_image
            ? `starter/${project.card_image.replace('../', '')}`
            : 'starter/images/card_placeholder_bg.webp';
  
          card.style.backgroundImage = `url('${imagePath}')`;
          card.style.backgroundSize = 'cover';
          card.style.backgroundPosition = 'center';
  
          const name = document.createElement('h3');
          name.textContent = project.project_name;
  
          const desc = document.createElement('p');
          desc.textContent = project.short_description || '';
  
          card.appendChild(name);
          card.appendChild(desc);
  
          card.addEventListener('click', () => updateSpotlight(project));
  
          projectListDiv.appendChild(card);
  
          if (index === 0) updateSpotlight(project);
        });
      })
      .catch(error => {
        console.error('Error loading projectsData.json:', error);
      });
  };
  
  const formValidation = () => {
    const emailInput = document.getElementById('contactEmail');
    const messageInput = document.getElementById('contactMessage');
    const form = document.getElementById('formSection');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const charactersLeft = document.getElementById('charactersLeft');
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const illegalCharsRegex = /[^a-zA-Z0-9@._-]/;
  
    const updateCharacterCount = () => {
      const currentLength = messageInput.value.length;
      charactersLeft.textContent = `Characters: ${currentLength}/300`;
  
      if (currentLength > 300) {
        messageError.textContent = 'Message exceeds 300 characters!';
        return false;
      } else {
        messageError.textContent = '';
        return true;
      }
    };
  
   
    const validateEmail = () => {
      const email = emailInput.value.trim();
      if (email === '') {
        emailError.textContent = 'Email address cannot be empty.';
        return false; 
      } else if (illegalCharsRegex.test(email)) {
        emailError.textContent = 'Email address contains illegal characters.';
        return false; 
      } else if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        return false; 
      } else {
        emailError.textContent = ''; 
        return true;  
      }
    };
  
  
    const validateMessage = () => {
      const message = messageInput.value.trim();
      if (message === '') {
        messageError.textContent = 'Message cannot be empty.';
        return false;  
      } else if (illegalCharsRegex.test(message)) {
        messageError.textContent = 'Message contains illegal characters.';
        return false; 
      } else {
        messageError.textContent = ''; 
        return true; 
      }
    };
  
  
    emailInput.addEventListener('input', () => {
      validateEmail();
    });
    messageInput.addEventListener('input', () => {
      validateMessage();
      updateCharacterCount();
    });
  
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const isEmailValid = validateEmail(); 
      const isMessageValid = validateMessage() && updateCharacterCount(); 
  
      if (isEmailValid && isMessageValid) {
        alert('Form validation passed!');
      } else {
        alert('Please fix the errors in the form.');
      }
    });
  };
  
  
  const initializePage = () => {
    fetchingAboutMeData();
    fetchingCardsData();
    setupProjectNavigation();
    formValidation();
  };
  document.addEventListener("DOMContentLoaded", initializePage);