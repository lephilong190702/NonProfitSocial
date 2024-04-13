FROM openjdk:17-jdk-alpine
WORKDIR /charity
EXPOSE 9090
COPY ./target/*.jar springbootserver.jar
ENTRYPOINT ["java", "-jar", "./springbootserver.jar"]