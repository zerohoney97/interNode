const smtpTransport = require("../config/mailauth");
const { randomBytes } = require("crypto");

// 이메일, 인증코드 정보 담을 객체
let emailCodes = {};

// 인증번호 생성
const createCode = (email) => {
    try {
        const code = randomBytes(3).toString('hex');
        emailCodes[email] = code;

        return code;
    } catch (error) {
        console.log(error);
    }
}

// 인증번호 전송
exports.sendEmail = (req, res) => {
    try {
        const { email } = req.body;

        const code = createCode(email);

        const mailOptions = {
            from : "interNodeToy@gmail.com",
            to : email,
            subject : "[인터노드] 이메일 인증코드",
            text : "인증코드 : "+ code + "\n\n 본인이 요청한 것이 아니라면 이 메일은 무시하세요."
        }

        smtpTransport.sendMail(mailOptions, (error,response) => {
            if (error) {
                console.log(error);
                return res.send("1");
            } else {
                console.log("성공");
                smtpTransport.close();
                return res.send("0");
            }
        });

    } catch (error) {
        console.log(error);
    }
}


// 인증코드 검증
exports.checkCode = (req, res) => {
    try {
        const { email, code } = req.body;

        if (emailCodes[email] == code) {
            // 인증코드 일치할때
            return res.send("0");
        } else {
            // 인증코드 일치하지 않을때
            return res.send("1");
        }

    } catch (error) {
        console.log(error);
    }
}

