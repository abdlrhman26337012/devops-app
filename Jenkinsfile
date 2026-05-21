pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = 'dockerhub-creds'   // Jenkins credentials ID for DockerHub
        DOCKER_IMAGE = 'abdulrahman5234/devops-app:latest'
        GIT_REPO = 'https://github.com/abdlrhman26337012/devops-app.git'
    }

    stages {
        stage('Fetch Code') {
            steps {
                git branch: 'main', url: "${env.GIT_REPO}"
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${env.DOCKER_IMAGE}")
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', "${env.DOCKERHUB_CREDENTIALS}") {
                        docker.image("${env.DOCKER_IMAGE}").push()
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f deployment.yaml'
                sh 'kubectl apply -f service.yaml'
            }
        }

        stage('Monitoring Setup') {
            steps {
                echo "Prometheus and Grafana deployment scripts go here"
                // Example:
                // sh 'kubectl apply -f prometheus-deployment.yaml'
                // sh 'kubectl apply -f grafana-deployment.yaml'
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed. Check logs for details."
        }
    }
}
