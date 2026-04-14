/**
 * performance-detector.ts
 * 
 * Deteksi kemampuan perangkat dan return performance tier.
 * Digunakan oleh semua komponen untuk progressive enhancement.
 * 
 * Tier:
 * - ULTRA: High-end desktop/laptop (8+ GB RAM, 8+ cores)
 * - NORMAL: Mid-range device (4-8 GB RAM, 4-8 cores) 
 * - LOW: Low-end device (2-4 GB RAM, 2-4 cores)
 * - BATTERY_SAVER: Very low-end or battery saver mode
 * 
 * NOTE: This is designed to be used as inline script content.
 * Copy the getPerformanceTier() function into <script is:inline> blocks.
 */

export type PerformanceTier = 'ULTRA' | 'NORMAL' | 'LOW' | 'BATTERY_SAVER';

/**
 * Detect device performance tier based on hardware capabilities.
 * Caches result in sessionStorage for consistency across navigations.
 */
export function getPerformanceTier(): PerformanceTier {
  // Check cache first
  if (typeof sessionStorage !== 'undefined') {
    const cached = sessionStorage.getItem('cloudsi_perf_tier');
    if (cached) return cached as PerformanceTier;
  }

  let score = 0;

  // 1. Device Memory (navigator.deviceMemory)
  const memory = (navigator as any).deviceMemory;
  if (memory) {
    if (memory >= 8) score += 3;
    else if (memory >= 4) score += 2;
    else if (memory >= 2) score += 1;
    // else score += 0
  } else {
    // If API not available, assume mid-range
    score += 2;
  }

  // 2. CPU Cores (navigator.hardwareConcurrency)
  const cores = navigator.hardwareConcurrency;
  if (cores) {
    if (cores >= 8) score += 3;
    else if (cores >= 4) score += 2;
    else if (cores >= 2) score += 1;
    // else score += 0
  } else {
    score += 1;
  }

  // 3. Screen size / pixel ratio hint
  const dpr = window.devicePixelRatio || 1;
  const screenWidth = window.screen?.width || window.innerWidth;
  
  // Mobile device detection
  const isMobile = screenWidth < 768 || ('ontouchstart' in window);
  if (isMobile) {
    score -= 1; // Penalty for mobile
  }

  // High DPR on mobile = more GPU work needed
  if (isMobile && dpr >= 3) {
    score -= 1;
  }

  // 4. GPU hint via WebGL
  try {
    const testCanvas = document.createElement('canvas');
    const testGl = testCanvas.getContext('webgl');
    if (testGl) {
      const debugInfo = testGl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = testGl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        // Integrated GPUs get a penalty
        if (renderer && /swiftshader|llvmpipe|mesa|intel.*uhd/i.test(renderer)) {
          score -= 1;
        }
        // Dedicated GPUs get a bonus
        if (renderer && /nvidia|radeon|geforce|rtx|gtx/i.test(renderer)) {
          score += 1;
        }
      }
    }
    // Clean up test canvas
    testCanvas.remove();
  } catch (e) { /* ignore */ }

  // Determine tier based on score
  let tier: PerformanceTier;
  if (score >= 6) {
    tier = 'ULTRA';
  } else if (score >= 4) {
    tier = 'NORMAL';
  } else if (score >= 2) {
    tier = 'LOW';
  } else {
    tier = 'BATTERY_SAVER';
  }

  // Cache the result
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem('cloudsi_perf_tier', tier);
  }

  return tier;
}

/**
 * Apply performance tier CSS variables and classes to the document.
 * Should be called as early as possible (inline in <head>).
 */
export function applyPerformanceTier(tier: PerformanceTier): void {
  const root = document.documentElement;
  
  // Set data attribute for CSS targeting
  root.dataset.perfTier = tier.toLowerCase();
  
  // Set CSS custom properties based on tier
  switch (tier) {
    case 'ULTRA':
      root.style.setProperty('--blur-glass', 'blur(28px)');
      root.style.setProperty('--blur-glass-heavy', 'blur(28px)');
      root.style.setProperty('--perf-transition-duration', '700ms');
      root.style.setProperty('--perf-animation-enabled', '1');
      break;
    case 'NORMAL':
      root.style.setProperty('--blur-glass', 'blur(12px)');
      root.style.setProperty('--blur-glass-heavy', 'blur(18px)');
      root.style.setProperty('--perf-transition-duration', '500ms');
      root.style.setProperty('--perf-animation-enabled', '1');
      break;
    case 'LOW':
      root.style.setProperty('--blur-glass', 'blur(4px)');
      root.style.setProperty('--blur-glass-heavy', 'blur(8px)');
      root.style.setProperty('--perf-transition-duration', '300ms');
      root.style.setProperty('--perf-animation-enabled', '0');
      break;
    case 'BATTERY_SAVER':
      root.style.setProperty('--blur-glass', 'blur(0px)');
      root.style.setProperty('--blur-glass-heavy', 'blur(0px)');
      root.style.setProperty('--perf-transition-duration', '0ms');
      root.style.setProperty('--perf-animation-enabled', '0');
      break;
  }
}
