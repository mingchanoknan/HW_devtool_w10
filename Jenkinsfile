  pipeline {
   agent any
   stages {
    stage('verify') {
        steps {
            sh '''
                docker info
                docker version
                docker compose version
                curl --version
            '''
        }
    }
    stage('logout') {
        steps {
            script {
                sh 'docker logout'
            }
        }
    }
    stage('login docker') {
        steps {
            script {
                sh 'docker login -u mingchanoknan -p dckr_pat_6bjeRHSv6XXqy6Z40TFEo4B3sxw'
            }
        }
    }
    stage('Build docker') {
        steps {
            dir('HW_devtool_w10') { // change directory to Lab_docker_Jenkins
                    sh 'docker-compose build'
                }
        }
    }
    stage('Push to docker hub') {
        steps {
            sh 'docker-compose push'
        }
    }
    stage('Trigger Slave') {
        steps {
            script {
                build job: 'slave'
                
            }
        }
    }
}
}