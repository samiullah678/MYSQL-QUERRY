import mysql from "mysql2"
const connection=mysql.createConnection({
    host:"localhost",
    port:"3306",
    user:"root",
    password:"root_123",
    database:"studentinformation"
});
connection.connect((err,results)=>{
    if(err){console.log(err)}
    else{console.log("connected")}
});
export {connection};
// connection.query(`create table students(id int auto_increment primary key,studentname varchar(200) not null ,email varchar(400) not null,dateofbirth int not null)`,(err,results)=>{
//     if(err){console.log(err)}
//     else{console.log("student table created")}
// });
// connection.query(`create table courses(id int auto_increment primary key,coursetname varchar(200) not null ,credithours varchar(400) not null)`,(err,results)=>{
//     if(err){console.log(err)}
//     else{console.log("courses table created")}
// });
// connection.query(`create table enrollments(courseid int ,studentid int,foreign key(courseid) references courses(id),foreign key(studentid) references students(id),unique(studentid,courseid))`,(err,results)=>{
//     if(err){console.log(err)}
//     else{console.log("enrollment table created")}
// });