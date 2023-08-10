const canvas = document.getElementById("gameCanvas");
const restartButton = document.getElementById("btn");
restartButton.addEventListener("click", () => window.location.reload());
const ctx = canvas.getContext("2d");
