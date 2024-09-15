const asyncHandler = (requestHandler) => {
    return (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err))
    }
}

export { asyncHandler }

// ** Higher Order function ki Kahani **

// const asyncHandler = () => {}
// const asyncHandler = (func) => {() => {}}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}

// ***   

// ** Async Handler in try catch syntax **

// const asyncHandler = (fn) => async (req,res,next) => {
//     try {
//         await fn(req,res,next)
//     }
//     catch {
//         res.status(err.code || 400).json({
//             success: false,
//             message: err.message
//         })
//     }
// }

// ***