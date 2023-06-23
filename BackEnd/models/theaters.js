const Sequelize = require("sequelize");
class Theater extends Sequelize.Model {
    static init(sequelize){
        return super.init({


       name : {
        type : Sequelize.STRING(20),
        allowNull : false
       },

       location : {
        type : Sequelize.STRING(30),
        allowNull:false
       }





        },{
            // 테이블의 내용
            sequelize,
            timestamps : true, // 생성 시간, 업데이트 시간 자동으로 생성
            underscored : false, // 카멜 케이스 설정 유무
            modelName : "Theater", //모델 이름
            tableName : "theaters", // 복수형으로 테이블 이름 설정
            paranoid : false, //삭제시간 생성 유무
            charset : "utf8", // 인코딩 방식은 꼭 설정 해야한다.
            collate : "utf8_general_ci",
        })
    }


    static associate(db){

        db.Theater.hasMany(db.Show,{foreignKey : "theaters_id",targetKey : "id",  onDelete: "CASCADE",});
    }
}

module.exports = Theater;