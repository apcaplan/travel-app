// gather data function
function getData(city) {
  // send data in POST request
  postData("http://localhost:8081/location", {city: city})
    .then(updateUI())
    .then(document.getElementById("userInput").reset())
    .catch((error) => console.error(error))
}

// Function to POST data
const postData = async (url="", data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      city: data.city
    })
  })
  try {
    const newData = await req.json()
    return newData
  } catch (error) {
    console.error(error)
  }
}

// Update UI
const updateUI = async () => {
  const getAll = await fetch ("http://localhost:8081/all")
  try {
    const data = await getAll.json()
    // update on screen
    document.getElementById("city").innerHTML=`Here's the city: ${data.city}`
    document.getElementById("country").innerHTML=`Here's the country: ${data.country}`
    document.getElementById("lat").innerHTML=`Here's the latitude: ${data.lat}`
    document.getElementById("long").innerHTML=`Here's the longitude: ${data.long}`
  } catch (error) {
    console.log("error: ", error)
  }
}

export { getData }
