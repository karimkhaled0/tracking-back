import { Task } from "./task.model";
import { validateTaskInput } from "../../validation/task";
import { Category } from "../category/category.model";

export const createTask = async (req, res) => {
  try {
    if (req.user.isAdmin || req.user.isTeamLeader) {
      const { isValid, errors } = validateTaskInput(req.body);

      if (!isValid) {
        return res.status(400).json({ errors });
      }

      const adminId = req.user._id;
      const task = { ...req.body, adminId };
      const createdTask = await Task.create(task);
      if (createdTask) {
        const category = await Category.findByIdAndUpdate(
          { _id: task.category },
          { $push: { tasks: createdTask._id } }
        );
        if (category) {
          return res.status(201).json({ data: createdTask });
        }

        return res.status(400).end();
      }

      return res.status(400).end();
    }

    res.status(401).json({ message: "Not authorized!" });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const updateTask = async (req, res) => {
  if (req.body.category) {
    return res.status(400).end();
  }
  try {
    if (req.user.isAdmin || req.user.isTeamLeader) {
      const updatedTask = await Task.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      )
        .lean()
        .exec();

      if (updatedTask) {
        return res.status(201).json({ data: updatedTask });
      }
      return res.status(400).end();
    }
    if (!req.user.isAdmin || !req.user.isTeamLeader) {
      const updatedTask = await Task.findByIdAndUpdate(
        { _id: req.params.id },
        {
          started: req.body.started,
          report: req.body.report,
          inReview: req.body.inReview,
          inProgress: req.body.inProgress,
          finished: req.body.finished,
        },
        { new: true }
      )
        .lean()
        .exec();

      if (updatedTask) {
        return res.status(201).json({ data: updatedTask });
      }
      return res.status(400).end();
    }
    res.status(401).json({ message: "Not authorized!" });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const deleteTask = async (req, res) => {
  try {
    if (req.user.isAdmin || req.user.isTeamLeader) {
      const task = await Task.findById(req.params.id).lean().exec();

      if (!task) {
        return res.status(404).end();
      }
      const category = await Category.findByIdAndUpdate(
        { _id: task.category },
        { $pull: { tasks: task._id } },
        { new: true }
      );

      if (!category) {
        return res.status(404).json({ msg: "Category error!!  " });
      }

      const deletedTask = await Task.findByIdAndDelete({ _id: req.params.id });

      if (deletedTask) {
        return res.status(200).json({ message: "deleted!" });
      }

      return res.status(400).end();
    }
    res.status(401).json({ message: "Not authorized !" });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById({ _id: req.params.id })
      .populate("adminId", "name")
      .populate("techId", "name")
      .populate("category", "name")
      .lean()
      .exec();

    if (task) {
      return res.status(200).json({ task });
    }

    res.status(400).end();
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).populate("techId", "name").lean().exec();

    if (tasks) {
      return res.status(200).json({ tasks });
    }

    res.status(400).json();
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const getTasksByCategory = async (req, res) => {
  try {
    const tasks = await Task.find({ name: req.body.name })
      .populate("adminId", "name")
      .populate("techId", "name")
      .populate("category", "name")
      .lean()
      .exec();

    if (tasks) {
      return res.status(200).json({ tasks });
    }
    res.status(400).end();
  } catch (e) {
    console.error(e);
    res.status(400).end;
  }
};
