// Import styles
import "./styles/styles.scss";

// Import media
import "./media/airplane.jpg"

// Import functions
import { handleSubmit } from "./js/formHandler"
import { handleSave, listTrips, reset } from "./js/app"


// Event Listeners
document.getElementById("userInput").addEventListener('submit', handleSubmit)
document.getElementById("saveTrip").addEventListener('click', handleSave)
document.getElementById("list").addEventListener('click', listTrips)
document.getElementById("new").addEventListener('click', reset)
