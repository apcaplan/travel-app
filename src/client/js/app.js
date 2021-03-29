let current = {};

// Function to POST data
const postData = async (data) => {
  const req = await fetch("http://localhost:8081/location", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await req.json();
    document.getElementById("new").classList.remove("hide");
    document.getElementById("userInput").classList.add("hidden");
    document.getElementById("saveTrip").classList.remove("hide");
    document.getElementById("searchResult").classList.remove("hidden");
    updateUI(newData);
    current = newData;
    console.log("current= ", current);
    // return newData
  } catch (error) {
    console.error("POST error: ", error);
  }
};

// Update UI
const updateUI = (data) => {
  document.querySelector(".error").classList.add("hide");
  document.getElementById("image").innerHTML = `<img src="${data.pic}">`;
  document.getElementById("arr").innerHTML = `Arrival date: ${data.arrival}`;
  document.getElementById("dep").innerHTML = `Return date: ${data.departure}`;
  document.getElementById("city").innerHTML = `Destination city: ${data.city}`;
  document.getElementById("country").innerHTML = `Destination country: ${data.country}`;
  document.getElementById("temp").innerHTML = `Current temperature: ${data.temp}\xB0F`;
  document.getElementById("high").innerHTML = `High temperature: ${data.high}\xB0F`;
  document.getElementById("desc").innerHTML = `Weather conditions: ${data.desc}`;
  document.getElementById("length").innerHTML = `Traveling: ${data.length}`;
  document.getElementById("duration").innerHTML = `Trip length: ${data.duration}`;
};

// handle Save function
function handleSave() {
  saveTrip(current);
  console.log("saving!");
  document.getElementById("list").classList.remove("hide");
}

// save trip
const saveTrip = async (data) => {
  const req = await fetch("http://localhost:8081/save", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log("saving...");
};

// get all trips
const listTrips = async (data) => {
  const response = await fetch("http://localhost:8081/all", {
    method: "GET",
    credentials: "same-origin",
  });
  try {
    const trips = await response.json();
    tripClear();
    document.getElementById("userInput").classList.add("hide");
    document.getElementById("saveTrip").classList.add("hide");
    document.getElementById("list").classList.add("hide");
    document.getElementById("new").classList.remove("hide");
    document.getElementById("tripView").classList.add("hide");
    document.getElementById("searchResult").classList.add("hidden");
    if (trips.length) {
      document.querySelector(".listWrapper").classList.remove("hide");
      sorting(trips);
    } else {
      reset();
      document.getElementById("list").classList.add("hide");
      document.querySelector(".error").classList.remove("hide");
    }
  } catch (error) {
    console.error("get error: ", error);
  }
};

// clear trips
function tripClear() {
  // document.getElementById("newTrip").replaceChildren()
  // document.getElementById("oldTrip").replaceChildren()
  document
    .getElementById("newTrip")
    .querySelectorAll("*")
    .forEach((node) => node.remove());
  document
    .getElementById("oldTrip")
    .querySelectorAll("*")
    .forEach((node) => node.remove());
  document
    .getElementById("tripView")
    .querySelectorAll("*")
    .forEach((node) => node.remove());
}

// process trip data
function sorting(data) {
  document.getElementById("userInput").classList.add("hidden");
  document.querySelector(".error").classList.add("hide");
  let expired = [];
  let upcoming = [];
  const today = new Date().setHours(0, 0, 0, 0);
  const order = data.sort(function (a, b) {
    return Date.parse(a.arrival) - Date.parse(b.arrival);
  });
  order.forEach((date) => {
    if (Date.parse(date.arrival) < today) {
      expired.push(date);
    } else {
      upcoming.push(date);
    }
  });
  console.log("expired: ", expired);
  console.log("upcoming: ", upcoming);

  if (upcoming.length) {
    document.querySelector(".upcoming").classList.remove("hide");

    upcoming.forEach((trip) => {
      document.getElementById("newTrip").appendChild(createTrip(trip));
    });
  }
  if (expired.length) {
    document.querySelector(".expired").classList.remove("hide");

    expired.sort(function (a, b) {
      return Date.parse(b.arrival) - Date.parse(a.arrival);
    });

    expired.forEach((trip) => {
      document.getElementById("oldTrip").appendChild(createTrip(trip));
    });
  }
}

// display trip template
const createTrip = (item) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add(`id_${item.id}`);
  const img = document.createElement("img");
  img.src = item.pic;
  img.classList.add("tripPic");
  const city = document.createElement("h2");
  city.innerText = item.city;
  city.classList.add("tripCity");
  const arrival = document.createElement("h3");
  arrival.innerText = item.arrival;
  arrival.classList.add("tripArrival");
  const container = document.createElement("div");
  container.classList.add("buttonContainer");
  const buttonView = document.createElement("button");
  buttonView.innerText = "View";
  buttonView.classList.add("buttonView");
  const buttonDelete = document.createElement("button");
  buttonDelete.innerText = "delete";
  buttonDelete.classList.add("buttonDelete");
  wrapper.appendChild(img);
  wrapper.appendChild(city);
  wrapper.appendChild(arrival);
  wrapper.appendChild(container);
  container.appendChild(buttonView);
  container.appendChild(buttonDelete);
  buttonView.addEventListener("click", () => viewTrip(item.id));
  buttonDelete.addEventListener("click", () => destroyTrip(item.id));
  return wrapper;
};

// view trip function
const viewTrip = async (id) => {
  const response = await fetch(`http://localhost:8081/view/${id}`, {
    method: "GET",
    credentials: "same-origin",
  });
  try {
    const trip = await response.json();
    console.log(trip);
    tripClear();
    document.querySelector(".upcoming").classList.add("hide");
    document.querySelector(".expired").classList.add("hide");
    document.getElementById("list").classList.remove("hide");
    document.getElementById("tripView").classList.remove("hide");
    document.querySelector(".listWrapper").classList.add("hide");
    // document.querySelector(".upcoming").classList.add("hide")
    // document.querySelector(".expired").classList.add("hide")
    document.querySelector(".error").classList.add("hide");
    document.querySelector(".searchResult").classList.remove("hidden");
    updateUI(trip);
  } catch (error) {
    console.error("get error: ", error);
  }
};

// delete trip function
const destroyTrip = (id) => {
  const response = fetch(`http://localhost:8081/delete/${id}`, {
    method: "DELETE",
    credentials: "same-origin",
  })
    .then(console.log("removed"))
    .then(listTrips())
    .catch((error) => console.error(error));
};

// reset to start
function reset() {
  tripClear();
  document.getElementById("userInput").classList.remove("hide");
  document.getElementById("saveTrip").classList.add("hide");
  document.getElementById("searchResult").classList.add("hidden");
  document.getElementById("list").classList.remove("hide");
  document.getElementById("new").classList.add("hide");
  document.getElementById("tripView").classList.add("hide");
  document.getElementById("userInput").reset();
  document.getElementById("userInput").classList.remove("hidden");
  document.querySelector(".listWrapper").classList.add("hide");
  document.querySelector(".upcoming").classList.add("hide");
  document.querySelector(".expired").classList.add("hide");
  document.querySelector(".error").classList.add("hide");
}

export { postData, handleSave, listTrips, reset };
