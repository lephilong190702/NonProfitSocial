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
        MYSQL_ROOT_LOGIN = credentials('mysql-root-login')
	}
	
    stages {
	    stage('Scm Checkout') {
		    steps {
			    checkout scm
		    }
	    }
	    
	    stage('Build') {
		    steps {
                sh 'cd charity/ && mvn --version'
                sh 'cd charity/ && java --version'
			    sh 'cd charity/ && mvn clean package'
		    }
	    }
	    
	    stage('Test') {
		    steps {
			    echo "Testing..."
			    sh 'cd charity/ && mvn test'
		    }
	    }
	    
	    // stage('Build/Push docker image'){
        //     steps{
        //         sh 'cd charity/ && docker build -t lephilong1907/charity:latest .'
        //         withCredentials([string(credentialsId: 'dockerhub', variable: 'dockerhub')]) { 
        //             sh 'docker login -u lephilong1907 -p ${dockerhub}'
                    
        //             sh 'docker push lephilong1907/charity:latest'
        //         }
        //     }
        // }

        stage('Deploy to K8s') {
        steps{
            echo "Deployment started ..."
            sh 'ls -ltr'
            sh 'pwd'
            echo "Start deployment of mysql-storage.yaml"
            step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'k8s-configurations/mysql-k8s/mysql-storage.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
            echo "Start deployment of mysql-config.yaml"
            step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'k8s-configurations/mysql-k8s/mysql-config.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
            echo "Start deployment of mysql-secret.yaml"
            step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'k8s-configurations/mysql-k8s/mysql-secret.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
            echo "Start deployment of mysql-deployment.yaml"
            step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'k8s-configurations/mysql-k8s/mysql-deployment.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
            echo "Start deployment of mysql-service.yaml"
            step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'k8s-configurations/mysql-k8s/mysql-service.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
            echo "Deployment Finished ..."
        }
}
	
    }
}