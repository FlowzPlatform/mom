# curl -u ""$RANCHER_USER":"$RANCHER_PASS"" \
# -X POST \
# -H 'Accept: application/json' \
# -H 'Content-Type: application/json' \
# -d '{
#      "inServiceStrategy":{"launchConfig": {"imageUuid":"docker:obdev/mom_backend_flowz:master","kind": "container","labels":{"io.rancher.scheduler.affinity:host_label": "machine=cluster-flowz"},"ports": ["3030:3030/tcp","4030:4030/tcp"],"version": "09d964c1-ec94-40e2-8157-fb5b77d31ac4","environment": {"HOST": "'"$RDB_HOST"'","PORT": "'"$RDB_PORT"'","USERNAME": "'"$USERNAME"'","PASSWORD": "'"$PASSWORD"'"},"healthCheck": {"type": "instanceHealthCheck","healthyThreshold": 2,"initializingTimeout": 60000,"interval": 2000,"name": null,"port": 3030,"recreateOnQuorumStrategyConfig": {"type": "recreateOnQuorumStrategyConfig","quorum": 1},"reinitializingTimeout": 60000,"responseTimeout": 60000,"strategy": "recreateOnQuorum","unhealthyThreshold": 3},"networkMode": "managed"}},"toServiceStrategy":null}' \
# 'http://rancher.flowz.com:8080/v2-beta/projects/1a29/services/1s120?action=upgrade'
#
# # curl -u ""$RANCHER_USER":"$RANCHER_PASS"" \
# # -X POST \
# # -H 'Accept: application/json' \
# # -H 'Content-Type: application/json' \
# # -d '{
# #      "inServiceStrategy":{"launchConfig": {"imageUuid":"docker:obdev/mom_frontend_flowz:master","kind": "container","labels":{"io.rancher.container.pull_image": "always","io.rancher.scheduler.affinity:host_label": "machine=mom-front","io.rancher.scheduler.affinity:container_label_soft_ne": "io.rancher.stack_service.name=front-flowz/mom-frontend-flowz"},"ports": ["80:80/tcp"],"version": "60a25876-dc70-451a-9c63-45e011d481c9","healthCheck": {"type": "instanceHealthCheck","healthyThreshold": 2,"initializingTimeout": 60000,"interval": 2000,"name": null,"port": 80,"recreateOnQuorumStrategyConfig": {"type": "recreateOnQuorumStrategyConfig","quorum": 1},"reinitializingTimeout": 60000,"requestLine": "GET \"http://localhost\" \"HTTP/1.0\"","responseTimeout": 60000,"strategy": "recreateOnQuorum","unhealthyThreshold": 3},"networkMode": "managed"}},"toServiceStrategy":null}' \
# # 'http://rancher.flowz.com:8080/v2-beta/projects/1a29/services/1s302?action=upgrade'



if [ "$TRAVIS_BRANCH" = "master" ]
then
    {
    echo "call $TRAVIS_BRANCH branch"
    ENV_ID=`curl -u ""$RANCHER_USER":"$RANCHER_PASS"" -X GET -H 'Accept: application/json' -H 'Content-Type: application/json' "http://rancher.flowz.com:8080/v2-beta/projects?name=Production" | jq '.data[].id' | tr -d '"'`
    echo $ENV_ID
    USERNAME="$DOCKER_USERNAME_FLOWZ";
    TAG="latest";
    FRONT_HOST="$FRONT_HOST_MASTER";
  }
elif [ "$TRAVIS_BRANCH" = "develop" ]
then
    {
      echo "call $TRAVIS_BRANCH branch"
      ENV_ID=`curl -u ""$RANCHER_USER":"$RANCHER_PASS"" -X GET -H 'Accept: application/json' -H 'Content-Type: application/json' "http://rancher.flowz.com:8080/v2-beta/projects?name=Develop" | jq '.data[].id' | tr -d '"'`
      echo $ENV_ID
      USERNAME="$DOCKER_USERNAME";
      TAG="dev";
      FRONT_HOST="$FRONT_HOST_DEVELOP";
  }
else
  {
      echo "call $TRAVIS_BRANCH branch"
      ENV_ID=`curl -u ""$RANCHER_USER":"$RANCHER_PASS"" -X GET -H 'Accept: application/json' -H 'Content-Type: application/json' "http://rancher.flowz.com:8080/v2-beta/projects?name=QA" | jq '.data[].id' | tr -d '"'`
      echo $ENV_ID
      USERNAME="$DOCKER_USERNAME";
      TAG="qa";
      FRONT_HOST="$FRONT_HOST_QA";
  }
fi

SERVICE_ID_BACKEND=`curl -u ""$RANCHER_USER":"$RANCHER_PASS"" -X GET -H 'Accept: application/json' -H 'Content-Type: application/json' "http://rancher.flowz.com:8080/v2-beta/projects/$ENV_ID/services?name=mom-backend-flowz" | jq '.data[].id' | tr -d '"'`
echo $SERVICE_ID_BACKEND

SERVICE_ID_FRONTEND=`curl -u ""$RANCHER_USER":"$RANCHER_PASS"" -X GET -H 'Accept: application/json' -H 'Content-Type: application/json' "http://rancher.flowz.com:8080/v2-beta/projects/$ENV_ID/services?name=mom-frontend-flowz" | jq '.data[].id' | tr -d '"'`
echo $SERVICE_ID_FRONTEND

curl -u ""$RANCHER_USER":"$RANCHER_PASS"" \
-X POST \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' \
-d '{
     "inServiceStrategy":{"launchConfig": {"imageUuid":"docker:'$USERNAME'/mom_backend_flowz:'$TAG'","kind": "container","labels":{ "io.rancher.container.pull_image": "always","io.rancher.scheduler.affinity:host_label": "machine=cluster-flowz"},"ports": ["3030:3030/tcp","4030:4030/tcp"],"environment": {"HOST": "'"$RDB_HOST"'","PORT": "'"$RDB_PORT"'","USERNAME": "'"$USERNAME_ENV"'","PASSWORD": "'"$PASSWORD"'"},"healthCheck": {"type": "instanceHealthCheck","healthyThreshold": 2,"initializingTimeout": 60000,"interval": 2000,"name": null,"port": 3030,"recreateOnQuorumStrategyConfig": {"type": "recreateOnQuorumStrategyConfig","quorum": 1},"reinitializingTimeout": 60000,"responseTimeout": 60000,"strategy": "recreateOnQuorum","unhealthyThreshold": 3},"networkMode": "managed"}},"toServiceStrategy":null}' \
http://rancher.flowz.com:8080/v2-beta/projects/$ENV_ID/services/$SERVICE_ID_BACKEND?action=upgrade


curl -u ""$RANCHER_USER":"$RANCHER_PASS"" \
-X POST \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' \
-d '{
     "inServiceStrategy":{"launchConfig": {"imageUuid":"docker:'$USERNAME'/mom_frontend_flowz:'$TAG'","kind": "container","labels":{"io.rancher.container.pull_image": "always","io.rancher.scheduler.affinity:host_label": "machine=$FRONT_HOST","io.rancher.scheduler.affinity:container_label_soft_ne": "io.rancher.stack_service.name=front-flowz/mom-frontend-flowz"},"healthCheck": {"type": "instanceHealthCheck","healthyThreshold": 2,"initializingTimeout": 60000,"interval": 2000,"name": null,"port": 80,"recreateOnQuorumStrategyConfig": {"type": "recreateOnQuorumStrategyConfig","quorum": 1},"reinitializingTimeout": 60000,"requestLine": "GET \"http://localhost\" \"HTTP/1.0\"","responseTimeout": 60000,"strategy": "recreateOnQuorum","unhealthyThreshold": 3},"networkMode": "managed"}},"toServiceStrategy":null}' \
http://rancher.flowz.com:8080/v2-beta/projects/$ENV_ID/services/$SERVICE_ID_FRONTEND?action=upgrade
