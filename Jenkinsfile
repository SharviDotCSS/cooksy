pipeline {
    agent {
        kubernetes {
            yaml ''' 
            (keep pod YAML same unless teacher tells you to change)
            '''
        }
    }

    stages {

        stage('Build Backend Docker Image') {
            steps {
                container('dind') {
                    sh '''
                        docker build -t cooksy-backend:latest ./backend
                    '''
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                container('dind') {
                    sh '''
                        docker build -t cooksy-frontend:latest ./frontend
                    '''
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                container('sonar-scanner') {
                    withCredentials([string(credentialsId: 'token-for-2401017', variable: 'SONAR_TOKEN')]) {
                        sh '''
                            sonar-scanner \
                                -Dsonar.projectKey=2401017_cooksy \
                                -Dsonar.host.url=http://sonarqube.imcc.com \
                                -Dsonar.login=$SONAR_TOKEN \
                                -Dsonar.sources=./ \
                                -Dsonar.exclusions=**/node_modules/**,**/dist/**
                        '''
                    }
                }
            }
        }

        stage('Login to Docker Registry') {
            steps {
                container('dind') {
                    sh '''
                        docker login nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085 -u admin -p Changeme@2025
                    '''
                }
            }
        }

        stage('Tag & Push Images') {
            steps {
                container('dind') {
                    sh '''
                        docker tag cooksy-backend:latest nexus.imcc.com:808X/2401011_Cooksy/cooksy-backend:latest
                        docker tag cooksy-frontend:latest nexus.imcc.com:808X/2401011_Cooksy/cooksy-frontend:latest

                        docker push nexus.imcc.com:808X/2401011_Cooksy/cooksy-backend:latest
                        docker push nexus.imcc.com:808X/2401011_Cooksy/cooksy-frontend:latest
                    '''
                }
            }
        }

        stage('Deploy Cooksy Application') {
            steps {
                container('kubectl') {
                    script {
                        dir('k8s-deployment') {
                            sh '''
                                kubectl apply -f cooksy-all.yaml
                            '''
                        }
                    }
                }
            }
        }
    }
}
