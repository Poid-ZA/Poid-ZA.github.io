# WiGLE Wardriving Dashboard

A web-based dashboard for visualizing Wi-Fi wardriving data from WiGLE.NET with heatmap overlay capabilities.

## Features

- **WiGLE API Integration**: Fetch your discovered networks directly using API key
- **CSV/JSON/KML Import**: Load WiGLE-exported data files (drag & drop)
- **Interactive Map**: OpenStreetMap-based visualization using Leaflet
- **Heatmap Overlay**: Signal strength-based color-coded markers
- **Filtering**: Filter by security type, signal strength, or SSID
- **Statistics**: Real-time network statistics (Total, WPA, Open, Locations)
- **Dark Theme**: Professional dark UI

## Getting Started

### Option 1: Use WiGLE API
1. Get your WiGLE API key from https://wigle.net/account
2. Open the dashboard
3. Enter your API key in the "WiGLE API Key" field
4. Click "Fetch My WiGLE Data"

### Option 2: Import Files
1. Export your data from WiGLE as CSV or KML
2. Drag and drop the file onto the dashboard
3. Or click the upload zone to browse

### Option 3: Sample Data
Click "Load Sample" to see example networks.

## WiGLE API Key

To get a WiGLE API key:
1. Go to https://wigle.net/account
2. Create an account or log in
3. Navigate to API Tokens
4. Generate an API key

## Filtering

- **Security**: Show WPA/WPA2/WPA3, WEP, or Open networks
- **Signal**: Filter by signal strength (Strong > -70dBm, Medium -70 to -90dBm, Weak < -90dBm)
- **SSID**: Search by network name

## Deployment

Deploy to any static hosting:

```bash
# GitHub Pages
git checkout -b gh-pages
git push origin gh-pages
```

## Security Note

This tool is for authorized security research only. Always comply with local laws and regulations when wardriving.
