// let dropdown = document.querySelector('.dropdown');
// let dropdownContent = document.querySelector('.dropdown-content');

// dropdown.addEventListener('click', function() {
//     dropdownContent.classList.toggle('show');
// });

// reservation_num => 공연아이디, 날짜 정보 포함



window.onload = async () => {
  // reservation_num, show_id 받아오기
  const params = new URLSearchParams(window.location.search).get('reservation_num');
  const show_id = parseInt(params.split("_"));
  const reservation_num = params;

  const { data } = await axios.get("/reservation/user", { withCredentials: true });
  const user_id = data.primaryKey;

  // socket 연결
  const socket = io();
  // 임의로 showid, reservation_num 작성
  socket.emit("joinReservation", { show_id, reservation_num });

  socket.on("joinReservation", (data) => {
    const { show, seats } = data;
    console.log(show);
    console.log(seats);

    // 좌석 출력
    renderSeats(seats);

    // 공연 정보 출력
    renderShow(show);
  });







  // seats.forEach(function(seat) {
  //     seat.addEventListener('click', function() {
  //       if (this.classList.contains('disabled')) {
  //         alert("선택할 수 없는 좌석임");
  //         return;
  //       }

  //         if (this.classList.contains('selected')) {
  //             // 이미 선택된 좌석인 경우, 선택 취소
  //             this.classList.remove('selected');
  //             selectedSeats.splice(selectedSeats.indexOf(this), 1);
  //         } else if (selectedSeats.length < 2) {
  //             // 선택되지 않은 좌석이고 최대 선택 가능한 개수보다 작을 경우, 선택
  //             this.classList.add('selected');
  //             selectedSeats.push(this);
  //         }

  //         updateSelectedSeatsCount();
  //         updateTotalPrice();
  //     });
  // });


  // let seats = document.querySelectorAll('.seat');
  let countDisplay = document.getElementById('count');
  let totalDisplay = document.getElementById('total');
  let ticketPrice = 10000; // 한 좌석당 가격
  let selectedSeats = []; // 선택된 좌석 배열





  // 좌석 정보 받아와서 좌석 출력(요소 생성, 결제/미결제 좌석에 따라 다르게 출력)
  const renderSeats = (seats) => {
    const seatsDiv = document.querySelector(".seats-div");

    const selectedSeat = document.querySelector(".selected");
    const selectedSeatdsjfdlks = document.querySelectorAll(".selected");

    console.log(selectedSeatdsjfdlks);

    let selectedX;
    let selectedY;

    if (selectedSeat) {
      console.log(selectedSeat);
      selectedX = selectedSeat.getAttribute("x");
      selectedY = selectedSeat.getAttribute("y");
    }

    seatsDiv.innerHTML = "";
    seats.forEach((seatX, x) => {
      const seatXContainer = document.createElement("div");
      seatXContainer.classList.add("row");
      seatX.forEach((seat, y) => {
        const seatY = document.createElement("div");
        seatY.classList.add("seat");
        seatY.setAttribute("x", x);
        seatY.setAttribute("y", y);

        if (selectedX) {
          // 사용자가 선택해놓은 좌석
          if (x==selectedX && y==selectedY) {
            seatY.classList.add("selected");
          }
        }

        // 이미 결제된 좌석이면
        if (seat == 1) {
          seatY.classList.remove("selected");
          seatY.classList.add("disabled");
        }


        seatXContainer.append(seatY);
      });

      seatsDiv.append(seatXContainer);
    });

    // 클릭이벤트 추가
    addSeatsEvent();
  }

  // 공연 정보 출력하는 부분
  const renderShow = (show) => {
    showTitle.innerText = show.title;
    showMonth.innerText = reservation_num.substring(2,4); // 월
    showDate.innerText = reservation_num.substring(4,6); // 일

  };

  function updateSelectedSeatsCount() {
    let selectedSeatsCount = selectedSeats.length;
    countDisplay.textContent = selectedSeatsCount;
  }

  function updateTotalPrice() {
    let totalPrice = selectedSeats.reduce(function (total, seat) {
      return total + ticketPrice;
    }, 0);
    totalDisplay.textContent = totalPrice;
  }

  // 좌석 클릭 이벤트 추가하는 함수
  const addSeatsEvent = () => {

    let seatsArr = document.querySelectorAll('.seat');
    seatsArr.forEach((seats) => {
      // 좌석 클릭 이벤트 추가
      seats.addEventListener('click', function () {
        if (this.classList.contains('disabled')) {
          alert("선택할 수 없는 좌석임");
          return;
        }

        if (this.classList.contains('selected')) {
          // 이미 선택된 좌석인 경우, 선택 취소
          this.classList.remove('selected');
          selectedSeats.splice(selectedSeats.indexOf(this), 1);
        } else if (selectedSeats.length < 2) {
          const x = this.getAttribute("x");
          const y = this.getAttribute("y");
          console.log(x, y);
          socket.emit("getSeat", { x, y, reservation_num });
        }

        updateSelectedSeatsCount();
        updateTotalPrice();
      });

    });
  }



  socket.on("getSeatsInfo", (data) => {
    const {seats} = data;
    console.log("getSeatsinfo", seats);
    renderSeats(seats);
  });





  socket.on("getSeat", (data) => {
    console.log(data);
    const { pay, seats, x, y } = data;
    // 이미 결제된 좌석이라면
    if (pay) {
      alert("이미 다른 고객님이 결제한 좌석입니다.");
      renderSeats(seats);
    } else {
      const seat = document.querySelector(`.seat[x="${x}"][y="${y}"]`);
      // selectedSeats.push(seat);
      selectedSeats[0] = seat;
      // 선택되지 않은 좌석이고 최대 선택 가능한 개수보다 작을 경우, 선택
      seat.classList.add('selected');
    }
  });











  // 결제하기 버튼 클릭
  payButton.onclick = () => {
    const x = selectedSeats[0].getAttribute("x");
    const y = selectedSeats[0].getAttribute("y");
    socket.emit("payment", { x, y, reservation_num, show_id, user_id });
  }

socket.on("payment", (data) => {
  console.log(data.message);
  if (data.result) {
    alert("결제 완료");
  } else {
    alert("결제 실패");
  }
});


socket.on("error", (data) => {
  alert(data.error);
});




}





// // getSeat
// // 좌석 눌렀을때 이 좌석이 선점되었는지 확인하는 이벤트 전송(서버에서는 전역변수에서 확인. db건드리지 말고)
// // 만약 지금이랑 seats 정보가 다르면 다시 출력?
// let x = 1;
// let y = 2;
// socket.emit("getSeat", { x, y, reservation_num });
// socket.on("getSeat", ({pay, seats}) => {
//   console.log(pay);
//   console.log(seats);
// });


// // 좌석 결제 버튼 눌렀을때 결제하겠다는 이벤트 emit(서버에서 db에 수정해서 저장하고(전역변수에도 저장) 다시 room 내의 모든 클라이언트에게 showarr전역변수 전송. getSeatsInfo 이벤트로 보내주면 되겠다)
// // 서버에 유저아이디도 전송
// socket.emit("payment", { x, y, reservation_num, show_id, user_id});
// socket.on("payment", (data) => {
//   console.log(data.message);
//   alert("결제 완료");
// });


// // 만약 결제하다가 오류나면 결제 취소 이벤트 emit
// socket.emit("paymentReset", { x, y, reservation_num, show_id, user_id});
// socket.on("paymentReset", (data) => {
//   console.log(data.message);
//   alert("결제 취소 완료");
// });


// // 에러나면
// socket.on("error", (data) => {
//   console.log(data.error);
//   alert(data.message);
// });







// let movies = document.querySelectorAll('.dropdown-content div');

// movies.forEach(function(movie) {
//     movie.addEventListener('click', function() {
//         let selectedMovie = this.textContent;
//         // 선택한 영화로 드롭다운 버튼 내용 변경
//         dropdown.firstElementChild.textContent = selectedMovie;
//         // 위 코드는 영화를 선택할 때마다 selectedMovie 변수의 값을 이용하여
//         // dropdown 요소의 첫 번째 자식 요소의 텍스트 내용을 변경하고 있다.
//         dropdownContent.classList.remove('show');
//     });
// });



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