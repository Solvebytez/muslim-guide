import { Types } from 'mongoose';
import { Restaurant } from '../models/restaurant.model';


const userId = new Types.ObjectId('6868e198eeb146674603462e');
const suppliers =   ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"];

// Base coordinates: 37.4219983, -122.084 (Palo Alto, CA area)
const baseLatitude = 37.4219983;
const baseLongitude = -122.084;

// Function to generate random coordinates within a radius
function generateRandomCoordinates(centerLat: number, centerLng: number, radiusKm: number = 15) {
  const radiusInDegrees = radiusKm / 111; // Approximate conversion
  const u = Math.random();
  const v = Math.random();
  const w = radiusInDegrees * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);
  
  return [centerLng + x, centerLat + y];
}

// Restaurant seed data
const restaurantSeedData = [
  {
    name: "Spice Palace",
    cuisine: ["North Indian", "Mughlai (kebabs, biryani, butter chicken)"],
    contactName: "Rajesh Kumar",
    contactEmail: "rajesh@spicepalace.com",
    address: "1234 El Camino Real, Palo Alto, CA 94301",
    rating: 4.5,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
    googleMapsUrl: "https://maps.google.com/?cid=12345"
  },
  {
    name: "Tandoor Express",
    cuisine: ["Punjabi (tandoori, curries, naan)"],
    contactName: "Priya Singh",
    contactEmail: "priya@tandoorexpress.com",
    address: "2567 University Ave, Palo Alto, CA 94301",
    rating: 4.2,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frY5",
    googleMapsUrl: "https://maps.google.com/?cid=12346"
  },
  {
    name: "Lucknowi Delights",
    cuisine: ["Awadhi / Lucknowi cuisine"],
    contactName: "Mohammad Ali",
    contactEmail: "ali@lucknowidelights.com",
    address: "789 Forest Ave, Palo Alto, CA 94301",
    rating: 4.7,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frY6",
    googleMapsUrl: "https://maps.google.com/?cid=12347"
  },
  {
    name: "Delhi Street Kitchen",
    cuisine: ["Delhi street food (chaat, kebabs, korma)"],
    contactName: "Vikram Sharma",
    contactEmail: "vikram@delhistreet.com",
    address: "456 California Ave, Palo Alto, CA 94306",
    rating: 4.3,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frY7",
    googleMapsUrl: "https://maps.google.com/?cid=12348"
  },
  {
    name: "South Spice Haven",
    cuisine: ["South Indian"],
    contactName: "Lakshmi Menon",
    contactEmail: "lakshmi@southspice.com",
    address: "321 Middlefield Rd, Palo Alto, CA 94301",
    rating: 4.6,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frY8",
    googleMapsUrl: "https://maps.google.com/?cid=12349"
  },
  {
    name: "Hyderabadi Biryani House",
    cuisine: ["Hyderabadi"],
    contactName: "Farhan Ahmed",
    contactEmail: "farhan@hyderabadi.com",
    address: "654 Embarcadero Rd, Palo Alto, CA 94301",
    rating: 4.8,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frY9",
    googleMapsUrl: "https://maps.google.com/?cid=12350"
  },
  {
    name: "Tamil Muslim Cuisine",
    cuisine: ["Tamil Muslim cuisine (sukka, paya, kari dosa)"],
    contactName: "Abdul Rahman",
    contactEmail: "abdul@tamilmuslim.com",
    address: "987 Page Mill Rd, Palo Alto, CA 94304",
    rating: 4.4,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frZ0",
    googleMapsUrl: "https://maps.google.com/?cid=12351"
  },
  {
    name: "Kerala Malabar Kitchen",
    cuisine: ["Kerala Muslim cuisine (malabar parotta, pathiri, beef fry)"],
    contactName: "Rasheed Kutty",
    contactEmail: "rasheed@keralamalabar.com",
    address: "147 Alma St, Palo Alto, CA 94301",
    rating: 4.5,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frZ1",
    googleMapsUrl: "https://maps.google.com/?cid=12352"
  },
  {
    name: "Andhra Spice Zone",
    cuisine: ["Andhra spicy dishes (chicken 65, haleem)"],
    contactName: "Suresh Reddy",
    contactEmail: "suresh@andhraspice.com",
    address: "258 High St, Palo Alto, CA 94301",
    rating: 4.1,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frZ2",
    googleMapsUrl: "https://maps.google.com/?cid=12353"
  },
  {
    name: "Pakistani Karahi Corner",
    cuisine: ["Pakistani", "Karahi, nihari, paya, kababs, biryani"],
    contactName: "Imran Khan",
    contactEmail: "imran@pakistanikarahi.com",
    address: "369 Lytton Ave, Palo Alto, CA 94301",
    rating: 4.6,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frZ3",
    googleMapsUrl: "https://maps.google.com/?cid=12354"
  },
  {
    name: "Dhaka Delicacies",
    cuisine: ["Bangladeshi", "Bhuna khichuri, beef rezala, kacchi biryani"],
    contactName: "Karim Uddin",
    contactEmail: "karim@dhakadelicacies.com",
    address: "741 Ramona St, Palo Alto, CA 94301",
    rating: 4.3,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frZ4",
    googleMapsUrl: "https://maps.google.com/?cid=12355"
  },
  {
    name: "Kabuli Restaurant",
    cuisine: ["Afghan", "Kabuli pulao, mantu, kebabs"],
    contactName: "Ahmad Shah",
    contactEmail: "ahmad@kabuli.com",
    address: "852 Homer Ave, Palo Alto, CA 94301",
    rating: 4.4,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frZ5",
    googleMapsUrl: "https://maps.google.com/?cid=12356"
  },
  {
    name: "Mughal Empire",
    cuisine: ["Mughlai (kebabs, biryani, butter chicken)", "North Indian"],
    contactName: "Arjun Kapoor",
    contactEmail: "arjun@mughalempire.com",
    address: "963 Channing Ave, Palo Alto, CA 94301",
    rating: 4.7,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frZ6",
    googleMapsUrl: "https://maps.google.com/?cid=12357"
  },
  {
    name: "Punjab Dhaba",
    cuisine: ["Punjabi (tandoori, curries, naan)"],
    contactName: "Gurpreet Singh",
    contactEmail: "gurpreet@punjabdhaba.com",
    address: "174 Webster St, Palo Alto, CA 94301",
    rating: 4.2,
    distanceUnit: "km",
    userId: userId,
    isApproved: "pending",

 suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frZ7",
    googleMapsUrl: "https://maps.google.com/?cid=12358"
  },
  {
    name: "Nawabi Kitchen",
    cuisine: ["Awadhi / Lucknowi cuisine"],
    contactName: "Zara Begum",
    contactEmail: "zara@nawabi.com",
    address: "285 Kipling St, Palo Alto, CA 94301",
    rating: 4.5,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frZ8",
    googleMapsUrl: "https://maps.google.com/?cid=12359"
  },
  {
    name: "Chaat Corner",
    cuisine: ["Delhi street food (chaat, kebabs, korma)"],
    contactName: "Amit Gupta",
    contactEmail: "amit@chaatcorner.com",
    address: "396 Kingsley Ave, Palo Alto, CA 94301",
    rating: 4.0,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frZ9",
    googleMapsUrl: "https://maps.google.com/?cid=12360"
  },
  {
    name: "Dosa Palace",
    cuisine: ["South Indian"],
    contactName: "Ravi Krishnan",
    contactEmail: "ravi@dosapalace.com",
    address: "507 Cowper St, Palo Alto, CA 94301",
    rating: 4.3,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frA0",
    googleMapsUrl: "https://maps.google.com/?cid=12361"
  },
  {
    name: "Nizami Biryani",
    cuisine: ["Hyderabadi"],
    contactName: "Salman Nizami",
    contactEmail: "salman@nizami.com",
    address: "618 Waverley St, Palo Alto, CA 94301",
    rating: 4.8,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frA1",
    googleMapsUrl: "https://maps.google.com/?cid=12362"
  },
  {
    name: "Chettinad Express",
    cuisine: ["Tamil Muslim cuisine (sukka, paya, kari dosa)"],
    contactName: "Naseema Banu",
    contactEmail: "naseema@chettinad.com",
    address: "729 Forest Ave, Palo Alto, CA 94301",
    rating: 4.4,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frA2",
    googleMapsUrl: "https://maps.google.com/?cid=12363"
  },
  {
    name: "Malabar Coast",
    cuisine: ["Kerala Muslim cuisine (malabar parotta, pathiri, beef fry)"],
    contactName: "Rafeeque Master",
    contactEmail: "rafeeque@malabarcoast.com",
    address: "830 Addison Ave, Palo Alto, CA 94301",
    rating: 4.6,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frA3",
    googleMapsUrl: "https://maps.google.com/?cid=12364"
  },
  {
    name: "Spicy Andhra",
    cuisine: ["Andhra spicy dishes (chicken 65, haleem)"],
    contactName: "Venkat Rao",
    contactEmail: "venkat@spicyandhra.com",
    address: "941 Bryant St, Palo Alto, CA 94301",
    rating: 4.1,
    distanceUnit: "km",
    userId: userId,
    isApproved: "rejected",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frA4",
    googleMapsUrl: "https://maps.google.com/?cid=12365"
  },
  {
    name: "Lahore Nights",
    cuisine: ["Pakistani", "Karahi, nihari, paya, kababs, biryani"],
    contactName: "Tariq Malik",
    contactEmail: "tariq@lahorenights.com",
    address: "152 Sherman Ave, Palo Alto, CA 94306",
    rating: 4.5,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frA5",
    googleMapsUrl: "https://maps.google.com/?cid=12366"
  },
  {
    name: "Bangla Feast",
    cuisine: ["Bangladeshi", "Bhuna khichuri, beef rezala, kacchi biryani"],
    contactName: "Shahid Hasan",
    contactEmail: "shahid@banglafeast.com",
    address: "263 Lincoln Ave, Palo Alto, CA 94301",
    rating: 4.2,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frA6",
    googleMapsUrl: "https://maps.google.com/?cid=12367"
  },
  {
    name: "Afghan Grill",
    cuisine: ["Afghan", "Kabuli pulao, mantu, kebabs"],
    contactName: "Nasir Ahmad",
    contactEmail: "nasir@afghangrill.com",
    address: "374 California Ave, Palo Alto, CA 94306",
    rating: 4.3,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frA7",
    googleMaksUrl: "https://maps.google.com/?cid=12368"
  },
  {
    name: "Royal Mughal",
    cuisine: ["Mughlai (kebabs, biryani, butter chicken)"],
    contactName: "Deepak Malhotra",
    contactEmail: "deepak@royalmughal.com",
    address: "485 Middlefield Rd, Palo Alto, CA 94301",
    rating: 4.7,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frA8",
    googleMapsUrl: "https://maps.google.com/?cid=12369"
  },
  {
    name: "Amritsar Junction",
    cuisine: ["Punjabi (tandoori, curries, naan)"],
    contactName: "Jasbir Kaur",
    contactEmail: "jasbir@amritsarjunction.com",
    address: "596 Embarcadero Rd, Palo Alto, CA 94301",
    rating: 4.4,
    distanceUnit: "km",
    userId: userId,
    isApproved: "pending",

 suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frA9",
    googleMapsUrl: "https://maps.google.com/?cid=12370"
  },
  {
    name: "Lucknow Central",
    cuisine: ["Awadhi / Lucknowi cuisine"],
    contactName: "Faizal Ahmed",
    contactEmail: "faizal@lucknowcentral.com",
    address: "607 Page Mill Rd, Palo Alto, CA 94304",
    rating: 4.6,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frB0",
    googleMapsUrl: "https://maps.google.com/?cid=12371"
  },
  {
    name: "Delhi Darbar",
    cuisine: ["Delhi street food (chaat, kebabs, korma)"],
    contactName: "Rohit Aggarwal",
    contactEmail: "rohit@delhidarbar.com",
    address: "718 Alma St, Palo Alto, CA 94301",
    rating: 4.1,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frB1",
    googleMapsUrl: "https://maps.google.com/?cid=12372"
  },
  {
    name: "Madras Meals",
    cuisine: ["South Indian"],
    contactName: "Kamala Devi",
    contactEmail: "kamala@madrasmeals.com",
    address: "829 High St, Palo Alto, CA 94301",
    rating: 4.5,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frB2",
    googleMapsUrl: "https://maps.google.com/?cid=12373"
  },
  {
    name: "Deccan Delights",
    cuisine: ["Hyderabadi"],
    contactName: "Asif Ali",
    contactEmail: "asif@deccandelights.com",
    address: "930 Lytton Ave, Palo Alto, CA 94301",
    rating: 4.8,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frB3",
    googleMapsUrl: "https://maps.google.com/?cid=12374"
  },
  {
    name: "Arcot Palace",
    cuisine: ["Tamil Muslim cuisine (sukka, paya, kari dosa)"],
    contactName: "Yasmeen Sultana",
    contactEmail: "yasmeen@arcotpalace.com",
    address: "141 Ramona St, Palo Alto, CA 94301",
    rating: 4.3,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frB4",
    googleMapsUrl: "https://maps.google.com/?cid=12375"
  },
  {
    name: "Kozhikode Kitchen",
    cuisine: ["Kerala Muslim cuisine (malabar parotta, pathiri, beef fry)"],
    contactName: "Ibrahim Kutty",
    contactEmail: "ibrahim@kozhikode.com",
    address: "252 Homer Ave, Palo Alto, CA 94301",
    rating: 4.7,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frB5",
    googleMapsUrl: "https://maps.google.com/?cid=12376"
  },
  {
    name: "Guntur Grill",
    cuisine: ["Andhra spicy dishes (chicken 65, haleem)"],
    contactName: "Ramesh Babu",
    contactEmail: "ramesh@guntur.com",
    address: "363 Channing Ave, Palo Alto, CA 94301",
    rating: 4.0,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frB6",
    googleMapsUrl: "https://maps.google.com/?cid=12377"
  },
  {
    name: "Karachi Kitchen",
    cuisine: ["Pakistani", "Karahi, nihari, paya, kababs, biryani"],
    contactName: "Bilal Sheikh",
    contactEmail: "bilal@karachi.com",
    address: "474 Webster St, Palo Alto, CA 94301",
    rating: 4.4,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frB7",
    googleMapsUrl: "https://maps.google.com/?cid=12378"
  },
  {
    name: "Sylhet Spice",
    cuisine: ["Bangladeshi", "Bhuna khichuri, beef rezala, kacchi biryani"],
    contactName: "Mizanur Rahman",
    contactEmail: "mizan@sylhetspice.com",
    address: "585 Kipling St, Palo Alto, CA 94301",
    rating: 4.2,
    distanceUnit: "km",
    userId: userId,
    isApproved: "pending",

 suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frB8",
    googleMapsUrl: "https://maps.google.com/?cid=12379"
  },
  {
    name: "Kandahar Kebabs",
    cuisine: ["Afghan", "Kabuli pulao, mantu, kebabs"],
    contactName: "Waheed Khan",
    contactEmail: "waheed@kandahar.com",
    address: "696 Kingsley Ave, Palo Alto, CA 94301",
    rating: 4.5,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frB9",
    googleMapsUrl: "https://maps.google.com/?cid=12380"
  },
  {
    name: "Bawarchi Biryani",
    cuisine: ["Mughlai (kebabs, biryani, butter chicken)", "Hyderabadi"],
    contactName: "Nasreen Begum",
    contactEmail: "nasreen@bawarchi.com",
    address: "707 Cowper St, Palo Alto, CA 94301",
    rating: 4.6,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frC0",
    googleMapsUrl: "https://maps.google.com/?cid=12381"
  },
  {
    name: "Chandigarh Chowk",
    cuisine: ["Punjabi (tandoori, curries, naan)"],
    contactName: "Harpreet Kaur",
    contactEmail: "harpreet@chandigarhchowk.com",
    address: "818 Waverley St, Palo Alto, CA 94301",
    rating: 4.3,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frC1",
    googleMapsUrl: "https://maps.google.com/?cid=12382"
  },
  {
    name: "Awadhi Express",
    cuisine: ["Awadhi / Lucknowi cuisine"],
    contactName: "Shakeel Ahmad",
    contactEmail: "shakeel@awadhi.com",
    address: "929 Forest Ave, Palo Alto, CA 94301",
    rating: 4.4,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frC2",
    googleMapsUrl: "https://maps.google.com/?cid=12383"
  },
  {
    name: "Chandni Chowk",
    cuisine: ["Delhi street food (chaat, kebabs, korma)"],
    contactName: "Sanjay Jain",
    contactEmail: "sanjay@chandnichowk.com",
    address: "130 Addison Ave, Palo Alto, CA 94301",
    rating: 4.2,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frC3",
    googleMapsUrl: "https://maps.google.com/?cid=12384"
  },
  {
    name: "Bangalore Bites",
    cuisine: ["South Indian"],
    contactName: "Meera Srinivasan",
    contactEmail: "meera@bangalorebites.com",
    address: "241 Bryant St, Palo Alto, CA 94301",
    rating: 4.5,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frC4",
    googleMapsUrl: "https://maps.google.com/?cid=12385"
  },
  {
    name: "Paradise Biryani",
    cuisine: ["Hyderabadi"],
    contactName: "Mohsin Khan",
    contactEmail: "mohsin@paradisebiryani.com",
    address: "352 Sherman Ave, Palo Alto, CA 94306",
    rating: 4.9,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frC5",
    googleMapsUrl: "https://maps.google.com/?cid=12386"
  },
  {
    name: "Dindigul Thalappakatti",
    cuisine: ["Tamil Muslim cuisine (sukka, paya, kari dosa)"],
    contactName: "Muthu Nagappan",
    contactEmail: "muthu@dindigul.com",
    address: "463 Lincoln Ave, Palo Alto, CA 94301",
    rating: 4.6,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frC6",
    googleMapsUrl: "https://maps.google.com/?cid=12387"
  },
  {
    name: "Calicut Cuisine",
    cuisine: ["Kerala Muslim cuisine (malabar parotta, pathiri, beef fry)"],
    contactName: "Muneer Ali",
    contactEmail: "muneer@calicut.com",
    address: "574 California Ave, Palo Alto, CA 94306",
    rating: 4.4,
    distanceUnit: "km",
    userId: userId,
    isApproved: "rejected",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frC7",
    googleMapsUrl: "https://maps.google.com/?cid=12388"
  },
  {
    name: "Vijayawada Flavors",
    cuisine: ["Andhra spicy dishes (chicken 65, haleem)"],
    contactName: "Lakshmi Prasad",
    contactEmail: "lakshmi@vijayawada.com",
    address: "685 Middlefield Rd, Palo Alto, CA 94301",
    rating: 4.1,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
    suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frC8",
    googleMapsUrl: "https://maps.google.com/?cid=12389"
  },
  {
    name: "Peshawar Palace",
    cuisine: ["Pakistani", "Karahi, nihari, paya, kababs, biryani"],
    contactName: "Farid Khan",
    contactEmail: "farid@peshawar.com",
    suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    address: "796 Embarcadero Rd, Palo Alto, CA 94301",
    rating: 4.7,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",   
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frC9",
    googleMapsUrl: "https://maps.google.com/?cid=12390"
  },
  {
    name: "Chittagong Curry",
    cuisine: ["Bangladeshi", "Bhuna khichuri, beef rezala, kacchi biryani"],
    contactName: "Rafiq Ullah",
    contactEmail: "rafiq@chittagong.com",
    address: "107 Page Mill Rd, Palo Alto, CA 94304",
    rating: 4.3,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frD0",
    googleMapsUrl: "https://maps.google.com/?cid=12391"
  },
  {
    name: "Herat Heritage",
    cuisine: ["Afghan", "Kabuli pulao, mantu, kebabs"],
    contactName: "Ghulam Rasool",
    contactEmail: "ghulam@herat.com",
    address: "218 Alma St, Palo Alto, CA 94301",
    rating: 4.5,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frD1",
    googleMapsUrl: "https://maps.google.com/?cid=12392"
  },
  {
    name: "Shalimar Restaurant",
    cuisine: ["North Indian", "Mughlai (kebabs, biryani, butter chicken)"],
    contactName: "Kiran Sethi",
    contactEmail: "kiran@shalimar.com",
    address: "329 High St, Palo Alto, CA 94301",
    rating: 4.4,
    distanceUnit: "km",
    userId: userId,
    isApproved: "approved",
     suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frD2",
    googleMapsUrl: "https://maps.google.com/?cid=12393"
  },
  {
    name: "Golden Temple",
    cuisine: ["Punjabi (tandoori, curries, naan)"],
    contactName: "Sukhwinder Singh",
    contactEmail: "sukhwinder@goldentemple.com",
    address: "440 Lytton Ave, Palo Alto, CA 94301",
    rating: 4.6,
    distanceUnit: "km",
    userId: userId,
    isApproved: "pending",

 suppliers: ["Local Farm Fresh", "Premium Spice Co", "Palo Alto Meat Suppliers"],    location: {
      type: "Point",
      coordinates: generateRandomCoordinates(baseLatitude, baseLongitude)
    },
    googleMapsPlaceId: "ChIJN1t_tDeuEmsRUsoyG83frD3",
    googleMapsUrl: "https://maps.google.com/?cid=12394"
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

// Export the seed data for direct use if needed
export { restaurantSeedData };