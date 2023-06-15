const socketIO = require("socket.io");
const { Sheet } = require("../models");

// getSeatsInfo : showId로 현재 좌석 정보 반환
// error : 오류

let seatArr = [];

const initReservationSocket = (server) => {
    const io = socketIO(server);

    // const io = socketIO(server, { path: '/socket.io' });

    io.on("connection", (socket) => {
        console.log("새로운 클라이언트 접속");

        try {
            // 좌석 정보 요청할때
            socket.on("getSeatsInfo", (showId, reservation_num) => {

                const seats = getSeatsInfo(showId, reservation_num);
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