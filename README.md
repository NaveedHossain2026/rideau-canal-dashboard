# Rideau Canal Skateway Dashboard


## Overview

This is a real-time web application built with Node.js. It serves as the "Presentation Layer" of the Rideau Canal Monitoring System, fetching aggregated IoT telemetry from Azure Cosmos DB and displaying it through an interactive, responsive interface.

__Dashboard Features__

Real-time Monitoring: Automatic data fetching every 30 seconds to keep safety statuses current.

Safety Status Indicators: Dynamic color-coded cards (Safe, Caution, Unsafe) based on ice thickness and temperature.

Historical Visualizations: Interactive line charts using Chart.js to track ice growth trends.


__Technologies Used__

Backend: Node.js

Frontend: HTML5, CSS3, JavaScript (Vanilla), Chart.js

Database: Azure Cosmos DB (SQL API)

Deployment: Azure App Service, GitHub Actions (CI/CD)


## Prerequisites

- Node.js v18 or higher

- An active Azure Cosmos DB instance

## Installation

Clone the repository:

Bash

git clone [your-repo-link]

cd web-dashboard

__Install dependencies:__

Bash

npm install

## Configuration

Create a .env file in the root directory and add your Azure credentials

## API Endpoints

__GET /api/status__

Fetches the most recent record for each sensor location. Used by the dashboard cards to show the current safety status.

__GET /api/history__

Fetches the last 20 records for historical charting. Provides the data points for the Chart.js line graph.

## Deployment to Azure App Service

1. Create App Service: In the Azure Portal, create a new Web App (Node.js 18 LTS).

2. Environment Variables: Go to Configuration > Application Settings and add your .env keys (COSMOS_KEY, etc.). Important: Set PORT to 8080.

3. In GitHub Actions: Go to the Deployment Center in Azure.

4. Link your GitHub repository. Azure will generate a .github/workflows/main.yml file.

5. Push to Deploy: Any push to the main branch will now automatically trigger a build and deploy to your live URL.

