(function () {
    emailjs.init('hYeehNGpQADhu290j');
})();

const modeToggle = document.getElementById('toggle-theme');

modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

document.addEventListener("DOMContentLoaded", function () {
    var homeLink = document.querySelector('.logo');
    homeLink.addEventListener('click', function (event) {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var links = document.querySelectorAll('.navbar .hover-link');
    var headerHeight = document.querySelector('header').offsetHeight;
    var offset = 20;

    function updateActiveLink() {
        var scrollPosition = window.scrollY;
        var isAtTop = scrollPosition === 0;
        var isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;

        if (isAtTop) {
            document.querySelector('.navbar .hover-link.active').classList.remove('active');
            document.querySelector('.home').classList.add('active');
        } else if (isAtBottom) {
            document.querySelector('.navbar .hover-link.active').classList.remove('active');
            document.querySelector('[href="#contact"]').classList.add('active');
        } else {
            links.forEach(function (link) {
                var targetId = link.getAttribute('href');
                if (targetId !== "#") {
                    var targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        var targetOffset = targetElement.offsetTop - headerHeight - offset;
                        if (scrollPosition >= targetOffset) {
                            document.querySelector('.navbar .hover-link.active').classList.remove('active');
                            link.classList.add('active');
                        }
                    }
                }
            });
        }
    }

    window.addEventListener('scroll', function () {
        updateActiveLink();
    });

    links.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            var targetId = this.getAttribute('href');
            if (targetId !== "#") {
                var targetElement = document.querySelector(targetId);
                if (targetElement) {
                    var targetOffset = targetElement.offsetTop - headerHeight - offset;
                    window.scrollTo({
                        top: targetOffset,
                        behavior: 'smooth'
                    });
                }
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }

            document.querySelector('.navbar .hover-link.active').classList.remove('active');
            this.classList.add('active');
            document.getElementById('nav-links').classList.remove('show');
        });
    });

    updateActiveLink();
});

document.addEventListener("DOMContentLoaded", function () {
    var link = document.querySelector('.contact-button');
    var headerHeight = document.querySelector('header').offsetHeight;
    var offset = 20;

    link.addEventListener('click', function (event) {
        event.preventDefault();
        var targetId = this.getAttribute('href');
        if (targetId !== "#") {
            var targetElement = document.querySelector(targetId);
            if (targetElement) {
                var targetOffset = targetElement.offsetTop - headerHeight - offset;
                window.scrollTo({
                    top: targetOffset,
                    behavior: 'smooth'
                });
            }
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        document.querySelector('.navbar .hover-link.active').classList.remove('active');
        document.querySelector('.contact').classList.add('active');
    });
});

document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    const templateParams = {
        from_name: name,
        from_email: email,
        subject: "Portfolio Query",
        message: message,
    };

    emailjs.send('service_zapjsoq', 'template_d8aa69a', templateParams)
        .then(function (response) {
            console.log('Email sent successfully!', response.status, response.text);
            toastr.remove();
            toastr.success('Query sent successfully!');
            document.getElementById('contact-form').reset();
        }, function (error) {
            console.error('Email sending failed:', error);
            toastr.remove();
            toastr.error('Query sending failed. Please try again later.');
        });
});

const toggleButton = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

toggleButton.addEventListener('click', () => {
    navLinks.classList.toggle('show');
})
