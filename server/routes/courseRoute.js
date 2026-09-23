// const express = require("express")
// const { protect } = require("../middleware/authMiddleware")
// const { getCourses, create }

// const courseRoute = express.Router()

// courseRoute.get("/", protect, (req, res) => {

//     res.json("Hello, I am secure now")

// })

// courseRoute.post("/", (req, res) => {

//     const { name, email, password, role } = req.body

//     if (!name || !email || !password || !role) {
//         return res.status(400).json({
//             "message": "Invalid Input"
//         })
//     }

//     res.status(200).json({
//         "message": "Course Created Successfully"
//     })

// })

// courseRoute.get("/:id", (req, res) => {

// })

// courseRoute.put("/:id", (req, res) => {

// })

// courseRoute.delete("/:id", (req, res) => {

// })

// module.exports = courseRoute


const express = require("express")
const { protect, authorize } = require("../middleware/authMiddleware");
const { getCourses, createCourse, updateCourse, deleteCourse, getCourseById } = require("../controllers/courseControllers");

const courseRoute = express.Router();

courseRoute.get("/", getCourses);

courseRoute.post("/", protect, authorize('instructor', 'admin'), createCourse);

courseRoute.get("/:id", getCourseById);

courseRoute.put("/:id", protect, authorize('instructor', 'admin'), updateCourse);

courseRoute.delete("/:id", protect, authorize('instructor', 'admin'), deleteCourse);

module.exports=courseRoute