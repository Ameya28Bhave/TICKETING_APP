# TICKETING_APP

This repo is created to implement a Ticketing app project.
This app is implemented using the concepts of Micro Service architecture.

We start with Authentication service. We create a pod for the Auth service in our Kubernetes cluster and configure a deployment and service which we can create and delete using skaffold.
First we have implemented Error Handling mechanism on our authentication. Three types of error will be handled in this app , first is the email and password validation which is incoming from the user. If the email or password fails validation then it will throw an error. Second is if there is some internal issue such as app is not able to connect to the db then it willl throw an error and the last is the path defined on the url. If the api route does not exists then it will throw a Not Found error. The Error Handler was created using a middleware that can handle any type of incomung errors and make them generic for the user, when it is sent as a response in the JSON format to the front-end framework.
