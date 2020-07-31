const cinema = document.querySelector(".cinema");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movie = document.getElementById("movie");
let ticketPrice = +movie.value;

loaderfunc();

function loaderfunc() {
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  const selectedMoviePrice = localStorage.getItem("selectedMoviePrice");

  if (localStorage.getItem("selectedSeats") != null) {
    if (selectedSeats.length > 0) {
      seats.forEach((seat, Index) => {
        if (selectedSeats.indexOf(Index) > -1) {
          seat.classList.add("selected-seat");
        }
      });
    }
    movie.selectedIndex = selectedMovieIndex;
    count.innerText = selectedSeats.length;
    total.innerText = selectedSeats.length * selectedMoviePrice;
  } else {
    setMovieData(0, 15);
  }
}

// local saver
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function updateselectedcount() {
  const selectedseats = document.querySelectorAll(".row .seat.selected-seat");

  const seatIndex = [...selectedseats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatIndex));

  count.innerText = selectedseats.length;
  total.innerText = selectedseats.length * ticketPrice;
}

movie.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateselectedcount();
});
cinema.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied-seat")
  ) {
    e.target.classList.toggle("selected-seat");
    updateselectedcount();
  }
});
