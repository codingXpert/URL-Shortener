# URL Shortener

This project is a URL shortener that allows users to shorten long URLs into shorter ones.

## Getting Started

To get started with this project, follow these steps:

### Prerequisites

- Node.js installed on your machine
- MongoDB installed or access to a MongoDB instance

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/codingXpert/URL-Shortener

2. Navigate to the project directory:
   ```bash
   cd url-shortener

3. Install dependencies:
    ```bash
   npm install

4. Set up environment variables:
    Create a .env file in the root directory and define the following variables:
    ```bash
    LOCAL_DATABASE=mongodb://localhost:27017/link_shortener
    PROD_DATABASE=mongodb+srv://<username>:<password>@<cluster>/<database>
    SALT_CONSTANT=10
    JWT_SECRET=your_jwt_secret
    EXPIRES_IN=1d
    NODE_ENV=development

### Usage

* To run the project in development mode:
    ```bash
    npm run start:dev

* To run the project in production mode:
    ```bash
    npm run start:prod


### Features
* **Short Url:** AliasShorten long URLs into custom or randomly generated short URLs.
* **API Integration:** Provide a RESTful API for users to programmatically interact with the URL shortening service.
* **JWT Authentication:** Implemented JWT (JSON Web Token) authentication strategy for secure user login and session management.
* **MongoDB Atlas Integration:**  Employed MongoDB Atlas as the production database, ensuring scalability, reliability, and cloud-based data storage.

* **Security Middleware:**

**Helmet:** Integrated Helmet to set various HTTP headers, enhancing security by protecting against common web vulnerabilities.

**express-mongo-sanitize:** Employed express-mongo-sanitize to sanitize user-supplied data against NoSQL Injection attacks.

**xss-clean:** Implemented xss-clean to sanitize user input from potential cross-site scripting (XSS) attacks, preventing script injections.

