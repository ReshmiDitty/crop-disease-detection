# 🌿 CropGuard AI — Hybrid Early Detection & Decision-Support System

**CropGuard AI** is a hybrid AI crop disease early detection platform combining CNN optical vision with Random Forest & XGBoost environmental modeling (IMD Weather, Sentinel-2 NDVI, SoilGrids, and SHAP XAI).

## 🚀 Live Demo & Deployment

- **Streamlit Community Cloud:** Deployed via `app.py`
- **GitHub Repository:** [ReshmiDitty/crop-disease-detection](https://github.com/ReshmiDitty/crop-disease-detection)

## 🛠️ Features

- **Hybrid AI Scanner:** Optical visual inspection paired with environmental risk modeling.
- **Decision Support System (DSS):** Actionable dosage and fungicide/pesticide recommendations based on infection stage.
- **Explainable AI (SHAP):** Visual breakdown of key contributing factors (Humidity, Temp, Soil pH, Leaf Wetness).
- **Disease Knowledge Hub:** In-depth biological data, symptoms, and preventive measures.
- **Interactive Risk Map:** Regional agricultural outbreak tracking across India.

## 💻 Local Setup & Running

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ReshmiDitty/croppp.git
   cd croppp
   ```

2. **Install requirements:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run Streamlit app:**
   ```bash
   streamlit run app.py
   ```

4. **Or open statically:**
   Open `index.html` directly in any modern web browser.
