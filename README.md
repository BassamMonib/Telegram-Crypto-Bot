# Crypto Bot

A Telegram bot that allows users to fetch cryptocurrency data, set price alerts, and manage alerts seamlessly.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Installation

Follow these steps to set up the Cryptocurrency Bot on your Linux machine:

### 1. Install Node.js

Make sure you have Node.js installed on your system. You can install Node.js using the following commands:

```bash
sudo apt update
sudo apt install -y nodejs npm
```

Verify the installation:

```bash
node -v
npm -v
```

### 2. Install MongoDB (if local database needed)

If you need a local database, install MongoDB using the following commands:

```bash
sudo apt install -y mongodb
```

Start the MongoDB service:

```bash
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

### 3. Copy the Environment Variables

Copy the `.env.prod` file to create a `.env` file and fill it with the necessary API keys and configuration variables:

```bash
cp .env.prod .env
```

Edit the `.env` file using and fill in the required API keys:

```bash
nano .env
```

### 4. Install Node Modules

Install the required node_modules with the following command:

```bash
npm ci
```

### 5. Run the Bot

Start the bot using the command:

```bash
npm start
```

## Usage

After running the bot, you can interact with it on Telegram. You can see each command detail after typing '/'

## Features

- Fetch real-time cryptocurrency data.
- Set and manage price alerts for specific tokens.
- User registration and authentication.
- Supports multiple cryptocurrencies.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Thanks to the CoinGecko API for providing cryptocurrency data.
- Thanks to the MongoDB community for database support.
