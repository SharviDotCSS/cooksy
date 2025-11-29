pipeline {
    agent {
        kubernetes {
            yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: sonar-scanner
    image: sonarsource/sonar-scanner-cli
    command: ["cat"]
    tty: true

  - name: kubectl
    image: bitnami/kubectl:latest
    command: ["cat"]
    tty: true
    securityContext:
      runAsUser: 0
      readOnlyRootFilesystem: false
    env:
    - name: KUBECONFIG
      value: /kube/config
    volumeMounts:
    - name: kubeconfig-secret
      mountPath: /kube/config
      subPath: kubeconfig

  - name: dind
    image: docker:dind
    securityContext:
      privileged: true
    env:
    - name: DOCKER_TLS_CERTDIR
      value: ""
    volumeMounts:
    - name: docker-config
      mountPath: /etc/docker/daemon.json
      subPath: daemon.json

  volumes:
  - name: docker-config
    configMap:
      name: docker-daemon-config

  - name: kubeconfig-secret
    secret:
      secretName: kubeconfig-secret
"""
        }
    }

    stages {

        /* ---------------------------------------------
            BUILD BACKEND DOCKER IMAGE
           --------------------------------------------- */
        stage('Build Backend Docker Image') {
            steps {
                container('dind') {
                    sh '''
                        echo "Building backend Docker image..."
                        docker build -t cooksy-backend:latest ./backend
                        docker image ls
                    '''
                }
            }
        }

        /* ---------------------------------------------
            BUILD FRONTEND DOCKER IMAGE
           --------------------------------------------- */
        stage('Build Frontend Docker Image') {
            steps {
                container('dind') {
                    sh '''
                        echo "Building frontend Docker image..."
                        docker build -t cooksy-frontend:latest ./frontend
                        docker image ls
                    '''
                }
            }
        }

        /* ---------------------------------------------
            SONARQUBE SCAN
           --------------------------------------------- */
        stage('SonarQube Analysis') {
            steps {
                container('sonar-scanner') {
                    withCredentials([string(credentialsId: 'token-for-2401017', variable: 'SONAR_TOKEN')]) {
                        sh '''
                            sonar-scanner \
                                -Dsonar.projectKey=2401017_tejasBhos \
                                -Dsonar.host.url=http://sonarqube.imcc.com \
                                -Dsonar.login=$SONAR_TOKEN \
                                -Dsonar.sources=./ \
                                -Dsonar.exclusions=**/node_modules/**,**/dist/**
                        '''
                    }
                }
            }
        }

        /* ---------------------------------------------
            LOGIN TO NEXUS DOCKER REPO
           --------------------------------------------- */
        stage('Login to Docker Registry') {
            steps {
                container('dind') {
                    sh '''
                        echo "Logging into Nexus Docker Registry..."
                        docker login nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085 \
                            -u admin \
                            -p Changeme@2025
                    '''
                }
            }
        }

        /* ---------------------------------------------
            TAG & PUSH DOCKER IMAGES TO NEXUS
           Your Nexus repo = 2401011_Cooksy
           --------------------------------------------- */
        stage('Tag & Push Images') {
            steps {
                container('dind') {
                    sh '''
                        echo "Tagging Cooksy images for Nexus..."
                        docker tag cooksy-backend:latest nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/2401011_Cooksy/cooksy-backend:latest
                        docker tag cooksy-frontend:latest nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/2401011_Cooksy/cooksy-frontend:latest

                        echo "Pushing images to Nexus..."
                        docker push nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/2401011_Cooksy/cooksy-backend:latest
                        docker push nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/2401011_Cooksy/cooksy-frontend:latest
                    '''
                }
            }
        }

        /* ---------------------------------------------
            KUBERNETES DEPLOYMENT
           --------------------------------------------- */
        stage('Deploy Cooksy Application') {
            steps {
                container('kubectl') {
                    script {
                        dir('k8s-deployment') {
                            sh '''
                                echo "Deploying Cooksy on Kubernetes..."
                                kubectl apply -f cooksy-all.yaml
                            '''
                        }
                    }
                }
            }
        }
    }
}
