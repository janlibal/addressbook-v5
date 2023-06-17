import { Context } from 'koa'

export interface IContext extends Context {
    request: any
    status: number
    body: any
}