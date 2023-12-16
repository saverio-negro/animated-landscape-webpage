// The navbar effect project is going to provide a dynamic way
// of knowing where we exactly are in the webpage via utilizing
// the intersect observer API.

// Queried Elements
const sections = document.querySelectorAll('section')
const colors = ["coral", "chartreuse", "chocolate", "cadetblue"]
const paragraphs = document.querySelectorAll('.modal>p')

// Observer's Callback
const intersectionHandler = (entries, observer) => {

    entries.forEach((entry) => {
        const entryClass = entry.target.className
        const anchorEl = document.querySelector(`[data-page="${entryClass}"]`)
        const modalEl = document.querySelector(`.modal.${entryClass}`)
        const modal2El = document.querySelector(`.modal-2.${entryClass}`)
        const modal3Card = document.querySelector(`.modal-3>.card.${entryClass}`)
        const sectionIndex = entry.target.getAttribute('data-index')
        const paragraph = paragraphs[sectionIndex]
        
        if (entry.isIntersecting) {
            // Handle text animation
            paragraph.style.animation = 'shine 3s linear'
            paragraph.style.animationDelay = '3s'

            paragraph.addEventListener('animationstart', (event) => {
                paragraph.style.backgroundSize = '80%'
            })

            paragraph.addEventListener('animationend', (event) => {
                paragraph.style.backgroundSize = '100%'
            })
            
            // Handle curtain fall animation
            modal2El.style.animation = 'curtain-fall 1.5s linear'
            modal2El.style.animationDelay = '0.3s'
            modal2El.style.backgroundColor = colors[sectionIndex]
            modal2El.addEventListener('animationstart', (event) => {
                modal2El.style.opacity = 0.18
            })

            // Handle card animation
            modal3Card.style.transform = 'translate(0%)'
            modal3Card.style.opacity = 0.8

            anchorEl.style.backgroundColor = colors[sectionIndex]
            modalEl.style.opacity = 1
            modalEl.style.transform = "translate(0%)"
        } else {
            // Handle text animation
            paragraph.style.animation = ''
            // Handle curtain fall animation
            modal2El.style.animation = ''

            // Handle card animation
            modal3Card.style.transform = 'translate(100%)'
            modal3Card.style.opacity = 0
            
            anchorEl.style.backgroundColor = null
            modalEl.style.opacity = 0;
            modalEl.style.transform = "translate(50%)"
        }
    })
}

// Creates Observer
const createObserver = (target) => {

    let observer

    const option = {
        root: null,
        rootMargin: "0px",
        threshold: 0.7
    }

    observer = new IntersectionObserver(intersectionHandler, option)
    observer.observe(target)
}

sections.forEach((section) => {
    createObserver(section)
})




