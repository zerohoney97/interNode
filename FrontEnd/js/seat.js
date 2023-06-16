// let dropdown = document.querySelector('.dropdown');
// let dropdownContent = document.querySelector('.dropdown-content');

// dropdown.addEventListener('click', function() {
//     dropdownContent.classList.toggle('show');
// });


// socket 연결
const socket = io();
// 임의로 showid, reservation_num 작성
// reservation_num => 공연아이디, 날짜 정보 포함
socket.emit("getSeatsInfo", 1, "0607");
socket.on("getSeatsInfo", (seats) => {
  console.log(seats);

  // 좌석 정보 받아와서 좌석 출력(요소 생성, 결제/미결제 좌석에 따라 다르게 출력)
})

// 좌석 눌렀을때 이 좌석이 선점되었는지 확인하는 이벤트 전송(서버에서는 전역변수에서 확인. db건드리지 말고)
// 만약 지금이랑 seats 정보가 다르면 다시 출력?

// 좌석 결제 버튼 눌렀을때 결제하겠다는 이벤트 emit(서버에서 db에 수정해서 저장하고(전역변수에도 저장) 다시 room 내의 모든 클라이언트에게 showarr전역변수 전송)
// 서버에 유저아이디도 전송
//








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
axios
.get("/login/view", { withCredentials: true })
.then((res) => {
  console.log(res.data);
  if (res.data) {
    if (res.data == "다시 로그인 해주세요") {
      headerUtilLogin.innerHTML = ` <a href="/login">${res.data}</a>`;
    } else {
      headerUtilLogin.innerHTML = ` ${res.data}`;
      console.log(headerSignUp.innerHTML);
      headerSignUp.innerHTML =
        '<a href="/freeboards/main"> 자유 게시판 </a>';
      console.log(headerSignUp.innerHTML);
    }
  }
})
.catch((error) => {
  console.log(error);
});