/*
 * Client‑side interactivity for the Grok‑inspired search site
 *
 * This script adds scroll‑spy functionality to highlight navigation links
 * based on scroll position and fade‑in animations for sections when
 * they enter the viewport. It also prevents the default form submission
 * to avoid page reload and logs the query for demonstration purposes.
 */

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.site-nav a');
  const sections = document.querySelectorAll('main section');

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');
  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      siteNav.classList.toggle('open');
    });
    // Hide menu when clicking a nav link (optional)
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('open');
      });
    });
  }

  // Add reveal class to all sections for animation
  sections.forEach(section => section.classList.add('reveal'));

  // IntersectionObserver for revealing sections when they come into view
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        // Once revealed, unobserve to avoid toggling back
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => revealObserver.observe(section));

  // ScrollSpy: highlight nav links based on current section
  const spyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        // Highlight the link corresponding to the current section ID
        const id = entry.target.getAttribute('id');
        const activeLink = document.querySelector(`.site-nav a[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => spyObserver.observe(section));

  // Handle search form submission
  const searchForm = document.querySelector('.search-box');
  searchForm.addEventListener('submit', event => {
    event.preventDefault();
    const query = searchForm.querySelector('input[type="search"]').value;
    // For demonstration, redirect to a search engine or display in console
    if (query.trim()) {
      // Redirect to a search results page (e.g., DuckDuckGo)
      const searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
      window.open(searchUrl, '_blank');
    }
  });
});