pipeline {
  agent {
    docker {
      image 'node:14-alpine'
    }
  }
  
  stages {
    stage('Checkout') {
      steps {
        git branch: 'dev', url: 'https://github.com/andreSturesson/PriceRunner-Project'
      }
    }
    
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }
    
    stage('Test') {
      steps {
        sh 'npm run test'
      }
    }
  }
}