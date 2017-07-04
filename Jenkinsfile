node {
    def app
    stage('Clone repository') {
       
        checkout scm
    }
    stage('Build image server') {
       app = docker.build("80017/ServerForTodoApp","./server/")
    }
    stage('Push image server') {
            docker.withRegistry('https://registry.hub.docker.com', 'docker-hub') {
           
            app.push("${env.BUILD_NUMBER}")
           
            app.push("latest")
        }
    }
    
}
