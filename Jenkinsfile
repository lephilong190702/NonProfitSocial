pipeline {
    agent any
    tools {
        maven "Maven"
    }
    
    environment {
        registryName = "nonprofit"
        registryCredential = 'ACR'
        registryUrl = 'nonprofit.azurecr.io'
        dockerImage=""
    }

    stages {
        stage('Checkout ') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/lephilong190702/NonProfitSocial.git']]);
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

        
        stage ("Deploy MySQL to K8S") {
            steps {
                echo "Deployment MySQL started ..."
                withKubeConfig(caCertificate: '', clusterName: '', contextName: '', credentialsId: 'K8S', namespace: '', restrictKubeConfigAccess: false, serverUrl: '') {
                sh "kubectl apply -f mysql-storage.yaml"
                sh "kubectl apply -f mysql-secret.yaml"
                sh "kubectl apply -f mysql-config.yaml"
                sh "kubectl apply -f mysql-deployment.yaml"
                sh "kubectl apply -f mysql-service.yaml"
                echo "Deployment MySQL Finished ..."
                }
            }
        }
        
        stage ("Deploy SpringBoot to K8S") {
            steps {
                echo "Deployment SpringBoot started ..."
                sh "sed -i 's/tagversion/${env.BUILD_ID}/g' server-deployment.yaml"
                withKubeConfig(caCertificate: '', clusterName: '', contextName: '', credentialsId: 'K8S', namespace: '', restrictKubeConfigAccess: false, serverUrl: '') {
                sh "kubectl apply -f server-deployment.yaml"
                sh "kubectl apply -f server-service.yaml"
                echo "Deployment SpringBoot Finished ..."
                }
            }
        }
        
        stage ("Deploy ReactJS to K8S") {
            steps {
                echo "Deployment ReactJS started ..."
                sh "sed -i 's/tagversion/${env.BUILD_ID}/g' client-deployment.yaml"
                withKubeConfig(caCertificate: '', clusterName: '', contextName: '', credentialsId: 'K8S', namespace: '', restrictKubeConfigAccess: false, serverUrl: '') {
                sh "kubectl apply -f client-deployment.yaml"
                sh "kubectl apply -f client-service.yaml"
                echo "Deployment ReactJS Finished ..."
                }
            }
        }
    }
}
