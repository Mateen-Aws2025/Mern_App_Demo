pipeline {
    agent any

    environment {
        AWS_REGION = "ap-south-1"
        ECR_REGISTRY = "695385418520.dkr.ecr.ap-south-1.amazonaws.com"
        ECR_REPO = "mern-app"
        IMAGE_TAG = "latest"
    }

    stages {

        stage('Clone Code') {
            steps {
                git 'https://github.com/Mateen-Aws2025/Mern_App_Demo.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t mern-app .'
            }
        }

        stage('Login to ECR') {
            steps {
                sh '''
                aws ecr get-login-password --region $AWS_REGION \
                | docker login --username AWS --password-stdin $ECR_REGISTRY
                '''
            }
        }

        stage('Tag Image') {
            steps {
                sh '''
                docker tag mern-app:latest $ECR_REGISTRY/$ECR_REPO:$IMAGE_TAG
                '''
            }
        }

        stage('Push Image') {
            steps {
                sh '''
                docker push $ECR_REGISTRY/$ECR_REPO:$IMAGE_TAG
                '''
            }
        }
    }
}
