# Rideau Canal Skateway Dashboard


## Overview

This is a real-time web application built with Node.js. It serves as the Presentation Layer of the Rideau Canal Monitoring System, fetching aggregated IoT telemetry from Azure Cosmos DB and displaying it through an interactive, responsive interface.

### Dashboard Features

__Real-time data display with auto-refresh:__ Automatic data fetching every 30 seconds to keep safety statuses current.

__Safety status badges:__ Dynamic color-coded cards (Safe, Caution, Unsafe) based on ice thickness and temperature.

__Historical trend charts:__ Interactive line charts using Chart.js to track ice growth trends.


### Technologies Used

__Backend:__ Node.js with Express

__Frontend:__ HTML5, CSS3, JavaScript , Chart.js

__Database:__ Azure Cosmos DB (SQL API)

__Deployment:__ Azure App Service, GitHub Actions (CI/CD)


## Prerequisites

- Node.js v18 or higher

- An active Azure Cosmos DB instance

## Installation

__Clone the repository:__ git clone https://github.com/NaveedHossain2026/rideau-canal-dashboard.git

__Enter the project directory:__ cd rideau-canal-dashboard

__Install dependencies:__ npm install

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

