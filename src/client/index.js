// Import styles
import "./styles/resets.scss";
import "./styles/base.scss";

// Import functions
import { handleSubmit } from "./js/formHandler"
import { handleSave, listTrips } from "./js/app"

// Event Listeners
document.getElementById("userInput").addEventListener('submit', handleSubmit)
document.getElementById("saveTrip").addEventListener('click', handleSave)
document.getElementById("list").addEventListener('click', listTrips)
