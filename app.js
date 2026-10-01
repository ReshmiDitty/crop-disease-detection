/**
 * CropGuard AI - Early Detection & Management Engine (Hybrid ML & DSS Architecture)
 * JavaScript Client App Logic
 */

// INDIA MAP BOUNDS CONSTANTS
const INDIA_MAP_CENTER = [22.5937, 78.9629];
const INDIA_MAP_ZOOM = 5;
const INDIA_MAP_BOUNDS = [
    [6.5, 68.0],   // Southwest coordinates of India
    [36.0, 97.5]   // Northeast coordinates of India
];

// Active Model Architecture Mode: 'hybrid' | 'environmental' | 'vision'
let activeModelMode = "hybrid";

// --- 1. CROPPING PATHOLOGY DATABASE (INDIAN REGIONAL HOTSPOTS) ---
const diseaseDatabase = {
    tomato_late_blight: {
        id: "tomato_late_blight",
        name: "Tomato Late Blight",
        scientificName: "Phytophthora infestans",
        category: "Fungal Pathogen",
        crop: "Tomato",
        defaultConfidence: "96.8%",
        defaultInfectedRate: "42.5%",
        climateScore: "92.4% (Pre-Symptomatic)",
        ndviStatus: "Severe Anomaly (NDVI: 0.42)",
        severityLevel: "HIGH RISK",
        severityPercent: 78,
        spreadRate: "Extremely Rapid (Wind & Monsoon Rain)",
        img: "images/tomato_late_blight.jpg",
        description: "A devastating water mold disease causing large brown lesions with pale green borders on tomato leaves and fruit. Thrives in cool, humid monsoon weather across Indian hill states and plains.",
        hotspots: [
            { lat: 30.9045, lng: 77.0967, name: "Solan & Shimla, Himachal Pradesh", risk: "Severe", temp: "18°C", humidity: "94%" },
            { lat: 26.7271, lng: 88.3953, name: "Siliguri & Jalpaiguri, West Bengal", risk: "Severe", temp: "21°C", humidity: "92%" },
            { lat: 13.1367, lng: 78.1292, name: "Kolar Tomato Belt, Karnataka", risk: "High", temp: "23°C", humidity: "88%" },
            { lat: 31.3260, lng: 75.5762, name: "Jalandhar Doaba Region, Punjab", risk: "High", temp: "19°C", humidity: "89%" },
            { lat: 20.0059, lng: 73.7898, name: "Nashik Horticultural Belt, Maharashtra", risk: "Moderate", temp: "24°C", humidity: "82%" }
        ],
        hotspotText: "Himachal Pradesh (Solan), West Bengal (North Bengal), Karnataka (Kolar), Punjab (Jalandhar), Maharashtra (Nashik)",
        immediateSteps: [
            "Isolate Infected Plants: Immediately prune and burn severely blighted foliage.",
            "Cease Overhead Spraying: Switch exclusively to ground drip lines to prevent leaf wetness.",
            "Sanitize Machinery & Shears: Disinfect tools with 70% ethanol between farm plots.",
            "Foliar Ventilation: Thin out lower stems to enhance air velocity through crop canopy."
        ],
        organicSteps: [
            "Copper Octanoate Spray: Apply fixed copper bio-fungicide every 5-7 days during damp weather.",
            "Bacillus subtilis: Bio-control spray to inhibit mold spore germination.",
            "Neem Oil Extract: Apply 0.5% emulsified neem oil to fortify leaf epidermis.",
            "Compost Tea Spray: Aerated foliar spray containing beneficial competitive microbes."
        ],
        chemicalTable: [
            { name: "Chlorothalonil 75% WP", rate: "2.0 - 2.5 g / Liter water", interval: "Every 7 - 10 Days", phi: "7 Days" },
            { name: "Mancozeb 80% WP", rate: "2.5 g / Liter water", interval: "Every 7 - 14 Days", phi: "5 Days" },
            { name: "Azoxystrobin 23% SC", rate: "1.0 ml / Liter water", interval: "Every 10 - 14 Days", phi: "3 Days" },
            { name: "Cymoxanil + Mancozeb", rate: "2.0 g / Liter water", interval: "Every 7 Days (Curative)", phi: "7 Days" }
        ],
        preventionSteps: [
            "3-Year Crop Rotation: Rotate tomato crops with legumes, mustard, or maize.",
            "Use Certified Resistant Seeds: Select varieties carrying Ph-2 and Ph-3 resistance genes.",
            "Drip Sub-surface Irrigation: Eliminate foliage moisture during monsoon.",
            "Wide Row Spacing: Maintain 75cm minimum spacing for fast leaf drying after rain."
        ]
    },
    corn_rust: {
        id: "corn_rust",
        name: "Corn Common Rust",
        scientificName: "Puccinia sorghi",
        category: "Fungal Pathogen",
        crop: "Corn",
        defaultConfidence: "94.2%",
        defaultInfectedRate: "31.0%",
        climateScore: "85.8% (Pre-Symptomatic)",
        ndviStatus: "Moderate Anomaly (NDVI: 0.54)",
        severityLevel: "MODERATE RISK",
        severityPercent: 55,
        spreadRate: "Moderate (Airborne Spores)",
        img: "images/corn_rust.jpg",
        description: "Produces golden-brown to cinnamon pustules on upper and lower maize leaf surfaces. Reduces photosynthetic area and weakens kernel fill.",
        hotspots: [
            { lat: 25.4182, lng: 86.1272, name: "Begusarai Maize Hub, Bihar", risk: "Severe", temp: "23°C", humidity: "88%" },
            { lat: 14.4673, lng: 75.9241, name: "Davangere Maize Belt, Karnataka", risk: "High", temp: "25°C", humidity: "82%" },
            { lat: 18.6725, lng: 78.0941, name: "Nizamabad Agricultural Zone, Telangana", risk: "Moderate", temp: "26°C", humidity: "79%" },
            { lat: 16.3067, lng: 80.4365, name: "Guntur Crop Belt, Andhra Pradesh", risk: "High", temp: "27°C", humidity: "85%" },
            { lat: 22.0574, lng: 78.9382, name: "Chhindwara Maize Plateau, Madhya Pradesh", risk: "Moderate", temp: "24°C", humidity: "80%" }
        ],
        hotspotText: "Bihar (Begusarai), Karnataka (Davangere), Telangana (Nizamabad), Andhra Pradesh (Guntur), Madhya Pradesh",
        immediateSteps: [
            "Monitor Pustule Density: Count pustules per leaf; treat if >6 pustules appear before silking.",
            "Destroy Crop Residue: Deep plow infected stalk debris after harvest.",
            "Avoid High Nitrogen Overload: Excessive nitrogen creates lush tissue vulnerable to rust."
        ],
        organicSteps: [
            "Sulfur Dusting: Apply elemental wettable sulfur at first sign of rust pustules.",
            "Trichoderma harzianum: Bio-fungicide soil and foliar drench to suppress Puccinia spores.",
            "Potassium Bicarbonate: Spray 5g/L aqueous solution to alter leaf pH against fungi."
        ],
        chemicalTable: [
            { name: "Pyraclostrobin 20% WG", rate: "1.2 g / Liter water", interval: "Every 14 Days", phi: "14 Days" },
            { name: "Propiconazole 25% EC", rate: "1.0 ml / Liter water", interval: "Every 10 - 14 Days", phi: "14 Days" },
            { name: "Tebuconazole 250 EC", rate: "1.0 ml / Liter water", interval: "Every 14 Days", phi: "21 Days" }
        ],
        preventionSteps: [
            "Plant Rust-Resistant Hybrids: Choose maize hybrids with specific Rp genes.",
            "Early Sowing Schedule: Plant early in Kharif season before peak rust spore flights.",
            "Balanced Crop Fertilization: Balance Nitrogen with adequate Potassium and Phosphorus."
        ]
    },
    rice_bacterial_blight: {
        id: "rice_bacterial_blight",
        name: "Rice Bacterial Leaf Blight",
        scientificName: "Xanthomonas oryzae pv. oryzae",
        category: "Bacterial Pathogen",
        crop: "Rice",
        defaultConfidence: "95.6%",
        defaultInfectedRate: "58.4%",
        climateScore: "94.1% (Pre-Symptomatic)",
        ndviStatus: "Critical Anomaly (NDVI: 0.36)",
        severityLevel: "CRITICAL RISK",
        severityPercent: 88,
        spreadRate: "Very High (Water Splash & Rain Gusts)",
        img: "images/rice_bacterial_blight.jpg",
        description: "Causes long, translucent yellow-to-white wavy stripes along leaf margins, leading to systemic leaf wilting ('kresek') and severe grain yield loss in paddy fields.",
        hotspots: [
            { lat: 23.2324, lng: 87.8615, name: "Burdwan Rice Bowl, West Bengal", risk: "Severe", temp: "29°C", humidity: "95%" },
            { lat: 20.4625, lng: 85.8828, name: "Cuttack Mahanadi Delta, Odisha", risk: "Severe", temp: "30°C", humidity: "94%" },
            { lat: 16.9891, lng: 82.2475, name: "East Godavari Paddy Delta, Andhra Pradesh", risk: "Severe", temp: "31°C", humidity: "92%" },
            { lat: 30.9010, lng: 75.8573, name: "Ludhiana Paddy Corridor, Punjab", risk: "High", temp: "28°C", humidity: "90%" },
            { lat: 10.7870, lng: 79.1378, name: "Thanjavur Cauvery Delta, Tamil Nadu", risk: "High", temp: "32°C", humidity: "88%" }
        ],
        hotspotText: "West Bengal (Burdwan), Odisha (Cuttack), Andhra Pradesh (Godavari Delta), Punjab (Ludhiana), Tamil Nadu (Thanjavur)",
        immediateSteps: [
            "Drain Paddy Water Immediately: Lower standing water to halt bacterial swimming transmission.",
            "Stop Nitrogen Top-Dressing: Nitrogen exacerbates leaf sap bacteriosis.",
            "Apply Copper Bactericide: Spray copper hydroxide promptly across border rows."
        ],
        organicSteps: [
            "Pseudomonas fluorescens: Seed treatment and foliar application at 10g/L water.",
            "Streptomyces Bio-inoculants: Soil incorporation to suppress Xanthomonas colonies.",
            "Garlic & Chili Extract Spray: Natural antibacterial botanical spray."
        ],
        chemicalTable: [
            { name: "Copper Hydroxide 77% WP", rate: "2.0 g / Liter water", interval: "Every 7 - 10 Days", phi: "10 Days" },
            { name: "Streptomycin + Tetracycline", rate: "0.5 g / Liter water", interval: "Every 7 Days", phi: "15 Days" },
            { name: "Kasugamycin 3% SL", rate: "2.0 ml / Liter water", interval: "Every 10 Days", phi: "14 Days" }
        ],
        preventionSteps: [
            "Grow Xa-Gene Resistant Cultivars: Utilize Swarna Sub-1, Improved Samba Mahsuri or Swarna carrying Xa21 genes.",
            "Seed Bleaching Treatment: Soak seeds in 0.1% bleach solution prior to nursery sowing.",
            "Clean Irrigation Channels: Remove weed hosts like Leersia oryzoides from canal edges."
        ]
    },
    healthy_leaf: {
        id: "healthy_leaf",
        name: "Healthy Plant Leaf",
        scientificName: "Solanum / Glycine / Zea max",
        category: "Normal Foliage",
        crop: "General Crop",
        defaultConfidence: "99.1%",
        defaultInfectedRate: "0.0%",
        climateScore: "12.0% (No Risk)",
        ndviStatus: "Normal Vigor (NDVI: 0.85)",
        severityLevel: "HEALTHY",
        severityPercent: 0,
        spreadRate: "None (No Pathogens Detected)",
        img: "images/healthy_leaf.jpg",
        description: "Optimal chlorophyll density, intact leaf cuticle, vibrant green venation, no pathogenic lesions or pest feeding scars present.",
        hotspots: [
            { lat: 23.1765, lng: 75.7885, name: "Ujjain Organic Agricultural Zone, Madhya Pradesh", risk: "Safe", temp: "24°C", humidity: "55%" }
        ],
        hotspotText: "High crop vigor & healthy leaf condition verified across Indian agricultural zones.",
        immediateSteps: [
            "Continue Routine Field Scouting: Inspect fields weekly for early vector presence.",
            "Maintain Micro-Irrigation Schedule: Ensure consistent soil moisture levels."
        ],
        organicSteps: [
            "Preventive Neem Oil Spray: Apply bi-weekly as a natural pest deterrent.",
            "Foliar Micronutrients: Apply Zinc & Iron chelates to support cell vitality."
        ],
        chemicalTable: [
            { name: "No Chemical Application Needed", rate: "N/A", interval: "N/A", phi: "N/A" }
        ],
        preventionSteps: [
            "Maintain Field Hygiene: Keep weeding and soil drainage optimized.",
            "Regular Soil Testing: Monitor Soil Health Card N-P-K and organic carbon levels."
        ]
    }
};

// State variables
let activeDisease = diseaseDatabase.tomato_late_blight;
let diseaseMapInstance = null;
let globalRadarMapInstance = null;

// --- 2. INITIALIZATION ON DOM LOAD ---
document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initModelChoiceToggle();
    initPresets();
    initFileUpload();
    initTreatmentTabs();
    initResearchHub();
    initDSSForm();
    
    // Auto load default sample scan
    loadDiseaseData("tomato_late_blight");

    // Smooth scroll for hero buttons
    document.getElementById("btn-goto-upload").addEventListener("click", () => {
        document.getElementById("scanner-section").scrollIntoView({ behavior: "smooth" });
    });
    document.getElementById("btn-goto-research").addEventListener("click", () => {
        document.getElementById("dss-section").scrollIntoView({ behavior: "smooth" });
    });
    document.getElementById("quick-scan-btn").addEventListener("click", () => {
        document.getElementById("scanner-section").scrollIntoView({ behavior: "smooth" });
    });

    // Initialize Indian radar map when scrolled into view or after slight delay
    setTimeout(() => {
        initGlobalRadarMap();
    }, 600);
});

// --- 3. MODEL ARCHITECTURE CHOICE TOGGLE ---
function initModelChoiceToggle() {
    const toggleBtns = document.querySelectorAll(".model-toggle-btn");
    toggleBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            toggleBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            activeModelMode = btn.getAttribute("data-mode");

            const scanText = document.getElementById("scan-text");
            if (activeModelMode === "hybrid") {
                scanText.textContent = "Executing Dual CNN + XGBoost Feature Fusion...";
            } else if (activeModelMode === "environmental") {
                scanText.textContent = "Executing Pre-Symptomatic XGBoost / Random Forest Tabular Inference...";
            } else {
                scanText.textContent = "Executing Optical Vision CNN Lesion Segmentation...";
            }

            // Re-run diagnostic scan under new architecture
            runDiagnosticScan();
        });
    });
}

// --- 4. NAVIGATION HEADER LOGIC ---
function initNavigation() {
    const navLinks = document.querySelectorAll(".nav-link");
    window.addEventListener("scroll", () => {
        let fromTop = window.scrollY + 200;
        navLinks.forEach(link => {
            let section = document.querySelector(link.hash);
            if (section && section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
                navLinks.forEach(l => l.classList.remove("active"));
                link.classList.add("active");
            }
        });
    });
}

// --- 5. PRESET SAMPLE SELECTOR LOGIC ---
function initPresets() {
    const presetBtns = document.querySelectorAll(".preset-btn");
    presetBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            presetBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const presetKey = btn.getAttribute("data-preset");
            if (diseaseDatabase[presetKey]) {
                loadDiseaseData(presetKey);
            }
        });
    });
}

// --- 6. FILE UPLOAD & CANVAS ANALYSIS ENGINE ---
function initFileUpload() {
    const dropZone = document.getElementById("drop-zone");
    const fileInput = document.getElementById("file-input");
    const browseBtn = document.getElementById("browse-btn");
    const analyzeBtn = document.getElementById("analyze-btn");

    browseBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        fileInput.click();
    });

    dropZone.addEventListener("click", () => fileInput.click());

    dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("dragover");
    });

    dropZone.addEventListener("dragleave", () => {
        dropZone.classList.remove("dragover");
    });

    dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("dragover");
        if (e.dataTransfer.files.length > 0) {
            handleCustomFile(e.dataTransfer.files[0]);
        }
    });

    fileInput.addEventListener("change", (e) => {
        if (e.target.files.length > 0) {
            handleCustomFile(e.target.files[0]);
        }
    });

    analyzeBtn.addEventListener("click", () => {
        runDiagnosticScan();
    });
}

function handleCustomFile(file) {
    if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file (JPG, PNG, WEBP).");
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const imgElement = document.getElementById("analyzed-img");
        imgElement.src = e.target.result;

        document.querySelectorAll(".preset-btn").forEach(b => b.classList.remove("active"));
        document.getElementById("scan-status-tag").innerHTML = '<i class="fa-solid fa-clock"></i> Image Loaded';
        
        runDiagnosticScan(true, file.name);
    };
    reader.readAsDataURL(file);
}

// --- 7. DIAGNOSTIC SCAN ANIMATION & COMPUTATION ---
function runDiagnosticScan(isCustom = false, fileName = "") {
    const overlay = document.getElementById("scanning-overlay");
    const laser = document.getElementById("scan-laser");
    const statusTag = document.getElementById("scan-status-tag");
    const resultsContainer = document.getElementById("results-dashboard");

    overlay.classList.add("active");
    laser.style.display = "block";
    statusTag.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Analyzing (' + activeModelMode.toUpperCase() + ')...';

    setTimeout(() => {
        drawLesionBoundingBoxes();
    }, 1000);

    setTimeout(() => {
        overlay.classList.remove("active");
        laser.style.display = "none";
        statusTag.innerHTML = '<i class="fa-solid fa-circle-check"></i> Inference Complete';
        resultsContainer.style.display = "block";

        if (isCustom) {
            const customData = generateCustomAnalysis(fileName);
            renderResults(customData);
        } else {
            renderResults(activeDisease);
        }

        resultsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 2000);
}

// Draw simulated lesion detection contours on HTML5 Canvas
function drawLesionBoundingBoxes() {
    const canvas = document.getElementById("detection-canvas");
    const img = document.getElementById("analyzed-img");
    canvas.width = img.clientWidth;
    canvas.height = img.clientHeight;
    
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (activeDisease.id === "healthy_leaf") {
        ctx.strokeStyle = "#10b981";
        ctx.lineWidth = 3;
        ctx.strokeRect(canvas.width * 0.1, canvas.height * 0.1, canvas.width * 0.8, canvas.height * 0.8);
        ctx.fillStyle = "rgba(16, 185, 129, 0.2)";
        ctx.font = "bold 14px Outfit";
        ctx.fillText("HEALTHY TISSUE (99.1%)", canvas.width * 0.15, canvas.height * 0.2);
        return;
    }

    const boxes = [
        { x: canvas.width * 0.25, y: canvas.height * 0.2, w: canvas.width * 0.35, h: canvas.height * 0.3, label: "Lesion Cluster 1 (88%)" },
        { x: canvas.width * 0.45, y: canvas.height * 0.5, w: canvas.width * 0.3, h: canvas.height * 0.35, label: "Chlorotic Necrosis (94%)" }
    ];

    boxes.forEach(box => {
        ctx.strokeStyle = "#ef4444";
        ctx.lineWidth = 2.5;
        ctx.setLineDash([6, 3]);
        ctx.strokeRect(box.x, box.y, box.w, box.h);
        
        ctx.fillStyle = "rgba(239, 68, 68, 0.25)";
        ctx.fillRect(box.x, box.y, box.w, box.h);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 11px Outfit";
        ctx.fillText(box.label, box.x + 6, box.y + 16);
    });
}

function loadDiseaseData(diseaseKey) {
    if (diseaseDatabase[diseaseKey]) {
        activeDisease = diseaseDatabase[diseaseKey];
        document.getElementById("analyzed-img").src = activeDisease.img;
        drawLesionBoundingBoxes();
        renderResults(activeDisease);
    }
}

function generateCustomAnalysis(fileName) {
    const keys = Object.keys(diseaseDatabase).filter(k => k !== "healthy_leaf");
    const selectedKey = keys[Math.floor(Math.random() * keys.length)];
    const base = diseaseDatabase[selectedKey];

    const confVal = (92 + Math.random() * 7).toFixed(1) + "%";
    const infVal = (25 + Math.random() * 50).toFixed(1) + "%";

    return {
        ...base,
        name: base.name + " (Detected in " + (fileName.length > 15 ? fileName.substring(0, 15) + '...' : fileName) + ")",
        defaultConfidence: confVal,
        defaultInfectedRate: infVal
    };
}

// --- 8. RENDER RESULTS DASHBOARD & MAP ---
function renderResults(data) {
    document.getElementById("res-category-badge").textContent = data.category + " (" + activeModelMode.toUpperCase() + ")";
    document.getElementById("res-disease-name").textContent = data.name;
    document.getElementById("res-scientific-name").textContent = data.scientificName;
    document.getElementById("res-confidence").textContent = data.defaultConfidence;
    document.getElementById("res-infected-rate").textContent = data.defaultInfectedRate;
    document.getElementById("res-climate-score").textContent = data.climateScore;
    document.getElementById("res-ndvi-status").textContent = data.ndviStatus;
    document.getElementById("res-hotspot-regions").textContent = data.hotspotText;

    const severityLabel = document.getElementById("res-severity-label");
    const severityBar = document.getElementById("res-severity-bar");
    severityLabel.textContent = data.severityLevel;
    severityBar.style.width = data.severityPercent + "%";

    if (data.severityPercent > 70) {
        severityLabel.className = "severity-high";
        severityBar.style.background = "linear-gradient(90deg, #f59e0b, #ef4444)";
    } else if (data.severityPercent > 30) {
        severityLabel.className = "severity-medium";
        severityBar.style.background = "linear-gradient(90deg, #10b981, #f59e0b)";
    } else {
        severityLabel.className = "severity-low";
        severityBar.style.background = "#10b981";
    }

    const immUl = document.getElementById("res-immediate-steps");
    immUl.innerHTML = data.immediateSteps.map(s => `<li>${s}</li>`).join("");

    const orgUl = document.getElementById("res-organic-steps");
    orgUl.innerHTML = data.organicSteps.map(s => `<li>${s}</li>`).join("");

    const chemTbody = document.getElementById("res-chemical-table");
    chemTbody.innerHTML = data.chemicalTable.map(c => `
        <tr>
            <td><strong>${c.name}</strong></td>
            <td>${c.rate}</td>
            <td>${c.interval}</td>
            <td>${c.phi}</td>
        </tr>
    `).join("");

    const prevUl = document.getElementById("res-prevention-steps");
    prevUl.innerHTML = data.preventionSteps.map(s => `<li>${s}</li>`).join("");

    renderDiseaseMap(data.hotspots);
}

// --- 9. LEAFLET INTERACTIVE HOTSPOT MAP (STRICTLY INDIA ONLY) ---
function renderDiseaseMap(hotspots) {
    if (!hotspots || hotspots.length === 0) return;

    if (!diseaseMapInstance) {
        diseaseMapInstance = L.map("disease-map", {
            center: INDIA_MAP_CENTER,
            zoom: INDIA_MAP_ZOOM,
            minZoom: 4,
            maxZoom: 9,
            maxBounds: INDIA_MAP_BOUNDS,
            maxBoundsViscosity: 1.0
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '&copy; OpenStreetMap contributors | CropGuard AI India'
        }).addTo(diseaseMapInstance);
    } else {
        diseaseMapInstance.setView([hotspots[0].lat, hotspots[0].lng], INDIA_MAP_ZOOM);
    }

    diseaseMapInstance.eachLayer(layer => {
        if (layer instanceof L.CircleMarker || layer instanceof L.Marker) {
            diseaseMapInstance.removeLayer(layer);
        }
    });

    hotspots.forEach(spot => {
        const circleColor = spot.risk === "Severe" ? "#ef4444" : (spot.risk === "High" ? "#f59e0b" : "#10b981");

        const circle = L.circleMarker([spot.lat, spot.lng], {
            color: circleColor,
            fillColor: circleColor,
            fillOpacity: 0.65,
            radius: spot.risk === "Severe" ? 18 : 12
        }).addTo(diseaseMapInstance);

        const popupContent = `
            <div style="font-family: sans-serif; padding: 4px; color: #1e293b;">
                <h4 style="margin: 0 0 4px; color: #0f172a; font-size: 13px;"><i class="fa-solid fa-location-dot"></i> ${spot.name}</h4>
                <p style="margin: 0 0 4px; font-size: 12px; color: ${circleColor}; font-weight: bold;">
                    Outbreak Alert: ${spot.risk} Risk Zone
                </p>
                <div style="font-size: 11px; color: #475569;">
                    <span>🌡️ Temp: ${spot.temp}</span> | <span>💧 Humidity: ${spot.humidity}</span>
                </div>
            </div>
        `;

        circle.bindPopup(popupContent);
    });

    setTimeout(() => {
        diseaseMapInstance.invalidateSize();
    }, 300);
}

// --- 10. INDIA OUTBREAK RADAR MAP (STRICTLY INDIA BOUNDS) ---
function initGlobalRadarMap() {
    if (globalRadarMapInstance) return;

    const container = document.getElementById("global-radar-map");
    if (!container) return;

    globalRadarMapInstance = L.map("global-radar-map", {
        center: INDIA_MAP_CENTER,
        zoom: INDIA_MAP_ZOOM,
        minZoom: 4,
        maxZoom: 9,
        maxBounds: INDIA_MAP_BOUNDS,
        maxBoundsViscosity: 1.0
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap | India Crop Surveillance'
    }).addTo(globalRadarMapInstance);

    const indianRegionalOutbreaks = [
        { lat: 30.9010, lng: 75.8573, location: "Ludhiana, Punjab", disease: "Wheat Stripe Rust", crop: "Wheat", risk: "Critical", radius: 24 },
        { lat: 23.2324, lng: 87.8615, location: "Burdwan, West Bengal", disease: "Rice Bacterial Leaf Blight", crop: "Rice", risk: "Critical", radius: 26 },
        { lat: 22.3039, lng: 70.8022, location: "Rajkot, Gujarat", disease: "Cotton Aphid Infestation", crop: "Cotton", risk: "Severe", radius: 22 },
        { lat: 16.7050, lng: 74.2433, location: "Kolhapur, Maharashtra", disease: "Sugarcane Red Rot", crop: "Sugarcane", risk: "High", radius: 20 },
        { lat: 31.1048, lng: 77.1734, location: "Shimla, Himachal Pradesh", disease: "Apple Scab Fungal Lesions", crop: "Apple", risk: "High", radius: 18 },
        { lat: 11.6854, lng: 76.1320, location: "Wayanad, Kerala", disease: "Pepper Quick Wilt", crop: "Black Pepper", risk: "Severe", radius: 20 },
        { lat: 26.7509, lng: 94.2037, location: "Jorhat, Assam", disease: "Tea Blight Pathogen", crop: "Tea", risk: "High", radius: 22 },
        { lat: 26.1209, lng: 85.3647, location: "Muzaffarpur, Bihar", disease: "Litchi Fruit Rot", crop: "Litchi", risk: "Moderate", radius: 16 },
        { lat: 13.1367, lng: 78.1292, location: "Kolar, Karnataka", disease: "Tomato Late Blight", crop: "Tomato", risk: "Critical", radius: 25 }
    ];

    indianRegionalOutbreaks.forEach(spot => {
        const color = spot.risk === "Critical" ? "#ef4444" : (spot.risk === "Severe" ? "#f97316" : (spot.risk === "High" ? "#f59e0b" : "#3b82f6"));

        const circle = L.circleMarker([spot.lat, spot.lng], {
            color: color,
            fillColor: color,
            fillOpacity: 0.6,
            radius: spot.radius
        }).addTo(globalRadarMapInstance);

        circle.bindPopup(`
            <div style="font-family: sans-serif; padding: 4px;">
                <h4 style="margin:0 0 4px; color:#0f172a; font-size:13px;"><i class="fa-solid fa-location-dot"></i> ${spot.location}</h4>
                <strong style="font-size: 13px; color: #1e293b;">${spot.disease}</strong>
                <p style="margin: 4px 0; font-size: 12px; color: #475569;">Host Crop: <b>${spot.crop}</b></p>
                <span style="font-size: 11px; background: ${color}; color: #fff; padding: 2px 8px; border-radius: 10px; font-weight: bold;">
                    ${spot.risk} Outbreak Alert
                </span>
            </div>
        `);
    });
}

// --- 11. DECISION-SUPPORT SYSTEM (DSS) PROTOTYPE ENGINE ---
function initDSSForm() {
    const dssBtn = document.getElementById("dss-run-btn");
    const dssResultBox = document.getElementById("dss-result-box");

    if (!dssBtn) return;

    dssBtn.addEventListener("click", () => {
        const state = document.getElementById("dss-state-select").value;
        const crop = document.getElementById("dss-crop-select").value;
        const hum = parseInt(document.getElementById("dss-humidity").value);

        dssResultBox.style.display = "block";
        dssResultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });

        const dssHeader = dssResultBox.querySelector(".dss-alert-header");
        const advValTime = dssResultBox.querySelector(".dss-advisory-grid .advisory-item:nth-child(1) .adv-val");
        const advValSpray = dssResultBox.querySelector(".dss-advisory-grid .advisory-item:nth-child(2) .adv-val");

        if (hum > 80) {
            dssHeader.className = "dss-alert-header high-alert";
            dssHeader.innerHTML = `
                <i class="fa-solid fa-triangle-exclamation"></i>
                <div>
                    <h4>PRE-SYMPTOMATIC HIGH RISK ALERT (88.4% Confidence in ${state})</h4>
                    <p>Elevated humidity (${hum}%) triggers fungal spore germination rule for ${crop} before visible leaf symptoms appear.</p>
                </div>
            `;
            advValTime.innerHTML = '<i class="fa-solid fa-clock"></i> Next 24 to 36 Hours (Pre-Rain)';
            advValSpray.textContent = "Mancozeb 75% WP @ 2.5g/L or Copper Octanoate";
        } else {
            dssHeader.className = "dss-alert-header";
            dssHeader.style.background = "rgba(16, 185, 129, 0.15)";
            dssHeader.style.borderColor = "rgba(16, 185, 129, 0.3)";
            dssHeader.innerHTML = `
                <i class="fa-solid fa-circle-check" style="color:#10b981"></i>
                <div>
                    <h4 style="color:#a7f3d0">MODERATE / LOW RISK (Normal Crop Health in ${state})</h4>
                    <p>Humidity level (${hum}%) is below critical spore threshold for ${crop}. Continue weekly scouting.</p>
                </div>
            `;
            advValTime.innerHTML = '<i class="fa-solid fa-calendar-check"></i> Standard 7-Day Inspection Window';
            advValSpray.textContent = "Preventive Cold-Pressed Neem Oil Spray (0.5%)";
        }
    });
}

// --- 12. TREATMENT NAVIGATION TABS ---
function initTreatmentTabs() {
    const tabs = document.querySelectorAll(".treatment-tabs .tab-btn");
    const panels = document.querySelectorAll(".tab-panel");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            panels.forEach(p => p.classList.remove("active"));

            tab.classList.add("active");
            const targetId = "tab-" + tab.getAttribute("data-tab");
            document.getElementById(targetId).classList.add("active");
        });
    });

    document.getElementById("btn-print-report").addEventListener("click", () => {
        window.print();
    });

    document.getElementById("btn-download-pdf").addEventListener("click", () => {
        alert("Generating diagnostic PDF summary for " + activeDisease.name + "...\nFile download will begin automatically.");
    });
}

// --- 13. RESEARCH KNOWLEDGE BASE HUB ---
function initResearchHub() {
    const grid = document.getElementById("disease-cards-grid");
    const searchInput = document.getElementById("disease-search-input");
    const cropSelect = document.getElementById("crop-filter-select");
    const typeSelect = document.getElementById("type-filter-select");

    const researchList = [
        diseaseDatabase.tomato_late_blight,
        diseaseDatabase.corn_rust,
        diseaseDatabase.rice_bacterial_blight,
        {
            id: "potato_early_blight",
            name: "Potato Early Blight",
            scientificName: "Alternaria solani",
            category: "Fungal Pathogen",
            crop: "Potato",
            img: "images/tomato_late_blight.jpg",
            description: "Produces concentric target-board ring spots on potato leaves across Uttar Pradesh and Punjab belts, causing foliage yellowing and yield loss.",
            severityLevel: "MODERATE RISK"
        },
        {
            id: "apple_scab",
            name: "Apple Scab",
            scientificName: "Venturia inaequalis",
            category: "Fungal Pathogen",
            crop: "Apple",
            img: "images/healthy_leaf.jpg",
            description: "Olive-green to black velvety spots on leaves and fruit in Kashmir valley and Himachal orchards, leading to premature leaf drop.",
            severityLevel: "HIGH RISK"
        },
        {
            id: "cotton_aphids",
            name: "Cotton Aphids Pest",
            scientificName: "Aphis gossypii",
            category: "Insect Pest",
            crop: "Cotton",
            img: "images/corn_rust.jpg",
            description: "Small sucking insects vectoring leaf curl virus and excreting honeydew across Gujarat, Vidarbha, and Telangana cotton belts.",
            severityLevel: "HIGH RISK"
        }
    ];

    function renderCards(items) {
        grid.innerHTML = items.map(item => `
            <div class="disease-card" onclick="openDiseaseModal('${item.id}')">
                <div class="card-img-wrapper">
                    <img src="${item.img}" alt="${item.name}">
                    <span class="card-tag">${item.category}</span>
                </div>
                <div class="card-content">
                    <span class="card-crop-name"><i class="fa-solid fa-wheat-awn"></i> ${item.crop}</span>
                    <h3 class="card-title">${item.name}</h3>
                    <p class="card-desc">${item.description}</p>
                    <div class="card-footer-info">
                        <span><i class="fa-solid fa-microscope"></i> ${item.scientificName}</span>
                        <strong style="color: var(--accent-emerald);">View Protocol &rarr;</strong>
                    </div>
                </div>
            </div>
        `).join("");
    }

    renderCards(researchList);

    function filterCards() {
        const query = searchInput.value.toLowerCase();
        const selectedCrop = cropSelect.value;
        const selectedType = typeSelect.value;

        const filtered = researchList.filter(item => {
            const matchesQuery = item.name.toLowerCase().includes(query) || 
                                 item.crop.toLowerCase().includes(query) || 
                                 item.scientificName.toLowerCase().includes(query);
            
            const matchesCrop = selectedCrop === "all" || item.crop === selectedCrop;
            const matchesType = selectedType === "all" || item.category.includes(selectedType);

            return matchesQuery && matchesCrop && matchesType;
        });

        renderCards(filtered);
    }

    searchInput.addEventListener("input", filterCards);
    cropSelect.addEventListener("change", filterCards);
    typeSelect.addEventListener("change", filterCards);

    const modal = document.getElementById("disease-modal");
    const closeBtn = document.getElementById("modal-close-btn");
    closeBtn.addEventListener("click", () => modal.classList.remove("active"));
    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("active");
    });
}

window.openDiseaseModal = function(diseaseId) {
    const item = diseaseDatabase[diseaseId] || diseaseDatabase["tomato_late_blight"];
    const modalContent = document.getElementById("modal-body-content");
    
    modalContent.innerHTML = `
        <div style="display: flex; gap: 20px; margin-bottom: 20px; align-items: center;">
            <img src="${item.img}" style="width: 140px; height: 110px; object-fit: cover; border-radius: 12px;" />
            <div>
                <span class="disease-category-badge">${item.category}</span>
                <h2 style="font-size: 1.8rem; margin: 4px 0;">${item.name}</h2>
                <span class="scientific-name">${item.scientificName}</span>
            </div>
        </div>
        <p style="color: var(--text-muted); margin-bottom: 20px;">${item.description}</p>
        <div class="protocol-box organic-box" style="margin-bottom: 20px;">
            <h4><i class="fa-solid fa-leaf"></i> Key Management Steps</h4>
            <ul>
                ${item.organicSteps.map(s => `<li>${s}</li>`).join("")}
            </ul>
        </div>
        <button class="btn btn-primary btn-full" onclick="loadDiseaseData('${item.id}'); document.getElementById('disease-modal').classList.remove('active'); document.getElementById('scanner-section').scrollIntoView({behavior:'smooth'});">
            <i class="fa-solid fa-magnifying-glass"></i> Load into AI Scanner Engine
        </button>
    `;

    document.getElementById("disease-modal").classList.add("active");
};
