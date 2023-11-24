# zookeepr 

ZooKeepr is a web application built with Express.js that allows users to manage a zoo database. It provides CRUD (Create, Read, Update, Delete) functionality for handling different aspects of zoo management.

## Overview

ZooKeepr simplifies the process of managing a zoo by offering a user-friendly interface to perform various operations on the zoo database. Users can add, view, update, and delete information about animals, enclosures, and more.

## Features

- Create, Read, Update, and Delete operations for animals and enclosures.
- User-friendly interface for easy zoo management.
- Express.js server for handling API requests.

## Getting Started

### Prerequisites

- Node.js installed
- npm package manager

### Installation

1. Clone the repository
   
   ```bash
   git@github.com:Jay1194/zookeepr.git
   
## Install dependencies
- npm install

## Usage
1. Open a terminal and navigate to the project directory.
2. Run the server
   
   ```bash
   node server.js
   
3. Access the application at http://localhost:3000 in your web browser.
4. Use the provided API routes for CRUD operations.

### API Routes
- GET /animals: Retrieve a list of all animals.
- GET /animals/:id: Retrieve information about a specific animal.
- POST /animals: Add a new animal to the database.
- PUT /animals/:id: Update information about a specific animal.
- DELETE /animals/:id: Delete a specific animal from the database.
- Similar routes are available for managing enclosures.

## Technologies Used
- Node.js
- Express.js
- Jest

## Contributing
- Contributions are welcome! Feel free to open issues or submit pull requests.

## License
![badge](https://img.shields.io/badge/license-MIT-brightgreen)
<br />
This application is covered by the MIT license. 
