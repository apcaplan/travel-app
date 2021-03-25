
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

export { postData }
