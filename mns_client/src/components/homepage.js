import Search from "./search";
import CarouselMulti from "./carousel";

// const test = async (latitude, longitude) => {
//   const response = await fetch(
//     `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
//   );
//   const data = await response.json();

//   const city = data.address.city;
//   const country = data.address.country;
//   console.log(data);
//   console.log(`City: ${city}, Country: ${country}`);
// };

function Homepage() {
  // let pos = [38.889248, -77.050636];

  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(
  //     function (position) {
  //       pos = [position.coords.latitude, position.coords.longitude];
  //       console.info(`Position detected successfully at ${pos}`);
  //       test(pos[0], pos[1]);
  //     },
  //     function (error) {
  //       console.error(
  //         `Error Code [${error.code}] - ${error.message} ==> Defaulting to [${pos}]`
  //       );
  //       test(pos[0], pos[1]);
  //     }
  //   );
  // } else {
  //   console.error(
  //     `navigator.geolocation object is not supported ==> Defaulting to [${pos}]`
  //   );
  //   test(pos[0], pos[1]);
  // }

  return (
    <div>
      <div className="jumbotron jumbotron-fluid" id="welcome-div">
        <Search />
      </div>
      {/* <CarouselMulti></CarouselMulti> */}
    </div>
  );
}

export default Homepage;
