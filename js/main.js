$(document).ready(function() {
	$('a[href^="#"]').click(function() {
		$('html, body').animate({
			scrollTop : $($(this).attr("href")).offset().top - 0
		}, 'slow');
		return false;
	});
	
    var markerSize = { x: 22, y: 40 };

    google.maps.Marker.prototype.setLabel = function(label){
        this.label = new MarkerLabel({
          map: this.map,
          marker: this,
          text: label
        });
        this.label.bindTo('position', this, 'position');
    };

    var MarkerLabel = function(options) {
        this.setValues(options);
        this.span = document.createElement('span');
        this.span.className = 'map-marker-label';
    };

    MarkerLabel.prototype = $.extend(new google.maps.OverlayView(), {
        onAdd: function() {
            this.getPanes().overlayImage.appendChild(this.span);
            var self = this;
            this.listeners = [
            google.maps.event.addListener(this, 'position_changed', function() { self.draw();    })];
        },
        draw: function() {
            var text = String(this.get('text'));
            var position = this.getProjection().fromLatLngToDivPixel(this.get('position'));
            this.span.innerHTML = text;
            //this.span.style.left = (position.x - (markerSize.x / 2)) - (text.length * 3) + 10 + 'px';
            //this.span.style.top = (position.y - markerSize.y + 40) + 'px';
            
            this.span.style.left = position.x + 10 + 'px';
            this.span.style.top = position.y -18+ 'px';
            
            if(text == "Cinéma Jacques Tati"){
            	this.span.style.left = position.x -125 + 'px';
            	this.span.style.top = position.y -18+ 'px';
            } 
        }
    });
    
	function initialize() {
		var myLatlng = new google.maps.LatLng(48.939665, 2.5708667);
		var mapOptions = {
			center : myLatlng,
			zoom : 14,
		    mapTypeControl: true,
		    mapTypeControlOptions: {
		        style: google.maps.MapTypeControlStyle.DEFAULT,
		        position: google.maps.ControlPosition.TOP_RIGHT
		    },
		    zoomControl: true,
		    zoomControlOptions: {
		        style: google.maps.ZoomControlStyle.DEFAULT,
		        position: google.maps.ControlPosition.RIGHT_BOTTOM
		    },
		    scaleControl: true,
		    streetViewControl: true,
		    streetViewControlOptions: {
		        position: google.maps.ControlPosition.RIGHT_BOTTOM
		    },
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			scrollwheel : false
		};
		
		
		var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		var marker = new google.maps.Marker({
			position : myLatlng,
			map : map,
			label : 'Casa Pizza',
      		icon: 'img/restaurant.png'
		});
		var infowindow = new google.maps.InfoWindow({
			content : '<strong>Casa Pizza</strong><br/>'+
						'50 Avenue du General de Gaulle, 93290 Vaujours<br/>'+
					'<a target="_blank" href="http://maps.google.com/maps?q=50+Avenue+du+General+de+Gaulle,+93290+Vaujours">Ouvrir dans Google Maps</a>'
		});
		google.maps.event.addListener(marker, 'click', function() {
		    infowindow.open(map,marker);
		  });
		
		var cinemaMarker = new google.maps.Marker({
		      position: new google.maps.LatLng(48.940971,2.570491),
		      map: map,
			label : 'Cinéma Jacques Tati',
      		icon: 'img/cinema.png'
		  });
		  
		 var clinikMarker = new google.maps.Marker({
		      position: new google.maps.LatLng(48.940946,2.572718),
		      map: map,
			label : 'Clinique du Vert Galant',
      		icon: 'img/clinique.png'
		  });
		  
		
		
	}
	google.maps.event.addDomListener(window, 'load', initialize);
}); 