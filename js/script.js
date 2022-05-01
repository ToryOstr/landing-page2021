const prices = {
    'landing-page': {
        pm: 700,
        design: 600,
        developer: 1200,
        qa: 500
    },
    'online-store': {
        pm: 1200,
        design: 900,
        developer: 2500,
        qa: 800,
    },
    'web-application': {
        pm: 2000,
        design:1100,
        developer:3000,
        qa: 1000,
    },
    'mobile-application': {
        pm: 3000,
        design: 1500,
        developer: 4000,
        qa: 1300,
    }
};

function getFormValues() {
        const websiteTypeElement = document.querySelector('#project-type');  
               
        const pmEl = document.querySelector('#project-management');
        const designEl = document.querySelector('#design'); 
        const developmentEl = document.querySelector('#development'); 
        const qaEl = document.querySelector('#qa');
         
        return {
            websiteType: websiteTypeElement.value,
            pm: pmEl.checked,
            design: designEl.checked,
            developer: developmentEl.checked,
            qa: qaEl.checked,
            }
}

function calculateWork() {
    const values = getFormValues();
    
    let totalPrice = 0;

    const workTypes = prices[values.websiteType];
   
    if (values.pm) {
        totalPrice = workTypes.pm;  
    }

    if (values.design) {
        totalPrice = totalPrice + workTypes.design;
    }

    if (values.developer) {
        totalPrice = totalPrice + workTypes.developer;
    }

    if (values.qa) {
       totalPrice = totalPrice + workTypes.qa;
    }

    const totalPriceEl = document.querySelector('#total-price');

    totalPriceEl.textContent = totalPrice;


    console.log(totalPrice);
}

const formEl = document.querySelector('#project-price-form');
const emailModal = document.querySelector('#modal-email');
const successModal = document.querySelector('#success-modal');

// Первый просчёт формы

calculateWork();

formEl.addEventListener('change', calculateWork);

formEl.addEventListener('submit', function (event) {
    event.preventDefault();

    emailModal.classList.add('modal-active');
    
});

const closeButtons = document.querySelectorAll('.modal_close_btn');

closeButtons.forEach( function(closeBtn) {
    closeBtn.addEventListener('click', function () {
        const inputContaner = document.querySelector('#email-input-contaner');
        inputContaner.classList.remove('email-input-contaner-error');
        emailModal.classList.remove('modal-active');
        successModal.classList.remove('modal-active2');
    });
});

const modalEmailContaner = document.querySelector('#modal-email-contaner');

modalEmailContaner.addEventListener('submit', function(event) {
    event.preventDefault();

    const userEmailInput = document.querySelector('#user-email');
    if (userEmailInput.value) {

        const formData = new FormData(formEl);
        
        formData.append('Email', userEmailInput.value);

        fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        })
            .then(function () {
                emailModal.classList.remove('modal-active');
                successModal.classList.add('modal-active2');
            })
            .catch(() => alert('Упс! Не удалось отправить форму.'))
            return;
       
    }
    const inputContaner = document.querySelector('#email-input-contaner');

    inputContaner.classList.add('email-input-contaner-error');
});


  


  
