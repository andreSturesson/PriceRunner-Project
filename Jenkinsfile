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
        sh 'cd frontend && npm run test'
        sh 'npm run build'
      }
    }
    
    stage('Test') {
      steps {
        sh 'cd frontend && npm run test'
      }
    }
  }
}
