# WiGLE Wardriving Dashboard

A web-based dashboard for visualizing Wi-Fi wardriving data from WiGLE.NET with heatmap overlay capabilities.

## Features

- **CSV/JSON Import**: Load WiGLE-exported data files
- **Interactive Map**: OpenStreetMap-based visualization using Leaflet
- **Heatmap Overlay**: Signal strength-based heatmap visualization
- **Filtering**: Filter by security type, signal strength, or SSID
- **Statistics**: Real-time network statistics
- **Dark Theme**: Professional dark UI

## Usage

1. Open `index.html` in a web browser
2. Click "Load Sample Data" or drag-drop a WiGLE CSV file
3. Use filters to narrow down networks
4. Toggle heatmap with the 🔥 button

## WiGLE Export Format

Export from WiGLE with these columns:
- SSID
- BSSID
- MAC
- Channel
- RSSI (signal strength)
- Security (encryption type)
- Latitude
- Longitude

## Deployment

Deploy to GitHub Codespaces or any static hosting:

```bash
# GitHub Pages
git checkout -b gh-pages
git push origin gh-pages

# Or use Codespaces - just open in browser
```

## Security Note

This tool is for authorized security research only. Always comply with local laws and regulations.
