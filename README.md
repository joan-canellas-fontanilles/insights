# Insights

Insights is a full-stack web application that allows users to post and visualize metrics. Each metric has a name, timestamp, and value, and is displayed on a timeline showing the average per minute, hour, or day. The application stores the metrics in a database for persistence.

## Technologies Used

Frontend Development: HTML, SCSS, Typescript, Angular
Backend Development: Node.js, Nest.js
Database Management: Mysql

## Getting Started

### Prerequisites
Docker and docker-compose installed on your local machine

As an alternative you can have installed:
- Node.js and npm
- Mysql database
- Nx globally installed

### Installation

Clone the repository: git clone https://github.com/joan-canellas-fontanilles/insights
Navigate to the project infrastructure directory: cd insights/infrastructure
Start the docker-compose: docker-compose up
Open a web browser and navigate to http://localhost:4200 to view the application

## Roadmap
Future enhancements to Insights may include:

- [ ] User authentication and authorization
- [ ] Additional data visualization options
- [ ] Exporting metrics data to a CSV file


## Contributing
If you would like to contribute to Insights, please follow these steps:

## License
Insights is released under the MIT License.
