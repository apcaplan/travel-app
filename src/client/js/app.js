let current = {}

// Function to POST data
const postData = async (data) => {
  const req = await fetch("http://localhost:8081/location", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  try {
    const newData = await req.json()
    updateUI(newData)
    current = newData
    console.log("current= ", current)
    // return newData
  } catch (error) {
    console.error("POST error: ", error)
  }
}

// Update UI
const updateUI = data => {
    document.getElementById("arr").innerHTML=`You will arrive on: ${data.arrival}`
    document.getElementById("dep").innerHTML=`You will leave on: ${data.departure}`
    document.getElementById("city").innerHTML=`Here's the city: ${data.city}`
    document.getElementById("country").innerHTML=`Here's the country: ${data.country}`
    document.getElementById("lat").innerHTML=`Here's the latitude: ${data.lat}`
    document.getElementById("long").innerHTML=`Here's the longitude: ${data.long}`
    document.getElementById("temp").innerHTML=`Here's the current temperature: ${data.temp}\xB0F`
    document.getElementById("high").innerHTML=`Here's the high temperature for the day: ${data.high}\xB0F`
    document.getElementById("desc").innerHTML=`Here are the weather conditions: ${data.desc}`
    document.getElementById("image").innerHTML=`Here's the pretty picture: <img src="${data.pic}">`
    document.getElementById("length").innerHTML=`Countdown to trip start: ${data.length}`
    document.getElementById("length").innerHTML=`Here's the trip length: ${data.duration}`
}

function handleSave () {
  saveTrip(current)
  console.log("saving!")
}

// save trip
const saveTrip = async (data) => {
  const req = await fetch("http://localhost:8081/save", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  console.log("saving...")
}

// get all trips
const listTrips = async (data) => {
  const response = await fetch("http://localhost:8081/all", {
    method: "GET",
    credentials: "same-origin",
  })
  try {
    const trips = await response.json()
    sorting(trips)
  } catch (error) {
    console.error("POST error: ", error)
  }
}


function sorting (data) {
  let expired = []
  let upcoming = []
  const today = new Date().setHours(0, 0, 0, 0)
  const order = data.sort(function(a,b) {
    return Date.parse(a.arrival) - Date.parse(b.arrival)
  })
  order.forEach(date => {
    if(Date.parse(date.arrival) < today){
      expired.push(date)
    } else {
      upcoming.push(date)
    }
  })
  console.log("expired: ", expired)
  console.log("upcoming: ", upcoming)

  if (upcoming.length) {
    upcoming.forEach(trip => {
        document.getElementById("newTrip").appendChild(createTrip(trip))
      })
  }
  if (expired.length){
    expired.sort(function(a,b) {
      return Date.parse(b.arrival) - Date.parse(a.arrival)
    })

    expired.forEach(trip => {
      document.getElementById("oldTrip").appendChild(createTrip(trip))
    })
}
}

const createTrip = (item) => {
  const wrapper = document.createElement('div')
  wrapper.classList.add(`id_${item.id}`)
  const img = document.createElement('img')
  img.src = item.pic
  const city = document.createElement('h3')
  city.innerText = item.city
  const arrival = document.createElement('p')
  arrival.innerText = item.arrival
  const button = document.createElement('button')
  button.innerText = 'delete'
  wrapper.appendChild(img)
  wrapper.appendChild(city)
  wrapper.appendChild(arrival)
  wrapper.appendChild(button)
  button.addEventListener('click', () => destroyTrip(item.id))
  return wrapper
}

const destroyTrip = (id) => {
  const response = fetch(`http://localhost:8081/delete/${id}`, {
      method: "DELETE",
      credentials: "same-origin"
})
  .then(console.log("removed"))
  .then(listTrips())
  .catch(error => console.error(error))
}


export { postData, handleSave, listTrips }
