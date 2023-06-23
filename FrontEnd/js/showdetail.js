// 상세 페이지 로드시 데이터 axios로 가져오기
window.onload = () => {
  // 별점의 개수를 배열에 저장하는 함수
  const countRates = (data, ratesArr) => {
    data.forEach((a) => {
      console.log(a);
      if (a.rates == 5) {
        ratesArr[4] += 1;
      } else if (a.rates == 4) {
        ratesArr[3] += 1;
      } else if (a.rates == 3) {
        ratesArr[2] += 1;
      } else if (a.rates == 2) {
        ratesArr[1] += 1;
      } else {
        ratesArr[0] += 1;
      }
    });
  };

  const show_id = window.location.search;
  axios
    .get(`/showdetail/detail${show_id}`)
    .then((res) => {
      const data = res.data;
      console.log(data);
      const detail = JSON.parse(data.detail);
      const showImg = data.img;

      console.log(showImg[0]);

      const mainElement = document.querySelector("main");
      mainElement.innerHTML = `
    <div class="product_info" id="bookss">
    <div class="product_info_img">
      <img
        src="${imgPath}/${showImg}"
        alt=""
      />
    </div>
    <div class="product_info_detail">
      <div class="flag_area">
        <span>단독판매</span>
      </div>
      <div class="select_wrap">
        <div style="border: none" class="product_info_heading">
          <div value="">
            ${data.title}
          </div>
        </div>
      </div>
      <div class="product_info_text">
        <ul class="product_info_text_col1">
          <li>
            <span>장소</span>
            <div>${data.Theater.name}</div>
          </li>
          <li>
            <span>관람시간</span>
            <div>${detail[1]} 분</div>
          </li>
          <li>
            <span>기간</span>
            <div>${data.ShowDateInfos[0].startDate}~${
        data.ShowDateInfos[0].endDate
      }</div>
          </li>
          <li>
            <span>관람등급</span>
            <div>만 ${detail[2]}세 이상</div>
          </li>
        </ul>
        <ul class="product_info_text_col2">
          <li>
            <span>가격</span>
            <div>
              <div class="price">${data.price} 원</div>

            </div>
          </li>
          <li>
            <span>회차</span>
            <div class="starttime">
              ${data.ShowDateInfos[0].startTime
              .toString()
              .slice(0, 2)}시 ${data.ShowDateInfos[0].startTime
              .toString()
              .slice(3, 5)} 분
            </div>
          </li>
        </ul>
        
      </div>
      <div class = "move">
      <div class='firstBox'> 
      
      
      <div class="datepicker">
      </div>
      <span class ="redstep">STEP 1</span>
      <h3>날짜 선택</h3>
      <div class="dateinput">
      <input type="date" id="datepicker" />
     
      </div>

      </div>
      <div class='secondBox'>
      
      <span class ="redstep redstep2">STEP 2</span>
      <div class="bookbtn" >

      <div id="redbookbtn">예매하기</div>
      </div>
      </div>
      </div>
    </div>
      </div>
    </div>
  </div>

 

  </div>

  
  <div class="banner" id="banner">
    <div class="banner_img">
      <img
        src="${imgPath}/${showImg}"
        alt=""
      />
    </div>
    <div class="banner_title">
      ${data.title}
    </div>
    <div class="banner_bookbtn"><a href = "#bookss" style = "color: white">예매하기</a></div>
  </div>
  <button id="scrollToTopBtn" class="scroll-to-top-btn">&#x2191;</button>
  <div class="tabmenu_wrap">
    <div class="tabmenu">
      <ul>
        <li id="tab1">
          <button id="tab_detail">상세정보</button>
        </li>
        <li id="tab2">
          <button id="tab_review">관람후기</button>
        </li>
        <li id="tab3">
          <button id="tab_location">장소정보</button>
        </li>
        <li id="tab4">
          <button id="tab_notice">예매/취소안내</button>
        </li>
      </ul>
    </div>
  </div>
  <div class="detail_page">
    <div>
      <h3>공연시간정보</h3>
      <p>2023년 06월 17일(토)~2023년 06월 18일(일)</p>
      <h3>공지사항</h3>
      <p>* 시청각제한석 추가 티켓오픈 : 2023년 05월 31일(수) 20시</p>
      <p>
        ※ 티켓 오픈 준비를 위해 2023년 05월 31일(수)​ 14시~19시 59분 동안
        모든 예매가 일시 마감됩니다.
      </p>
      <p>
        * 현장 수령 시간 : 2023년 06월 17일(토) / 06월 18일(일) 공연 시작
        4시간 전부터 1시간 후까지​
      </p>
      <p>
        ​* ​휠체어석은 티켓링크 고객센터를 통해서만 구매 가능합니다. (☎
        1588-7890 / 10:00~19:00) ​
      </p>
      <h3>할인 정보</h3>
      <p>■ 장애인 할인 1~3급 : 본인 포함 동반 1인 20% 할인</p>
      <p>■ 국가유공자 할인 : 본인만 20% 할인</p>
      <h3>작품상세정보</h3>
      <div>
          ${detail[0]}
      </div>

      <h3>기획사 및 제작사 정보</h3>
      <p>주최 : ㈜비트인터렉티브</p>
      <p>주관 : ㈜스프링이엔티</p>
      <hr />
    </div>
  </div>
  <div class="review_page">
  <div id="chart"></div>
    <div class="reviewBoardContainer">
      <div class="reserved-container">




        <div class="review-container">

        </div>
      </div>
    </div>
  </div>
  <div class="location_page">
        <div style='display: flex;
        justify-content: center;'>${data.Theater.name}</div>
    <div id="map" style="width: 100%; height: 400px"></div>

  </div>
  <div class="notice_page">
    <div>
      <h3>예매/취소안내</h3>
      <div class="notice_inner">
        <h3>티켓 수령안내</h3>
        <div>
          <b>1) 일반배송</b>
          <p>
            예매 완료(결제 완료)확인 후, 인편배송으로 영업일 기준 10일 이내
            티켓을 수령하실 수 있습니다.
          </p>
          <p>티켓을 배송하기 위한 배송료는 고객이 부담합니다.</p>
          <p>
            행사 또는 관람일에 따라 일반배송 선택이 제한될 수 있습니다.​
          </p>
        </div>
        <div>
          <b>2) 현장수령</b>
          <p>
            행사 당일 공연 시작 시간 1시간 전 ~ 30분 전까지 행사장
            매표소에서 티켓을 수령하실 수 있습니다.
          </p>
          <p>
            현장 매표소에서 예매 완료 SMS 또는 예매번호 및 예매자 정보 확인
            후 티켓을 수령할 수 있습니다.
          </p>
          <p>
            기획사 정책 또는 행사일에 따라 현장 수령 방법의 선택이 제한될 수
            있습니다.​
          </p>
        </div>
        <h3>예매 취소 안내</h3>
        <div>
          <p>
            예매 당일 취소하는 경우 이외에는 예매수수료는 환불되지 않습니다.
          </p>
          <p>
            티켓 예매 후 7일 이내 취소 시 취소수수료는 부과되지 않습니다.
          </p>
          <p>
            단, 예매 후 7일 이내라도 취소시점이 관람일로부터 10일 이내라면
            그에 해당하는 취소수수료가 부과됩니다.
          </p>
          <p>
            배송 받은 티켓의 반품 접수는 취소가능시간 이내(영업일 기준)에
            우편(빠른 등기) 또는 본사 반품을 통해서 입고 완료 건에 한하여
            취소 가능하며, 입고 일을 기준으로 취소수수료 적용됩니다.
          </p>
          <p>
            일반우편 또는 택배로 반송 시 발생되는 분실, 지연 도착 등의
            문제는 티켓링크에서 책임지지 않으니 이점 유의하시기 바랍니다.
          </p>
        </div>
        <h3>티켓 환불 안내</h3>
        <div>
          <p>
            예매취소 시 취소수수료와 배송료를 제외한 나머지 금액이 환불
            됩니다.
          </p>
          <p>
            취소수수료는 상품별로 상이할 수 있으며 상품 상세정보 하단에서
            확인할 수 있습니다.
          </p>
          <p>
            무통장입금으로 결제한 경우 환불처리를 위해 예매자 본인명의의
            계좌정보(예금주, 은행, 계좌번호)를 입력해야 하며 접수일로부터
            3~5일(영업일기준)이내 환불 받을 수 있습니다.
          </p>
          <p>
            상품에 따라 환불 시 송금수수료 500원이 부과될 수 있습니다. ​
          </p>
          <p>
            신용카드로 결제한 경우 취소일로부터 3~6일(영업일기준)이내
            카드사에서 승인취소를 확인할 수 있습니다.
          </p>
          <p>
            계좌이체, 실시간 계좌출금으로 결제한 경우 취소 시 1~2일(영업일
            기준)이내 환불 됩니다.
          </p>
          <p>
            휴대폰결제로 결제한 경우 당월 취소 시 즉시 환불되나 익월 취소
            시에는 최대 60일까지 소요됩니다.
          </p>
          <p>
            PAYCO포인트, 예매권, 상품권으로 결제한 경우 취소 시 즉시
            계정으로 환불 됩니다.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="detail_showlist">
    <div class="detail_showlist_header">
      <h1>추천 공연·전시</h1>
    </div>
    <ul class = "showUl">
      <li>
        <img
          src="https://image.toast.com/aaaaab/ticketlink/TKL_3/pcg_0601.jpg"
          alt=""
        />
        <div>
          [단독판매] ​2023 박창근 콘서트 [우리들 꿈에 관한 이야기] - 수원​
          티켓오픈 안내
        </div>
        <span>06.14(수) 19:00</span>
      </li>
      <li>
        <img
          src="https://image.toast.com/aaaaab/ticketlink/TKL_10/%EB%8C%80%ED%91%9C%EC%9D%B4%EB%AF%B8%EC%A7%80(2).jpg"
          alt=""
        />
        <div>[단독판매] 오자와 아리 1st 팬미팅 In Seoul​​</div>
        <span>06.05(월) 15:00</span>
      </li>
      <li>
        <img
          src="https://image.toast.com/aaaaab/ticketlink/TKL_10/10feet_pst_0602.jpg"
          alt=""
        />
        <div>10-FEET “COLLINS” TOUR 2023 in Korea 티켓오픈 안내</div>
        <span>06.08(목) 16:00</span>
      </li>
      <li>
        <img
          src="https://image.toast.com/aaaaab/ticketlink/TKL_8/230525.jpg"
          alt=""
        />
        <div>WCG 2023 Busan 티켓오픈 안내</div>
        <span>06.22(목) 17:00</span>
      </li>
      <li>
        <img
          src="https://image.toast.com/aaaaab/ticketlink/TKL_5/m(9)(1).jpg"
          alt=""
        />
        <div>​Soundberry Festa'23​ 얼리버드 ​티켓오픈 안내</div>
        <span>06.07(수) 18:00</span>
        </li>
        </ul>
        </div>
    `;
      datepicker.min = data.ShowDateInfos[0].startDate;
      datepicker.max = data.ShowDateInfos[0].endDate;

      // 탭메뉴 클릭시 함수
      let detailPage = document.getElementsByClassName("detail_page")[0];
      let reviewPage = document.getElementsByClassName("review_page")[0];
      let locationPage = document.getElementsByClassName("location_page")[0];
      let noticePage = document.getElementsByClassName("notice_page")[0];

      // 페이지 display설정 함수
      function showPage(page) {
        detailPage.style.display = "none";
        reviewPage.style.display = "none";
        locationPage.style.display = "none";
        noticePage.style.display = "none";

        page.style.display = "block";
      }

      let tabDetail = document.getElementById("tab_detail");
      let tabReview = document.getElementById("tab_review");
      let tabLocation = document.getElementById("tab_location");
      let tabNotice = document.getElementById("tab_notice");

      // 탭 border 디자인 설정 함수
      let tab1 = document.getElementById("tab1");
      let tab2 = document.getElementById("tab2");
      let tab3 = document.getElementById("tab3");
      let tab4 = document.getElementById("tab4");

      function tabBorderLine(tab) {
        tab1.style.border = "none";
        tab2.style.border = "none";
        tab3.style.border = "none";
        tab4.style.border = "none";

        tab1.style.borderBottom = "1px solid";
        tab2.style.borderBottom = "1px solid";
        tab3.style.borderBottom = "1px solid";
        tab4.style.borderBottom = "1px solid";

        tab.style.border = "1px solid";
        tab.style.borderBottom = "none";
      }

      tabDetail.addEventListener("click", () => {
        showPage(detailPage);
        tabBorderLine(tab1);
      });

      tabReview.addEventListener("click", () => {
        let reviewContainer =
          document.getElementsByClassName("review-container")[0];
        reviewContainer.innerHTML = "";
        showPage(reviewPage);
        tabBorderLine(tab2);
        const likeBtn = document.getElementsByClassName("likeBtn");
        // 관람후기 가져오기
        axios
          .get(`/showdetail/reviewboard${show_id}`)
          .then((res) => {
            // 평점을 담는 배열
            let ratesArr = [0, 0, 0, 0, 0];

            // innerHTML 에 후기 넣는다
            const data = res.data[0];
            console.log(data);
            // 평점을 계산해서 ratesArr에 push해주는 함수 실행F
            countRates(data, ratesArr);
            console.log("userID", res.data[1]);
            for (let i = 0; i < data.length; i++) {
              const cmt = data[i];
              const div = document.createElement("div");
              const likes = cmt.ReviewBoardLikes[0]?.user_id == res.data[1];
              div.innerHTML = `
              <div class="user-review">
              <img class="userimg" src="${imgPath}/${
                cmt.User.img
              }" style="width: 50px; height: 50px" alt="userProfile" />
              <div class="user-review-detail">
              <div>
                <span class="nickname">${cmt.User.nickname}</span>
              </div>
              <div>
                <span class="createdAt"><span class="star"></span>${cmt.createdAt.slice(
                  0,
                  10
                )}</span>


              </div>
            </div>
          </div>

          <div class="btns">
            <div class="likeBtn" id="likeBtn-${cmt.id}">

                <img src="${imgPath}/${
                likes ? "like.png" : "like_empty.png"
              }" alt="" />${cmt.ReviewBoardLikes.length}
            </div>
            <div class="reportDiv" id = "reportBtn-${cmt.id}">

                <img src="${imgPath}/siren.png" alt="" style="width : 20px ; height : 20px;" />신고
            </div>
          </div>

          <div class="content">
            ${cmt.content}
          </div>

          <div class="line"></div>
        `;

              reviewContainer.appendChild(div);

              //별점변경
              let element = document.querySelectorAll(".star");
              let reviewname = document.querySelectorAll(".nickname");
              element[i].style.width = `${cmt.rates * 20}px`;

              // 좋아요 클릭 함수
              const likeBtn = document.getElementById(`likeBtn-${cmt.id}`);
              likeBtn.onclick = () => {
                axios
                  .get(`/showdetail/thumbsup?id=${cmt.id}`, {
                    withCredentials: true,
                  })
                  .then((res) => {
                    // console.log(res.data);
                    if (res.data[1]) {
                      likeBtn.innerHTML = `<img src="${imgPath}/like.png" alt="" />${res.data[0].length}`;
                    } else {
                      likeBtn.innerHTML = `<img src="${imgPath}/like_empty.png" alt="" />${res.data[0].length}`;
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              };

              // 신고 클릭 함수
              const reportBtn = document.getElementById(`reportBtn-${cmt.id}`);
              console.log(ratesArr);
              reportBtn.onclick = () => {
                axios
                  .get(`/showdetail/report?id=${cmt.id}`, {
                    withCredentials: true,
                  })
                  .then((res) => {
                    console.log(res.data);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              };
            }

            //차트를 그려주는 함수의 옵션값 설정
            var options = {
              chart: {
                type: "bar",
                width: 600,
              },
              series: [
                {
                  name: "sales",
                  data: [
                    ratesArr[0],
                    ratesArr[1],
                    ratesArr[2],
                    ratesArr[3],
                    ratesArr[4],
                  ],
                },
              ],
              xaxis: {
                categories: [1, 2, 3, 4, 5],
              },
            };

            let chart = new ApexCharts(
              document.querySelector("#chart"),
              options
            );

            chart.render();
          })

          .catch((err) => {
            console.log(err);
          });
      });

      tabLocation.addEventListener("click", () => {
        showPage(locationPage);

        tabBorderLine(tab3);

        // 카카오 api를 이용해 지도를 보여주는 분기점
        if (data.theaters_id == 1) {
          let container = document.getElementById("map");
          let options = {
            // 강남 예술의 전당
            center: new kakao.maps.LatLng(
              37.478779682313025,
              127.0105680624135
            ),
            level: 3,
          };

          let map = new kakao.maps.Map(container, options);
        } else {
          let container = document.getElementById("map");
          let options = {
            //   세종 문화회관
            center: new kakao.maps.LatLng(
              37.572619284883956,
              126.97569893208153
            ),
            level: 3,
          };

          let map = new kakao.maps.Map(container, options);
        }
      });

      tabNotice.addEventListener("click", () => {
        showPage(noticePage);
        tabBorderLine(tab4);
      });

      // 스크롤시 배너 내려오게
      var banner = document.getElementById("banner");

      window.addEventListener("scroll", function () {
        var scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 700) {
          // 스크롤 위치가 100px 이상일 때
          banner.style.top = "0"; // 배너를 아래로 내림
        } else {
          banner.style.top = "-100px"; // 배너를 다시 위로 위치시킴
        }
      });

      //스크롤시 맨위로 이동 버튼 생성
      var scrollToTopBtn = document.getElementById("scrollToTopBtn");

      window.addEventListener("scroll", function () {
        var scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 300) {
          scrollToTopBtn.classList.add("show");
        } else {
          scrollToTopBtn.classList.remove("show");
        }
      });

      scrollToTopBtn.addEventListener("click", function () {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });

      // 오른쪽위 선택창 바꿔주는 함수
      axios
        .get("/login/view", { withCredentials: true })
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            if (res.data == "다시 로그인 해주세요") {
              headerUtilLogin.innerHTML = ` <a href="/login">${res.data}</a>`;
            } else if (res.data.startsWith("<!DOCTYPE html>")) {
              // res.redirect 반환받았을때
              headerUtilLogin.innerHTML = ` <a href="/login">다시 로그인 해주세요</a>`;
            } else {
              headerUtilLogin.innerHTML = ` ${res.data}`;
              console.log(headerSignUp.innerHTML);
              headerSignUp.innerHTML =
                '<a href="/freeboards/main"> 자유 게시판 </a>';
              const logOut = document.createElement("div");
              logOut.innerHTML = '<a href="/login/logout"> 로그아웃 </a>';
              document.querySelector(".header_util").appendChild(logOut);
            }
          }
          const RedBookBtn = document.getElementById("redbookbtn");
          console.log(RedBookBtn);
          RedBookBtn.onclick = () => {
            const postNum = window.location.search.split("=");
            console.log(postNum);
            console.log(datepicker.value);
            const dateresult = datepicker.value;
            if (dateresult != "") {
              let newdate = dateresult.slice(5).replace("-", "");
              window.location.href = `/reservation/seats/?reservation_num=${postNum[1]}_${newdate}`;
            } else {
              alert("날짜를 선택하고 예매버튼을 눌러주세요");
            }
          };
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((err) => {
      console.log(err);
    });

  footershows();
};

const footershows = async () => {
  try {
    const { data } = await axios.get("/main/showList", {
      withCredentials: true,
    });
    renderTicketShowList(data);
  } catch (error) {
    console.log(error);
  }
};

const renderTicketShowList = (list) => {
  const showUl = document.querySelector(".showUl");
  showUl.innerHTML = "";
  //5개만 출력
  for (let index = 5; index < 10; index++) {
    const show = list[index];
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = imgPath + "/" + show.img;
    const div = document.createElement("div");
    div.innerText = show.title;
    const span = document.createElement("span");
    if (show.ShowDateInfos.length != 0) {
      span.innerText =
        show.ShowDateInfos[0].startDate + " ~ " + show.ShowDateInfos[0].endDate;
    } else {
      span.innerText = "티켓 시간 정보";
    }
    li.append(img, div, span);

    li.onclick = () => {
      location.href = "/showdetail?id=" + show.id;
    };
    showUl.append(li);
  }
};
