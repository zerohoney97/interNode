// let dropdown = document.querySelector('.dropdown');
// let dropdownContent = document.querySelector('.dropdown-content');

// dropdown.addEventListener('click', function() {
//     dropdownContent.classList.toggle('show');
// });


// const socket = io();



let movies = document.querySelectorAll('.dropdown-content div');

movies.forEach(function(movie) {
    movie.addEventListener('click', function() {
        let selectedMovie = this.textContent;
        // 선택한 영화로 드롭다운 버튼 내용 변경
        dropdown.firstElementChild.textContent = selectedMovie;
        // 위 코드는 영화를 선택할 때마다 selectedMovie 변수의 값을 이용하여
        // dropdown 요소의 첫 번째 자식 요소의 텍스트 내용을 변경하고 있다.
        dropdownContent.classList.remove('show');
    });
});

let seats = document.querySelectorAll('.seat');
let countDisplay = document.getElementById('count');
let totalDisplay = document.getElementById('total');
let ticketPrice = 10000; // 한 좌석당 가격
let selectedSeats = []; // 선택된 좌석 배열

seats.forEach(function(seat) {
    seat.addEventListener('click', function() {
        if (this.classList.contains('selected')) {
            // 이미 선택된 좌석인 경우, 선택 취소
            this.classList.remove('selected');
            selectedSeats.splice(selectedSeats.indexOf(this), 1);
        } else if (selectedSeats.length < 2) {
            // 선택되지 않은 좌석이고 최대 선택 가능한 개수보다 작을 경우, 선택
            this.classList.add('selected');
            selectedSeats.push(this);
        }

        updateSelectedSeatsCount();
        updateTotalPrice();
    });
});

function updateSelectedSeatsCount() {
    let selectedSeatsCount = selectedSeats.length;
    countDisplay.textContent = selectedSeatsCount;
}

function updateTotalPrice() {
    let totalPrice = selectedSeats.reduce(function(total, seat) {
        return total + ticketPrice;
    }, 0);
    totalDisplay.textContent = totalPrice;
}
// 오른쪽위 선택창 바꿔주는 함수
window.onload = function () {
  axios
    .get("http://127.0.0.1:8080/login/view", { withCredentials: true })
    .then((res) => {
      console.log(res.data);
      if (res.data) {
        if (res.data == "다시 로그인 해주세요") {
          headerUtilLogin.innerHTML = ` <a href="/login">${res.data}</a>`;
        } else {
          headerUtilLogin.innerHTML = ` ${res.data}`;
          console.log(headerSignUp.innerHTML)
          headerSignUp.innerHTML = '<a href="/freeboards/main"> 자유 게시판 </a>';
          console.log(headerSignUp.innerHTML)
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
