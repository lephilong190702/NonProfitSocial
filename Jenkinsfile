pipeline {
    agent any
	tools {
		maven 'Maven'
	}
	
	environment {
		PROJECT_ID = 'nonprofit-social-421415'
        CLUSTER_NAME = 'k8s-cluster'
        LOCATION = 'asia-southeast2-a'
        CREDENTIALS_ID = 'kubernetes'	
	}
	
    stages {
	    stage('Scm Checkout') {
		    steps {
			    checkout scm
		    }
	    }
	    
        stage('Deploy Mysql to K8s') {
            steps{
                echo "Deployment started ..."
                sh 'ls -ltr'
                sh 'pwd'
                echo "Start deployment of mysql-storage.yaml"
                step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'mysql-storage.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
                echo "Start deployment of mysql-config.yaml"
                step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'mysql-config.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
                echo "Start deployment of mysql-secret.yaml"
                step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'mysql-secret.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
                echo "Start deployment of mysql-deployment.yaml"
                step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'mysql-deployment.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
                echo "Start deployment of mysql-service.yaml"
                step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'mysql-service.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
                echo "Deployment MySQL Finished ..."
            }
        }

        stage('Build') {
		    steps {
                sh 'cd charity/ && mvn --version'
                sh 'cd charity/ && java --version'
			    sh 'cd charity/ && mvn clean install -DskipTests'
		    }
	    }

        stage('Build Docker Image') {
		    steps {
			    script {
                    server_image = docker.build("lephilong1907/charity:${env.BUILD_ID}", './charity')
                    client_image = docker.build("lephilong1907/client:${env.BUILD_ID}", './client')
			    }
		    }
	    }

        stage("Push Docker Image") {
		    steps {
			    script {
				    echo "Push Docker Image"
				    withCredentials([string(credentialsId: 'dockerhub', variable: 'dockerhub')]) {
            				sh "docker login -u lephilong1907 -p ${dockerhub}"
				    }
				        server_image.push("${env.BUILD_ID}")
                        client_image.push("${env.BUILD_ID}")
				    
			    }
		    }
	    }

        stage('Deploy Spring Boot to K8s') {
            steps{
                sh 'docker image pull lephilong1907/charity:latest'
                echo "Deployment started ..."
                sh 'ls -ltr'
                sh 'pwd'
                sh "sed -i 's/tagversion/${env.BUILD_ID}/g' server-deployment.yaml"
                echo "Start deployment of server-deployment.yaml"
                step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'server-deployment.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
                echo "Start deployment of server-service.yaml"
                step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'server-service.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
        
                echo "Deployment Server Finished ..."
            }
        }

        stage('Deploy ReactJS to K8s') {
            steps{
                sh 'docker image pull lephilong1907/client:latest'
                echo "Deployment started ..."
                sh 'ls -ltr'
                sh 'pwd'
                sh "sed -i 's/tagversion/${env.BUILD_ID}/g' client-deployment.yaml"
                echo "Start deployment of client-deployment.yaml"
                step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'client-deployment.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
                echo "Start deployment of client-service.yaml"
                step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'client-service.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
        
                echo "Deployment Client Finished ..."
            }
        }
    }
}