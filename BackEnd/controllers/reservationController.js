const socketIO = require("socket.io");
const { Sheet, Show, ReservedList } = require("../models");

// getSeatsInfo : reservation_num로 현재 좌석 정보 반환
// error : 오류

let seatArr = {};

const initReservationSocket = (server) => {
    const io = socketIO(server);

    io.on("connection", async (socket) => {
        console.log("새로운 클라이언트 접속");
        // await Sheet.create({reservation_num : "0607", sheets_array: "[[0,0,0], [0,0,0]]", show_id : 1});


        //  예매번호 room 생성 소켓 join
        socket.on("joinReservation", async (data) => {
            try {
                socket.join(data.reservation_num);

                const { reservation_num } = data;
                let seats = await Sheet.findOne({ where: { reservation_num } });
                // 문자열을 배열로 변환.
                seatArr[reservation_num] = JSON.parse(seats).dataValues.sheets_array;
                console.log("seats ", seats, "타입", typeof(seats));

                const show = await Show.findOne({where : {id:data.showId}});
                // seatArr[reservation_num] = seats;

                // 좌석 정보, 공연 정보 반환
                socket.emit("joinReservation", { show, seats: seatArr[reservation_num] });

            } catch (error) {
                console.log(error);
                socket.emit("error", { message: "joinReservation 에러 발생", error });
            }

        });

        // // 좌석 배열 요청할때
        // socket.on("getSeatsInfo", (data) => {
        //     try {
        //         const { reservation_num } = data;

        //         socket.emit("getSeatsInfo", { seats: seatArr[reservation_num] });

        //     } catch (error) {
        //         console.log(error);
        //         socket.emit("error", { message: "getSeatsInfo 에러 발생", error });
        //     }
        // });

        // 해당 좌석이 결제되었는지 여부(좌석 클릭했을때)
        socket.on("getSeat", (data) => {
            try {
                // 해당 좌석이 결제되었는지
                let pay = true;

                // x: 좌석의 행, y : 좌석의 열
                const { x, y, reservation_num } = data;
                if (seatArr[reservation_num][x][y]==0) {
                    // 결제 안 됨
                    pay = false;
                }
                socket.emit("getSeat", { pay, seats: seatArr[reservation_num] });

            } catch (error) {
                console.log(error);
                socket.emit("error", { message: "getSeat 에러 발생", error });
            }
        });



        // 결제 요청
        socket.on("payment", (data) => {
            try {
                // x: 좌석의 행, y : 좌석의 열
                const { x, y, reservation_num, show_id, user_id } = data;

                // 해당 좌석 결제처리
                seatArr[reservation_num][x][y] = 1;
                // 임의로 seat_num 설정
                const seat_num = JSON.stringify([x,y]);
                Sheet.update({ sheets_array: seatArr[reservation_num] }, { where: { reservation_num } });
                // 유저가 예매했다고 예매내역 추가
                ReservedList.create({ reservation_num, seat_num, show_id, user_id});

                // 좌석 정보 반환
                io.sockets.in(reservation_num).emit("getSeatsInfo", seatArr[reservation_num]);

            } catch (error) {
                console.log(error);
                socket.emit("error", { message: "payment 에러 발생", error });
            }
        })


        // 결제 취소 만약 결제하다가 오류나면
        socket.on("paymentReset", (data) => {
            try {
                // x: 좌석의 행, y : 좌석의 열
                const { x, y, reservation_num, show_id, user_id } = data;
                // 확인하기. 좌석 정보를 seatnum으로 받아와야 되는지 x,y값으로 받아와야되는지

                // 해당 좌석 결제 취소 처리
                seatArr[reservation_num][x][y] = 0;

                const seat_num = JSON.stringify([x,y]);

                Sheet.update({ sheets_array: JSON.stringify(seatArr[reservation_num]) }, { where: { reservation_num } });

                // 유저가 예매취소했다고 예매내역 삭제해줘야함
                ReservedList.destroy({where: {user_id, show_id, reservation_num, seat_num}});

                // 좌석 정보 반환
                io.sockets.in(reservation_num).emit("getSeatsInfo", seatArr[reservation_num]);

            } catch (error) {
                console.log(error);
                socket.emit("error", { message: "paymentReset 에러 발생", error });
            }
        });


    });
}

// getSeatsInfo : 모든 좌석 정보 반환
// const getSeatsInfo =


module.exports = initReservationSocket;