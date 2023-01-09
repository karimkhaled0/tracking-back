import { User } from "./user.model.js";
import { Category } from "../category/category.model.js";
import { verifyToken } from "../../utils/auth.js";
import bcrypt from "bcryptjs";
import { Task } from "../task/task.model.js";

export const me = (req, res) => {
  res.status(200).json({ data: req.user });
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
      .populate("category", "name")
      .lean()
      .exec();

    if (!user) {
      return res.status(400).end();
    }
    return res.status(200).json({ data: user });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const updateUser = async (req, res) => {
  /*

 get users's current category 

 if not just proceeed 

 else 

 get category and pop user of and add user to new category

*/
  try {
    //OWNER
    const ownerId = req.params.id;
    //EXECUTER
    const executerId = req.user._id;
    if (req.body.category) {
      if (req.user.isAdmin || req.user.isTeamLeader) {
        //get user
        const user = await User.findById(req.params.id).lean().exec();

        if (user.category) {
          const category = await Category.findByIdAndUpdate(
            user.category,
            { $pull: { technicals: user._id } },
            { new: true }
          );
        }

        const category = await Category.findById(req.body.category).exec();
        if (!category) {
          return res.status(400).end();
        }

        if (!category.technicals.includes(ownerId)) {
          const updatedCategory = await Category.updateOne(
            { _id: category._id },
            { $push: { technicals: ownerId } },
            { new: true }
          );

          if (!updatedCategory) {
            return res.status(400);
          }
        }

        //
      } else {
        return res.status(401).json({ message: "Not authorized" });
      }
    }

    // if (req.body.loginId || req.body.name) {
    //     return res.status(400).end()
    // }

    if (req.body.isAdmin && !req.user.isAdmin) {
      return res.status(400).end();
    }

    if (req.user.isAdmin || executerId == ownerId || req.user.isTeamLeader) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: ownerId },
        req.body,
        { new: true }
      ).exec();

      if (!updatedUser) {
        return res.status(400).end();
      }

      return res.status(201).json({ data: updatedUser });
    }
    return res
      .status(401)
      .json({ error: "You are not authorized to perform such an action!" });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

export const deleteUser = async (req, res) => {
  try {
    if (req.user.isAdmin) {
      // Get user Model
      const user = await User.findById(req.params.id).lean().exec();

      if (!user) {
        return res.status(404).end();
      }
      // remove the user from the category
      const category = await Category.findByIdAndUpdate(
        { _id: user.category ? user.category : user._id },
        { $pull: { technicals: user._id } },
        { new: true }
      );

      // Remove the user from database
      const deletedUser = await User.findOneAndRemove({
        _id: req.params.id,
      });

      if (!deletedUser) {
        return res.status(400).end();
      }

      return res.status(200).json({ message: "deleted" });
    } else {
      return res
        .status(401)
        .json({ errors: "You aren't authorized to perform this action" });
    }
  } catch (e) {
    res.status(400).end();
  }
};

export const getAllTechnicals = async (req, res) => {
  try {
    const allTechnicals = await User.find({ isAdmin: false })
      .select("-password")
      .lean()
      .exec();

    if (allTechnicals.length === 0) {
      return res.status(200).json({ message: "There is no technicals! " });
    }

    return res.status(200).json({ data: allTechnicals });
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

export const changePassword = async (req, res) => {
  if (req.user.changePasswordCounter > 0) {
    return res.status(404).end();
  }
  try {
    const password = await new Promise((resolve, reject) => {
      bcrypt.hash(req.body.password, 8, function (err, hash) {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { password, changePasswordCounter: 1 },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(400).end();
    }

    res.status(201).json({ data: updatedUser });
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

/* 
let token = req.headers.authorization.split('Bearer ')[1];  

        if(!token){
            return res.status(400).end();
        }
            const payload = await verifyToken(token);
            console.log("payload" ,payload.id)
    
            const tokenUser = await User.findById(payload.id)
            .select('-password')
            .lean()
            .exec()
        console.log(tokenUser)

        const requestedUser = await User.findById(req.params.id)
        .lean()
        .exec()

        console.log(requestedUser);

        if(!requestedUser){
            return res.status(400).end();
        }
        console.log("Here")
        console.log(requestedUser.id , tokenUser.id)

        if(requestedUser.isAdmin || (req.user.id === tokenUser.id)) {
           const updatedUser = await User.updateOne(requestedUser.id , req.body , {new: true})
           .lean()
           .exec()
           if (!updatedUser){
            return res.status(400).end()
           }
        res.status(201).json({data : updatedUser});
        }
        else {
            res.status(400).json({error: "You are not authorized to perform this action!"})
        }

    

*/
