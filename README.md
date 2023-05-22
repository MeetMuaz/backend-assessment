## Backend-assessment API
🚀 🔥 A RESTful API for blogging platform that allows users to create, read, 

## ✨ Features

- Secure your API using 🔒 Helmet and 🛡️ Express Mongo Sanitize.

- Optimize and improve API performance using 🚀 PM2 process manager.

- Scale your API by creating a cluster with PM2. 🌐

## 📋 Prerequisites

To run the API, make sure you have the following installed on your system:

- 🟢 Node.js (version X.X.X)

- 🍃 MongoDB (version X.X.X)

## 🚀 Installation

1. Clone the repository:

   ```bash

   git clone git@github.com:MeetMuaz/backend-assessment.git

   ```

2. Navigate to the project directory:

   ```bash

   cd backend-assessment 

   ```

3. Install the dependencies:

   ```bash

   npm install

   ```

4. Create a `.env` file in the root directory and provide the necessary environment variables:

   ```plaintext

   PORT=3000

   MONGO_URI=mongodb://localhost:27017/blog

   JWT_SECRET=your_secret_key

   ```

   Replace the values with your desired configuration.

5. Start the API:

   ```bash

   npm start

   ```

   This will start the API server at `http://localhost:3000`.

## 🔒 Security

This API uses the following security measures:

- **Helmet**: Helmet helps secure your Express.js application by setting various HTTP headers. It provides protection against common security vulnerabilities.

- **Express Mongo Sanitize**: Express Mongo Sanitize helps prevent NoSQL injection attacks by sanitizing user-supplied data before interacting with the MongoDB database.

## 🚀 Optimization with PM2

PM2 is a process manager for Node.js applications that helps optimize performance and manage application processes. To start the API with PM2, follow these steps:

1. Install PM2 globally (if not already installed):

   ```bash

   npm install -g pm2

   ```

2. Start the API with PM2:

   ```bash

   pm2 start app.js --name blogging-api

   ```

   This will start the API using PM2 and assign it the name `blogging-api`.

3. Monitor API logs:

   ```bash

   pm2 logs blogging-api

   ```

   Use this command to monitor the logs and troubleshoot any issues.

## 🌐 Creating a Cluster with PM2

To improve performance and scalability, you can create a cluster with PM2 to run multiple instances of the API. Follow these steps:

1. Stop the existing API process (if running):

   ```bash

   pm2 stop blogging-api

   ```

2. Create a cluster of API instances:

   ```bash

   pm2 start app.js -i <num_instances> --name blogging-api

   ```

   Replace `<num_instances>` with the desired number of instances to run in the cluster.

3. Monitor the cluster:

   ```bash

   pm2 monit blogging-api

   ```

   Use this command to monitor the cluster and view resource usage.

---

Feel free to customize the README file further based on your specific project requirements and add any additional information you think is necessary.
