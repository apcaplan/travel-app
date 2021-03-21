import { getData } from './app'
import { countdown } from './countdown'

function handleSubmit (event) {
  event.preventDefault()

  console.log("::: Form Submitted :::")

  // gather values from form
    const city = document.getElementById("location").value
    const departureDate = document.getElementById("departure").value
    const arrivalDate = document.getElementById("arrival").value

    countdown(arrivalDate)
    console.log(countdown(arrivalDate))
    getData(city)

}

export { handleSubmit }
