const Sequelize = require("sequelize");
class ChatLog extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            
            
        content : {
            type : Sequelize.TEXT,
            allowNull : false,
        },
        receiver: {
            type: Sequelize.INTEGER,
            allowNull : true,
        },
        isRead: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultVAlue: false,
        }




        },{
            // 테이블의 내용
            sequelize, 
            timestamps : true, // 생성 시간, 업데이트 시간 자동으로 생성
            underscored : false, // 카멜 케이스 설정 유무
            modelName : "ChatLog", //모델 이름
            tableName : "chatLogs", // 복수형으로 테이블 이름 설정
            paranoid : false, //삭제시간 생성 유무
            charset : "utf8", // 인코딩 방식은 꼭 설정 해야한다.
            collate : "utf8_general_ci",
        })
    }

   
    static associate(db){
       
        db.ChatLog.belongsTo(db.User,{foreignKey : "user_id",targetKey : "id", onDelete: "CASCADE"});
    }
}




module.exports = ChatLog;