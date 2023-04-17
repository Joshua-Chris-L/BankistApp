'use strict';

///////////////////////////////////////
// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav')
const tabs = document.querySelectorAll(".operations__tab")
const tabsContainer = document.querySelector(".operations__tab-container")
const tabsContent = document.querySelectorAll('.operations__content');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach( btn => btn.addEventListener
  ('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


const message = document.createElement('div')
message.classList.add('cookie-message');
// message.textContent = `We use cookies for improved 
//                 functionalities and analytics`
message.innerHTML = 
`We use cookies for improvd 
functionalities. 
<button class="btn"> Got it</button> `

const header = document.querySelector('.header');

// styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

//console.log(message.style.height) //returns nothing
//Works only if we have previously set the html properties in our html documents
// console.log(message.style.backgroundColor)

const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')

btnScrollTo.addEventListener('click', function(e){
  section1.scrollIntoView({behavior: 'smooth'});
})


document.querySelector('.nav__links').addEventListener
('click', function(e){
  e.preventDefault()
  // Matching Strategy
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    console.log(id)
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth'});
  }
})

// Tabbed component
tabsContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab')
  
  // Guard clause
  if (!clicked) return

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'))
  
  // Active Tabs
  clicked.classList.add('operations__tab--active');
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate content area
  document
  .querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add('operations__content--active')

})

// Menu fade animation

// Fade in
const handleHover= function(e, opacity){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav')
    .querySelectorAll('.nav__link')

    const logo = link.closest('.nav')
    .querySelector('img');

    siblings.forEach(el => {
      if(el !== link ) el.style.opacity = opacity
    })
    logo.style.opacity = opacity
 }
}

// Fade in
nav.addEventListener('mouseover', function(e){
    handleHover(e, 0.5)
 });

// Fade out
nav.addEventListener('mouseout', function(e){
    handleHover(e, 1)
})

// Sticky Navigation
window.addEventListener('scroll', function(e){
  console.log(e)
})

//  //   //  PRACTICE/ Testing
// const s1coords = section1.getBoundingClientRect();
  // console.log(window.pageXOffset, window.pageYOffset)
  // console.log(e.target.getBoundingClientRect())
  // console.log(document.documentElement.clientHeight,
  //     document.documentElement.clientWidth);
            
  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset)

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth', 
  // })

  // const h1 = document.querySelector('h1');

// const alertH1 = function(e){
//   alert('great. You just hovererd over the stuffs')

//  // h1.removeEventListener('mouseenter', alertH1)
// }

// h1.addEventListener('mouseenter', alertH1)

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000)

//Page navigation
// document.querySelectorAll('.nav__link').forEach
// (function(el){
//   el.addEventListener('click', function(e){
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({
//       behaviour: 'smooth'});
//   })
// })

//Delegate Event
//1. Add event listener to common parent element
//2. Determine what element originated the event

// header.prepend(message)
// header.append(message)
//header.before(message)
// header.after(message)

// Delete elements
// document.querySelector('.btn--close-cookie').addEventListener
// ('click', function(){
//   message.remove();
// })

//Lecture

// const allSections = document.querySelectorAll('.section');
// console.log(allSections)

// Creating and inserting elements
//.insertingAdjacentHtml

// const h1 = document.querySelector('h1')

// // Going upwards parent
// console.log(h1.closest('h1').style.background = 
// 'var (--gradient-primary)')

// // Going sideways: siblings
// console.log(h1.previousElementSibling)