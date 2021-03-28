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
    document.getElementById("arr").innerHTML=`Arrival date: ${data.arrival}`
    document.getElementById("dep").innerHTML=`Return date: ${data.departure}`
    document.getElementById("city").innerHTML=`Destination city: ${data.city}`
    document.getElementById("country").innerHTML=`Destination country: ${data.country}`
    document.getElementById("temp").innerHTML=`Current temperature: ${data.temp}\xB0F`
    document.getElementById("high").innerHTML=`High temperature for the day: ${data.high}\xB0F`
    document.getElementById("desc").innerHTML=`Weather conditions: ${data.desc}`
    document.getElementById("image").innerHTML=`<img src="${data.pic}">`
    document.getElementById("length").innerHTML=`Traveling: ${data.length}`
    document.getElementById("duration").innerHTML=`Trip length: ${data.duration}`
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
    tripClear()
    sorting(trips)
  } catch (error) {
    console.error("get error: ", error)
  }
}

function tripClear () {
  // document.getElementById("newTrip").replaceChildren()
  // document.getElementById("oldTrip").replaceChildren()
  document.getElementById("newTrip").querySelectorAll('*').forEach(node => node.remove())
  document.getElementById("oldTrip").querySelectorAll('*').forEach(node => node.remove())
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
  const buttonView = document.createElement('button')
  buttonView.innerText = 'View'
  const buttonDelete = document.createElement('button')
  buttonDelete.innerText = 'delete'
  wrapper.appendChild(img)
  wrapper.appendChild(city)
  wrapper.appendChild(arrival)
  wrapper.appendChild(buttonView)
  wrapper.appendChild(buttonDelete)
  buttonView.addEventListener('click', () => viewTrip(item.id))
  buttonDelete.addEventListener('click', () => destroyTrip(item.id))
  return wrapper
}

// view trip function
const viewTrip = async (id) => {
    const response = await fetch(`http://localhost:8081/view/${id}`, {
      method: "GET",
      credentials: "same-origin",
    })
    try {
      const trip = await response.json()
      console.log(trip)
      tripClear()
      createTrip(trip)
    } catch (error) {
      console.error("get error: ", error)
    }
}

// delete function
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
