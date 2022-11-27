const UserType = require("../../modals/usertype");
const HttpError = require("../errors/http-error");

const setUserType = async (req, res, next) => {
  const user = new UserType(req.body.user);
  let userData;
  try {
    userData = await user.save();
  } catch (error) {
    throw new HttpError("Error creating user!", 422);
  }
  if (!userData) {
    throw new HttpError("User could not be created!", 500);
  }
  res.status(201);
  res.json({
    userData: userData.toObject({ getters: true }),
  });
};

const fetchUserTypeById = async (req, res, next) => {
  const userEmail = req.params.userEmail;
  let userData;
  try {
    userData = await UserType.findOne({
      email: userEmail
    });
    console.log(userData)
  } catch (error) {
    throw new HttpError("Error fetching user!", 422);
  }
  if (!userData) {
    throw new HttpError("User not found!", 500);
  }
  res.status(200);
  res.json({
    userData: userData.toObject({ getters: true }),
  });
};

module.exports.setUserType = setUserType;
module.exports.fetchUserTypeById = fetchUserTypeById;
