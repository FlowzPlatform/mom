### usage ###


MONGODB=mongodb://obdev2:obdev123456@ds133311.mlab.com:33311/closeoutpromo SECRET=abcdefgabcdefg npm start



### Run Using Docker ###

docker run -p 3001:3001 --name microservices_auth -e MONGODB=mongodb://obdev2:obdev123456@ds133311.mlab.com:33311/closeoutpromo -e SECRET=abcdefgabcdefg obdev/microservices_for_auth