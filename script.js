/**
 * PANIC VS POISON: A STORY OF FEAR AND COEXISTENCE
 * Parallax Canvas & Snake Entrance Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    initBackgroundParallax();
    initAmbientEmbers();
    initSnakeEntrance();
    initLandscapeLayerStory();
});

/**
 * Continuous Parallax Depth & Interactive Pointer Tilt
 */
function initBackgroundParallax() {
    const bg = document.getElementById('parallax-bg');
    const snakeContainer = document.getElementById('snake-container');
    if (!bg) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    window.addEventListener('mousemove', (e) => {
        const halfW = window.innerWidth / 2;
        const halfH = window.innerHeight / 2;
        targetX = (e.clientX - halfW) / halfW;
        targetY = (e.clientY - halfH) / halfH;
    }, { passive: true });

    let scrollY = window.scrollY;
    let targetScrollY = scrollY;
    window.addEventListener('scroll', () => {
        targetScrollY = window.scrollY;
    }, { passive: true });

    function loop() {
        currentX += (targetX - currentX) * 0.05;
        currentY += (targetY - currentY) * 0.05;
        scrollY += (targetScrollY - scrollY) * 0.08;

        const maxParallax = 120;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? scrollY / totalHeight : 0;
        const scrollOffset = progress * -maxParallax;

        const tiltX = (currentX * -8).toFixed(2);
        const tiltY = (currentY * -6 + scrollOffset).toFixed(2);

        bg.style.transform = `translate3d(${tiltX}px, ${tiltY}px, 0) scale(1.04)`;

        // Snake subtle parallax on scroll: glides naturally with scroll and pointer
        if (snakeContainer && snakeContainer.classList.contains('is-entered')) {
            const snakeScrollShift = -scrollY * 0.28;
            const snakeTiltX = (currentX * 10).toFixed(2);
            const snakeTiltY = (currentY * 8 + snakeScrollShift).toFixed(2);
            snakeContainer.style.transform = `translate3d(${snakeTiltX}px, ${snakeTiltY}px, 0)`;
        }

        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
}

/**
 * Snake Entrance Animation:
 * After user loads the page and sees the topic name and dark background,
 * the snake gracefully slithers into view and moves across the hero stage.
 * [RESTORE NOTE] Previous video froze on ended: snakeVideo.loop = false
 */
function initSnakeEntrance() {
    const snakeContainer = document.getElementById('snake-container');
    const snakeVideo = document.getElementById('snake-video');
    if (!snakeContainer) return;

    if (snakeVideo) {
        snakeVideo.loop = true;
        // Trigger autoplay
        snakeVideo.play().catch(e => console.log('Autoplay handled:', e));
    }

    // Brief delay to allow background & headline to register first
    setTimeout(() => {
        snakeContainer.classList.add('is-entered');
        if (snakeVideo && snakeVideo.paused) {
            snakeVideo.play().catch(e => console.log('Autoplay handled:', e));
        }
    }, 300);
}

/**
 * Subtle Ambient Warm Embers / Fireflies
 * Adds gentle floating golden specks as seen in the reference aesthetic
 */
function initAmbientEmbers() {
    const canvas = document.getElementById('ambient-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }, { passive: true });

    const numParticles = 28;
    const particles = [];

    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            radius: Math.random() * 1.8 + 0.8,
            alpha: Math.random() * 0.55 + 0.15,
            speedY: Math.random() * 0.35 + 0.12,
            speedX: (Math.random() - 0.5) * 0.25,
            pulseSpeed: Math.random() * 0.02 + 0.01,
            pulseVal: Math.random() * Math.PI * 2
        });
    }

    function render() {
        ctx.clearRect(0, 0, w, h);

        for (let i = 0; i < numParticles; i++) {
            const p = particles[i];
            p.y -= p.speedY;
            p.x += p.speedX;
            p.pulseVal += p.pulseSpeed;

            if (p.y < -10) {
                p.y = h + 10;
                p.x = Math.random() * w;
            }
            if (p.x < -10) p.x = w + 10;
            if (p.x > w + 10) p.x = -10;

            const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulseVal));

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(235, 196, 110, ${currentAlpha.toFixed(3)})`;
            ctx.shadowColor = 'rgba(245, 190, 80, 0.7)';
            ctx.shadowBlur = 8;
            ctx.fill();
        }

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

/**
 * Landscape & Crack Takeover Controller:
 * As user scrolls down, Screen 1 (Hero Title & Snake) gracefully fades out and disappears.
/**
 * Section 2: Progressive 2D Layered Landscape Emergence & The Fracture
 * Slowly reveals one by one as the user scrolls:
 * Mountains -> Land -> Trees -> Homes -> The Crack.
 * Plus prepares the foundation for future sections where the crack fills and heals.
 */
function initLandscapeLayerStory() {
    const heroContent = document.querySelector('.hero-content');
    const snakeContainer = document.getElementById('snake-container');
    const landscapeScreen = document.getElementById('landscape-screen');

    const layerMountains = document.getElementById('layer-mountains');
    const layerLand = document.getElementById('layer-land');
    const layerTrees = document.getElementById('layer-trees');
    const layerHomes = document.getElementById('layer-homes');
    const layerCrack = document.getElementById('layer-crack');
    const layerPanorama = document.getElementById('layer-panorama');
    const layersContainer = document.getElementById('landscape-layers-container');
    const layersTopFeather = document.querySelector('.landscape-layers-top-feather');
    const layersBottomFeather = document.querySelector('.landscape-layers-bottom-feather');

    const habitatLeft = document.getElementById('habitat-left');
    const habitatRight = document.getElementById('habitat-right') || document.getElementById('habitat-card');
    const mountainStory = document.getElementById('mountain-story');

    const statBeat1 = document.getElementById('stat-beat-1');
    const statBeat2 = document.getElementById('stat-beat-2');
    const statBeat3 = document.getElementById('stat-beat-3');
    const statBeat4 = document.getElementById('stat-beat-4');
    const statBeat5 = document.getElementById('stat-beat-5');
    const counter58k = document.getElementById('counter-58k');
    const statsScrim = document.getElementById('stats-scrim');
    const paddySceneStage = document.getElementById('paddy-scene-stage');
    const paddyStoryCard = document.getElementById('paddy-story-card');
    const paddyStoryScrim = document.getElementById('paddy-story-scrim');
    const paddySankeyStage = document.getElementById('paddy-sankey-stage');
    const sankeyIframe = document.getElementById('sankey-iframe');

    if (!landscapeScreen || !layerMountains) return;

    // Initial state setup
    layerMountains.style.opacity = '0';
    layerLand.style.opacity = '0';
    layerTrees.style.opacity = '0';
    layerHomes.style.opacity = '0';
    layerCrack.style.opacity = '0';
    layerCrack.style.clipPath = 'inset(0 0 100% 0)';
    if (layerPanorama) layerPanorama.style.opacity = '0';
    if (layersTopFeather) layersTopFeather.style.opacity = '0';
    if (layersBottomFeather) layersBottomFeather.style.opacity = '0';
    if (paddySceneStage) {
        paddySceneStage.style.transform = 'translate3d(0, 100vh, 0)';
        paddySceneStage.style.visibility = 'hidden';
    }
    if (paddyStoryCard) {
        paddyStoryCard.style.opacity = '0';
    }
    if (paddyStoryScrim) {
        paddyStoryScrim.style.opacity = '0';
    }
    if (paddySankeyStage) {
        paddySankeyStage.style.opacity = '0';
        paddySankeyStage.style.pointerEvents = 'none';
    }

    if (statBeat1) statBeat1.style.opacity = '0';
    if (statBeat2) statBeat2.style.opacity = '0';
    if (statBeat3) statBeat3.style.opacity = '0';
    if (statBeat4) statBeat4.style.opacity = '0';
    if (statBeat5) statBeat5.style.opacity = '0';

    // 58,000 Counter Animation Controller
    let counterStarted = false;
    let counterAnimId = null;
    const numFormatter = new Intl.NumberFormat('en-US');

    function start58kCount() {
        if (counterStarted) return;
        counterStarted = true;
        if (counterAnimId) cancelAnimationFrame(counterAnimId);

        const startTime = performance.now();
        const duration = 1000; // ~1 second as requested
        const targetVal = 58000;

        function step(now) {
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / duration);
            // Ease-out cubic for rapid roll and clean landing
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.round(easeOut * targetVal);

            if (counter58k) {
                counter58k.textContent = numFormatter.format(currentVal);
            }

            if (progress < 1) {
                counterAnimId = requestAnimationFrame(step);
            } else {
                if (counter58k) counter58k.textContent = numFormatter.format(targetVal);
                counterAnimId = null;
            }
        }
        counterAnimId = requestAnimationFrame(step);
    }

    function reset58kCount() {
        if (!counterStarted) return;
        counterStarted = false;
        if (counterAnimId) {
            cancelAnimationFrame(counterAnimId);
            counterAnimId = null;
        }
        if (counter58k) {
            counter58k.textContent = "0";
        }
    }

    // Universal Smooth Easing Function (Cosine S-Curve: zero velocity at start and end)
    function smoothEase(t) {
        const clamped = Math.max(0, Math.min(1, t));
        return 0.5 - 0.5 * Math.cos(clamped * Math.PI);
    }

    // Smart Animate Card Engine:
    // Computes organic S-curve easing, smooth vertical float, subtle micro-scale,
    // and gentle optical focus for a uniform, premium editorial feel across all beats.
    function calcCardState(p, start, enterEnd, exitStart, end) {
        if (p < start || p > end) {
            const offY = p < start ? 22 : -18;
            return { opacity: 0, translateY: offY, scale: 0.965, blur: 3.5, visible: false };
        }
        if (p <= enterEnd) {
            const rawT = (p - start) / (enterEnd - start);
            const ease = 0.5 - 0.5 * Math.cos(Math.max(0, Math.min(1, rawT)) * Math.PI);
            return {
                opacity: ease,
                translateY: (1 - ease) * 22,
                scale: 0.965 + ease * 0.035, // 0.965 -> 1.000
                blur: (1 - ease) * 3.5,      // 3.5px -> 0px
                visible: true
            };
        }
        if (p <= exitStart) {
            return {
                opacity: 1,
                translateY: 0,
                scale: 1.0,
                blur: 0,
                visible: true
            };
        }
        const rawT = (p - exitStart) / (end - exitStart);
        const ease = 0.5 - 0.5 * Math.cos(Math.max(0, Math.min(1, rawT)) * Math.PI);
        return {
            opacity: 1 - ease,
            translateY: -ease * 18,
            scale: 1.0 - ease * 0.03, // 1.000 -> 0.970
            blur: ease * 3.5,         // 0px -> 3.5px
            visible: true
        };
    }

    function updateLayersOnScroll() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        // 1. Hero Screen Fade-Out (Screen 1 disappears with smart-animate easing)
        const heroFadeThreshold = windowHeight * 0.55;
        const heroProgress = Math.min(1, Math.max(0, scrollY / heroFadeThreshold));
        const heroEase = smoothEase(heroProgress);

        if (heroContent) {
            heroContent.style.opacity = (1 - heroEase).toFixed(3);
            heroContent.style.transform = `translate3d(0, ${-heroEase * 35}px, 0) scale(${(1 - heroEase * 0.035).toFixed(3)})`;
            heroContent.style.filter = heroEase > 0.05 ? `blur(${(heroEase * 3.0).toFixed(1)}px)` : 'none';
            heroContent.style.pointerEvents = heroProgress > 0.85 ? 'none' : 'auto';
        }

        if (snakeContainer) {
            const snakeOpacity = Math.max(0, 1 - heroEase * 1.3);
            snakeContainer.style.opacity = snakeOpacity.toFixed(3);
            snakeContainer.style.filter = heroEase > 0.05 ? `blur(${(heroEase * 2.5).toFixed(1)}px)` : 'none';
            snakeContainer.style.pointerEvents = snakeOpacity < 0.15 ? 'none' : 'auto';
        }

        // 2. Section 2 Sticky Scroll Progress (0.0 to 1.0)
        const rect = landscapeScreen.getBoundingClientRect();
        const totalScrollRange = landscapeScreen.offsetHeight - windowHeight;

        let progress = 0;
        if (rect.top <= 0) {
            progress = Math.min(1, Math.max(0, -rect.top / totalScrollRange));
        }

        // Mountain entry right as hero starts fading
        const mountainEntry = smoothEase(Math.max(0, (scrollY - windowHeight * 0.25) / (windowHeight * 0.35)));

        // ============================================================
        // "DIP TO DARK" TRANSITION: Layers → Panorama
        // Eased scrim fade in and fade out with soft cross-dissolve
        // Transition window: progress 0.44 → 0.52
        // ============================================================
        const SWAP_START = 0.44;
        const SWAP_MID   = 0.48;
        const SWAP_END   = 0.52;

        let transitionScrimOp = 0;
        if (progress >= SWAP_START && progress < SWAP_MID) {
            transitionScrimOp = smoothEase((progress - SWAP_START) / (SWAP_MID - SWAP_START));
        } else if (progress >= SWAP_MID && progress < SWAP_END) {
            transitionScrimOp = smoothEase(1 - (progress - SWAP_MID) / (SWAP_END - SWAP_MID));
        }

        // Soft smooth dissolve during the darkest point of the transition
        let layersAlpha = 1;
        let panoAlpha = 0;
        if (progress < 0.46) {
            layersAlpha = 1;
            panoAlpha = 0;
        } else if (progress <= 0.50) {
            const swapT = smoothEase((progress - 0.46) / 0.04);
            layersAlpha = 1 - swapT;
            panoAlpha = swapT;
        } else {
            layersAlpha = 0;
            panoAlpha = 1;
        }

        // Phase 1: Mountains (progress 0.00 -> 0.08)
        const mountainOp = Math.max(mountainEntry, smoothEase(progress / 0.08));
        layerMountains.style.opacity = (mountainOp * layersAlpha).toFixed(3);

        // Mountain Narrative Statement (Unified Smart Animate)
        const mCard = calcCardState(progress, 0.015, 0.050, 0.085, 0.115);
        if (mountainStory) {
            mountainStory.style.opacity = mCard.opacity.toFixed(3);
            mountainStory.style.transform = `translate(-50%, calc(-50% + ${mCard.translateY.toFixed(1)}px)) scale(${mCard.scale.toFixed(3)})`;
            mountainStory.style.filter = mCard.blur > 0.2 ? `blur(${mCard.blur.toFixed(1)}px)` : 'none';
            mountainStory.style.pointerEvents = mCard.opacity > 0.5 ? 'auto' : 'none';
        }

        // Phase 2: Land (progress 0.08 -> 0.17)
        const landOp = smoothEase((progress - 0.08) / 0.07);
        layerLand.style.opacity = (landOp * layersAlpha).toFixed(3);

        // Phase 3: Trees (progress 0.17 -> 0.26)
        const treesOp = smoothEase((progress - 0.17) / 0.07);
        layerTrees.style.opacity = (treesOp * layersAlpha).toFixed(3);

        // Phase 4: Homes (progress 0.26 -> 0.35)
        const homesOp = smoothEase((progress - 0.26) / 0.07);
        layerHomes.style.opacity = (homesOp * layersAlpha).toFixed(3);

        // Phase 5: The Crack (progress 0.35 -> 0.45)
        const crackProgress = smoothEase((progress - 0.35) / 0.09);
        const crackBaseOp = crackProgress > 0.02 ? 1 : 0;
        layerCrack.style.opacity = (crackBaseOp * layersAlpha).toFixed(3);
        layerCrack.style.clipPath = `inset(0 0 ${(1 - crackProgress) * 100}% 0)`;

        // Split Editorial Story Text reveal across the Divide (Unified Smart Animate)
        const divCard = calcCardState(progress, 0.365, 0.395, 0.420, 0.445);
        if (habitatLeft) {
            habitatLeft.style.opacity = divCard.opacity.toFixed(3);
            habitatLeft.style.transform = `translate3d(0, ${divCard.translateY.toFixed(1)}px, 0) scale(${divCard.scale.toFixed(3)})`;
            habitatLeft.style.filter = divCard.blur > 0.2 ? `blur(${divCard.blur.toFixed(1)}px)` : 'none';
            habitatLeft.style.pointerEvents = divCard.opacity > 0.5 ? 'auto' : 'none';
        }
        if (habitatRight) {
            habitatRight.style.opacity = divCard.opacity.toFixed(3);
            habitatRight.style.transform = `translate3d(0, ${divCard.translateY.toFixed(1)}px, 0) scale(${divCard.scale.toFixed(3)})`;
            habitatRight.style.filter = divCard.blur > 0.2 ? `blur(${divCard.blur.toFixed(1)}px)` : 'none';
            habitatRight.style.pointerEvents = divCard.opacity > 0.5 ? 'auto' : 'none';
        }

        // Phase 6: Panorama smooth blend at swap point
        if (layerPanorama) {
            layerPanorama.style.opacity = panoAlpha.toFixed(3);
            if (layersTopFeather) layersTopFeather.style.opacity = panoAlpha.toFixed(3);
            if (layersBottomFeather) layersBottomFeather.style.opacity = panoAlpha.toFixed(3);
        }

        // Phase 7: Camera Descent Pan into Valley (progress 0.50 -> 0.80)
        let panY = 0;
        if (progress > 0.50) {
            const descentProgress = Math.min(1, Math.max(0, (progress - 0.50) / 0.30));
            const easeDescent = 0.5 - 0.5 * Math.cos(descentProgress * Math.PI);
            const maxPanY = Math.max(0, layersContainer.offsetHeight - windowHeight);
            panY = easeDescent * maxPanY;
        }
        if (layersContainer && progress < 0.875) {
            layersContainer.style.transform = `translate3d(0, ${-panY.toFixed(1)}px, 0)`;
            layersContainer.style.opacity = '1';
            layersContainer.style.filter = 'none';
            layersContainer.style.visibility = 'visible';
        }

        // Phase 8: Center-Aligned Scrollytelling Data Beats (Unified Smart Animate)
        // Beat 1: Scale & 1 in 2 Donut Gauge (progress 0.50 -> 0.59)
        const b1 = calcCardState(progress, 0.50, 0.53, 0.565, 0.595);
        if (statBeat1) {
            statBeat1.style.opacity = b1.opacity.toFixed(3);
            statBeat1.style.transform = `translate(-50%, calc(-50% + ${b1.translateY.toFixed(1)}px)) scale(${b1.scale.toFixed(3)})`;
            statBeat1.style.filter = b1.blur > 0.2 ? `blur(${b1.blur.toFixed(1)}px)` : 'none';
            statBeat1.style.pointerEvents = b1.opacity > 0.5 ? 'auto' : 'none';
        }

        // Beat 2: 58,000 Lives Lost Counter (progress 0.585 -> 0.675)
        const b2 = calcCardState(progress, 0.585, 0.615, 0.645, 0.675);
        if (statBeat2) {
            statBeat2.style.opacity = b2.opacity.toFixed(3);
            statBeat2.style.transform = `translate(-50%, calc(-50% + ${b2.translateY.toFixed(1)}px)) scale(${b2.scale.toFixed(3)})`;
            statBeat2.style.filter = b2.blur > 0.2 ? `blur(${b2.blur.toFixed(1)}px)` : 'none';
            statBeat2.style.pointerEvents = b2.opacity > 0.5 ? 'auto' : 'none';

            if (b2.opacity > 0.3) {
                start58kCount();
            }
        }
        if (progress < 0.55) {
            reset58kCount();
        }

        // Beat 3: 6 Deaths Every Hour (progress 0.665 -> 0.755)
        const b3 = calcCardState(progress, 0.665, 0.695, 0.725, 0.755);
        if (statBeat3) {
            statBeat3.style.opacity = b3.opacity.toFixed(3);
            statBeat3.style.transform = `translate(-50%, calc(-50% + ${b3.translateY.toFixed(1)}px)) scale(${b3.scale.toFixed(3)})`;
            statBeat3.style.filter = b3.blur > 0.2 ? `blur(${b3.blur.toFixed(1)}px)` : 'none';
            statBeat3.style.pointerEvents = b3.opacity > 0.5 ? 'auto' : 'none';
        }

        // Beat 4: Mortality Chart (progress 0.745 -> 0.845)
        const mortalityIframe = document.getElementById('mortality-iframe');
        const b4 = calcCardState(progress, 0.745, 0.775, 0.815, 0.845);
        if (statBeat4) {
            statBeat4.style.opacity = b4.opacity.toFixed(3);
            statBeat4.style.transform = `translate(-50%, calc(-50% + ${b4.translateY.toFixed(1)}px)) scale(${b4.scale.toFixed(3)})`;
            statBeat4.style.filter = b4.blur > 0.2 ? `blur(${b4.blur.toFixed(1)}px)` : 'none';
            statBeat4.style.pointerEvents = b4.opacity > 0.5 ? 'auto' : 'none';

            // Trigger chart bar animation when it first becomes visible
            if (b4.opacity > 0.4 && mortalityIframe && !statBeat4._chartTriggered) {
                statBeat4._chartTriggered = true;
                try {
                    mortalityIframe.contentWindow.postMessage('animateChart', '*');
                } catch (e) { }
            }
        }
        if (progress < 0.70 && statBeat4) {
            statBeat4._chartTriggered = false;
        }

        // Beat 5: Natural Disaster Comparison (progress 0.835 -> 0.885)
        const b5 = calcCardState(progress, 0.835, 0.855, 0.870, 0.885);
        if (statBeat5) {
            statBeat5.style.opacity = b5.opacity.toFixed(3);
            statBeat5.style.transform = `translate(-50%, calc(-50% + ${b5.translateY.toFixed(1)}px)) scale(${b5.scale.toFixed(3)})`;
            statBeat5.style.filter = b5.blur > 0.2 ? `blur(${b5.blur.toFixed(1)}px)` : 'none';
            statBeat5.style.pointerEvents = b5.opacity > 0.5 ? 'auto' : 'none';
        }

        // Phase 8.5: Paddy Field Encounter Scene - Smooth Cinematic Cross-Dissolve & Parallax Float with Motion Blur
        // 1. FIRST: Outgoing landscape dissolves softly upward; paddy scene glides in gracefully (progress 0.875 -> 0.910)
        // Stays bright and unobstructed from 0.910 to 0.922 so the viewer absorbs the scene in full clarity
        if (progress < 0.875) {
            if (layersContainer) {
                layersContainer.style.transform = `translate3d(0, ${-panY.toFixed(1)}px, 0)`;
                layersContainer.style.opacity = '1';
                layersContainer.style.filter = 'none';
                layersContainer.style.visibility = 'visible';
            }
            if (paddySceneStage) {
                paddySceneStage.style.transform = `translate3d(0, ${windowHeight * 0.16}px, 0)`;
                paddySceneStage.style.opacity = '0';
                paddySceneStage.style.filter = 'none';
                paddySceneStage.style.visibility = 'hidden';
                paddySceneStage.style.pointerEvents = 'none';
            }
        } else if (progress <= 0.910) {
            const t = (progress - 0.875) / 0.035; // 0.0 -> 1.0 (relaxed, silky smooth transition)
            const easeT = 0.5 - 0.5 * Math.cos(t * Math.PI); // Cosine ease for organic acceleration & deceleration

            // Optical motion blur that peaks dynamically at mid-transition (~6.5px) and clears to 0
            const motionBlur = (Math.sin(t * Math.PI) * 6.5).toFixed(1);

            // Outgoing landscape gently dissolves, drifts upward, and softly blurs
            if (layersContainer) {
                layersContainer.style.opacity = (1 - easeT).toFixed(3);
                layersContainer.style.transform = `translate3d(0, ${(-panY - easeT * 60).toFixed(1)}px, 0)`;
                layersContainer.style.filter = motionBlur > 0.2 ? `blur(${motionBlur}px)` : 'none';
                layersContainer.style.visibility = easeT < 1 ? 'visible' : 'hidden';
            }

            // Incoming paddy scene fades in, floats up from a gentle +16vh offset, and clarifies as motion settles
            if (paddySceneStage) {
                const glideY = (1 - easeT) * (windowHeight * 0.16);
                paddySceneStage.style.opacity = easeT.toFixed(3);
                paddySceneStage.style.transform = `translate3d(0, ${glideY.toFixed(1)}px, 0)`;
                paddySceneStage.style.filter = motionBlur > 0.2 ? `blur(${motionBlur}px)` : 'none';
                paddySceneStage.style.visibility = 'visible';
                paddySceneStage.style.pointerEvents = easeT > 0.8 ? 'auto' : 'none';
            }
        } else {
            // Settled in full view - pristine optical sharpness
            if (layersContainer) {
                layersContainer.style.opacity = '0';
                layersContainer.style.filter = 'none';
                layersContainer.style.visibility = 'hidden';
            }
            if (paddySceneStage) {
                paddySceneStage.style.opacity = '1';
                paddySceneStage.style.transform = 'translate3d(0, 0, 0)';
                paddySceneStage.style.filter = 'none';
                paddySceneStage.style.visibility = 'visible';
                paddySceneStage.style.pointerEvents = 'auto';
            }
        }

        // 2. THEN: It gets darker where the text has to appear (scrim fades in 0.922 -> 0.934)
        const scrimFade = calcCardState(progress, 0.922, 0.934, 0.958, 0.968);

        // 3. AND THEN: Text appears into the center of the darkened area (fades in 0.930 -> 0.938)
        // Phase 9: Beat 6 - Pathways Narrative Text ("For every 100 snakebites, 21 lives are lost...")
        const b6 = calcCardState(progress, 0.930, 0.938, 0.954, 0.962);
        if (paddyStoryCard) {
            paddyStoryCard.style.opacity = b6.opacity.toFixed(3);
            paddyStoryCard.style.transform = `translateY(${b6.translateY.toFixed(1)}px) scale(${b6.scale.toFixed(3)})`;
            paddyStoryCard.style.filter = b6.blur > 0.2 ? `blur(${b6.blur.toFixed(1)}px)` : 'none';
            paddyStoryCard.style.pointerEvents = b6.opacity > 0.5 ? 'auto' : 'none';
        }

        // Phase 10: Beat 7 - Pure Animated Sankey Diagram Overlay
        // Appears smoothly as Beat 6 fades out (progress 0.962 -> 1.00)
        const b7 = calcCardState(progress, 0.962, 0.970, 1.0, 1.0);
        if (paddySankeyStage) {
            paddySankeyStage.style.opacity = b7.opacity.toFixed(3);
            paddySankeyStage.style.transform = `translateY(${b7.translateY.toFixed(1)}px) scale(${b7.scale.toFixed(3)})`;
            paddySankeyStage.style.filter = b7.blur > 0.2 ? `blur(${b7.blur.toFixed(1)}px)` : 'none';
            paddySankeyStage.style.pointerEvents = b7.opacity > 0.5 ? 'auto' : 'none';

            // Auto-trigger Sankey animation when card becomes visible
            if (b7.opacity > 0.35 && sankeyIframe && !paddySankeyStage._sankeyTriggered) {
                paddySankeyStage._sankeyTriggered = true;
                try {
                    sankeyIframe.contentWindow.postMessage('playSankey', '*');
                } catch (e) { }
            }
        }
        if (progress < 0.955 && paddySankeyStage) {
            paddySankeyStage._sankeyTriggered = false;
        }

        // Paddy scene blackout scrim (darkens underlying image to ~20-30% opacity where text appears)
        if (paddyStoryScrim) {
            const paddyScrim = Math.max(scrimFade.opacity * 0.80, b7.opacity * 0.72);
            paddyStoryScrim.style.opacity = paddyScrim.toFixed(3);
        }

        // Soft Atmosphere Scrim:
        // Combines the dip-to-dark transition scrim with the data beat scrims.
        // Fades out naturally during the transition (0.875 -> 0.900) instead of an abrupt cutoff
        const statsActiveOp = Math.max(b1.opacity, b2.opacity, b3.opacity);
        const chartOp = b4 ? b4.opacity : 0;
        const disasterOp = b5 ? b5.opacity : 0;
        const dataScrimOp = Math.max(statsActiveOp * 0.85, chartOp * 0.89, disasterOp * 0.78);
        const fadeMultiplier = progress < 0.875 ? 1 : Math.max(0, 1 - (progress - 0.875) / 0.025);
        const scrimOp = Math.max(transitionScrimOp, dataScrimOp) * fadeMultiplier;
        if (statsScrim) {
            statsScrim.style.opacity = scrimOp.toFixed(3);
        }
    }

    window.addEventListener('scroll', updateLayersOnScroll, { passive: true });
    updateLayersOnScroll();

    // Global harmony/healing API for future chapters where the crack fills up
    window.setCrackHealingState = function (fillPercentage) {
        const health = Math.min(100, Math.max(0, fillPercentage)) / 100;
        if (!layerCrack) return;
        layerCrack.style.opacity = (1 - health).toFixed(3);
        layerCrack.style.filter = `drop-shadow(0 0 ${15 * (1 - health)}px rgba(239, 68, 68, 0.65)) hue-rotate(${health * 100}deg)`;
    };

    // Auto-trigger Counterfactual Sankey when scrolled into view
    const counterfactualStage = document.getElementById('counterfactual-stage');
    const counterfactualIframe = document.getElementById('counterfactual-iframe');

    if (counterfactualStage && counterfactualIframe) {
        let counterfactualTriggered = false;

        const cfObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.20) {
                    if (!counterfactualTriggered) {
                        counterfactualTriggered = true;
                        try {
                            counterfactualIframe.contentWindow.postMessage('playCounterfactual', '*');
                        } catch (e) {}
                    }
                } else if (!entry.isIntersecting) {
                    counterfactualTriggered = false;
                }
            });
        }, { threshold: [0.1, 0.25, 0.5] });

        cfObserver.observe(counterfactualStage);
    }
}
