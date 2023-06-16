const socketIO = require("socket.io");
const { Sheet } = require("../models");

// getSeatsInfo : showId로 현재 좌석 정보 반환
// error : 오류
// : 결제할 좌석

let seatArr = [];

const initReservationSocket = (server) => {
    const io = socketIO(server);

    io.on("connection", async (socket) => {
        console.log("새로운 클라이언트 접속");
        // await Sheet.create({reservation_num : "0607", sheets_array: "[[0,0,0], [0,0,0]]", show_id : 1});
        try {
            // 좌석 정보 요청할때
            socket.on("getSeatsInfo", async (showId, reservation_num) => {
                //  예매번호 room 생성 소켓 join

                const seats = await getSeatsInfo(showId, reservation_num);
                // 좌석 정보 반환
                socket.emit("getSeatsInfo", seats);

            });

        } catch (error) {
            console.log(error);
            socket.emit("error", {message : "에러 발생"});
        }

    });
}

// getSeatsInfo
const getSeatsInfo = async (show_id, reservation_num) => {
    try {
        const seats = (await Sheet.findOne({where : {show_id, reservation_num}})).dataValues.sheets_array;
        return seats;
    } catch (error) {
        console.log(error);
        return error;
    }
}



module.exports = initReservationSocket;