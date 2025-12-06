const AsyncWrapper=(fn)=>{
    return (req,resp,next)=>{
        Promise.resolve(fn(req,resp,next)).catch((err)=>{next(err)})
    }
}

export {AsyncWrapper};

//Higher Order Method.....