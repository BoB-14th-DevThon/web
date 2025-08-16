pipeline {
    agent any

    environment {
        DISCORD = credentials('DISCORD_WEBHOOK')
    }

    stages {
        stage('Start Notification') {
            steps {
                script {
                    discordSend description: "젠킨스 배포를 시작합니다!", 
                        link: "${env.BUILD_URL}console", 
                        title: "${env.JOB_NAME} : ${currentBuild.displayName} 시작", 
                        webhookURL: env.DISCORD
                }
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh '''
                    docker build -t woo_frontend:latest .
                    '''
                }
            }
        }
    }

    post {
        success {
            discordSend description: """
                        제목 : ${currentBuild.displayName}
                        결과 : ${currentBuild.result}
                        실행 시간 : ${currentBuild.duration / 1000}s
                        """, 
                    footer: "빌드 성공!", 
                    link: "${env.BUILD_URL}console", result: currentBuild.currentResult, 
                    title: "${env.JOB_NAME} : ${currentBuild.displayName} 성공", 
                    webhookURL: env.DISCORD
        }
        failure {
            script {
                discordSend description: """
                        제목 : ${currentBuild.displayName}
                        결과 : ${currentBuild.result}
                        실행 시간 : ${currentBuild.duration / 1000}s
                        """, 
                    footer: "⚠️ 빌드 실패 : 상세 로그는 링크 들어가서 확인하세요 ⚠️", 
                    link: "${env.BUILD_URL}console", result: currentBuild.currentResult, 
                    title: "${env.JOB_NAME} : ${currentBuild.displayName} 실패", 
                    webhookURL: env.DISCORD
            }
        }
    }
}