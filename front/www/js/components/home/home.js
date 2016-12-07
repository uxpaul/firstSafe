((app) => {

  app.component('home', {
    templateUrl: 'js/components/home/home.html',
    controller: ["$state", "$compile", "$ionicModal", "$scope", "$http", function($state, $compile, $ionicModal, $scope, $http) {
      angular.extend(this, {
        $onInit() {

          let options = {
            maximumAge: 3000,
            timeout: 5000,
            enableHighAccuracy: true
          };
          let icon = {
            url: "img/ionic.png",
            scaledSize: new google.maps.Size(20, 20)
          }
          let origin;
          let destinations;
          let directionsService = new google.maps.DirectionsService();
          let directionsDisplay = new google.maps.DirectionsRenderer();
          let geocoder = new google.maps.Geocoder();

          this.sharkers = []

          this.calculateDistances = (destination) => {
            destinations = [destination]
            let service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix({
              origins: [origin], //array of origins
              destinations: destinations, //array of destinations
              travelMode: google.maps.TravelMode.WALKING,
              unitSystem: google.maps.UnitSystem.METRIC,
              avoidHighways: false,
              avoidTolls: false
            }, (response, status) => {
              if (status != google.maps.DistanceMatrixStatus.OK) {
                alert('Error was: ' + status);
              } else {
                //we only have one origin so there should only be one row
                let routes = response.rows[0].elements;
                let tmp = routes[0].duration.text;
                let resultText = `Position : ${response.destinationAddresses[0]}.<br> Temps prévu : ${tmp} <br/>`;

                document.getElementById("results").innerHTML = resultText;

                //map the route
                let request = {
                  origin: origin,
                  destination: destinations[0],
                  travelMode: google.maps.TravelMode.WALKING
                };

                // Display route in blue line
                directionsService.route(request, (result, status) => {
                  if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(result);
                  }
                });
              }

            })
          }

          // Get current position
          let onSuccess = (position) => {
            origin = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            let mapOptions = {
              center: origin,
              zoom: 15,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            let map = new google.maps.Map(document.getElementById('map'), mapOptions);

            let marker = new google.maps.Marker({
              map: map,
              animation: google.maps.Animation.DROP,
              position: origin,
              icon: icon
            });

            let circle = new google.maps.Circle({
              map: map,
              radius: 200,
              scale: 3000.0,
              strokeOpacity: 0.5,
              strokeWeight: 2,
              fillColor: '#02B875',
              strokeColor: '#3D9970'
            });

            circle.bindTo('center', marker, 'position'); //This will set the circle bound to the marker at center

            this.markers(map)
            directionsDisplay.setMap(map);
          }

          function onError(error) {
            console.log("Could not get location");
          };


          // Get current position
          navigator.geolocation.watchPosition(onSuccess, onError, options);

        },

        // Create markers
        markers(map) {
          $http.get('users.json').then((res) => {
            this.users = res.data.forEach((user) => {

              let latLng = new google.maps.LatLng(user.lat, user.lng);
              let icon = {
                url: user.image,
                scaledSize: new google.maps.Size(20, 20)

              }

              let marker = new google.maps.Marker({
                map: map,
                animation: google.maps.Animation.DROP,
                position: latLng,
                icon: icon
              });

              // Save new user's location
              this.sharkers.push(user)
                // Declare here, to close the marker when I click on an other
              this.infoWindow = new google.maps.InfoWindow();
              this.windows(marker, user)
            })
          })
        },

        // Set infoWindows of markers
        windows(marker, user) {

          let destination = marker.position
          let contentString = `<div>
                        <b> ${user.prenom} </b>
                        <img src="${user.image}" class="markerContent">
                        <a ui-sref="app.login" class="button button-small button-outline button-royal" >Voir profil</a>
                        </div>`;
          let compiled = $compile(contentString)($scope);
          let infoWindowContent = compiled[0]

          google.maps.event.addListener(marker, 'click', () => {
            this.infoWindow.setContent(infoWindowContent)
            this.infoWindow.open(map, marker);
            // pass marker's postion to calculateDistances()
            this.calculateDistances(destination)
          });

        }


      })
    }]
  })
})(angular.module('app.home'))