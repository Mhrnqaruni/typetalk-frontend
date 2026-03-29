import { useEffect } from 'react'

/**
 * Attaches an IntersectionObserver to all `.reveal` elements in the document.
 * When an element enters the viewport it gets the `.is-visible` class.
 * Call this once inside the root App component.
 */
export default function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!els.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target) // animate once
          }
        })
      },
      { threshold: 0.12 }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  })
}
