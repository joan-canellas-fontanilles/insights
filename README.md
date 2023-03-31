# Insights

Insights is a full-stack web application that allows users to post and visualize metrics. 
Each metric has a name, timestamp, and value, and is displayed on a timeline showing the
average per minute, hour, or day. The application stores the metrics in a database for
persistence.

## Technologies Used

* **Frontend Development**: HTML, SCSS, Typescript, Angular
* **Backend Development**: Node.js, Nest.js
* **Database Management**: Mysql

## Getting Started

### Prerequisites
Docker and docker-compose installed on your local machine

#### Testing Requirements

Before running the tests, ensure that you have the following dependencies installed:
- Node.js and npm
- Globally installed Nx
- Project dependencies installed via npm install command.

### Installation

Getting started with Insights is easy. Here are the steps:

1. Clone the repository by running `git clone https://github.com/joan-canellas-fontanilles/insights` in your terminal.
2. Run `npm start` to build and start the Docker containers for the application.
3. Wait for the containers to start up.
4. Open your web browser and go to `http://localhost:4200` to view the application.

If you want to generate mock data, you can use the `insights-generator` project. 
Simply make a call to `http://localhost:3333/api/start` to create a new metric and
start generating values for it.

## Roadmap
Future enhancements to Insights may include:

- [ ] User authentication and authorization
- [ ] Additional data visualization options
- [ ] Exporting metrics data to a CSV file
- [ ] Add more testing in the client project

## Testing

Both projects have unit tests and e2e testing. 

To run the testing you must have installed the dependencies listed in
[prerequisites](#testing-requirements).

The unit tests are executed each time a push is made on the main branch or a pull 
request points to the main branch using GitHub actions


### Backend

The command to execute the jest unit test in the front:

```
nx test insights-api
```

The frontend e2e uses docker compose to initialize an environment with a container for 
the Nest.js backend and another one for MySQL. Keep in mind that the tests will remove
the docker environment after running and will remove the current dockers containers for 
this project.

In order to execute:

```
nx e2e insights-api-e2e
```

### Frontend

The command to execute the jest unit test in the front:

```
nx test insights-client
```

The frontend e2e uses cypress to perform the tests. 
Ensure that you can access the project at the given URL. 

To run the tests, use the following command:

```
nx e2e insights-client-e2e --baseUrl=http://localhost:port
```


## Api Documentation

To interact with the backend via API calls, you may utilize the provided
[postman workspace](https://documenter.getpostman.com/view/26439222/2s93K1r1Hj).

## Kubernetes

Note: You must have installed in your cluster the NGINX ingress controller. Follow 
this [guide](https://kubernetes.github.io/ingress-nginx/deploy/) for more information

The folder `infrastructure/k8s` contains the yaml files to make a deployment to a k8s 
cluster. There you will find each deployment with a statefullSet for the database and 
the ingress configuration.

Prior to the configuration of the cluster, you must make a build for each image published
them to the  docker container repository.

Alternatively, install the tool `skaffold` and execute the command `skaffold dev`.

## License
Insights is released under the MIT License.
