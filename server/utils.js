const axios = require('axios');
const search = (location, cb) => {
var key = process.env.YELP_API_KEY;

function searchTerm(term) {
  return axios({
    url: `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&limit=10&sort_by=rating`,
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + key
    }
  })
}

axios.all([searchTerm('restaurants'), searchTerm('hotels'), searchTerm('festivals')])
  .then(axios.spread(function (restaurantResponse, hotelResponse, festivalResponse) {
      cb(null, {
        restaurants: restaurantResponse.data.businesses,
        hotels: hotelResponse.data.businesses,
        events: festivalResponse.data.businesses
      })
    }))
  .catch(function (error) {
      console.log(error);
      cb(error, null);
    });
  }

module.exports.search = search;

// takes list of business info from Yelp API and extracts relevant data
// const filterBusinesses = (array) => {
//   return array.map((business) => {
//     return {
//       id: business.id,
//       name: business.name,
//       imageUrl: business.image_url,
//       url: business.url,
//       rating: business.rating,
//       price: business.price,
//       location: business.location
//     };
//   });
// };

// // takes list of event info from EventBrite API and extracts relevant data
// const filterEvents = (array) => {
//   const top10 = array.slice(0, 9);
//   return top10.map((event) => {
//     return {
//       id: event.id,
//       name: event.name.text,
//       imageUrl: event.logo.url,
//       url: event.url,
//       description: event.description.text,
//       start: event.start.local,
//       end: event.end.local
//     };
//   });
// };

// // makes GET request to specified API
// const getAxios = (queryURL, key, api, cb) => {
//   axios({
//     method: 'get',
//     url: queryURL,
//     headers: {
//       'Authorization': `Bearer ${key}`
//     },
//   })
//     .then((response) => {
//       if (api === 'yelp') {
//         cb(filterBusinesses(response.data.businesses));
//       }
//       if (api === 'eventBrite') {
//         cb(filterEvents(response.data.events));
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// // forms queryURL based on specified API and initiates GET request
// const getBusinessesOrEvents = (options, cb) => {
//   console.log('api: ', options.api);
//   let queryURL;
//   let key;
//   const params = options;
//   const { api } = params;

//   if (api === 'yelp') {
//     if (!options.categories) {
//       params.categories = '';
//     } else if (Array.isArray(options.categories)) {
//       params.categories = options.categories.join(',');
//     }

//     if (!options.price) {
//       params.price = '';
//     }

//     queryURL = `https://api.yelp.com/v3/businesses/search?term=${options.term}&categories=${options.categories}&location=${options.location}&price=${options.price}&limit=10&sort_by=rating`;
//     key = process.env.YELP_API_KEY;
//   }

//   if (api === 'eventBrite') {
//     queryURL = `https://www.eventbriteapi.com/v3/events/search/?q=concerts+festivals+shows&location.address=${options.location}&sort_by=date`;
//     key = process.env.EVENT_BRITE_API_KEY;
//   }

//   getAxios(queryURL, key, api, cb);
// };

// module.exports.getBusinessesOrEvents = getBusinessesOrEvents;
