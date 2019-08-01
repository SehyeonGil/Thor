var markers=[];
function changeMap() {
    var mapCanvas = document.getElementById("map");
    var x=document.getElementById("entX").value;
    var y=document.getElementById("entY").value;
    var myCenter = new google.maps.LatLng(y, x);
    var marker = new google.maps.Marker({position:myCenter});
    var mapOptions = {
        center: myCenter,
        zoom: 14
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers=[];
    markers.push(marker);
    marker.setMap(map);

    google.maps.event.addListener(marker,'click',function() {
        map.setZoom(17);
        map.setCenter(marker.getPosition());
    });
}