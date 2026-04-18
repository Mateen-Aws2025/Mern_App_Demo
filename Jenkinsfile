pipeline {
    agent any

    environment {
        AWS_REGION = "ap-south-1"
        ECR_REGISTRY = "695385418520.dkr.ecr.ap-south-1.amazonaws.com"
        BACKEND_REPO = "mern-app"
        FRONTEND_REPO = "mern-frontend"
        IMAGE_TAG = "${BUILD_NUMBER}"   // ✅ dynamic tagging
    }

    stages {

        stage('Clone Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Mateen-Aws2025/Mern_App_Demo.git'
            }
        }

        // 🔐 Login once
        stage('Login to ECR') {
            steps {
                sh '''
                aws ecr get-login-password --region $AWS_REGION \
                | docker login --username AWS --password-stdin $ECR_REGISTRY
                '''
            }
        }

        // ✅ BACKEND
        stage('Build Backend Image') {
            steps {
                sh 'docker build -t backend .'
            }
        }

        stage('Tag & Push Backend') {
            steps {
                sh '''
                docker tag backend:latest $ECR_REGISTRY/$BACKEND_REPO:$IMAGE_TAG
                docker push $ECR_REGISTRY/$BACKEND_REPO:$IMAGE_TAG
                '''
            }
        }

        // ✅ FRONTEND
        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t frontend ./frontend'
            }
        }

        stage('Tag & Push Frontend') {
            steps {
                sh '''
                docker tag frontend:latest $ECR_REGISTRY/$FRONTEND_REPO:$IMAGE_TAG
                docker push $ECR_REGISTRY/$FRONTEND_REPO:$IMAGE_TAG
                '''
            }
        }

        // 🚀 DEPLOY TO EKS
        stage('Deploy to EKS') {
            steps {
                sh '''
                kubectl set image deployment/backend backend=$ECR_REGISTRY/$BACKEND_REPO:$IMAGE_TAG
                kubectl set image deployment/frontend frontend=$ECR_REGISTRY/$FRONTEND_REPO:$IMAGE_TAG
                '''
            }
        }
    }
}
