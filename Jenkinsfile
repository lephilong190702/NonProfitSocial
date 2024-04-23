pipeline {
    agent any
	tools {
		maven 'Maven'
	}
	
	environment {
		PROJECT_ID = 'social-website-421212'
        CLUSTER_NAME = 'k8s-cluster'
        LOCATION = 'asia-southeast2'
        CREDENTIALS_ID = 'kubernetes'	
	}
	
    stages {
	    stage('Scm Checkout') {
		    steps {
			    checkout scm
		    }
	    }
	    
	    stage('Build') {
		    steps {
			    sh 'cd charity/ && mvn clean package'
		    }
	    }
	    
	    stage('Test') {
		    steps {
			    echo "Testing..."
			    sh 'cd charity/ && mvn test'
		    }
	    }
	    
	    stage('Build docker image'){
            steps{
                sh 'cd charity/ && docker build -t lephilong1907/charity:latest .'
                withCredentials([string(credentialsId: 'dockerhub', variable: 'dockerhub')]) { 
                    sh 'docker login -u lephilong1907 -p ${dockerhub}'
                    
                    sh 'docker push lephilong1907/charity:latest'
                }
            }
        }
	
    }
}