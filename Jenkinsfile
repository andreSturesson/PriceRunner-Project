pipeline {
  agent any
    
  tools {nodejs "node"}
  
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
