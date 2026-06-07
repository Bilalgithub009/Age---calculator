const birthInput = document.getElementById("birth-date");
const currentInput = document.getElementById("current-date");

const bornDayEl = document.getElementById("born-day");
const zodiacEl = document.getElementById("zodiac-sign");

const yearsEl = document.getElementById("years");
const monthsEl = document.getElementById("months");
const daysEl = document.getElementById("days");

const birthdayCountdownEl = document.getElementById("birthday-countdown");

const calculateBtn = document.getElementById("calculate-btn");
const resetBtn = document.getElementById("reset-btn");
const pdfBtn = document.getElementById("pdf-btn");
const themeBtn = document.getElementById("theme-toggle");

const toast = document.getElementById("toast");
const progress = document.querySelector(".progress");

// auto date
window.addEventListener("DOMContentLoaded", () => {
    currentInput.value = new Date().toISOString().split("T")[0];
});

// calculate
calculateBtn.addEventListener("click", () => {

    if (!birthInput.value) {
        alert("Enter Date of Birth");
        return;
    }

    const birth = new Date(birthInput.value);
    const current = new Date(currentInput.value);

    let years = current.getFullYear() - birth.getFullYear();
    let months = current.getMonth() - birth.getMonth();
    let days = current.getDate() - birth.getDate();

    if (days < 0) {
        months--;
        days += new Date(
            current.getFullYear(),
            current.getMonth(),
            0
        ).getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    // Born Day
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const bornDay = daysOfWeek[birth.getDay()];
    bornDayEl.innerText = `📅 Born On: ${bornDay}`;

    // Zodiac Sign
    let zodiac = "";

    const day = birth.getDate();
    const month = birth.getMonth() + 1;

    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) zodiac = "Aquarius ♒";
    else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) zodiac = "Pisces ♓";
    else if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) zodiac = "Aries ♈";
    else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) zodiac = "Taurus ♉";
    else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) zodiac = "Gemini ♊";
    else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) zodiac = "Cancer ♋";
    else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) zodiac = "Leo ♌";
    else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) zodiac = "Virgo ♍";
    else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) zodiac = "Libra ♎";
    else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) zodiac = "Scorpio ♏";
    else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) zodiac = "Sagittarius ♐";
    else zodiac = "Capricorn ♑";

    zodiacEl.innerText = `♈ Zodiac: ${zodiac}`;



    yearsEl.innerText = years;
    monthsEl.innerText = months;
    daysEl.innerText = days;

    // Next Birthday Countdown
    let nextBirthday = new Date(
        current.getFullYear(),
        birth.getMonth(),
        birth.getDate()
    );

    if (nextBirthday < current) {
        nextBirthday.setFullYear(current.getFullYear() + 1);
    }

    const diffTime = nextBirthday - current;
    const remainingDays = Math.ceil(
        diffTime / (1000 * 60 * 60 * 24)
    );

    birthdayCountdownEl.innerText =
        `🎂 ${remainingDays} Days Remaining`;
});

// reset
resetBtn.addEventListener("click", () => {
    birthInput.value = "";
    currentInput.value = new Date().toISOString().split("T")[0];

    yearsEl.innerText = "00";
    monthsEl.innerText = "00";
    daysEl.innerText = "00";

    bornDayEl.innerText = "📅 Born On: --";
    zodiacEl.innerText = "♈ Zodiac: --";

    birthdayCountdownEl.innerText = "--";
});

// theme
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        themeBtn.innerHTML = "☀️ Light Mode";
        themeBtn.style.color = "#000";
    } else {
        themeBtn.innerHTML = "🌙 Dark Mode";
        themeBtn.style.color = "#fff";
    }
});

// PDF
pdfBtn.addEventListener("click", () => {

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const dob = birthInput.value;
    const currentDate = currentInput.value;

    const years = yearsEl.innerText;
    const months = monthsEl.innerText;
    const days = daysEl.innerText;

    if (!dob) {
        alert("Please calculate age first");
        return;
    }

    const birth = new Date(dob);

    const bornDay = birth.toLocaleDateString("en-US", {
        weekday: "long"
    });

    const totalDays = Math.floor(
        (new Date(currentDate) - birth) /
        (1000 * 60 * 60 * 24)
    );

    const totalWeeks = Math.floor(totalDays / 7);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("AGE REPORT", 65, 20);

    doc.line(20, 25, 190, 25);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(13);
    doc.text(`DOB: ${dob}`, 20, 45);
    doc.text(`Current Date: ${currentDate}`, 20, 55);

    doc.line(20, 65, 190, 65);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("AGE DETAILS", 55, 82);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);

    doc.text(`${years} Years`, 20, 100);
    doc.text(`${months} Months`, 20, 110);
    doc.text(`${days} Days`, 20, 120);

    doc.text(`Total Days: ${totalDays}`, 20, 140);
    doc.text(`Total Weeks: ${totalWeeks}`, 20, 150);

    doc.text(`Born On: ${bornDay}`, 20, 165);

    doc.line(20, 185, 190, 185);

    doc.setFont("helvetica", "italic");
    doc.setFontSize(11);
    doc.text("Generated by Age Calculator App", 45, 200);

    doc.save("Age_Report.pdf");
});

// loader
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hide");
    }, 1800);
});