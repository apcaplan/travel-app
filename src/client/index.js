// Import styles
import "./styles/resets.scss";
import "./styles/base.scss";

// Import functions
import { getData } from "./js/app"


// Event Listeners
document.getElementById("userInput").addEventListener('submit', getData)
