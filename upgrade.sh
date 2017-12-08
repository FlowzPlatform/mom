curl -u ""$RANCHER_USER":"$RANCHER_PASS"" \
-X POST \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' \
-d '{
     "inServiceStrategy":{"launchConfig": {"imageUuid":"docker:obdev/mom_backend_flowz:dev","kind": "container","labels":{"io.rancher.scheduler.affinity:host_label": "machine=cluster-flowz"},"ports": ["3030:3030/tcp"],"version": "09d964c1-ec94-40e2-8157-fb5b77d31ac4"}},"toServiceStrategy":null}' \
'http://rancher.flowz.com:8080/v2-beta/projects/1a29/services/1s120?action=upgrade'
