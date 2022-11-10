import { Room } from './chat-room.model';


export const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find({})
            .populate('messages')
            .populate('members')
            .lean()
            .exec()

        if (!rooms) {
            return res.status(400).end()
        }
        if (rooms.length === 0) {
            return res.status(400).json({ msg: "there is no rooms yet!!" });
        }

        res.status(200).json({ rooms }).end()

    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}


export const createRoom = async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(401).json({ error: "You are not authorized to perform such an action!!" })
        }
        const room = await Room.create(req.body)

        if (!room) {
            return res.status(400).end();
        }

        res.status(201).json(room);

    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}


export const getRoom = async (req, res) => {
    try {

        const room = await Room.findById({ _id: req.params.id })
            .lean()
            .exec()

        if (!room) {
            return res.status(400).end();
        }

        res.status(200).json({ room });

    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}

export const updateRoom = async (req, res) => {
    try {

        const updatedRoom = await Room.findByIdAndUpdate({ _id: req.params.id }, { $push: { messages: req.body.messages } }, { new: true })
            .populate('messages')
            .populate('members')
            .lean()
            .exec()

        if (!updatedRoom) {
            return res.status(400).end()
        }

        return res.status(200).json({ updatedRoom });


    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}

export const deleteRoom = async (req, res) => {
    try {
        const deletedRoom = await Room.findByIdAndDelete({ _id: req.params.id })
            .lean()
            .exec()

        if (!deletedRoom) {
            return res.status(400).end();
        }

        res.status(200).json({ msg: "Room has been deleted!" })

    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}