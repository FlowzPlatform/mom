node {
    def app,app1
    stage('Clone repository') {
       
        checkout scm
    }
    stage('Build image server') {
       app = docker.build("80017/serverfortodoapp","./server/")
    }
    stage('Push image server') {
            docker.withRegistry('https://registry.hub.docker.com', 'docker-hub') {
           
            app.push("${env.BUILD_NUMBER}")
           
            app.push("latest")
        }
    }
    
}
