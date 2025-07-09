const jwt=require('jsonwebtoken')

const generateTokenAndSetCookie = (userId, res) => {
  try {
    const token = jwt.sign(
      { userId },
      process.env.SECRET_SESSION_KEY,
      { expiresIn: "1d" }
    );

    res.cookie("jwt", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      secure: process.env.NODE_ENV === "production",
    });

    console.log("✅ Token generated and cookie set");
  } catch (err) {
    console.error("❌ Error generating token:", err.message);
  }
};


module.exports = generateTokenAndSetCookie;