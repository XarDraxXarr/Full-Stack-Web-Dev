class DarkModeToggle {
  constructor() {
    this.darkModeToggle = document.getElementById("darkModeToggle")
    this.init()
  }

  init() {
    const savedTheme = localStorage.getItem("theme") || "light"
    this.setTheme(savedTheme)

    this.darkModeToggle.addEventListener("click", () => {
      this.toggleTheme()
    })
  }

  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)

    const isLight = theme === "light"
    this.darkModeToggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode")
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme")
    const newTheme = currentTheme === "light" ? "dark" : "light"
    this.setTheme(newTheme)
  }
}

class HamburgerMenu {
  constructor() {
    this.hamburger = document.getElementById("hamburger")
    this.menu = document.getElementById("menu")
    this.menuItems = document.querySelectorAll(".menu-item")
    this.init()
  }

  init() {
    this.hamburger.addEventListener("click", () => {
      this.toggleMenu()
    })

    this.menuItems.forEach((item) => {
      item.addEventListener("click", () => {
        this.closeMenu()
      })
    })

    document.addEventListener("click", (e) => {
      if (!this.menu.contains(e.target) && !this.hamburger.contains(e.target)) {
        this.closeMenu()
      }
    })

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeMenu()
      }
    })

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024) {
        this.closeMenu()
      }
    })
  }

  toggleMenu() {
    const isActive = this.hamburger.classList.contains("active")

    if (isActive) {
      this.closeMenu()
    } else {
      this.openMenu()
    }
  }

  openMenu() {
    this.hamburger.classList.add("active")
    this.menu.classList.add("active")
    this.hamburger.setAttribute("aria-expanded", "true")

    // Prevent body scroll when menu is open
    document.body.style.overflow = "hidden"
  }

  closeMenu() {
    this.hamburger.classList.remove("active")
    this.menu.classList.remove("active")
    this.hamburger.setAttribute("aria-expanded", "false")

    // Restore body scroll
    document.body.style.overflow = ""
  }
}

// Smooth Scrolling for Menu Items
class SmoothScroll {
  constructor() {
    this.init()
  }

  init() {
    // Add smooth scrolling to menu items if they link to sections
    const menuItems = document.querySelectorAll(".menu-item")

    menuItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        const text = item.textContent.toLowerCase().trim()

        // Example: if clicking "Blog", scroll to top
        if (text === "blog") {
          e.preventDefault()
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
      })
    })
  }
}

// Enhanced Pagination
class Pagination {
  constructor() {
    this.init()
  }

  init() {
    const paginationNumbers = document.querySelectorAll(".pagination-number")
    const prevButton = document.querySelector(".pagination-button:first-child")
    const nextButton = document.querySelector(".pagination-button:last-child")

    // Add click handlers to pagination numbers
    paginationNumbers.forEach((number, index) => {
      number.addEventListener("click", () => {
        this.setActivePage(index)
      })
    })

    // Add click handlers to prev/next buttons
    if (prevButton) {
      prevButton.addEventListener("click", () => {
        this.goToPreviousPage()
      })
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        this.goToNextPage()
      })
    }
  }

  setActivePage(pageIndex) {
    const paginationNumbers = document.querySelectorAll(".pagination-number")

    // Remove active class from all pages
    paginationNumbers.forEach((number) => {
      number.classList.remove("active")
    })

    // Add active class to selected page
    if (paginationNumbers[pageIndex]) {
      paginationNumbers[pageIndex].classList.add("active")
    }

    // Scroll to top of blog section
    const blogSection = document.querySelector(".blog")
    if (blogSection) {
      blogSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  goToPreviousPage() {
    const activePage = document.querySelector(".pagination-number.active")
    const allPages = document.querySelectorAll(".pagination-number")
    const currentIndex = Array.from(allPages).indexOf(activePage)

    if (currentIndex > 0) {
      this.setActivePage(currentIndex - 1)
    }
  }

  goToNextPage() {
    const activePage = document.querySelector(".pagination-number.active")
    const allPages = document.querySelectorAll(".pagination-number")
    const currentIndex = Array.from(allPages).indexOf(activePage)

    if (currentIndex < allPages.length - 1 && !allPages[currentIndex + 1].textContent.includes("...")) {
      this.setActivePage(currentIndex + 1)
    }
  }
}

// Blog Card Interactions
class BlogCardInteractions {
  constructor() {
    this.init()
  }

  init() {
    const blogCards = document.querySelectorAll(".blog-post-card")

    blogCards.forEach((card) => {
      // Add click handler to entire card
      card.addEventListener("click", (e) => {
        // Don't trigger if clicking on specific interactive elements
        if (!e.target.closest(".categories") && !e.target.closest(".icon-wrap")) {
          this.handleCardClick(card)
        }
      })

      // Add keyboard navigation
      card.setAttribute("tabindex", "0")
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          this.handleCardClick(card)
        }
      })
    })
  }

  handleCardClick(card) {
    card.style.transform = "scale(0.98)"
    setTimeout(() => {
      card.style.transform = ""
    }, 150)

    console.log("Navigate to blog post:", card.querySelector(".heading").textContent)
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new DarkModeToggle()
  new HamburgerMenu()
  new SmoothScroll()
  new Pagination()
  new BlogCardInteractions()
})

window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})
