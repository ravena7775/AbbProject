var swiper = new Swiper(".mySwiper", {
    speed: 600,
    parallax: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

document.querySelectorAll('.menu-item').forEach(item => {
    let submenu = item.querySelector('.submenu');

    item.addEventListener('mouseenter', () => {
        submenu.style.display = 'block';
    });

    item.addEventListener('mouseleave', () => {
        submenu.style.display = 'none';
    });
    document.addEventListener('click', (event) => {
        if (!item.contains(event.target) && !submenu.contains(event.target)) {
            submenu.style.display = 'none';
        }
    });
});


function calculateLoan() {
    let amount = parseFloat(document.getElementById("amount").value);
    let months = parseInt(document.getElementById("months").value);
    let rate = parseFloat(document.getElementById("rate").value) / 100;

    let monthlyRate = rate / 12;
    let monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    let totalAmount = monthlyPayment * months;

    document.getElementById("amountText").innerText = amount;
    document.getElementById("monthsText").innerText = months;
    document.getElementById("rateText").innerText = (rate * 100).toFixed(1);

    document.getElementById("monthlyPayment").innerText = monthlyPayment.toFixed(2);
    document.getElementById("totalAmount").innerText = totalAmount.toFixed(2);
}

document.getElementById("amount").addEventListener("input", calculateLoan);
document.getElementById("months").addEventListener("input", calculateLoan);
document.getElementById("rate").addEventListener("input", calculateLoan);

calculateLoan();



const burger = document.querySelector('#burger')
const menu = document.querySelector('.menu')
const gizli = document.querySelector('.gizli')


burger.addEventListener('click', function () {
    if (menu.classList.contains('open')) {
        burger.classList.add('fa-bars')
        burger.classList.remove('fa-xmark')
        menu.classList.remove('open')
        gizli.style.visibility = 'hidden'
        gizli.style.display = 'none'
    }
    else {
        burger.classList.remove('fa-bars')
        burger.classList.add('fa-xmark')
        menu.classList.add('open')
        gizli.style.visibility = 'visible'
        gizli.style.height =  '90vh';
        gizli.style.display = 'block'
    }
})


const fin = document.getElementById('fin')
const btn = document.getElementById('btn-fin')
btn.onclick = function () {
    if (fin.value.length > 8) {
        alert('8-dən artıq simvol istifadə etmək olmaz!')
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const sellInput = document.getElementById('sell');
    const buyInput = document.getElementById('buy');

    const dropdownBtns = document.querySelectorAll(".dropdown-btn");
    const dropdownMenus = document.querySelectorAll(".dropdown-menu");

    let sellCurrency = "AZN";
    let buyCurrency = "AZN";

    // Valyuta məzənnələri
    const exchangeRates = {
        AZN: { AZN: 1, USD: 1 / 1.7, EUR: 1 / 1.9, RUB: 1 / 0.025 },
        USD: { AZN: 1.7, USD: 1, EUR: 1.12, RUB: 85 },
        EUR: { AZN: 1.9, USD: 1 / 1.12, EUR: 1, RUB: 92 },
        RUB: { AZN: 0.025, USD: 1 / 85, EUR: 1 / 92, RUB: 1 }
    };
    dropdownBtns.forEach((dropdownBtn, index) => {
        const dropdownMenu = dropdownMenus[index];

        dropdownBtn.addEventListener("click", () => {
            dropdownMenu.classList.toggle("show");
        });

        dropdownMenu.addEventListener("click", (e) => {
            if (e.target.tagName === "LI") {
                const selectedCurrency = e.target.getAttribute("data-currency");
                dropdownBtn.textContent = selectedCurrency + " ▼";
                dropdownMenu.classList.remove("show");
                if (index === 0) {
                    sellCurrency = selectedCurrency;
                }
                else {
                    buyCurrency = selectedCurrency;
                }

                updateBuyValue();
            }
        });
    });
    sellInput.addEventListener("input", updateBuyValue);

    function updateBuyValue() {
        const sellAmount = parseFloat(sellInput.value) || 0;
        const rate = exchangeRates[sellCurrency][buyCurrency];

        buyInput.value = (sellAmount * rate).toFixed(2);
    }
    document.addEventListener("click", (e) => {
        dropdownBtns.forEach((dropdownBtn, index) => {
            const dropdownMenu = dropdownMenus[index];
            if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.classList.remove("show");
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const dropdownBtn = document.querySelector(".dropdown-btn-ln");
    const dropdownContent = document.querySelector(".dropdown-content-ln");

    dropdownBtn.addEventListener("click", function () {
        dropdownContent.classList.toggle("show");
    });
});
