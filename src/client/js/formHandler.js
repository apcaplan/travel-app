import { getData } from './app'
import { countdown } from './countdown'
import { duration } from './duration'

async function handleSubmit (event) {
  event.preventDefault()

  console.log("::: Form Submitted :::")

  // gather values from form
    const city = document.getElementById("location").value
    const departureDate = document.getElementById("departure").value
    const arrivalDate = document.getElementById("arrival").value

    const tripLength = await countdown(arrivalDate)
    const tripDuration = await duration(arrivalDate, departureDate)

    getData(city, arrivalDate, departureDate, tripLength, tripDuration)
}

export { handleSubmit }
