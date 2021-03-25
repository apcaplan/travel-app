import { postData } from './app'
import { countdown } from './countdown'
import { duration } from './duration'

async function handleSubmit (event) {
  event.preventDefault()

  console.log("::: Form Submitted :::")

  // gather values from form
    const city = document.getElementById("location").value
    const departureDate = document.getElementById("departure").value
    const arrivalDate = document.getElementById("arrival").value

    // Calculate days until arrival and trip duration
    const tripLength = await countdown(arrivalDate)
    const tripDuration = await duration(arrivalDate, departureDate)

    // Collect data
    const data = {city: city, arrival: arrivalDate, departure: departureDate, length: tripLength, duration: tripDuration}

    // POST data
    postData(data)
}

export { handleSubmit }
