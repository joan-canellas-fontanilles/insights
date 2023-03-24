# Insights

Insights is a full-stack web application that allows users to post and visualize metrics. Each metric has a name, timestamp, and value, and is displayed on a timeline showing the average per minute, hour, or day. The application stores the metrics in a database for persistence.

## Technologies Used

* **Frontend Development**: HTML, SCSS, Typescript, Angular
* **Backend Development**: Node.js, Nest.js
* **Database Management**: Mysql

## Getting Started

### Prerequisites
Docker and docker-compose installed on your local machine

As an alternative you can have installed:
- Node.js and npm
- Mysql database
- Nx globally installed

### Installation

- Clone the repository: git clone https://github.com/joan-canellas-fontanilles/insights
- Navigate to the project infrastructure directory: cd insights/infrastructure
- Start the docker-compose: docker-compose up
- Open a web browser and navigate to http://localhost:4200 to view the application

### Mocking data

You can make use of the project `insights-generator` which generates a metric and continuously generates new 
values for that metrics every few milliseconds.

This project will be started with the docker compose up. To start the generation make a call to `http://localhost:3333/api/start` to create a metric.

## Roadmap
Future enhancements to Insights may include:

- [ ] User authentication and authorization
- [ ] Additional data visualization options
- [ ] Exporting metrics data to a CSV file
- [ ] Add more testing in the client

## Testing

Both projects have unit tests and e2e testing.

The unit tests are executed each time a push is made on the main branch or a pull request points to the main branch using github actions


### Backend

The command to execute the jest unit test in the front:

```
nx test insights-api
```

The frontend e2e uses docker compose to initialize an environment with a container for the nestjs backend and another one with the mysql.
Keep in mind that the tests will remove the docker environment after running and will remove the current dockers containers for this project.

In order to execute:

```
nx e2e insights-api-e2e
```

### Frontend

The command to execute the jest unit test in the front:

```
nx test insights-client
```

The frontend e2e uses cypress to perform the tests. In order to execute:

```
nx e2e insights-client-e2e --baseUrl=http://localhost:port
```


## Api Documentation

If you want to make API calls directly to the backend, you can use the following [postman workspace](https://documenter.getpostman.com/view/26439222/2s93K1r1Hj)

## Kubernetes

The folder `infrastructure/k8s` contains the yaml files to make a deployment to a k8s cluster.
There you will find each deployment with a statefullSet for the database and the ingress configuration.

Prior to the configuration of the configuration of the cluster a build for each image must me published to a docker container repository.

## License
Insights is released under the MIT License.
