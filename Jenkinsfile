pipeline {
  agent {
    docker {
      image 'node:21.7.1'
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
        sh 'cd frontend && npm install'
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
