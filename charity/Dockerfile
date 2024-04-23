FROM openjdk:17-jdk-alpine
WORKDIR /charity
EXPOSE 9090
COPY ./target/*.jar charity.jar
ENTRYPOINT ["java", "-jar", "./charity.jar"]