import { connection } from "../config/db.js";
const registerstudent = async (req, res) => {
  try {
    const { studentname, email, dateofbirth } = req.body;
    const result = await new Promise((resolve, reject) => {
      connection.query(
        `insert into students set studentname=?,email=?,dateofbirth=?`,
        [studentname, email, dateofbirth],
        (err, results) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(results);
          }
        }
      );
    });
    res.status(200).json({
      data: result,
      message: "student registered",
    });
  } catch (err) {
    res.status(500).json({
      data: err,
      message: "student donot registered",
    });
  }
};
const entercourse = async (req, res) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const { coursename, credithours } = req.body;
      connection.query(
        `insert into courses set coursetname=?,credithours=?`,
        [coursename, credithours],
        (err, results) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(results);
          }
        }
      );
    });
    res.status(200).json({
      data: result,
      message: "course entered",
    });
  } catch (err) {
    res.status(500).json({
      data: err,
      message: "course not added",
    });
  }
};
const enrollments = async (req, res) => {
  try {
    const { studentid, courseids } = req.body;
    const final = [];
    for (let courseid of courseids) {
      const result = await new Promise((resolve, reject) => {
        connection.query(
          `insert into enrollments set studentid=?, courseid=?`,
          [studentid, courseid],
          (err, results) => {
            if (err) {
              return reject(err);
            } else {
              return resolve(results);
            }
          }
        );
      });
      final.push(result);
    }
    res.status(200).json({
      data: final,
      message: "enrollment entered",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      data: err,
      message: "enrollment not added",
    });
  }
};
const check_courses_bystudent= async(req,res)=>{
    try{
    const result= await new Promise((resolve,reject)=>{
        connection.query(`select coursetname from courses join enrollments on courses.id=enrollments.courseid join students on students.id=enrollments.studentid where students.id=?`,[req.params.id],(err,results)=>{
            if (err) {
                return reject(err);
              } else {
                return resolve(results);
              }
        });

    });
    res.status(200).json({
        data: result,
        message: "enrollment found",
      });
    }catch(err){
        console.log(err);
    }
};
const add_enrollments= async (req,res)=>{
  const {enrollids}=req.body;
  const final=[];
  try{
    for(let i of enrollids){
    const result =await new Promise((resolve ,reject)=>{
      connection.query(`insert into enrollments set  courseid=?, studentid=?`,[i,req.params.id],(err,results)=>{
        if(err){return reject(err)}
        else{return resolve(results)}
      })
    });
    
    final.push(result);
  }
res.status(200).json({
  data:final,
  message:"enrollments updated"
});
  }catch(err){console.log(err)
    res.json(err);
  }
};
const deleteenrollment= async(req,res)=>{
  try{
    const {delids}=req.body;
    const final=[];
    for(let i of delids ){
   const result=await new Promise((resolve , reject)=>{
    connection.query(`delete from enrollments where courseid=?&& studentid `,[i,req.params.id],(err,results)=>{
      if(err){return reject(err)}
        else{return resolve(results)}
    })
   });
   final.push(result);
}
res.status(200).json({
  data:final,
  message:"enrollments updated"
});
  }catch(err){
    console.log(err);
    res.json(err);
  }
};

export default { registerstudent, entercourse, enrollments,check_courses_bystudent,add_enrollments,deleteenrollment };
