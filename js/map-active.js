    var map;
    var latlng = new google.maps.LatLng(-23.4756713, -46.6196535);
    var stylez = [{
        featureType: "all",
        elementType: "all",
        stylers: [{
            saturation: -100
        }]
    }];
    var mapOptions = {
        zoom: 20,
        center: latlng,
        scrollwheel: true,
        scaleControl: true,
        disableDefaultUI: false,
        mapTypeControlOptions: {
            //mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'gMap']
        }
    };
    map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
    var geocoder_map = new google.maps.Geocoder();
    var address = 'Av. Água Fria, 1535, São Paulo - SP';
    geocoder_map.geocode({
        'address': address
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                icon: '/img/core-img/map.png',
                position: map.getCenter()
            });
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
    /*
    var mapType = new google.maps.StyledMapType(stylez, {
        name: "Grayscale"
    });
    */
    //map.mapTypes.set('gMap', mapType);
    //map.setMapTypeId('gMap');