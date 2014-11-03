

    var siteURL = 'x';
if (document.domain == 'localhost') siteURL = "x";

$(document).ready(function () {

    function render_map($el) {

        // Var
        var $markers = $el.find('.marker');

        // Vars
        var args = {
            center: new google.maps.LatLng(0, 0),
            backgroundColor: '#ffffff',
            zoom: 10,
            disableDefaultUI: true,
            zoomControl: false,
            disableDoubleClickZoom: true,
            panControl: false,
            mapTypeControl: false,
            scaleControl: false,
            scrollwheel: false,
            streetViewControl: false,
            draggable: true,
            overviewMapControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,

        };

        // Create map           
        var map = new google.maps.Map($el[0], args);
        
        // Add a markers reference
        map.markers = [];

        // Add markers
        $markers.each(function () {
            add_marker($(this), map);
        });

        // Center map
        center_map(map);
        
        return map;

    }
    
    function add_marker($marker, map) {

        // Var
        var latlng = new google.maps.LatLng($marker.attr('data-lat'), $marker.attr('data-lng'));
        var icon = null;
        
        // Marker icon designations
        if ($marker.data('type') == 'trolley') {
            icon = 'img/marker_trolley.png';
        } 
        if ($marker.data('type') == 'parking') {
            icon = 'img/marker_parking.png';
        } 
        if ($marker.data('type') == 'community') {
            icon = 'img/marker_community.png';
        } 
        if ($marker.data('type') == 'dining') {
            icon = 'img/marker_dining.png';
        } 
        if ($marker.data('type') == 'gallery') {
            icon = 'img/marker_gallery.png';
        } 
        if ($marker.data('type') == 'services') {
            icon = 'img/marker_services.png';
        } 
        if ($marker.data('type') == 'shopping') {
            icon = 'img/marker_shopping.png';
        } 
        if ($marker.data('type') == 'spirits') {
            icon = 'img/marker_spirits.png';
        } 
        
        
        
        var marker = new google.maps.Marker({
            icon: icon,
            position: latlng,
            map: map,
            // Custom property to hold the filters options, it's used below to filter the markers
            filter: {
                type: $marker.data('type')
            }

        });


        // Add to array
        map.markers.push(marker);

        if ($marker.html()) {
            // Create info window
            


            // Show info window when marker is clicked
            google.maps.event.addListener(marker, 'click', function () {
                console.log($marker.children().html());

                infobox.open(map, marker);
                infobox.setContent($marker.children().html());

                mapID = $marker.attr('id');
                $('.' + mapID).show();
            });

        }

    }

    function center_map(map) {

        // Vars
        var bounds = new google.maps.LatLngBounds();

        // Loop through all markers and create bounds
        $.each(map.markers, function (i, marker) {
            var latlng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
            bounds.extend(latlng);
        });
        map.fitBounds(bounds);

    }

    $(document).ready(function () {
        var map = null;
        
        $('.map-canvas').each(function () {
            map = render_map($(this));
        });
        
        // Filtering links click handler, it uses the filtering values (data-filterby and data-filtervalue)
        // to filter the markers based on the filter (custom) property set when the marker is created.
        $(document).on('click', '.filters a', function (event) {
            event.preventDefault();
            var $target = $(event.target);
            var type = $target.data('filterby');
            var value = $target.data('filtervalue');
            
            $.each(map.markers, function () {
                if (this.filter[type] == value) {
                    if (this.map == null) {
                        this.setMap(map);
                    }
                } else {
                    this.setMap(null);
                }
            });
        });
    });

});