package database

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type Database struct {
	DB *gorm.DB
}

func NewDataBase() Database {
	dsn := "root:qorgksruf123@tcp(127.0.0.1:3306)/goodnight?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("데이터베이스 연결에 실패하였습니다.")
	}
	return Database{
		DB: db,
	}
}

func GetDB() Database {
	return NewDataBase()
}
