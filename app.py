import os
import base64
import streamlit as st
import streamlit.components.v1 as components

# Configure Streamlit page layout
st.set_page_config(
    page_title="CropGuard AI - Hybrid Early Detection & Decision-Support System",
    page_icon="🌿",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom CSS to maximize viewport area and hide Streamlit chrome
st.markdown("""
<style>
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
    .block-container {
        padding: 0rem !important;
        max-width: 100% !important;
    }
    iframe {
        width: 100% !important;
        border: none !important;
    }
</style>
""", unsafe_allow_html=True)

def get_base64_image(image_path):
    if os.path.exists(image_path):
        with open(image_path, "rb") as img_file:
            return base64.b64encode(img_file.read()).decode()
    return ""

def get_bundled_html():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    index_path = os.path.join(base_dir, "index.html")
    css_path = os.path.join(base_dir, "styles.css")
    js_path = os.path.join(base_dir, "app.js")
    images_dir = os.path.join(base_dir, "images")

    with open(index_path, "r", encoding="utf-8") as f:
        html_content = f.read()

    # Inject CSS inline
    if os.path.exists(css_path):
        with open(css_path, "r", encoding="utf-8") as f:
            css_content = f.read()
        html_content = html_content.replace(
            '<link rel="stylesheet" href="styles.css">',
            f'<style>\n{css_content}\n</style>'
        )

    # Inject JS inline
    if os.path.exists(js_path):
        with open(js_path, "r", encoding="utf-8") as f:
            js_content = f.read()
        html_content = html_content.replace(
            '<script src="app.js"></script>',
            f'<script>\n{js_content}\n</script>'
        )

    # Convert images to base64 Data URLs so they load seamlessly inside the iframe
    if os.path.exists(images_dir):
        for img_name in os.listdir(images_dir):
            img_path = os.path.join(images_dir, img_name)
            if os.path.isfile(img_path):
                b64_str = get_base64_image(img_path)
                ext = img_name.split('.')[-1].lower()
                mime_type = "image/jpeg" if ext in ["jpg", "jpeg"] else f"image/{ext}"
                data_url = f"data:{mime_type};base64,{b64_str}"
                html_content = html_content.replace(f"images/{img_name}", data_url)

    return html_content

bundled_html = get_bundled_html()
components.html(bundled_html, height=1400, scrolling=True)
