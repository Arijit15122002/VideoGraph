import {asyncHandler} from '../utils/asyncHandler.js'
import {APIerror} from '../utils/APIerror.js'
import { User } from '../models/user.mode.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import {APIresponse} from '../utils/APIresponse.js'

const registerUser = asyncHandler(async (req, res) => {
    
    //get user details from frontend 
    const {username, email, fullname, password} = req.body
    console.log("email: ",email)
    

    //validation - not emptyCells: 
    if(
        [fullname, email, username, password].some((field) => 
            field?.trim() === ""
        )
    ){
        throw new APIerror(400, "All fields are required") 
    }

    //check if user already exists: username, email
    const existedUser = User.findOne({
        $or: [{ username },{ email }]
    })

    if(existedUser){
        return new APIerror(409, "Username with this email already exists")
    }

    //check for images,  check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new APIerror(400, "Avatar is required")
    }

    //upload them to cloudinary,check avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar) {
        throw new APIerror(400, "Avatar is required")
    }

    //creating user object - create entry in db
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    })

    //remove password and refresh token field from response 
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    //check for user creation: is it returning null or returning actual user?
    if(!createdUser)
    {
        throw new APIerror(500, "Something went wrong while registering the user")
    }

    //return response
    return res.status(201).json(
        new APIresponse(200, createdUser, "User registered successfully")
    )

})


export {registerUser}