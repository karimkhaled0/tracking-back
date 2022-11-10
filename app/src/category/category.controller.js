import { Category } from "./category.model";
import { validateCategoryInput } from "../../validation/category";
import { User } from '../user/user.model';



export const getCategory = async (req, res) => {

    try {

        const category = await Category.findById(req.params.id)
            .populate('tasks')
            .populate('technicals')
            .lean()
            .exec()

        if (category) {

            return res.status(200).json({ category });
        }
        return res.status(400).end()
    } catch (e) {
        console.error(e)
        res.status(400).json();
    }
}

export const createCategory = async (req, res) => {
    try {
        const { isValid, errors } = await validateCategoryInput(req.body)

        if (!isValid) {
            return res.status(400).json({ errors })
        }
        if (req.user.isAdmin) {

            const category = await Category.create(req.body);

            if (category) {
                return res.status(201).json({ category })
            }
            return res.status(400).end()
        }

        res.status(401).json({ message: "Not authorized" });

    } catch (e) {
        console.error(e)
        res.status(400).end()
    }

}

export const updateCategory = async (req, res) => {
    try {

        if (req.user.isAdmin) {

            const updatedCategory = await Category.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
                .lean()
                .exec()

            if (updateCategory) {
                return res.status(201).json({ data: updatedCategory })
            }
            return res.status(400).end()
        }
        return res.status(401).json({ message: "Not aurhorized" })

    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}

export const deleteCategory = async (req, res) => {
    try {

        if (req.user.isAdmin) {
            // here i get the Category
            const category = await Category.findById(req.params.id)
                .lean()
                .exec()

            if (!category) {
                return res.status(404).end()
            }
            // I looped inside for each Technical and unset the category object instead of pull bc pull works with arrays
            for (let index = 0; index < category.technicals.length; index++) {
                const technical = await User.findByIdAndUpdate({ _id: category.technicals[index] }, { $unset: { category: category._id } }, { new: true });

                if (!technical) {
                    return res.status(404).json({ msg: "Category error!!  " })
                }

            }
            // Then delete the Category
            const deletedCategory = await Category.findByIdAndDelete({ _id: req.params.id })

            if (deletedCategory) {
                return res.status(200).json({ message: "Category Deleted!" })
            }

            return res.status(400).end()
        }

        return res.status(401).json({ message: "Not authorized" })

    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({})
            .populate('tasks')
            .populate('technicals')
            .lean()
            .exec()

        if (categories) {
            return res.status(200).json({ categories })
        }

        res.status(400).end()

    } catch (e) {
        console.error(e)
        res.status(400).end()
    }

}


export const getCategoryUsers = async (req, res) => {
    try {
        const technicals = await Category.findById(req.params.id)
            .select('technicals')
            .populate('technicals', 'name')
            .lean()
            .exec()

        if (technicals) {
            return res.status(200).json(technicals);
        }

        res.status(400).end();

    } catch (e) {
        console.error(e);
        res.status(400).end()
    }
}