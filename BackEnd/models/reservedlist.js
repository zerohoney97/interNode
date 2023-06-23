const Sequelize = require("sequelize");
class ReservedList extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            // 컬럼의 내용
           reservation_num : {type
        :Sequelize.STRING(20),allowNull:false},

        seat_num : {
            type : Sequelize.STRING(150),
            allowNull : false,
        },

        pay : {
            type : Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue : false
        }

        },{
            // 테이블의 내용
            sequelize,
            timestamps : true, // 생성 시간, 업데이트 시간 자동으로 생성
            underscored : false, // 카멜 케이스 설정 유무
            modelName : "ReservedList", //모델 이름
            tableName : "reservedLists", // 복수형으로 테이블 이름 설정
            paranoid : false, //삭제시간 생성 유무
            charset : "utf8", // 인코딩 방식은 꼭 설정 해야한다.
            collate : "utf8_general_ci",
        })
    }

    static associate(db){
        db.ReservedList.belongsTo(db.Show, {foreignKey : "show_id", targetKey : "id", onDelete: "CASCADE"});
        db.ReservedList.belongsTo(db.User,{foreignKey : "user_id",targetKey : "id", onDelete: "CASCADE"});
    }

}

module.exports = ReservedList;