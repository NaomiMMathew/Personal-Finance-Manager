const Register=require('../models/Register-model')


//Post login
// const login = async (req, res) => {

//     try {
//         const { username, password } = req.body;
    
//         const user = await Register.findOne({ username, password }); // Directly checks plain text password
//         if (!user) {
//           return res.status(400).json({ message: "Invalid credentials" });
//         }
    
//         res.status(200).json({ message: "Login successful" });
//       } catch (error) {
//         res.status(500).json({ message: "Error logging in" });
//       }
// };

//fetch user details
const login = async (req, res) => {
  try {
      const { username, password } = req.body;

      // Find user in the database
      const user = await Register.findOne({ username, password }); // Note: Avoid directly storing and checking plain text passwords in production
      if (!user) {
          return res.status(400).json({ message: "Invalid credentials" });
      }

      // Include user details in the response
      res.status(200).json({ 
          message: "Login successful", 
          user: {
              id: user._id, // User ID
              username: user.username,
              email:user.email,
              // Add any additional fields you'd like to include
          }
      });
  } catch (error) {
      res.status(500).json({ message: "Error logging in" });
  }
};



module.exports = { login}
