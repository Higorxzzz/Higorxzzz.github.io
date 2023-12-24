/*==================== toggle icon navbar ====================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

/*==================== scroll sections active link ====================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[onclick*=' + id + ']').classList.add('active')
            });
        };
    });
    let header = document.querySelector('header')

    header.classList.toggle('sticky', window.scrollY > 800);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/*==================== span text ====================*/
ScrollReveal({
    reset: true,
    distance: '80px',
    durantion: 2000,
    delay: 200,
})

ScrollReveal().reveal('.inicio-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.inicio-img, .servicos-container, .portfolio-box, .contato form,', { origin: 'bottom' });
ScrollReveal().reveal('.inicio-content h1, .sobre-img, .sobre-content', { origin: 'left' });
ScrollReveal().reveal('.inicio-content p', { origin: 'right' });

const typed = new Typed('.multiple-text', {
    strings: ['Web Designer', 'Front-end Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
})

function scrollToInicio(destino) {
  $("html, body").animate(
    {
      scrollTop: $(destino).offset().top
    },
    700
  );
}

/*==================== toggle icon dark mode ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-toggle-right'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-toggle-left' : 'bx-toggle-right'

if (selectedTheme) {

  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx-toggle-left' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==================== form contact ====================*/
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

const removeRedBorder = (event) => {
  // Remove a borda vermelha apenas do campo que está sendo preenchido
  event.target.style.borderBottom = '';
};

const sendEmail = (e) => {
  e.preventDefault();

  // Verificar se os campos estão preenchidos
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const assunto = document.getElementById('assunto').value;
  const text = document.getElementById('text').value;

  if (!name || !email || !assunto || !text) {
    // Se algum campo estiver vazio, exibir mensagem e adicionar estilo vermelho aos inputs
    contactMessage.textContent = 'Por favor, preencha todos os campos do formulário.';

    // Adicionar estilo vermelho aos inputs vazios
    if (!name) document.getElementById('name').style.borderBottom = '4px solid var(--second-main-color)';
    if (!email) document.getElementById('email').style.borderBottom = '4px solid var(--second-main-color)';
    if (!assunto) document.getElementById('assunto').style.borderBottom = '4px solid var(--second-main-color)';
    if (!text) document.getElementById('text').style.borderBottom = '4px solid var(--second-main-color)';

    return;
  }

  // Se todos os campos estiverem preenchidos, continuar com o envio do e-mail
  emailjs.sendForm('service_5a72ci8', 'template_fvskujf', '#contact-form', 'FUFqKIistmIQV39YA')
    .then(
      (response) => {
        console.log('Resposta da API:', response);
        contactMessage.textContent = 'Mensagem enviada com sucesso! ✅';

          setTimeout(() =>{
            contactMessage.textContent = ''
          }, 5000)

          contactForm.reset()
      },
      (error) => {
        console.error('Erro ao enviar e-mail:', error);
        contactMessage.textContent = 'Mensagem não enviada (erro de serviço) ❌';
      }
    );
};

// Adicionar manipuladores de eventos para remover a borda vermelha ao começar a preencher os campos
document.getElementById('name').addEventListener('input', removeRedBorder);
document.getElementById('email').addEventListener('input', removeRedBorder);
document.getElementById('assunto').addEventListener('input', removeRedBorder);
document.getElementById('text').addEventListener('input', removeRedBorder);

contactForm.addEventListener('submit', sendEmail);
