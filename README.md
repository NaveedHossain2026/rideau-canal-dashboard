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
