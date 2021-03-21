// Import styles
import "./styles/resets.scss";
import "./styles/base.scss";

// Import functions
import { handleSubmit } from "./js/formHandler"


// Event Listeners
document.getElementById("userInput").addEventListener('submit', handleSubmit)
