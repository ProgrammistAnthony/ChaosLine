const img = document.querySelectorAll('.card__img');

img.forEach((elem) => {
    let condition = false; 
    elem.addEventListener('click', (evt) => {
        if (!condition) {
            evt.target.style.transform = 'scale(0.8)';
            evt.target.style.position = "fixed";
            evt.target.style.inset = 0;
            evt.target.style.zIndex = 100; 
            condition = true;
        } else {
            evt.target.style.transform = 'scale(1)';
            evt.target.style.position = "static"; 
            evt.target.style.inset = 'auto'; 
            evt.target.style.zIndex = 1; 
            condition = false;
        }
    });
});