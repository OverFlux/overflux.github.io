function changeContactsImage(_member) {
    const images = {
        'Founder' : ['images/selfie_founder.jpg', 'Founder Image', 'Founder: Tumanov Dmitry Mikhailovich.'],
        'CEO' : ['images/selfie_ceo.png', 'CEO Image', 'CEO: Aldyukhov Egor Viktorovich.'],
        'CTO' : ['images/selfie_cto.jpg', 'CTO Image', 'CTO: Yakushev Roman Alekseevich.'],
        'Tester' : ['images/selfie_tester.png', 'Tester Image', 'Tester: Kopustas Antanas Alexandrovich.']
    }


    const image = document.getElementById('selfie');
    const image_description = document.getElementById('selfie__description');

    image.src = images[_member][0];
    image.alt = images[_member][1];
    image_description.textContent = images[_member][2];

    image.classList.remove('hidden');
}

function showSection(id) {
    document.querySelectorAll("section").forEach(section => {
        section.classList.add("hidden");
    });

    document.getElementById(id).classList.remove("hidden");
}

window.addEventListener("load", () => {
    const hash = window.location.hash.substring(1) || "home";

    if (document.getElementById(hash)) {
        showSection(hash);
    }
});
