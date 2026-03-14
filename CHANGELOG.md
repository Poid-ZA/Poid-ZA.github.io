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
- Applied a typography and micro-spacing refinement pass to the live `Poid-ZA.github.io` one-pager: tightened headline measure, improved section rhythm, increased body-text readability, and cleaned card/list spacing so the page feels more deliberate on both desktop and mobile.

## 2026-03-14

### Control-plane and ACP delivery update
- added Codex ACP as the default execution lane for non-trivial repo work
- updated public copy to reflect the lower-token control-plane model
- added durable session/task-state pattern to reduce transcript replay and context burn
- refreshed backup/recovery posture after the ACP/runtime changes
