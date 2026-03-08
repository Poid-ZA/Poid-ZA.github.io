# Changelog

## 2026-03-08

### Rebuilt the public APEX showcase
- replaced the older status-style site with a modern static APEX landing page
- preserved JetBrains Mono and the cyan-on-dark identity
- added GSAP-based parallax, reveal motion, and depth treatment
- updated the public narrative to reflect the current APEX stack:
  - QMD-first memory
  - scoped preflight and flush
  - APEX Memory Console
  - startup hardening
  - regression workflow
  - local skills

### Repo alignment
- updated `README.md` so the repository describes the actual public site
- published the rebuild directly to `main`

### Polish pass
- added a second visual refinement pass with:
  - cursor glow
  - hero rail cards
  - showcase strip
  - footer refinement

### Proxy4u narrative and motion refinement
- tightened the one-page story around the Proxy4u identity so the site reads more like a principal-engineering public profile than a generic system overview
- integrated the APEX Memory Console, APEX Relay, and Daily Tech Digest MVP more cleanly into the single-page flow
- smoothed navigation and scroll motion by removing conflicting native smooth scrolling, softening GSAP scrub timing, and easing pointer glow movement
