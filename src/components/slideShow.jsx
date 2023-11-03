const slideShow = (l, r, con, myGallery, i) => {
    let slideIndex = 0;
    const prevButton = document.querySelector(`${l}`);
    const nextButton = document.querySelector(`${r}`);
    const container = document.querySelector(`${con}`);
    function rightSlide() {
      if (slideIndex >= i) {
        console.log('');
      } else {
        slideIndex++;
        const num = myGallery[slideIndex].slide;
        container.style.transform = `translateX(${num}px)`;
      }
    }
    function leftSlide() {
      if (slideIndex <= 0) {
        console.log('');
      } else {
        slideIndex--;
        const num = myGallery[slideIndex].slide;
        container.style.transform = `translateX(${num}px)`;
      }
    }
  
    prevButton.addEventListener('click', leftSlide);
  
    nextButton.addEventListener('click', rightSlide);
  };
  
  export default slideShow;
  
  