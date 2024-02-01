import { AnySchema } from 'yup'
import { Request, Response, NextFunction } from 'express'

const validate = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body)
        await schema.validate({
            body: req.body
        })
        return next()
    } catch (error) {
        return res.status(400).send((<Error>error).message)
    }
}

export default validate
