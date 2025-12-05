import { AsyncWrapper } from "../utils/AsyncWrapper.js";

const registeruser=AsyncWrapper(async (req,resp)=>{
    resp.status(200).json({
        message:"OK"
    })
})

export {registeruser};