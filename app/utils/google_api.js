export const renderGoogleMap = (map, mapConfig, address) => {
  const googleMap = new google.maps.Map(map, mapConfig)
  const geocoder = new google.maps.Geocoder()

  return new Promise((resolve, reject) => {
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === 'OK') {
        const location = results[0].geometry.location

        googleMap.setCenter(location)

        // Pin Marker
        var marker = new google.maps.Marker({
          map: googleMap,
          position: location
        })

        // Circle
        // var circle = new google.maps.Circle({
        //   strokeColor: '#f2583d',
        //   strokeOpacity: 0.8,
        //   strokeWeight: 2,
        //   fillColor: '#f2583d',
        //   fillOpacity: 0.35,
        //   map: googleMap,
        //   center: results[0].geometry.location,
        //   radius: 2000
        // })

        console.log('Succeed to get location.')
        resolve({ msg: 'Succeed to get location.' })
      }

      reject({ msg: 'Failed to get location. Please enter the address specifically.' })
    })
  })
}
