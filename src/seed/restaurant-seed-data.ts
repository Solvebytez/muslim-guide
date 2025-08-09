import { Types } from 'mongoose';
import { Restaurant } from '../models/restaurant.model';

const userId = new Types.ObjectId('688b7c136d5719af9d016356');

// Base coordinates: Mississauga, ON area
const baseLatitude = 43.6;
const baseLongitude = -79.619;

// Function to generate random coordinates within a radius
function generateRandomCoordinates(centerLat: number, centerLng: number, radiusKm: number = 15) {
  const radiusInDegrees = radiusKm / 111; // Approximate conversion
  const u = Math.random();
  const v = Math.random();
  const w = radiusInDegrees * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);
  
  return [centerLng + x, centerLat + y]; // Reversed to [longitude, latitude]
}

// Restaurant seed data
export const restaurantSeedData = [
  {
    name: "Saraya Restaurant",
    cuisine: ['Jordanian', 'Middle Eastern'],
    image: null,
    contactName: "Dummy",
    contactEmail: "dummy001@example.com",
    address: "3465 Platinum Dr #100, Mississauga, ON L5M 7N4, Canada",
    rating: 4.2,
    userId: userId,
	suppliers: [
          "JJ Meat Distributing Ltd Montpak International"
    ],

    isApproved: "approved",
    location: {
      type: "Point",
      coordinates: [
        -79.7272819,
        43.5377415
      ]
    },
    googleMapsPlaceId: "ChIJO9gSgD5DK4gR7lUXJaAUG8k",
    googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJO9gSgD5DK4gR7lUXJaAUG8k",
    inWishlists: []
  },
  {
    name: "Xawaash Somali Mediterranean",
    cuisine: ['Somali', 'Mediterranean'],
    image: null,
    contactName: "Dummy",
    contactEmail: "dummy002@example.com",
    address: "80 Courtneypark Dr E Unit K3, Mississauga, ON L5T 2Y3, Canada",
    rating: 4.2,
    userId: userId,
	suppliers: [
          "Prime Halal Distributors"
    ],
    isApproved: "approved",
    location: {
      type: "Point",
      coordinates: [
        -79.6915506,
        43.6370788
      ]
    },
    googleMapsPlaceId: "ChIJLa-VPCw_K4gRXCtNqU_sgS0",
    googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJLa-VPCw_K4gRXCtNqU_sgS0",
    inWishlists: []
  },
  {
    name: "Tarboosh Restaurant",
    cuisine: ['Lebanese', 'Middle Eastern'],
    image: null,
    contactName: "Dummy",
    contactEmail: "dummy003@example.com",
    address: "3050 Confederation Pkwy, Mississauga, ON L5B 3Z6, Canada",
    rating: 4.2,
    userId: userId,
	suppliers: [
          "Pine Ridge Meat Packers"
    ],
    isApproved: "approved",
    location: {
      type: "Point",
      coordinates: [
        -79.6213775,
        43.5779025
      ]
    },
    googleMapsPlaceId: "ChIJ06YG0OVGK4gRkDGx8wTW_As",
    googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJ06YG0OVGK4gRkDGx8wTW_As",
    inWishlists: []
  },
  {
    name: "Mama Fatma Turkish Cuisine",
    cuisine: ['Turkish', 'Mediterranean'],
    image: null,
    contactName: "Dummy",
    contactEmail: "dummy004@example.com",
    address: "6970 Financial Dr Unit 1, Mississauga, ON L5N 0C2, Canada",
    rating: 4.2,
    userId: userId,
	suppliers: [
          "Bellwood Poultry"
    ],
    isApproved: "approved",
    location: {
      type: "Point",
      coordinates: [
        -79.7505103,
        43.6094484
      ]
    },
    googleMapsPlaceId: "ChIJgWWe7fNrK4gR8XTszVKkG9s",
    googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJgWWe7fNrK4gR8XTszVKkG9s",
    inWishlists: []
  },
  {
    name: "Eat Meat Turkish Smokehouse & BBQ",
    cuisine: ['Turkish', 'BBQ'],
    image: null,
    contactName: "Dummy",
    contactEmail: "dummy007@example.com",
    address: "534 Dundas St E, Mississauga, ON L4Y 2B7, Canada",
    rating: 4.2,
    userId: userId,
	suppliers: [
          "AA Halal Wholesale"
    ],
    isApproved: "approved",
    location: {
      type: "Point",
      coordinates: [
        -79.67275769999999,
        43.5317354
      ]
    },
    googleMapsPlaceId: "ChIJRTwCtkpDK4gRrEGAKRyXVB8",
    googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJRTwCtkpDK4gRrEGAKRyXVB8",
    inWishlists: []
  },
  {
    name: "Original Shawarma",
    cuisine: ['Middle Eastern', 'Shawarma'],
    image: null,
    contactName: "Dummy",
    contactEmail: "dummy008@example.com",
    address: "180 Queen St S, Mississauga, ON L5M 1L2, Canada",
    rating: 4.5,
    userId: userId,
	suppliers: [
          "AA Halal Wholesale"
    ],
    isApproved: "approved",
    location: {
      type: "Point",
      coordinates: [
        -79.65544419999999,
        43.57565169999999
      ]
    },
    googleMapsPlaceId: "ChIJrbRNbH9BK4gR6nWYdwVFa9w",
    googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJrbRNbH9BK4gR6nWYdwVFa9w",
    inWishlists: []
  },
  {
    name: "Tut’s Egyptian Street Food",
    cuisine: ['Egyptian', 'Street Food'],
    image: null,
    contactName: "Dummy",
    contactEmail: "dummy009@example.com",
    address: "3235 Mavis Rd Unit 2, Mississauga, ON L5C 1T7, Canada",
    rating: 4.2,
    userId: userId,
	suppliers: [
          "AA Halal Wholesale"
    ],
    isApproved: "approved",
    location: {
      type: "Point",
      coordinates: [
        -79.59245709999999,
        43.5898856
      ]
    },
    googleMapsPlaceId: "ChIJl5RRJ-ZHK4gRojPGDyDtLkI",
    googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJl5RRJ-ZHK4gRojPGDyDtLkI",
    inWishlists: []
  },
  {
    name: "Samaka Mediterranean Seafood",
    cuisine: ['Egyptian', 'Seafood'],
    image: null,
    contactName: "Dummy",
    contactEmail: "dummy010@example.com",
    address: "1890 Hurontario St Unit 101, Mississauga, ON L5A 4G2, Canada",
    rating: 4.7,
    userId: userId,
	suppliers: [
          "AA Halal Wholesale"
    ],
    isApproved: "approved",
    location: {
      type: "Point",
      coordinates: [
        -79.62310200000002,
        43.6363705
      ]
    },
    googleMapsPlaceId: "ChIJwb9RUiM5K4gR9wgnQDiSpdM",
    googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJwb9RUiM5K4gR9wgnQDiSpdM",
    inWishlists: []
  },
  {
    name: "Levant Restaurant",
    cuisine: ['Syrian', 'Middle Eastern'],
    image: null,
    contactName: "Dummy",
    contactEmail: "dummy011@example.com",
    address: "55 City Centre Dr Unit 254, Mississauga, ON L5B 2C9, Canada",
    rating: 3.6,
    userId: userId,
	suppliers: [
          "AA Halal Wholesale"
    ],
    isApproved: "approved",
    location: {
      type: "Point",
      coordinates: [
        -79.6414933,
        43.6009362
      ]
    },
    googleMapsPlaceId: "ChIJrRW83jBHK4gRJ3ea8686qfo",
    googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJrRW83jBHK4gRJ3ea8686qfo",
    inWishlists: []
  },
  {
    name: "Zauq Restaurant",
    cuisine: ['Pakistani', 'Middle Eastern'],
    image: null,
    contactName: "Dummy",
    contactEmail: "dummy012@example.com",
    address: "365 Burnhamthorpe Rd W Unit 109, Mississauga, ON L5B 0E4, Canada",
    rating: 4.1,
    userId: userId,
	suppliers: [
          "AA Halal Wholesale"
    ],
    isApproved: "approved",
    location: {
      type: "Point",
      coordinates: [
        -79.623577,
        43.6338313
      ]
    },
    googleMapsPlaceId: "ChIJERXHS5c4K4gRjv22337r-EY",
    googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJERXHS5c4K4gRjv22337r-EY",
    inWishlists: []
  },
  {
    name: "Al Forat Iraqi Street Food",
    cuisine: ['Iraqi', 'Street Food'],
    image: null,
    contactName: "Dummy",
    contactEmail: "dummy013@example.com",
    address: "24 Eglinton Ave E Unit 3, Mississauga, ON L5R 3A2, Canada",
    rating: 4.6,
    userId: userId,
	suppliers: [
          "AA Halal Wholesale"
    ],
    isApproved: "approved",
    location: {
      type: "Point",
      coordinates: [
        -79.7254845,
        43.5378051
      ]
    },
    googleMapsPlaceId: "ChIJm0Y6ufZDK4gRd62MJLctfj4",
    googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJm0Y6ufZDK4gRd62MJLctfj4",
    inWishlists: []
  },
  {
    name: "Monasaba",
    cuisine: ['Yemeni', 'Middle Eastern'],
    image: null,
    contactName: "Dummy",
    contactEmail: "dummy014@example.com",
    address: "27 Eglinton Ave E, Mississauga, ON L5R 3B5, Canada",
    rating: 4.5,
    userId: userId,
	suppliers: [
          "AA Halal Wholesale"
    ],
    isApproved: "approved",
    location: {
      type: "Point",
      coordinates: [
        -79.67237999999999,
        43.5320056
      ]
    },
    googleMapsPlaceId: "ChIJRWQzrcBDK4gRFSQaE75kBEA",
    googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJRWQzrcBDK4gRFSQaE75kBEA",
    inWishlists: []
  },
  {
    name: "Saraya (other)",
    cuisine: ['Middle Eastern'],
    image: null,
    contactName: "Dummy",
    contactEmail: "dummy015@example.com",
    address: "999 King St E, Mississauga, ON L5B 1A4, Canada",
    rating: 4.2,
    userId: userId,
	suppliers: [
          "AA Halal Wholesale"
    ],
    isApproved: "approved",
    location: {
      type: "Point",
      coordinates: [
        -79.7272819,
        43.5377415
      ]
    },
    googleMapsPlaceId: "ChIJO9gSgD5DK4gR7lUXJaAUG8k",
    googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJO9gSgD5DK4gR7lUXJaAUG8k",
    inWishlists: []
  },
  {
    name: "Shalal Mediterranean",
    cuisine: ['Lebanese', 'Mediterranean'],
    image: null,
    contactName: "Dummy",
    contactEmail: "dummy016@example.com",
    address: "35 Brunel Rd, Mississauga, ON L4Z 3E8, Canada",
    rating: 4.2,
    userId: userId,
	suppliers: [
          "AA Halal Wholesale"
    ],
    isApproved: "approved",
    location: {
      type: "Point",
      coordinates: [
        -79.67784499999999,
        43.62581
      ]
    },
    googleMapsPlaceId: "ChIJQwWIm55AK4gRlpyzPrtU3hk",
    googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJQwWIm55AK4gRlpyzPrtU3hk",
    inWishlists: []
  },
  {
    name: "Nafisa Authentic Middle Eastern Cuisine",
    cuisine: ['Lebanese', 'Turkish', 'Middle Eastern'],
    image: null,
    contactName: "Dummy",
    contactEmail: "dummy017@example.com",
    address: "117 Queen St S Unit 4 Mississauga, ON L5M 6B5",
    rating: 4,
    userId: userId,
	suppliers: [
          "AA Halal Wholesale"
    ],
    isApproved: "approved",
    location: {
      type: "Point",
      coordinates: [
        -79.7162097,
        43.5841948
      ]
    },
    googleMapsPlaceId: "ChIJE8pfUE9BK4gRGkjjmfMGN_s",
    googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJE8pfUE9BK4gRGkjjmfMGN_s",
    inWishlists: []
  },
  {
    name: "Eva Lounge",
    cuisine: ['Mediterranean', 'Halal'],
    image: null,
    contactName: "Dummy",
    contactEmail: "dummy018@example.com",
    address: "4560 Dixie Rd, Mississauga, ON L4W 1N2",
    rating: 4.2,
    userId: userId,
	suppliers: [
          "AA Halal Wholesale"
    ],
    isApproved: "approved",
    location: {
      type: "Point",
      coordinates: [
        -79.61788109999999,
        43.6330359
      ]
    },
    googleMapsPlaceId: "ChIJJXj2PxA5K4gRqp7A02k7pAk",
    googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJJXj2PxA5K4gRqp7A02k7pAk",
    inWishlists: []
  },
  {
    name: "Azkadenya Mississauga",
    cuisine: ['Lebanese', 'Mediterranean'],
    image: null,
    contactName: "Dummy",
    contactEmail: "dummy019@example.com",
    address: "6111 Erin Mills Pkwy Unit 3, Mississauga, ON L5N 0E9, Canada",
    rating: 4.2,
    userId: userId,
	suppliers: [
          "AA Halal Wholesale"
    ],
    isApproved: "approved",
    location: {
      type: "Point",
      coordinates: [
        -79.73582499999999,
        43.58086830000001
      ]
    },
    googleMapsPlaceId: "ChIJqaGdQ5hBK4gRuzmwBzRVDuo",
    googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJqaGdQ5hBK4gRuzmwBzRVDuo",
    inWishlists: []
  },
  {
    name: "Soltan Bakery",
    cuisine: ['Middle Eastern', 'Desserts'],
    image: null,
    contactName: "Dummy",
    contactEmail: "dummy021@example.com",
    address: "808 Britannia Rd W #109, Mississauga, ON L5V 0A7",
    rating: 4.7,
    userId: userId,
	suppliers: [
          "AA Halal Wholesale"
    ],
    isApproved: "approved",
    location: {
      type: "Point",
      coordinates: [
        -79.6968815,
        43.6099325
      ]
    },
    googleMapsPlaceId: "ChIJ00f2keVBK4gRBGpDTO4RzRs",
    googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJ00f2keVBK4gRBGpDTO4RzRs",
    inWishlists: []
  },
  {
    name: "Crown Pastries",
    cuisine: ['Syrian', 'Desserts'],
    image: null,
    contactName: "Dummy",
    contactEmail: "dummy022@example.com",
    address: "5083 Dixie Rd, Mississauga, ON L4W 0E6",
    rating: 4.4,
    userId: userId,
	suppliers: [
          "AA Halal Wholesale"
    ],
    isApproved: "approved",
    location: {
      type: "Point",
      coordinates: [
        -79.6220733,
        43.6382294
      ]
    },
    googleMapsPlaceId: "ChIJXei4LYs5K4gRDS1ncpnmUa8",
    googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJXei4LYs5K4gRDS1ncpnmUa8",
    inWishlists: []
  },
  {
    name: "Eat Meat",
    cuisine: ['Turkish', 'BBQ'],
    image: null,
    contactName: "Dummy",
    contactEmail: "dummy023@example.com",
    address: "2273 Dundas St W, Mississauga, ON L5K 2L8, Canada",
    rating: 4.2,
    userId: userId,
	suppliers: [
          "AA Halal Wholesale"
    ],
    isApproved: "approved",
    location: {
      type: "Point",
      coordinates: [
        -79.67275769999999,
        43.5317354
      ]
    },
    googleMapsPlaceId: "ChIJRTwCtkpDK4gRrEGAKRyXVB8",
    googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJRTwCtkpDK4gRrEGAKRyXVB8",
    inWishlists: []
  },
  {
    name: "East Tea Can",
    cuisine: ['Middle Eastern'],
    image: null,
    contactName: "Dummy",
    contactEmail: "dummy024@example.com",
    address: "3115 Winston Churchill Blvd, Mississauga, ON L5L 2W1, Canada",
    rating: 4.2,
    userId: userId,
	suppliers: [
          "AA Halal Wholesale"
    ],
    isApproved: "approved",
    location: {
      type: "Point",
      coordinates: [
        -79.6843059,
        43.5252474
      ]
    },
    googleMapsPlaceId: "ChIJLbInBLBDK4gR5Ywod3c9nM8",
    googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJLbInBLBDK4gR5Ywod3c9nM8",
    inWishlists: []
  },
  {
    name: "La Pita Halal Shawarma & Grill",
    cuisine: ['Middle Eastern', 'Shawarma'],
    image: null,
    contactName: "Dummy",
    contactEmail: "dummy026@example.com",
    address: "2003 Lakeshore Rd., Burlington, ON L7R 1A1, Canada",
    rating: 4.2,
    userId: userId,
	suppliers: [
          "AA Halal Wholesale"
    ],
    isApproved: "approved",
    location: {
      type: "Point",
      coordinates: [
        -79.7960579,
        43.32464590000001
      ]
    },
    googleMapsPlaceId: "ChIJn-QnqDqeLIgRh3yuQFNbRkg",
    googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJn-QnqDqeLIgRh3yuQFNbRkg",
    inWishlists: []
  },
  {
    name: "Shawarma Royale",
    cuisine: ['Syrian', 'Middle Eastern'],
    image: null,
    contactName: "Dummy",
    contactEmail: "dummy027@example.com",
    address: "6039 Erin Mills Pkwy, Mississauga, ON L5N 0G5, Canada",
    rating: 4.2,
    userId: userId,
	suppliers: [
          "AA Halal Wholesale"
    ],
    isApproved: "approved",
    location: {
      type: "Point",
      coordinates: [
        -79.7347046,
        43.5801484
      ]
    },
    googleMapsPlaceId: "ChIJJ1Bkm_xBK4gRuC6dPqGgXtA",
    googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJJ1Bkm_xBK4gRuC6dPqGgXtA",
    inWishlists: []
  },
  {
    name: "Laymoon Restaurant & Cafe",
    cuisine: ['Middle Eastern'],
    image: null,
    contactName: "Dummy",
    contactEmail: "dummy029@example.com",
    address: "7315 Yonge St, Thornhill, ON L3T 2B2, Canada",
    rating: 4.2,
    userId: userId,
	suppliers: [
          "AA Halal Wholesale"
    ],
    isApproved: "approved",
    location: {
      type: "Point",
      coordinates: [
        -79.4209425,
        43.8058002
      ]
    },
    googleMapsPlaceId: "ChIJ4z1loRktK4gRU7_lUb7R8XY",
    googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJ4z1loRktK4gRU7_lUb7R8XY",
    inWishlists: []
  },
  {
    name: "Sultan’s Wings & Kabob Shop",
    cuisine: ['Afghan', 'BBQ'],
    image: null,
    contactName: "Dummy",
    contactEmail: "dummy031@example.com",
    address: "1500 Upper Middle Rd, Burlington, ON L7P 3P5, Canada",
    rating: 4.2,
    userId: userId,
	suppliers: [
          "AA Halal Wholesale"
    ],
    isApproved: "approved",
    location: {
      type: "Point",
      coordinates: [
        -79.8449528,
        43.3559467
      ]
    },
    googleMapsPlaceId: "ChIJu3ShXhZiK4gRMKi3sLQQH4M",
    googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJu3ShXhZiK4gRMKi3sLQQH4M",
    inWishlists: []
  },
  {
    name: "Kebab-Tu Turkish Restaurant",
    cuisine: ['Turkish'],
    image: null,
    contactName: "Dummy",
    contactEmail: "dummy032@example.com",
    address: "186 Hamilton Rd, London, ON N6B 1N5, Canada",
    rating: 4.2,
    userId: userId,
	suppliers: [
          "AA Halal Wholesale"
    ],
    isApproved: "approved",
    location: {
      type: "Point",
      coordinates: [
        -81.22931129999999,
        42.9822244
      ]
    },
    googleMapsPlaceId: "ChIJzTJb8ijzLogR3tfqjwAeKsc",
    googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJzTJb8ijzLogR3tfqjwAeKsc",
    inWishlists: []
  },
  {
    name: "Istanbul Doner House",
    cuisine: ['Turkish'],
    image: null,
    contactName: "Dummy",
    contactEmail: "dummy033@example.com",
    address: "1201 Britannia Rd W, Mississauga, ON L5V 1N2, Canada",
    rating: 4.2,
    userId: userId,
	suppliers: [
          "AA Halal Wholesale"
    ],
    isApproved: "approved",
    location: {
      type: "Point",
      coordinates: [
        -79.7070462,
        43.6031231
      ]
    },
    googleMapsPlaceId: "ChIJpd2SPO5BK4gR5uhOQhu21GA",
    googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJpd2SPO5BK4gR5uhOQhu21GA",
    inWishlists: []
  },
  {
    name: "Manousha Inc",
    cuisine: ['Middle Eastern', 'Bakery'],
    image: null,
    contactName: "Dummy",
    contactEmail: "dummy035@example.com",
    address: "6039 Erin Mills Pkwy Unit #6, Mississauga, ON L5N 0G5, Canada",
    rating: 4.2,
    userId: userId,
	suppliers: [
          "AA Halal Wholesale"
    ],
    isApproved: "approved",
    location: {
      type: "Point",
      coordinates: [
        -79.7346858,
        43.5800965
      ]
    },
    googleMapsPlaceId: "ChIJldkgsE9BK4gRQPrergJhhzA",
    googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJldkgsE9BK4gRQPrergJhhzA",
    inWishlists: []
  },
  {
    name: "Karahi Boys",
    cuisine: ['Pakistani'],
    image: null,
    contactName: "Dummy",
    contactEmail: "dummy036@example.com",
    address: "5955 Latimer Dr, Mississauga, ON L5V 0B7, Canada",
    rating: 4.2,
    userId: userId,
	suppliers: [
          "AA Halal Wholesale"
    ],
    isApproved: "approved",
    location: {
      type: "Point",
      coordinates: [
        -79.6969702,
        43.6090265
      ]
    },
    googleMapsPlaceId: "ChIJSfl2sU5BK4gR-J9rMq6nJio",
    googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJSfl2sU5BK4gR-J9rMq6nJio",
    inWishlists: []
  },
  {
    name: "Karahi Point",
    cuisine: ['Pakistani'],
    image: null,
    contactName: "Dummy",
    contactEmail: "dummy037@example.com",
    address: "570 Kanata Ave., Ottawa, ON K2T 1H8, Canada",
    rating: 4.2,
    userId: userId,
	suppliers: [
          "AA Halal Wholesale"
    ],
    isApproved: "approved",
    location: {
      type: "Point",
      coordinates: [
        -75.9083756,
        45.3103194
      ]
    },
    googleMapsPlaceId: "ChIJr0l4oVMB0kwRtL6ZOzSuz2Y",
    googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJr0l4oVMB0kwRtL6ZOzSuz2Y",
    inWishlists: []
  },
  {
    name: "Lahore Tikka House",
    cuisine: ['Pakistani'],
    image: null,
    contactName: "Dummy",
    contactEmail: "dummy038@example.com",
    address: "1365 Gerrard St E, Toronto, ON M4L 1Z3, Canada",
    rating: 4.2,
    userId: userId,
	suppliers: [
          "AA Halal Wholesale"
    ],
    isApproved: "approved",
    location: {
      type: "Point",
      coordinates: [
        -79.3246025,
        43.6715172
      ]
    },
    googleMapsPlaceId: "ChIJSxC05IfL1IkR8ljOgpwnOIg",
    googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJSxC05IfL1IkR8ljOgpwnOIg",
    inWishlists: []
  },
  {
    name: "Zain Al-Sham",
    cuisine: ['Syrian'],
    image: null,
    contactName: "Dummy",
    contactEmail: "dummy040@example.com",
    address: "485 Morden Rd, Oakville, ON L6K 3W6, Canada",
    rating: 4.2,
    userId: userId,
	suppliers: [
          "AA Halal Wholesale"
    ],
    isApproved: "approved",
    location: {
      type: "Point",
      coordinates: [
        -79.701018,
        43.435661
      ]
    },
    googleMapsPlaceId: "ChIJ-y-b8YdCK4gR-y-b8YdCK4g",
    googleMapsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJ-y-b8YdCK4gR-y-b8YdCK4g",
    inWishlists: []
  }
];

// Function to seed the database
export const seedRestaurants = async () => {
  try {
    // Clear existing data
    await Restaurant.deleteMany({});
    console.log('Cleared existing restaurant data');
    
    // Insert new seed data
    const restaurants = await Restaurant.insertMany(restaurantSeedData);
    console.log(`Successfully seeded ${restaurants.length} restaurants`);
    
    return restaurants;
  } catch (error) {
    console.error('Error seeding restaurants:', error);
    throw error;
  }
};

export default restaurantSeedData;