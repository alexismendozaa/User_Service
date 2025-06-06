
# User Service Microservices

This repository contains various microservices related to user management, including services for editing user avatars, emails, passwords, usernames, and getting user information.

## Microservices

- **edit-avatar-ms**: A microservice for editing user avatars.
- **edit-email-ms**: A microservice for editing user email addresses.
- **edit-password-ms**: A microservice for changing user passwords.
- **edit-username-ms**: A microservice for changing user usernames.
- **get-info-ms**: A microservice for retrieving user information.
- **delete-account-ms**: A microservice for deleting user accounts.

## Service Structure

Each microservice follows a similar structure:

```
<service-name>
├── .env                    # Environment variable settings
├── app.js                  # Main application code
├── config                  # Configuration files
├── controllers             # Request handling logic
├── Dockerfile              # Docker configuration
├── middlewares             # Middleware functions
├── package-lock.json       # Dependencies and configuration
├── package.json            # Project metadata
├── routes                  # API routes definitions
└── swagger.js              # API documentation (Swagger)
```

## Running the Services

1. Clone the repository.

2. Install dependencies for each service:
    ```bash
    npm install
    ```

3. Run the service:
    ```bash
    npm start
    ```

4. For Docker users, build and run the container:
    ```bash
    docker build -t <service-name> .
    docker run -p <port>:<port> <service-name>
    ```

## API Documentation

API documentation for each microservice is available through **Swagger**. The `swagger.js` file contains the OpenAPI definitions and can be used to generate interactive documentation for the services.

## Environment Variables

Each service requires specific environment variables. The `.env` file in each microservice directory contains the necessary variables. Make sure to configure them properly for your environment.

## Contributing

1. Fork this repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
